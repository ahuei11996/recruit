import Vue from 'vue'
import Vuex from 'vuex'
// import util from '@/common/util'

const util = require('@/common/util')

Vue.use(Vuex)

const userInfo = {
  name: '请登录',
  headimg: util.getImage('/touxianga.png')
}

const store = new Vuex.Store({
  state: {
    hasLogin: uni.getStorageSync('hasLogin') ? uni.getStorageSync('hasLogin') : false,
    userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : userInfo,
    token: uni.getStorageSync('token') ? uni.getStorageSync('token') : false
  },
  mutations: {
    login(state, provider) {
      provider.headimg = provider.headimg ? provider.headimg : userInfo.headimg
      state.hasLogin = true
      state.userInfo = provider
      state.token = provider.token
      console.log(provider)
      // 缓存用户登陆状态
      uni.setStorage({
            key:'userInfo',
            data: provider
      })
      uni.setStorage({
        key: 'token',
        data: provider.token
      })
      uni.setStorage({
        key: 'hasLogin',
        data: true
      })
    },
    logout(state) {
      state.hasLogin = false
      state.userInfo = userInfo
      state.token = false
      uni.removeStorage({
        key: 'userInfo'
      })
      uni.removeStorage({
        key: 'token'
      })
      uni.removeStorage({
        key: 'hasLogin'
      })
    },
	updateUserInfo(state, provider){
		provider.headimg = provider.headimg ? provider.headimg : userInfo.headimg
		state.userInfo = provider
		uni.setStorage({
		      key:'userInfo',
		      data: provider
		})
	}
  },
  actions: {

  }
})

export default store
