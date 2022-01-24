import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './accounts'
import transfers from './transfers'
import general from './general'
import documentGraph from './documentGraph'
import elasticSearch from './elasticSearch'

Vue.use(Vuex)
Vue.config.devtools = true
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      accounts,
      transfers,
      general,
      documentGraph,
      elasticSearch
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
