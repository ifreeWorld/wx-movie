
import { USER_SET_INFO } from '../mutation-types'
const state = {
  userInfo: {}
}

// getters
const getters = {
  userInfo: (state) => {
    return state.userInfo
  }
}

// mutations
const mutations = {
  [USER_SET_INFO] (state, userInfo) {
    state.userInfo = {
      ...state.userInfo,
      ...userInfo
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
