<template>
  <view class="container">
    <view class="account-logout">
      <view class="header margin-tb-xl">
        <text>icon</text>
        <text class="margin-top-xl">账号注销后，将放弃以下权益和资产</text>
      </view>
      <view class="middle-container">
        <view class="content-msg">
          <view class="content-list padding-tb text-lg margin-left-lg" v-for="(item, index) in logoutNoticeList" :key="index">
            <text class="content-list-text">{{ item.text }}</text>
          </view>
          <view :class="item.class" class="bottom-text text-df padding-top margin-left-lg" v-for="(item, index) in footerNoticeList" :key="index">
            <text class="spot"></text>
            <text>{{ item.text }}</text>
          </view>
        </view>
      </view>
      <view class="footer margin-lr-lg">
        <button @click="util.navTo('/pages/set/verifyLogout')" class="next-btn text-lg">下一步</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'AccountLogout',
  data() {
    return {
      logoutNoticeList: [
        { text: '1. 历史订单将无法查询' },
        { text: '2. 账号将会无法登录' },
        { text: '3. 不再收到海南plus的相关营销信息' },
        { text: '4. 放弃积分和优惠券等权益' },
        { text: '5. 放弃钱包和礼品卡等金额' }
      ],
      footerNoticeList: [
        { text: '请确保所有订单已完结并且无纠纷' },
        { text: '账号注销后历史订单产生的返现、积分等权益视为自动放弃', class: 'padding-bottom' }
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
  body, page {
    background: #EDF1F2;
    font-family: "Microsoft YaHei";
  }
  .container {
    .account-logout {
      .header {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .middle-container {
        .content-msg {
          background: #FFFFFF;
          .content-list {
            border-bottom: 1px solid #ECECEC;
            //padding: 28rpx 0;
            letter-spacing: 2rpx;
            .content-list-text {
            }
          }
          .bottom-text {
            color: #A6A6A6;
            display: flex;
            align-items: center;
            .padding-bottom {
              padding-bottom: 14px;
            }
            .spot {
              width: 8rpx;
              height: 8rpx;
              margin: 12rpx 12rpx 12rpx 0;
              border-radius: 16rpx;
              background: #999999;
              display: flex;
            }
          }
        }
      }
      .footer {
        margin-top: 60rpx;
        .next-btn {
          border-width: 0;
          background: #0BA0DA;
          color: #FFFFFF;
        }
      }
    }
  }
</style>
