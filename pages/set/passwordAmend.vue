<!--
 维护人：杨振宇
 时间：2020年12月09日
 更新时间：
-->
<template>
  <view>
    <view class="password-remove">
      <view class="password-input">
        <view class="group">
          <view class="text">当前密码</view>
          <u-input v-model="password.present" password-icon placeholder="6-20位字符" type="password" class="input-password" clearable />
        </view>
        <view class="group">
          <view class="text">新密码</view>
          <u-input v-model="password.new" password-icon type="password" placeholder="8-20位字符" class="input-password" clearable />
        </view>
        <view class="group">
          <view class="text">确认密码</view>
          <u-input v-model="password.confirm" password-icon placeholder="8-20位字符" type="password" class="input-password" clearable />
        </view>
        <view class="bottom-msg">密码为8~20位，数字、英文和符号的组合，不含空格。</view>
      </view>
      <view class="confirm-btn">
        <button>完成</button>
      </view>
      <text class="message-remove" @click="util.navTo('/pages/set/messageAmend')">短信验证修改</text>
    </view>
  </view>
</template>
<script>
import UFormItem from '../../uview-ui/components/u-form-item/u-form-item'
export default {
  name: 'PasswordAmend',
  components: { UFormItem },
  data() {
    return {
      password: { // 密码
        present: '', // 当前密码
        new: '', // 新密码
        confirm: '' // 确认密码
      },
      passwordList: [
        { text: '当前密码', password: '' },
        { text: '新密码', password: '' },
        { text: '确认密码', password: '' }
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
  /* 页面全局背景和字体 */
  page {
    background: #FFFFFF;
    font-family: "Microsoft YaHei";
  }
  /* 密码输入框样式 */
  .password-remove {
    padding: 0 36rpx;
    margin-top: 120rpx;
    height: 41vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
        color: #B4B4B4;letter-spacing: 2rpx;
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
    .message-remove {
      text-align: center;
      color: #2497F7;
      letter-spacing: 2rpx;
      font-size: 26rpx;
    }
  }
</style>
