/* eslint-disable no-undef */
import BaseEosApi from './BaseEosApi'
import { Contracts } from '~/const/Contracts'
import eosjsAccountName from 'eosjs-account-name'
import { Serialize } from 'eosjs'
// import fs from 'fs'
// // import fs from 'fs'
// const fs = require('fs/promises')
// import * as codeF from './../contracts/daoinf.wasm'
// import abiF from '~/statics/contractsFile/daoinf.abi'

class DaoApi extends BaseEosApi {
  constructor ({
    eosApi,
    mEosApi,
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
    this.mEosApi = mEosApi
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

  /**
   * ============================ DEPLOY CONTRACT ================
   */

  /**
   * GetWasmAbi
   * @param {accountName} contractName
   * @returns
   */
  async getWasmAbi (contractName) {
    // const codePath = join(__dirname, `../compiled/${contractName}.wasm`)
    // const abiPath = join(__dirname, `../compiled/${contractName}.abi`)
    const codePath = 'https://drive.google.com/uc?export=view&id=1krXIiI6qiKhq1F-kZyd7dZZvRpNJp4Sn'
    const abiPath = 'https://drive.google.com/uc?export=view&id=1L9A1PZFqSATiKwLathsEpOIvU31WmW8A'
    // console.warn('getWas', fs)
    // const code = new Promise(resolve => {
    //   fs.readFile(codePath, (_, r) => resolve(r))
    // })
    // const abi = new Promise(resolve => {
    //   fs.readFile(abiPath, (_, r) => resolve(r))
    // })
    // const code = codeF
    // const abi = abiF
    let code = await fetch(codePath)
    let abi = await fetch(abiPath)
    code = await code.arrayBuffer()
    abi = await abi.json()
    // console.log(code, abi)

    // await fetch(codePath).then(r => r.text()).then(t => console.log(t))

    return Promise.all([code, abi]).then(([code, abi]) => ({ code, abi }))
  }

  buf2hex (buffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('')
  }

  /**
   * Set Code
   * @returns
   */
  async setCode ({ account, code, vmtype, vmversion }, { authorization }) {
    console.log('setCode before', code)
    // const wasmHexString = code.toString('hex')
    const wasmHexString = this.buf2hex(code)
    console.log('setCode after', wasmHexString)
    let [actor, permission] = authorization.split('@')

    const actions = [{
      account: 'eosio',
      name: 'setcode',
      authorization: [{
        actor,
        permission
      }],
      data: {
        account,
        code: wasmHexString,
        vmtype,
        vmversion
      }
    }]

    const res = await this.eosApi.signTransaction(actions)
    // const res = await api.transact({
    //   actions: [{
    //     account: 'eosio',
    //     name: 'setcode',
    //     authorization: [{
    //       actor,
    //       permission
    //     }],
    //     data: {
    //       account,
    //       code: wasmHexString,
    //       vmtype,
    //       vmversion
    //     }
    //   }]
    // },
    // {
    //   blocksBehind: 3,
    //   expireSeconds: 30
    // })

    return res
  }

  /**
   * Set Abi
   * @returns
   */
  async setAbi ({ account, abi }, { authorization }) {
    const buffer = new Serialize.SerialBuffer({
      textEncoder: this.mEosApi.textEncoder,
      textDecoder: this.mEosApi.textDecoder
    })

    const abiDefinitions = this.mEosApi.abiTypes.get('abi_def')
    abi = abiDefinitions.fields.reduce(
      (acc, { name: fieldName }) =>
        Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
      abi
    )

    abiDefinitions.serialize(buffer, abi)
    const serializedAbiHexString = Buffer.from(buffer.asUint8Array()).toString('hex')

    let [actor, permission] = authorization.split('@')

    const actions = [
      {
        account: 'eosio',
        name: 'setabi',
        authorization: [{
          actor,
          permission
        }],
        data: {
          account,
          abi: serializedAbiHexString
        }
      }
    ]

    const res = await this.eosApi.signTransaction(actions)

    // const res = await api.transact({
    //   actions: [{
    //     account: 'eosio',
    //     name: 'setabi',
    //     authorization: [{
    //       actor,
    //       permission
    //     }],
    //     data: {
    //       account,
    //       abi: serializedAbiHexString
    //     }
    //   }]
    // },
    // {
    //   blocksBehind: 3,
    //   expireSeconds: 30
    // })

    return res
  }

  /**
   * Deploy contract
   */
  async deployContract ({ accountName }) {
    console.log('deployContract', accountName)
    const { abi } = await this.getWasmAbi(accountName)
    // const { code: wasm, abi } = await this.getWasmAbi(accountName)
    // const { code: wasm } = await this.getWasmAbi(accountName)

    // await this.setCode({
    //   account: accountName,
    //   code: wasm,
    //   vmtype: 0,
    //   vmversion: 0
    // }, {
    //   authorization: `${accountName}@active`
    // })

    await this.setAbi({
      account: accountName,
      abi: abi
    }, {
      authorization: `${accountName}@active`
    })
  }
}

export default DaoApi
