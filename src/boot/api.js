import { Api, JsonRpc } from 'eosjs'
import { ApolloApi, ActionsApi, ElasticSearchApi } from '~/services'
const signTransaction = async function (actions) {
  actions.forEach(action => {
    if (!action.authorization || !action.authorization.length) {
      action.authorization = [{
        actor: this.state.accounts.account,
        permission: 'active'
      }]
    }
  })
  let transaction = null
  try {
    if (this.$type === 'ual') {
      transaction = await this.$ualUser.signTransaction({
        actions
      }, {
        blocksBehind: 3,
        expireSeconds: 30
      })
    }
  } catch (e) {
    console.log(actions, e.cause.message)
    // this.$sentry.captureException(e)
    throw new Error(e.cause.message)
  }
  return transaction
}

const getTableRows = async function (options) {
  if (this.$type === 'ual') {
    return this.$ualUser.rpc.get_table_rows({
      json: true,
      ...options
    })
  } else {
    return this.$defaultApi.rpc.get_table_rows({
      json: true,
      ...options
    })
  }
}

export default ({ store }) => {
  const rpc = new JsonRpc(`${process.env.NETWORK_PROTOCOL}://${process.env.NETWORK_HOST}:${process.env.NETWORK_PORT}`)
  const mEosApi = new Api({ rpc, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })
  store['$defaultApi'] = mEosApi
  const apollo = store.$apollo

  const api = {
    signTransaction: signTransaction.bind(store),
    getTableRows: getTableRows.bind(store)
  }

  const apolloApi = new ApolloApi({
    eosApi: api,
    apollo
  })
  const actionsApi = new ActionsApi({
    eosApi: api,
    mEosApi
  })

  const elasticSearchApi = new ElasticSearchApi()

  store['$api'] = api
  store['$apiMethods'] = api
  store['$apolloApi'] = apolloApi
  store['$actionsApi'] = actionsApi
  store['$elasticSearchApi'] = elasticSearchApi
}
