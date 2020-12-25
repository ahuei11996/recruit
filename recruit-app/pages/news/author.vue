<template>
  <view class="container">
    <view class="top">
      <image class="top-back-image" mode="aspectFill" src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg" />
      <view class="top-back-mask" />
    </view>
    <view class="content">
      <view class="padding-right padding-left padding-top padding-bottom-lg info-back">
        <view class="flex-row author-headimg">
          <image mode="aspectFill" class="author-headimg-image" src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg" />
          <button class="basics-button author-info-follor" type="primary">
            <text class="text-df text-white">+ 关注</text>
          </button>
        </view>

        <text class="text-xxl margin-top-lg">网新社</text>
        <view>
          <text class="iconfont text-gray">&#xe63e;</text>
          <text class="text-df">给你带来专业评车</text>
          <text class="iconfont text-gray">&#xe63d;</text>
        </view>
        <view class="flex-row margin-top-xs" style="align-items: center">
          <text class="margin-right-sm text-black text-lg">27</text>
          <text class="margin-right-sm text-gray text-sm">粉丝</text>
          <text class="margin-right-sm text-black text-lg">89</text>
          <text class="text-gray text-sm">作品</text>
        </view>
      </view>
      <view class="padding info-back margin-top-lg">
        <view class="flex-row" style="align-items: center">
          <view class="margin-right-sm" stlye="flex: 0;">

            <image style="width: 88rpx; height: 88rpx; border-radius: 10rpx;" src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg" />
          </view>
          <view style="flex:1;">
            <view class="flex-row" style="align-items: center">
              <text class="text-lg">聊车一分钟</text>
              <text class="text-xs margin-left-sm" style="width: 52rpx; height: 28rpx; line-height: 28rpx; color: #ffffff; text-align: center; border-radius: 8rpx; background-color: #019bff">视频</text>
            </view>
            <view class="margin-top-xs flex-row" style="justify-content: space-between; width: 100%;">
              <text class="text-sm text-gray">这里有最全的新车资讯</text>
              <text class="iconfont text-sm text-gray">&#xe699;</text>
            </view>
          </view>
        </view>
      </view>
      <!--      <view class="flex-row nav-body" :style="{top:navTop + 'px'}">-->
      <view id="nav" class="flex-row nav-body margin-top-lg" :style="{top: navTop + 'px'}">
        <button class="basics-button nav-button" plain @click="navIndex = 0">
          <text :class="navIndex == 0 ?'text-xl text-black text-bold' : 'text-df text-gray'">全部</text>
        </button>
        <button class="basics-button nav-button" plain @click="navIndex = 1">
          <text :class="navIndex == 1 ?'text-xl text-black text-bold' : 'text-df text-gray'">文章</text>
        </button>
        <button class="basics-button nav-button" plain @click="navIndex = 2">
          <text :class="navIndex == 2 ?'text-xl text-black text-bold' : 'text-df text-gray'">视频</text>
        </button>
      </view>
      <view :style="{'min-height': listHeight + 'px'}">
        <view class="padding-top padding-bottom cell-list">
          <view class="news-list-double padding-top padding-bottom">
            <view class="list-title text-lg text-overflow-two">
              lajsldjflasjflajslfjalsflsdjfljsalfjsaljfalsjsdfasdfasffajsldjflasjflajslfjalsflsdjfljsalfjsaljfalsjsdfasdfasff
            </view>
            <view class="flex-row list-double-image margin-top">
              <image class="list-image-body" src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg" />
              <image class="list-image-body" src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg" />
              <image class="list-image-body" src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg" />
            </view>
          </view>
          <view class="flex-row margin-top sub-title">
            <text class="text-sm text-gray">网新社</text>
            <text class="text-sm text-gray">12-13</text>
          </view>
        </view>
        <view class="padding-top padding-bottom cell-list">
          <view class="flex-row news-list-single" style="width: 100%;">
            <view class="list-single-title text-lg text-overflow-two">
              lajsldjflasjflajslfjalsflsdjfljsalfjsaljfalsjsdfasdfasffajsldjflasjflajslfjalsflsdjfljsalfjsaljfalsjsdfasdfasff
            </view>
            <view class="list-single-image">
              <image
                class="list-image-body"
                src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg"
              />
            </view>
          </view>
          <view class="flex-row margin-top sub-title">
            <text class="text-sm text-gray">网新社</text>
            <text class="text-sm text-gray">12-13</text>
          </view>
        </view><view class="padding-top padding-bottom cell-list">
          <view class="flex-row news-list-single" style="width: 100%;">
            <view class="list-single-title text-lg text-overflow-two">
              lajsldjflasjflajslfjalsflsdjfljsalfjsaljfalsjsdfasdfasffajsldjflasjflajslfjalsflsdjfljsalfjsaljfalsjsdfasdfasff
            </view>
            <view class="list-single-image">
              <image
                class="list-image-body"
                src="https://media.hainanplus.cn/editimage/20201210/9894de3746035f343ecd0fff32384338.jpg"
              />
            </view>
          </view>
          <view class="flex-row margin-top sub-title">
            <text class="text-sm text-gray">网新社</text>
            <text class="text-sm text-gray">12-13</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Author',
  data() {
    return {
      navIndex: 0,
      navTop: 0,
      listHeight: 0,
    }
  },
  mounted() {
    const systemInfo = uni.getSystemInfoSync()

    // #ifdef APP-PLUS
    this.navTop = systemInfo.statusBarHeight + 44
    // #endif

    // console.log(systemInfo)

    const navQuery = uni.createSelectorQuery().select('#nav')
    navQuery.fields({
      size: true
    }, (res) => {
      // #ifdef APP-PLUS
      this.listHeight = systemInfo.windowHeight - systemInfo.statusBarHeight - 44 - res.height
    //  #endif

      // #ifndef APP-PLUS
      console.log(systemInfo)
      this.listHeight = systemInfo.windowHeight - res.height
    //  #endif
    }).exec()

    // #ifdef APP-PLUS
    const domModule = weex.requireModule('dom')
    domModule.addRule('fontFace', {
      'fontFamily': 'iconfont',
      'src': "url('https://at.alicdn.com/t/font_2245848_qsw4mqs4tw.ttf')"
    })
    // #endif
  }
}
</script>

<style scoped>

.iconfont {
  font-family: iconfont;
}

.basics-button {
  border-width: 0;
}

.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.content {
  position: relative;
  padding-left: 36rpx;
  padding-right: 36rpx;
  margin-top: -125rpx;
}

.info-back {
  /*height: 456rpx;*/
  width: 678rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow:0 0 22rpx 10rpx rgba(11, 11, 11,0.11)
}

.top {
  position: relative;
  width: 750rpx;
  height: 372rpx;
  z-index: -1;
}

.top-back-image {
  width: 750rpx;
  height: 372rpx;
}

.top-back-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 750rpx;
  height: 372rpx;
  background-image: linear-gradient(to top,rgba(0,0,0,0.86), rgba(0,0,0,0.28));
  opacity: 0.46;
}

.author-headimg {
  margin-top: -90rpx;
  height: 158rpx;
  position: relative;
  flex-direction: row-reverse;
  align-items: flex-end;
}

.author-headimg-image {
  position: absolute;
  bottom: 0;
  left:0;
  width: 158rpx;
  height: 158rpx;
  border-radius: 158rpx;
}

.author-info-follor {
  width: 128rpx;
  height: 68rpx;
  border-radius: 10rpx;
}

.nav-body {
  position: sticky;
  /*top: 200px;*/
  align-items: flex-end;
  background-color: #ffffff;
  width: 750rpx;
  height: 50px;
  padding-left: 36rpx;
  padding-right: 36rpx;
  margin-left: -36rpx;
  padding-bottom: 20rpx;
  z-index: 1;
}

.news-list-single {

}

.list-single-title {
  /*width: 100%;*/
  flex-grow: 1;
}

.list-single-image {
  flex-shrink: 0;
  margin-left: 72rpx;
  height: 166rpx;
}

.list-double-image {
  justify-content: space-between;
  border-radius: 10rpx;
  overflow: hidden;
}

.list-image-body {
  width: 220rpx;
  height: 166rpx;
}

.sub-title {
  justify-content: space-between;
  align-items: center;
}

.cell-list {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #dedede;
}

.nav-button {
  margin-left: 20rpx;
}

.nav-button:first-child{
  margin-left: 0;
}
</style>
