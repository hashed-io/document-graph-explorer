import Vue from 'vue'
import Vuex from 'vuex'

import accounts from './accounts'
import dao from './DAO'
import documents from './documents'
import transfers from './transfers'
import general from './general'

Vue.use(Vuex)

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
      general
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
