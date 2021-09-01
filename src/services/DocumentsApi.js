import BaseEosApi from './BaseEosApi'
import { Contracts } from '~/const/Contracts'
class DocumentsApi extends BaseEosApi {
  constructor ({ eosApi, notifier }) {
    super(eosApi, notifier, {
      contractAccount: Contracts.CONTRACT_DOC,
      table: 'documents',
      tableId: 'id'
    })
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
   */
  async AddEntry ({ _value }) {
    const actions = [
      {
        account: Contracts.CONTRACT_DOC,
        name: 'addentry',
        data: {
          value: _value
        }
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
  async DelEntry ({ _label }) {
    const actions = [
      {
        account: Contracts.CONTRACT_DOC,
        name: 'delentry',
        data: {
          label: _label
        }
      }
    ]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param { value (Content) }
   * @returns
   */
  async EditEntry ({ _value }) {
    const actions = [
      {
        account: Contracts.CONTRACT_DOC,
        name: 'editentry',
        data: {
          value: _value
        }
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
  async InitDao ({ _creator }) {
    const actions = [
      {
        account: Contracts.CONTRACT_DOC,
        name: 'initdao',
        data: {
          creator: _creator
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
        account: Contracts.CONTRACT_DOC,
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
      scope: Contracts.CONTRACT_DOC,
      // indexPosition: 3,
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
      scope: Contracts.CONTRACT_DOC,
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

export default DocumentsApi
