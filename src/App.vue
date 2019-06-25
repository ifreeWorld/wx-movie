<template>
  <div>121212</div>
</template>

<script>
import { mapMutations } from 'vuex'
import { DEVICE_SET_INFO, USER_SET_INFO } from './store/mutation-types'
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({ key: 'logs' }).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }

    // 微信小程序处理逻辑
    if (mpvuePlatform === 'wx') {
      this.login()
      this.getSystemInfo()
    }
  },
  methods: {
    ...mapMutations('deviceInfo', {
      setDeviceInfo: DEVICE_SET_INFO
    }),
    ...mapMutations('userInfo', {
      setUserInfo: USER_SET_INFO
    }),
    getSystemInfo () {
      try {
        const res = wx.getSystemInfoSync()
        this.setDeviceInfo(res)
      } catch (e) {
        console.log(e)
      }
    },
    login () {
      wx.login({
        success: res => {
          if (res.code) {
            // code: 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 auth.code2Session，使用 code 换取 openid 和 session_key 等信息
            this.setUserInfo({
              code: res.code
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    },
    log () {
      console.log(`log at:${Date.now()}`)
    }
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
  font-size: 0;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
