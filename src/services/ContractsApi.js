import BaseEosApi from './BaseEosApi'

class ContractsApi extends BaseEosApi {
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
  async StoreEntry ({ values }) {
    var authorization = `${this.contractAccount}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [{
      account: this.contractAccount,
      name: 'storeentry',
      data: {
        values: values
      },
      authorization: [{
        actor,
        permission
      }]
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  async StoreAndDeleteEntry ({ values, deleteLabels }) {
    var authorization = `${this.contractAccount}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [
      {
        account: this.contractAccount,
        name: 'storeentry',
        data: {
          values: values
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
  async DelEntry ({ deleteLabels }) {
    var authorization = `${this.contractAccount}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [
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
   * @param { creator (name) }
   * @returns
   */
  async InitDao ({ _creator }) {
    const actions = [
      {
        account: this.account,
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
    // alert(this.account)
    const rounds = await this._getTableRows({
      scope: this.contractAccount,
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

export default ContractsApi
