<template>
  <view class="container">
    <view class="verifyLogout">
      <view class="top-msg padding-lg text-df">
        <text>短信验证码已发送至绑定的手机 {{ mobile }} ，请输入验证码以验证您的身份</text>
      </view>
      <view class="middle-input padding-lg">
        <input type="number" placeholder="短信验证码" v-model="verifyCode" />
        <text class="verifyCode">发送验证码</text>
      </view>
      <view class="bottom-confirm margin-lr-lg">
        <button>确认注销</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'VerifyLogout',
  data() {
    return {
      mobile: '18389690636',
      verifyCode: ''
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  body, page {
    background: #EFEFF4;
    font-family: "Microsoft YaHei";
  }
  .container {
    .verifyLogout {
      .top-msg {
        color: #9E9E9E;
      }
      .middle-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        //padding: 20px;
        background: #ffffff;
        .verifyCode {
          color: #049DDD;
          font-size: 26rpx;
        }
      }
      .bottom-confirm {
        margin-top: 70rpx;
        button {
          border-width: 0;
          background: #099FDE;
          color: #FFFFFF;
          font-size: 32rpx;
        }
      }
    }
  }
</style>
