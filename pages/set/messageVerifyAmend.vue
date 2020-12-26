<!--
 维护人：杨振宇
 时间：2020年12月10日
 更新时间：
-->
<template>
  <view>
    <view class="password-remove">
      <view class="password-input">
<!--        <view class="group" v-for="(item, index) in passwordList" :key="index">-->
<!--          <view class="text">{{ item.text }}</view>-->
<!--          <u-input v-model="item.value" password-icon placeholder="6-20位字符" type="password" class="input-password" clearable />-->
<!--        </view>-->
        <view class="group">
          <view class="text">新密码</view>
          <u-input v-model="password.new" password-icon placeholder="6-20位字符" type="password" class="input-password" clearable />
        </view>
        <view class="group">
          <view class="text">确认密码</view>
          <u-input v-model="password.confirm" password-icon placeholder="6-20位字符" type="password" class="input-password" clearable />
        </view>
        <view class="bottom-msg">密码为8~20位，数字、英文和符号的组合，不含空格。</view>
      </view>
      <view class="confirm-btn">
        <button>完成</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MessageVerifyAmend',
  data() {
    return {
      password: { // 密码输入
        new: '', // 新密码
        confirm: '' // 确认密码
      },
      passwordList: [
        { text: '新密码', value: '' },
        { text: '确认密码', value: '' }
      ]
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  page {
    font-family: "Microsoft YaHei";
    background: #FFFFFF;
  }
  .password-remove {
    padding: 0 36rpx;
    margin-top: 110rpx;
    height: 30vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .password-input {
      .group {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #DCDCDC;
        padding: 10rpx 28rpx 10rpx 0;
        .text {
          width: 112rpx;
          margin-right: 64rpx;
          .input-password {
            padding-right: 28rpx;
          }
        }
      }
      .bottom-msg {
        margin-top: 20rpx;
        font-size: 24rpx;
        color: #B4B4B4;
        letter-spacing: 3rpx;
      }
    }
    .confirm-btn {
      margin-top: 28rpx;
      button {
        background: #FF7700;
        color: #FFFFFF;
        font-size: 32rpx;
      }
    }
  }
</style>
