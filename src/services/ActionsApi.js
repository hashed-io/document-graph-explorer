import BaseEosApi from './BaseEosApi'

class ActionsApi extends BaseEosApi {
  constructor ({
    eosApi,
    mEosApi,
    notifier
  }, _contractAccount) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: _contractAccount,
        table: 'documents',
        tableId: 'id'
      }
    )
    this.mEosApi = mEosApi
    // this.contractAccount = _contractAccount
  }

  /** *
   * Parse transfers base
   */
  async _parseRows (rows, modifierProps) {
    return rows
  }
  /**
   * To edit document need the DocId and contentGroups
   * @param {*} param0
   */
  async certifyDoc ({ documentID, certifier, signature, notes }) {
    const actions = [{
      account: this.contractAccount,
      name: 'certify',
      data: {
        certifier: certifier,
        document_id: documentID,
        signature: signature,
        notes: notes
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   * To edit document need the DocId and contentGroups
   * @param {*} param0
   */
  async editDoc ({ documentID, contentGroups }) {
    const actions = [{
      account: this.contractAccount,
      name: 'editdoc',
      data: {
        documentID: documentID,
        content_groups: contentGroups
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   * To delete the document need the id or hash
   * @param {documentID} param0
   * @returns transaction
   */
  async deleteDoc ({ documentID }) {
    const actions = [{
      account: this.contractAccount,
      name: 'deletedoc',
      data: {
        documentID: documentID
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   * To delete the edge need the id or hash
   *  fromNode doc Id || hash
   *  toNode doc Id || hash
   *  edgeName String
   * @param {documentID} param0
   * @returns transaction
   */
  async deleteEdge ({ fromNode, toNode, edgeName }) {
    const actions = [{
      account: this.contractAccount,
      name: 'deleteedge',
      data: {
        fromNode: fromNode,
        toNode: toNode,
        edgeName: edgeName
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   * To create the edge needs:
   *  creator  [owner]?
   *  fromNode doc Id || hash
   *  toNode doc Id || hash
   *  edgeName String
   * @param {documentID} param0
   * @returns transaction
   */
  async createEdge ({ creator, fromNode, toNode, edgeName }) {
    const actions = [{
      account: this.contractAccount,
      name: 'createedge',
      data: {
        creator: creator,
        fromNode: fromNode,
        toNode: toNode,
        edgeName: edgeName
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param {creator, content_groups} param0
   * @returns transaction
   */
  async createDoc ({ creator, contentGroups }) {
    const actions = [{
      account: this.contractAccount,
      name: 'createdoc',
      data: {
        creator: creator,
        content_groups: contentGroups
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  async extendDoc ({ creator, fromNode, edgeName, contentGroups }) {
    const actions = [{
      account: this.contractAccount,
      name: 'extenddoc',
      data: {
        creator: creator,
        fromNode: fromNode,
        edgeName: edgeName,
        content_groups: contentGroups
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
}

export default ActionsApi
