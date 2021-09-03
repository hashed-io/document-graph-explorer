/* eslint-disable no-undef */
import BaseEosApi from './BaseEosApi'
import { Contracts } from '~/const/Contracts'
import eosjsAccountName from 'eosjs-account-name'

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
    const actions = [{
      account: Contracts.CONTRACT_DAO,
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
  /**
   *
   * @param { daoName(input user) , creatorName(current account), ipfsString(content Id)}
   * @returns
   */
  async updateDaoData ({ dao, ipfs, accountName }) {
    const actions = [{
      account: Contracts.CONTRACT_DAO,
      name: 'update',
      data: {
        dao: dao,
        ipfs: ipfs
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  async getDaos ({ limit, accountName, nextKey }) {
    let start = nextKey || (BigInt(eosjsAccountName.nameToUint64(accountName)) * (BigInt(2 ** 64))).toString()
    let end = (BigInt(eosjsAccountName.nameToUint64(accountName)) * BigInt(2 ** 64) + BigInt('18446744073709551615')).toString()
    console.log('getDaos', { start, accountName, nextKey })
    // let upperBound = search || ''
    // if (!(upperBound > 12)) upperBound = upperBound.padEnd(12, 'z')

    const rounds = await this._getTableRows({
      scope: Contracts.CONTRACT_DAO,
      indexPosition: 2,
      lowerBound: start,
      upperBound: end,
      limit,
      keyType: 'i128',
      table: 'daos'
    })
    return rounds
  }
}

export default DaoApi
