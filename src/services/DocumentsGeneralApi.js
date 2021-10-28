import BaseEosApi from './BaseEosApi'
// import { Contracts } from 'src/const/Contracts.js'
class DocumentsGeneralApi extends BaseEosApi {
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
   *
   * @param { value (content) }
   * @returns
   * contractAccount
   */
  async StoreEntry ({ values, daoId }) {
    var authorization = `${this.contractAccount}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [{
      account: this.contractAccount,
      name: 'storeentry',
      data: {
        values: values,
        dao_id: daoId
      },
      authorization: [{
        actor,
        permission
      }]
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  async StoreAndDeleteEntry ({ values, deleteLabels, daoId }) {
    var authorization = `${this.contractAccount}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [
      {
        account: this.contractAccount,
        name: 'storeentry',
        data: {
          values: values,
          dao_id: daoId
        },
        authorization: [{
          actor,
          permission
        }]
      },
      {
        account: this.contractAccount,
        name: 'delentry',
        data: {
          labels: deleteLabels
        },
        authorization: [{
          actor,
          permission
        }]
      }
    ]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param { label (string) }
   * @returns
   */
  async DelEntry ({ deleteLabels, daoId }) {
    var authorization = `${this.contractAccount}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [
      {
        account: this.contractAccount,
        name: 'delentry',
        data: {
          labels: deleteLabels,
          dao_id: daoId
        },
        authorization: [{
          actor,
          permission
        }]
      }
    ]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }

  /**
   *
   * @param { creator (name) }
   * @returns
   */
  async Adddao ({ creator, daoId }) {
    var authorization = `${creator}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [
      {
        authorization: [{
          actor,
          permission
        }],
        account: this.contractAccount,
        name: 'adddao',
        data: {
          creator: creator,
          dao_id: daoId
        }
      }
    ]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param {  }
   * @returns
   */
  async Reset () {
    const actions = [
      {
        account: this.account,
        name: 'reset',
        data: {
        }
      }
    ]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param {limit , search[Input to search], customOffset} param0
   * @returns
   */
  async getDocuments ({ limit, search, customOffset }) {
    let upperBound = search || ''
    if (!(upperBound > 12)) upperBound = upperBound.padEnd(12, 'z')
    const rounds = await this._getTableRows({
      scope: this.contractAccount,
      // indexPosition: 2,
      lowerBound: customOffset,
      upperBound,
      limit,
      keyType: 'i64',
      table: 'documents'
    })

    return rounds
  }
  /**
   *
   * @param {limit , search[Input to search], customOffset} param0
   * @returns
   */
  async getEdges ({ limit, search, customOffset }) {
    let upperBound = search || ''
    if (!(upperBound > 12)) upperBound = upperBound.padEnd(12, 'z')

    const rounds = await this._getTableRows({
      scope: this.account,
      // indexPosition: 3,
      lowerBound: customOffset,
      upperBound,
      limit,
      keyType: 'i64',
      table: 'documents'
    })
    return rounds
  }
}

export default DocumentsGeneralApi
