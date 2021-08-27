import BaseEosApi from './BaseEosApi'
import {
  Contracts
} from '~/const/Contracts'
class DaoApi extends BaseEosApi {
  constructor ({
    eosApi,
    notifier
  }) {
    super(
      eosApi,
      notifier,
      {
        contractAccount: Contracts.CONTRACT_DAO,
        table: 'daos',
        tableId: 'id'
      }
    )
  }

  /** *
  * Parse transfers base
  */
  async _parseRows (rows, modifierProps) {
    return rows
  }
  /**
   *
   * @param { daoName(input user) , creatorName(current account), ipfsString(content Id)}
   * @returns
   */
  async saveDaoData ({ dao, creator, ipfs, accountName }) {
    // console.log('DAOAPI.JS')
    // console.log({ dao, creator, ipfs, accountName })
    // console.log('DAOAPI.JS')
    const actions = [{
      account: 'daoregistry1',
      name: 'create',
      data: {
        dao: dao,
        creator: creator,
        ipfs: ipfs
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
}

export default DaoApi
