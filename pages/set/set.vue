<!--
 维护人：杨振宇
 时间：2020年12月05日
-->
<template>
  <view class="">
    <view class="setting">
      <view style="background: #FFFFFF">
        <view class="user-top">
          <view class="user">
            <view class="userInfo">
              <view class="userHeader">
                <image class="" :src="util.getImage('/touxianga.png')"></image>
              </view>
              <view class="userName">
                <text style="font-size: 18px;">点击设置昵称</text>
                <text style="color: #ACACAC;">plus认证账号: {{ userName }}</text>
              </view>
            </view>
            <view class="userInfoEdit">编辑</view>
          </view>
        </view>
      </view>

      <view style="background: #ffffff;" v-for="(item,index) in dataList" :key="index">
        <button class="group" @click="jump(item.url)" :class="item.class">
          <text>{{item.text}}</text>
          <text class="iconfont icon-fanhui"></text>
        </button>
      </view>
      <button style="background: #FFFFFF;" class="bottom">切换账户</button>
      <button style="background: #FFFFFF;">退出登陆</button>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Set',
  data() {
    return {
      userName: '海南plus',
      dataList: [
        { text: '我的收货地址', url: '', class: 'bottom' },
        { text: '账户与安全', url: '', class: 'bottom' },
        { text: '支付设置', url: '', class: 'bottom' },
        { text: '地区设置', url: '', class: 'border-bottom' },
        { text: '音效与通知', url: '', class: 'border-bottom' },
        { text: '隐私', url: '', class: 'border-bottom' },
        { text: '通用', url: '', class: 'bottom' },
        { text: '问题反馈', url: '', class: 'border-bottom' },
        { text: '关于海南plus', url: '', class: 'bottom' },
      ]
    }
  },

  methods: {
    // 路径跳转
    jump() {

    }
  }

}
</script>

<style scoped>
  page {
    font-family: "Microsoft Yahei";
    background: #EFEFEF;
  }
  .setting .user-top {
    border-bottom: 1px solid #DADADA;
    margin-left: 26rpx;
    padding: 0 56rpx 24rpx 0;
  }
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*padding: 18rpx 44rpx 18rpx 28rpx;*/
    background: #ffffff;
    /*border-bottom: 2rpx solid #DADADA;*/
  }
  .user .userInfo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 418rpx;
  }
  .userInfo .userHeader{
    width: 110rpx;
    height: 110rpx;
  }
  .userInfo .userHeader image {
    width: 100%;
    height: 100%;
  }
  .userInfo .userName {
    min-height: 88rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .userInfo .userName text {
    display: block;
  }
  .user .userInfoEdit {
    color: #E17240;
    border: 1px solid #FAE4D6;
    border-radius: 10rpx;
    padding: 2rpx 8rpx;
  }
  .setting .group {
    /*padding: 0;*/
    padding-left: 0;
    padding-right: 28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:#fff;
    height: 104rpx;
    margin-left: 28rpx;
  }
  .setting button {
    border-radius: 0;
    font-size: 32rpx;
  }
  .setting button:after{
    border: none;
  }
  .icon-fanhui {
    display:block;
    transform: rotate(180deg);
    color: #B9B9B9;
  }
  .border-bottom{
    border-bottom: 1px solid #DADADA;
  }
  .bottom {
    margin-bottom:20rpx;
  }
</style>
