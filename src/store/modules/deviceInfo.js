
import { DEVICE_SET_INFO } from '../mutation-types'
const state = {
  deviceInfo: {}
}

// getters
const getters = {
  deviceInfo: (state) => {
    return state.deviceInfo
  }
}

// mutations
const mutations = {
  [DEVICE_SET_INFO] (state, deviceInfo) {
    state.deviceInfo = deviceInfo
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
