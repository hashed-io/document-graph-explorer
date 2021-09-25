import BaseEosApi from './BaseEosApi'
class ContractsApi extends BaseEosApi {
  constructor ({
    eosApi,
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
    this.contractAccount = _contractAccount
  }
}

export default ContractsApi
