import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import deviceInfo from './modules/deviceInfo'
import city from './modules/city'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    userInfo,
    deviceInfo,
    city
  },
  strict: true
})
