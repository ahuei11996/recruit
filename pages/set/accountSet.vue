<!--
 维护人：杨振宇
 时间：2020年12月08日
 更新时间：
-->
<template>
  <view>
<!--    <headerBar style="border-bottom: 1px solid #D1D1D1;letter-spacing: 4rpx;" title="安全中心" textAlign="center" />-->
    <view class="security-center">
      <view v-for="(item, index) in securityType" :key="index" class="account-security">
        <view class="title-text">{{ item.title }}</view>
        <view v-for="(val, key) in item.content" :key="key" class="group" @click="jump(val.url)">
          <view class="type" :class="val.class">
            <text>{{ val.msg }}</text>
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
  name: 'AccountSet',
  data() {
    return {
      // 设置类型列表
      securityType: [
        { title: '账户', content: [
          { msg: '绑定手机', url: '/pages/user/loginByPhone?type=1', text: '183****0636', class: 'border-bottom' },
          // { msg: '登录密码', text: '修改', url: '/pages/set/passwordAmend', class: 'border-bottom' },
          { msg: '账号关联', text: '绑定/解绑', url: '/pages/set/bindAccount' }
        ] },
        { title: '安全', content: [
          // { msg: '最近登录历史', text: '登录设备管理', url: '', class: 'border-bottom' },
          { msg: '永久注销账号', text: '注销后无法恢复，请谨慎操作', url: '/pages/set/accountLogout' }
        ] }
      ]
    }
  },
  mounted() {

  },
  methods: {
    jump(e) {
      this.util.navTo(e)
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
  .security-center {
    .account-security {
      .title-text {
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
          padding: 32rpx 0;
          margin: 0 32rpx;
        }
      }
    }
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
  /* 下边框样式 */
  .border-bottom{
    border-bottom: 1px solid #F4F4F4;
  }
</style>
