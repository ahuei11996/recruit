<!--
 维护人：杨振宇
 时间：2020年12月08日
 更新时间：
-->
<template>
  <view>
<!--    <headerBar style="border-bottom: 1px solid #D1D1D1;letter-spacing: 4rpx;" title="支付设置" text-align="center" />-->
    <view class="paySetting">
      <view v-for="(item, index) in paySetList" :key="index" class="paySettingType">
        <view class="title-text">{{ item.title }}</view>
        <view v-for="(val, key) in item.content" :key="key" @click="toPage(val.url)" class="group">
          <view class="type" :class="val.class">
            <view>
              <text class="iconfont" style="margin-right: 32rpx;" :class="val.icon" />
              <text>{{ val.msg }}</text>
            </view>
            <view style="display: flex;align-items: center;">
              <text style="font-size: 26rpx; color: #979797;margin-right: 4rpx;">{{ val.text }}</text>
              <text class="iconfont icon-fanhui" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'PaySet',
  data() {
    return {
      paySetList: [
        { title: '', content: [
          { msg: '实名认证', text: '未认证', icon: 'icon-meitibaodao', url: '' }
        ] },
        { title: '', content: [
          { msg: '支付密码', text: '去设置', icon: 'icon-meitibaodao', url: '', class: 'border-bottom' },
          { msg: '安全验证手机', text: '去绑定', icon: 'icon-meitibaodao', url: '' }
        ] },
        { title: '', content: [
          { msg: '免密支付/自动扣款', icon: 'icon-meitibaodao', url: '' }
        ] }
      ]
    }
  },
  mounted() {

  },

  methods: {
    toPage(page) {
      this.util.navTo(page)
    }
  }

}
</script>

<style lang="scss" scoped>
  /* 设置页面全局背景色和字体 */
  body, page {
  background: #F1F1F1;
  font-family: "Microsoft YaHei";
  }
  .paySetting {
    .paySettingType {
      .title-text{
        font-size: 24rpx;
        padding: 32rpx 28rpx 16rpx;
        color: #ACACAC;
      }
      .group {
        background: #FFFFFF;
        .type {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 0;
          line-height: 1.5;
          padding: 24rpx 0;
          margin: 0 32rpx;
        }
      }
    }
  }
  /* 下边框样式 */
  .border-bottom{
    border-bottom: 1px solid #F4F4F4;
  }
  /* 箭头图标样式 */
  .icon-fanhui {
    display:block;
    transform: rotate(180deg);
    color: #B9B9B9;
  }
  .iconfont{
    font-size: 30rpx;
  }
</style>
