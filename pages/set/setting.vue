<!--
 维护人：杨振宇
 时间：2020年12月06日
 更新时间：
-->
<template>
  <view>
    <!--    <headerBar style="letter-spacing: 4rpx;" title="设置" textAlign="center" />-->
    <view class="setting">
      <view v-for="(item,index) in settingType" :key="index" class="settingType">
        <view class="setTitle" :class="item.class">{{ item.name }}</view>
        <view v-for="(val,key) in item.content" :key="key">
          <view v-if="val.show" class="navigate-btn" :class="val.class" @click="toSetPage(val.url)">
            <view class="user-msg">
              <text class="info">{{ val.msg }}</text>
              <text class="text">{{ val.text }}</text>
            </view>
            <view style="display: flex;align-items: center;">
              <text v-if="val.versionShow" style="font-size: 26rpx; color: #979797;margin-right: 4rpx;">{{ val.version }}</text>
              <text class="iconfont icon-fanhui" />
            </view>
          </view>
          <view v-else-if="val.showBtn" class="navigate-btn" :class="val.class" @click="sysMessage">
            <view class="user-msg">
              <text class="info">{{ val.msg }}</text>
              <text class="text">{{ val.text }}</text>
            </view>
            <button class="openBtn">
              <u-switch v-model="checked" />
            </button>
          </view>
          <view v-else class="navigate-btn" @click="clearCache">
            <view class="user-msg">
              <text class="info" :style="{'color':isClear ? '#999999' : '#0785E7' }">清除缓存 ({{ xxx }})</text>
            </view>
          </view>
        </view>
      </view>
      <view class="exitLogin" @click="loginOut">
        <button>退出登录</button>
      </view>
    </view>
  </view>
</template>
<script>
import USwitch from '../../uview-ui/components/u-switch/u-switch'
import { url } from '../../common/test'
export default {
  name: 'Setting',
  components: { USwitch },
  data() {
    return {
      moduleKey: 0,
      checked: false,
      isLogin: false,
      isClear: false,
      xxx: '',
      url: '/pages/set/',
      settingType: [
        { name: '账户设置', content: [
          { msg: '个人信息', text: '头像，昵称，出生年月', data: 0, url: '/pages/set/userInfoSet', class: 'border-bottom', show: true },
          { msg: '账号安全', text: '修改密码， 绑定手机， 社交账号', data: 0, url: '/pages/set/accountSet', show: true }
        ] },
        { name: '支付设置', content: [
          { msg: '支付设置', text: '', data: 0, url: '/pages/set/paySet', show: true }
        ] },
        { name: '系统设置', content: [
          { msg: '', text: '', data: 0, url: '', class: 'border-bottom', show: false, showBtn: true },
          // { msg: '零流量升级', text: '开启后，wifi下会自动下载新版本安装包', data: 0, url: '', class: 'border-bottom', show: false, showSwitch: true },
          // 清除缓存
          { msg: '清除缓存', text: '', data: 0, url: '', show: false, name: 'clear' }
        ] },
        { name: '', class: 'padding', content: [
          { msg: '关于海南plus', text: '', data: 0, url: '/pages/update/index', version: '版本1.0.0.1', show: true, versionShow: true }
        ] }
      ]
      // userSetting: [
      //   { msg: '个人信息', text: '头像，昵称，出生年月', data: 0, url: '', class: 'border-bottom' },
      //   { msg: '账号安全', text: '修改密码， 绑定手机， 社交账号', data: 0, url: '' }
      // ]
    }
  },
  onShow() {
    // 监听页面是否开启消息通知
    if (!this.noticeChecked()) {
      this.checked = false
      this.settingType[2].content[0].msg = '您已经关闭新消息通知'
      this.settingType[2].content[0].text = '可能会错过订单信息，优惠活动等'
    } else {
      this.checked = true
      this.settingType[2].content[0].msg = '您已经开启新消息通知'
      this.settingType[2].content[0].text = ''
    }
  },
  mounted() {
    // 监听页面是否开启消息通知
    if (!this.noticeChecked()) {
      uni.showModal({
        title: '提示',
        content: '是否开启APP通知权限，开启后您便能及时收到关于平台的最新通知消息',
        success: (res) => {
          // 点击确定后打开手机系统通知设置
          if (res.confirm) {
            this.sysMessage()
          }
        }
      })
    }
    // 获取并计算缓存大小
    this.getCacheSize()
  },
  methods: {
    // 清除缓存提示
    clearCache() {
      // 使用plus.cache.calculate 获取应用的缓存大小，
      var self = this
      // 可以询问用户是否删除
      uni.showModal({
        title: '提示',
        content: '将清除' + self.xxx + '缓存的图片和系统预填信息',
        success(res) {
          // 用户确定要删除
          if (res.confirm) {
            // 使用plus.cache.clear 清除应用中的缓存数据 这里清除后还要二十几KB没有清除，达不到全部清除
            plus.cache.clear(() => {
              uni.showToast({
                title: '清除成功',
                icon: 'success',
                success: () => {
                  // self.getCacheSize()
                  self.xxx = '0B'
                  self.isClear = true
                  // self.moduleKey++
                }
              })
            })
          }
        }
      })
    },

    // 获取并计算缓存大小
    getCacheSize() {
      // 使用plus.cache.calculate 获取应用的缓存大小，
      // var self = this
      plus.cache.calculate((size) => { // size是多少个字节单位是b
      // 你可以做下面相应的处理
        if (size < 1024) {
          this.xxx = size + 'B'
        } else if (size / 1024 >= 1 && size / 1024 / 1024 < 1) {
          this.xxx = Math.floor(size / 1024 * 100) / 100 + 'KB'
        } else if (size / 1024 / 1024 >= 1) {
          this.xxx = Math.floor(size / 1024 / 1024 * 100) / 100 + 'M'
        }
      })
    },

    // 打开系统通知
    sysMessage() {
      if (this.util.getSystemInfo().platform == 'ios') {
        const UIApplication = plus.ios.import('UIApplication')
        const app = UIApplication.sharedApplication()
        let enabledTypes = 0
        if (app.currentUserNotificationSettings) {
          const settings = app.currentUserNotificationSettings()
          enabledTypes = settings.plusGetAttribute('types')
          console.log('enabledTypes1:' + enabledTypes)
          var NSURL2 = plus.ios.import('NSURL')
          var setting2 = NSURL2.URLWithString('app-settings:')
          var application2 = UIApplication.sharedApplication()
          application2.openURL(setting2)
          plus.ios.deleteObject(setting2)
          plus.ios.deleteObject(NSURL2)
          plus.ios.deleteObject(application2)
          plus.ios.deleteObject(settings)
        } else {
          console.log(1)
          enabledTypes = app.enabledRemoteNotificationTypes()
          if (enabledTypes == 0) {
            console.log('推送未开启!')
          } else {
            console.log('已经开启推送功能!')
          }
          console.log('enabledTypes2:' + enabledTypes)
        }
        plus.ios.deleteObject(app)
      } else if (this.util.getSystemInfo().platform == 'android') {
        const main = plus.android.runtimeMainActivity()
        const pkName = main.getPackageName()
        const uid = main.getApplicationInfo().plusGetAttribute('uid')
        const Intent = plus.android.importClass('android.content.Intent')
        const Build = plus.android.importClass('android.os.Build')
        const intent = new Intent('android.settings.APP_NOTIFICATION_SETTINGS')

        if (Build.VERSION.SDK_INT >= 26) { // android 8.0引导
          intent.putExtra('android.provider.extra.APP_PACKAGE', pkName)
        } else if (Build.VERSION.SDK_INT >= 21) { // android 5.0-7.0
          intent.putExtra('app_package', pkName)
          intent.putExtra('app_uid', uid)
        } else { // (<21)其他--跳转到该应用管理的详情页
          intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
          const uri = Uri.fromParts('package', mainActivity.getPackageName(), null)
          intent.setData(uri)
        }
        // 跳转到该应用的系统通知设置页
        main.startActivity(intent)
      }
    },
    // 系统通知权限开启检测
    noticeChecked() {
      if (this.util.getSystemInfo().platform == 'ios') {
        const UIApplication = plus.ios.import('UIApplication')
        const app = UIApplication.sharedApplication()
        let enabledTypes = 0
        if (app.currentUserNotificationSettings) {
          const settings = app.currentUserNotificationSettings()
          enabledTypes = settings.plusGetAttribute('types')
          return enabledTypes != 0
        } else {
          enabledTypes = app.enabledRemoteNotificationTypes()
          return enabledTypes != 0
        }
        return !app.currentUserNotificationSettings
      } else if (this.util.getSystemInfo().platform == 'android') {
        const main = plus.android.runtimeMainActivity()
        const NotificationManagerCompat = plus.android.importClass('android.support.v4.app.NotificationManagerCompat')
        const areNotificationsEnabled = NotificationManagerCompat.from(main).areNotificationsEnabled()
        return areNotificationsEnabled
      }
    },
    // 退出登录
    loginOut() {
      // uni.removeStorage({
      //   key: 'userInfo'
      // })
      // uni.removeStorage({
      //   key: 'token'
      // })
      this.$store.commit('logout')
      uni.switchTab({
        url: '/pages/user/mine'
      })
    },
    // 跳转至相应设置页面
    toSetPage(page) {
      this.util.navTo(page)
    }
  }

}
</script>

<style scoped>
  /* 设置页面全局背景色和字体 */
  .setting {
    background: #F6F6F6;
    font-family: "Microsoft YaHei";
  }
  .setting {
    padding-bottom: 2rpx;
  }
  .setting .settingType {

  }
  .setting .settingType .setTitle {
    font-size: 24rpx;
    padding: 36rpx 28rpx 16rpx;
    color: #ACACAC;
  }
  .setting .settingType .padding {
    padding: 16rpx 0;
  }
  .setting .settingType .navigate-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 0;
    line-height: 1.5;
    background: #FFFFFF;
    padding: 32rpx;
  }
  .setting .settingType navigator {
    border-radius: 0;
    margin: 0;
  }
  /*.setting .settingType button:after {*/
  /*  border-radius: 0;*/
  /*  width: 0;*/
  /*  height: 0;*/
  /*}*/
  .setting .settingType .user-msg .info {
    font-size: 32rpx;
  }
  .setting .settingType .user-msg .text {
    font-size: 24rpx;
    color: #A0A0A0;
  }
  .setting .settingType .user-msg {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .setting .settingType .navigate-btn .openBtn {
    margin: 0;
    font-size: 28rpx;
    background: #ffffff;
    color: #0785E7;
  }
  .setting .settingType .navigate-btn button:after {
    border: 0;
  }
  /* 图标样式 */
  .icon-fanhui {
    display:block;
    transform: rotate(180deg);
    color: #B9B9B9;
  }
  .iconfont{
    font-size: 30rpx;
  }
  .setting .settingType .navigate-btn.clearCache .info {
    color: #0785E7;
  }
  .setting .exitLogin {
    letter-spacing: 2rpx;
  }
  .setting .exitLogin button {
    background: #0185F2;
    color: #FFFFFF;
    margin: 48rpx 28rpx 44rpx;
  }
  .border-bottom{
    border-bottom: 1px solid #F4F4F4;
  }
</style>
