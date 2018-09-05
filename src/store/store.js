import Vue from 'vue'
import Vuex from 'vuex'
import busPWA from './modules/busPWA/busPWAModule'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    busPWA
  }
})