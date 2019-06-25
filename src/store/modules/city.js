import config from '../../utils/mapConfig'
import {
  CITY_GET_LOCATION,
  CITY_CHANGE_CODE
} from '../mutation-types'

const state = {
  city: '定位中',
  currentCityCode: '',
  defaultCity: ''
}

const getters = {
  city: state => state.city,
  currentCityCode: state => state.currentCityCode,
  defaultCity: state => state.defaultCity
}

const mutations = {
  // 设置当前城市信息
  [CITY_GET_LOCATION] (state, payload) {
    state.city = payload.city
    state.currentCityCode = payload.currentCityCode
    state.defaultCity = payload.city
  },
  [CITY_CHANGE_CODE] (state, payload) {
    state.city = payload.city
    state.currentCityCode = payload.code
    state.defaultCity = state.city
  }
}

const actions = {
  // 获取当前定位 城市 区
  [CITY_GET_LOCATION] ({ commit, dispatch }) {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        let latitude = res.latitude
        let longitude = res.longitude
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${
            config.key
          }`,
          success: res => {
            commit({
              type: CITY_GET_LOCATION,
              city: res.data.result.ad_info.city,
              currentCityCode: res.data.result.ad_info.adcode
            })
          }
        })
      }
    })
  },
  // 更新城市名和城市代码
  [CITY_CHANGE_CODE] ({ commit }, data) {
    commit({
      type: CITY_CHANGE_CODE,
      city: data.city,
      code: data.code
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
