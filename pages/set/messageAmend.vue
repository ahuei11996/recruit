<!--
 维护人：杨振宇
 时间：2020年12月09日
 更新时间：
-->
<template>
  <view>
    <view class="message-amend">
      <view class="content">
        <view class="getPhone-num">
          86-{{ phone }}
        </view>
        <view class="input-verifyCode">
          <u-input v-model="verifyCode" type="number" class="input-inner" placeholder="请输入验证码" clearable />
          <view class="getVerifyCode">获取验证码</view>
        </view>
        <view class="next-bottom">
          <view class="nextBtn" @click="util.navTo('/pages/set/messageVerifyAmend')">
            <button>下一步，设置密码</button>
          </view>
          <text class="toPasswordAmend" @click="util.navTo('/pages/set/passwordAmend')">原密码修改</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MessageRemove',
  data() {
    return {
      phone: '183****0636', // 手机号
      verifyCode: '' // 验证码
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
  .message-amend {
    margin-top: 60rpx;
    .content {
      padding: 0 36rpx;
      height: 420rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .getPhone-num {

      }
      .input-verifyCode {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #DCDCDC;
        padding-bottom: 8rpx;
        .input-inner {
          margin-right: 50rpx;
        }
        .getVerifyCode {
          border: 1px solid #86C5FA;
          color: #44A6F9;
          border-radius: 8rpx;
          padding: 8rpx 20rpx;
          font-size: 24rpx;
        }
      }
      .next-bottom {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 144rpx;
        .nextBtn {
          button {
            background: #FF7700;
            color: #ffffff;
            font-size: 30rpx;
            letter-spacing: 4rpx;
            &:after {
              border: 0;
            }
          }
        }
        .toPasswordAmend {
          text-align: center;
          font-size: 26rpx;
          color: #309DF8;
          letter-spacing: 2rpx;
        }
      }
    }
  }
</style>
