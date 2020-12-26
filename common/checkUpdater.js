export function checkUpdater(url, updaterPage) {
  uni.request({
    url: url + '?t=' + (new Date()).valueOf(),
    success: res => {
      if (res.statusCode === 200) {
        const data = res.data.app.info
        uni.setStorage({
          key: 'check',
          data: data.check
        })
        if (plus.os.name.toLowerCase() === 'android' && data.androidLink.match(RegExp(/.apk/))) {
          if (data.version != plus.runtime.version) {
            return uni.reLaunch({ url: updaterPage + '?force=true' })
          }
        } else {
          plus.runtime.getProperty(plus.runtime.appid, function(wgtinfo) {
            if (data.version != wgtinfo.version) {
              uni.reLaunch({
                url: updaterPage + '?force=true'
              })
            }
          })
        }
      }
    }
  })
}
