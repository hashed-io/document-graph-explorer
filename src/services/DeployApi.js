import BaseEosApi from './BaseEosApi'
class DocumentsApi extends BaseEosApi {
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

export default DocumentsApi
