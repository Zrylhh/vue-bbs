import Vue from 'vue'
import Vuex from 'vuex'

import ThemeListStore from './ThemeListStore'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
//    slogan: '叩首为梦 码梦为生！',
    historyLength: 0
  },
  mutations: {
    /*
     * @desc 记录路由切换次数
     * @arg {object} state 状态
     */
    updateHistoryLength (state) {
      state.historyLength++
    }
  },
  actions: {
    updateHistoryLength ({commit}) {
      commit('updateHistoryLength')
    }
  },
  modules: {
	ThemeListStore
  }
})