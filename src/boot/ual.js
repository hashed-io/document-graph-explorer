import { UAL } from 'universal-authenticator-library'
import { Scatter } from 'ual-scatter'
import { Anchor } from 'ual-anchor'
import { Sqrl } from '@smontero/ual-sqrl'

export default async ({ Vue, store }) => {
  const mainChain = {
    chainId: process.env.NETWORK_CHAIN_ID,
    rpcEndpoints: [{
      protocol: process.env.NETWORK_PROTOCOL,
      host: process.env.NETWORK_HOST,
      port: process.env.NETWORK_PORT
    }]
  }
  const authenticators = [
    // new EOSIOAuth([mainChain], { appName: process.env.APP_NAME, protocol: 'eosio' }),
    new Sqrl([mainChain], { appName: process.env.APP_NAME }),
    // new KeycatAuthenticator([mainChain]),
    // new Ledger([mainChain]),
    // new Lynx([mainChain]),
    new Scatter([mainChain], { appName: process.env.APP_NAME }),
    // new TokenPocket([mainChain]),
    new Anchor([mainChain], { appName: process.env.APP_NAME })
    // new Metamask([mainChain], { appName: process.env.APP_NAME })
  ]

  const ual = new UAL([mainChain], 'DAO-LLC', authenticators)
  store['$ual'] = ual
  Vue.prototype.$ual = ual
}
