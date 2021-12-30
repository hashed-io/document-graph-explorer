/* eslint-disable no-undef */
import BaseEosApi from './BaseEosApi'
import { Contracts } from '~/const/Contracts.js'
import eosjsAccountName from 'eosjs-account-name'
import { Serialize } from 'eosjs'

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
   * @param {accountName, account} param0
   * @returns
   */
  async InitDao ({ accountName, account }) {
    var authorization = `${account}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [{
      authorization: [{
        actor,
        permission
      }],
      account: account,
      name: 'initdao',
      data: {
        creator: accountName
      }
    }]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param {daoId, tokenContract[token name], token [token symbol e.g EOS]} param0
   * @returns
   */
  async addToken ({ daoId, tokenContract, Token }) {
    const actions = [{
      account: Contracts.CONTRACT_DAO,
      name: 'addtoken',
      data: {
        dao_id: daoId,
        token_contract: tokenContract,
        token: Token
      }
    }]
    return this.signTransaction(actions)
  }
  /**
   *
   * @param { daoName(input user) , creatorName(current account), ipfsString(content Id)}
   * @returns
   */
  async CreateDao ({ dao, creator, ipfs, accountName }) {
    // basic is to know if the registry was full or not
    //  make actions
    var authorization = `${dao}@active`
    let [actor, permission] = authorization.split('@')
    const actions = [
      {
        authorization: [{
          actor,
          permission
        }],
        account: Contracts.CONTRACT_DAO,
        name: 'create',
        data: {
          dao: dao,
          creator: creator,
          ipfs: ipfs
        }
      }
    ]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param {dao_id, attributes [string]}
   * @returns
   */
  async deleteAttributes ({ daoId, Attributes }) {
    const actions = [{
      account: Contracts.CONTRACT_DAO,
      name: 'delattrs',
      data: {
        dao_id: daoId,
        attributes: Attributes
      }
    }]
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param {key [account name], value [variant Value], description [string]} param0
   * @returns
   */
  async setParams ({ Key, Value, Description }) {
    const actions = [{
      account: Contracts.CONTRACT_DAO,
      name: 'setparam',
      data: {
        key: Key,
        value: Value,
        description: Description
      }
    }]
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param { daoName(input user) , creatorName(current account), ipfsString(content Id)}
   * @returns
   */
  async updateDaoData ({ daoId, ipfs, accountName }) {
    const actions = [{
      account: Contracts.CONTRACT_DAO,
      name: 'update',
      data: {
        dao_id: daoId,
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

  async getDao ({ limit, accountName, nextKey, search, customOffset }) {
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

  async getAllDaos ({ limit, nextKey }) {
    // let end = (BigInt(eosjsAccountName.nameToUint64(accountName)) * BigInt(2 ** 64) + BigInt('18446744073709551615')).toString()
    const rounds = await this._getTableRows({
      scope: Contracts.CONTRACT_DAO,
      lowerBound: nextKey,
      limit,
      table: 'daos'
    })
    return rounds
  }
  /**
   *
   * Variant `['tipo del dato variant', aquí el valor del variant]`
   * @param {daoID [The number to identify the dao], attribue [pair Variant]}
   * @returns signature
   */
  async upserattributes ({ daoId, Attributes }) {
    const actions = [{
      account: Contracts.CONTRACT_DAO,
      name: 'upsertattrs',
      data: {
        dao_id: daoId,
        attributes: Attributes
      }
    }]
    console.log('Actions', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   *
   * @param {*} param0
   * @returns signature
   */

  /**
   * ============================ DEPLOY CONTRACT ================
   */
  async deployContract ({ accountName }) {
    // Deploy Contract
    var { code, abi } = await this.getWasmAbi(accountName)
    var authorization = `${accountName}@active`
    // Set Code
    // vmtype = {}
    // vmversion = 0
    // const wasmHexString = code.toString('hex')
    const wasmHexString = this.buf2hex(code)
    let [actor, permission] = authorization.split('@')
    // Set ABI
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

    //  make actions
    const actions = [
      {
        account: 'eosio',
        name: 'setcode',
        authorization: [{
          actor,
          permission
        }],
        data: {
          account: accountName,
          code: wasmHexString,
          vmtype: 0,
          vmversion: 0
        }
      },
      {
        account: 'eosio',
        name: 'setabi',
        authorization: [{
          actor,
          permission
        }],
        data: {
          account: accountName,
          abi: serializedAbiHexString
        }
      }
    ]
    console.log('actions: ', actions)
    return this.eosApi.signTransaction(actions)
  }
  /**
   * GetWasmAbi
   * @param {accountName} contractName
   * @returns
   */
  async getWasmAbi () {
    // const codePath = join(__dirname, `../compiled/${contractName}.wasm`)
    // const abiPath = join(__dirname, `../compiled/${contractName}.abi`)
    // const codePath = Contracts.CODE_CONTRACT_URL
    // const abiPath = Contracts.ABI_CONTRACT_URL
    const codePath = `${window.location.origin}/statics/contracts/daoinf.wasm`
    const abiPath = `${window.location.origin}/statics/contracts/daoinf.abi`
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
    console.log('ACTIONS setCode : ', actions)
    // const res = await this.eosApi.signTransaction(actions)
    // return res
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

    return res
  }

  /**
   * Deploy contract
   */
  async _deployContract ({ accountName }) {
    console.log('deployContract', accountName)
    // const { abi } = await this.getWasmAbi(accountName)
    const { code: wasm, abi } = await this.getWasmAbi(accountName)
    // const { code: wasm } = await this.getWasmAbi(accountName)

    await this.setCode({
      account: accountName,
      code: wasm,
      vmtype: 0,
      vmversion: 0
    }, {
      authorization: `${accountName}@active`
    })

    await this.setAbi({
      account: accountName,
      abi: abi
    }, {
      authorization: `${accountName}@active`
    })
  }
}

export default DaoApi
