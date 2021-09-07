import BaseEosApi from './BaseEosApi'
import fs from 'fs'
import { join } from 'path'
import { Serialize } from 'eosjs'
// import {} from 'eos'
// const { Serialize } = require('eosjs')

// const fs = require('fs')
// const { join } = require('path')

class DocumentsApi extends BaseEosApi {
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
  async StoreEntry ({ values, deleteLabels }) {
    const actions = [
      {
        account: this.contractAccount,
        name: 'storeentry',
        data: {
          values: values
        }
      },
      {
        account: this.contractAccount,
        name: 'delentry',
        data: {
          label: deleteLabels
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
        account: this.contractAccount,
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
  /**
   * ============================ DEPLOY CONTRACT ================
   */

  /**
   * GetWasmAbi
   * @param {accountName} contractName
   * @returns
   */
  async getWasmAbi (contractName) {
    const codePath = join(__dirname, `../compiled/${contractName}.wasm`)
    const abiPath = join(__dirname, `../compiled/${contractName}.abi`)

    const code = new Promise(resolve => {
      fs.readFile(codePath, (_, r) => resolve(r))
    })
    const abi = new Promise(resolve => {
      fs.readFile(abiPath, (_, r) => resolve(r))
    })

    return Promise.all([code, abi]).then(([code, abi]) => ({ code, abi }))
  }

  /**
   * Set Code
   * @returns
   */
  async setCode ({ account, code, vmtype, vmversion }, { authorization }) {
    const wasmHexString = code.toString('hex')
    // let [actor, permission] = authorization.split('@')

    const actions = [{
      account: 'eosio',
      name: 'setcode',
      // authorization: [{
      //   actor,
      //   permission
      // }],
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

    // let [actor, permission] = authorization.split('@')

    const actions = [
      {
        account: 'eosio',
        name: 'setabi',
        // authorization: [{
        //   actor,
        //   permission
        // }],
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
  async deployContract () {
    const { code: wasm, abi } = await this.getWasmAbi(this.contractAccount)

    await this.setCode({
      account: this.contractAccount,
      code: wasm,
      vmtype: 0,
      vmversion: 0
    }, {
      authorization: `${this.contractAccount}@active`
    })

    await this.setAbi({
      account: this.contractAccount,
      abi: JSON.parse(abi)
    }, {
      authorization: `${this.contractAccount}@active`
    })
  }
}

export default DocumentsApi
