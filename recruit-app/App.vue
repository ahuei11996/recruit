<script>
// 引入检查更新模块
import { checkUpdater } from '@/common/checkUpdater'

// #ifdef APP-PLUS
const dom = weex.requireModule('dom')
dom.addRule('fontFace', {
  'fontFamily': 'iconfont',
  'src': "url('https://at.alicdn.com/t/font_2286676_3wcotq3bm4k.ttf')"
})
// #endif

export default {
  globalData: {
  //  定义公共变量  text: 'text'
  },
  onLaunch: function() {
    console.log('App Launch')
    // #ifdef APP-PLUS

    // 自动检查更新包
    this.autoCheckUpdate()

    // 检测clientId 并发送到服务端
    this.getClientId()

    // 处理推送消息
    this.handlePush()

    //  #endif
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  },
  methods: {

    // 自动检测升级版
    autoCheckUpdate() {
      // ----- 检查更新开始 ------
      const SystemInfo = uni.getSystemInfoSync()
      let device
      switch (SystemInfo.platform) {
        case 'android':
          device = 2
          break
        case 'ios':
          device = 1
          break
        default:
          device = 0
          break
      }

      uni.setStorage('device', device)

      const updated = uni.getStorageSync('updated') // 尝试读取storage
      if (updated) {
        if (updated.completed === true) { // 如果上次刚更新过
          // 删除安装包及安装记录
          uni.removeStorageSync('updated')
          console.log('安装记录被删除，更新成功')
          if (updated.packgePath) {
            uni.removeSavedFile({
              filePath: updated.packgePath,
              success: (res) => {}
            })
          }
        } else {
          uni.removeStorageSync('updated')

          if (device === 2) {
            uni.setStorage({
              key: 'updated',
              data: {
                completed: true,
                packgePath: updated.packgePath
              },
              success: (res) => {
                console.log('成功安装上次的更新，应用需要重启才能继续完成')
                plus.runtime.restart()
              }
            })
          }
        }
      } else {
        // 检查更新，参数：{ 当前版本号，跳转到更新页面的url }
        checkUpdater(this.updateUrl, '/pages/update/index')
      }

      // ----- 检查更新结束 ------
    },

    // 获取并发送clientId
    getClientId() {
      if (!uni.getStorageSync('clientId')) {
        let pinf; const device = uni.getStorageSync('device')
        const setTime = setInterval(() => {
          pinf = plus.push.getClientInfo()
          if (pinf.clientid) {
            clearInterval(setTime)
            uni.setStorageSync('clientId', pinf.clientid)
            this.util.request(this.api.client, {
              id: pinf.clientid,
              device: device
            })
              .then((res) => {
                if (res.code != 1) {
                  if (!pinf.clientid) {
                    uni.removeStorageSync('clientId')
                    this.getClient()
                  }
                }
              })
          }
        }, 3000)
      }
    },

    // 处理推送消息
    handlePush() {
      plus.push.setAutoNotification(true)
      // 收到透传消息
      // 只有APP在线时，才会触发receive事件，透传消息不会触发系统消息,需要创建本地消息
      plus.push.addEventListener('receive', (msg) => {
        const client = uni.getSystemInfoSync().platform
        // console.log('(receive):' + JSON.stringify(msg))
        if (client == 'ios') { // 如果是IOS
          const payload = msg.payload
          // 【APP离线】收到消息，但没有提醒（发生在一次收到多个离线消息时，只有一个有提醒，但其他的没有提醒）
          // 【APP在线】收到消息，不会触发系统消息,需要创建本地消息，但不能重复创建。必须加msg.type验证去除死循环
          if (msg.aps == null && msg.type == 'receive') {
            const messageTitle = payload.messageTitle
            const messageContent = payload.messageContent
            // 创建本地消息,发送的本地消息也会被receive方法接收到，但没有type属性，且aps是null
            plus.push.createMessage(messageContent, JSON.stringify(payload), { title: messageTitle })
          }
          // else{
          //  let payload = JSON.parse(msg.payload);
          //  plus.push.createMessage(payload.messageContent, JSON.stringify(payload.payload), {title: payload.messageTitle});
          // }
        } else if (client == 'android') {
          console.log(msg)
          // 如果是Android，当APP在线时，收到透传消息不会进入系统消息，需要发送本地提醒。
          const payload = JSON.parse(msg.content)
          console.log(payload)
          const messageTitle = payload.messageTitle
          const messageContent = payload.messageContent
          plus.push.createMessage(messageContent, JSON.stringify(msg.payload), { title: messageTitle })
          plus.runtime.setBadgeNumber(0)
        }
      }, false)

      // 消息点击事件
      // 【APP在线】，收到透传消息通过，不会提醒至通知栏目，需要发送本地消息，再进行点击触发的点击事件。
      // 【APP离线】，收到离线透传消息，必须通过Java后台的Intent字符串携带payload，且符合格式才能触发click事件，格式不符合不会触发

      plus.push.addEventListener('click', (msg) => {
        const client = uni.getSystemInfoSync().platform
        console.log('(click):' + JSON.stringify(msg))
        if (client == 'ios') { // 如果是IOS
          let payload
          if (msg.type == 'click') { // APP离线点击包含click属性，这时payload是JSON对象
            payload = msg.payload
          } else { // APP在线，收到消息不会包含type属性,这时的payload是JSON字符串，需要转为JSON对象
            payload = JSON.parse(msg.payload)
          }
          if (payload != null || payload != undefined) {
            console.log('payload:' + payload)
            // _self.callback(payload+"");
            this.setUniPush_state('1')
            this.setUniPush_url(payload)
          }
        } else if (client == 'android') { // 如果是Android，收到playload均是是JSON字符串，需要转为JSON对象
          const payload = JSON.parse(msg.payload)
          console.log('msg.payload:' + msg.payload)
          if (payload != null || payload != undefined) {
            console.log('payload:' + payload)
            // _self.callback(payload+"");
            this.setUniPush_state('1')
            this.setUniPush_url(payload)
            uni.reLaunch({
              url: '/detail/agreement/system'
            })
          }
        }
      }, false)
    },

    // plus click 操作开始
    setUniPush_state(num) {
      // 处理角标
      // console.log('setUniPush_state:' + num)
    },
    setUniPush_url(data) {
      // 更加发送过来的json数据，进行处理
      // console.log(data)

      // 链接跳转
      // uni.reLaunch({
      //   url: '/detail/agreement/system'
      // })
    }
    // plus click 操作结束
  }
}
</script>

<style lang='scss'>
/*  #ifndef  APP-PLUS-NVUE	*/
/*引入uview-ui样式 必须设置为 'lang='scss'*/
/* @import "uview-ui/index.scss"; */
@import "common/main.scss";
@import "common/iconfont.scss";

/*  #endif  */

@import "common/global.css";
/* #ifdef APP-PLUS-NVUE */
.iconfont{
  font-family: iconfont;
}
/* #endif */
</style>
