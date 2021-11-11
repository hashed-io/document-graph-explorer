import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './accounts'
import dao from './DAO'
import documents from './documents'
import documentsGeneral from './documentsGeneral'
import transfers from './transfers'
import general from './general'
import apollo from './apollo'
import documentGraph from './documentGraph'

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
      dao,
      documents,
      documentsGeneral,
      general,
      apollo,
      documentGraph
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
