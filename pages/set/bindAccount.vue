<!--
 维护人：杨振宇
 时间：2020年12月11日
 更新时间：
-->
<template>
  <view>
    <view class="bind-account">
      <view class="bind-account-type">
        <view class="list margin-top-sm" v-for="(item, index) in accountList" :key="index">
          <view>
            <text>icon</text>
            <text class="margin-left">{{ item.text }}</text>
          </view>
          <button :class="{ active: item.isBind }" class="bind-Btn text-df margin-0 padding-0" plain>{{ item.isBind ? '已绑定' : '立即绑定' }}</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'MessageNotice',
  data() {
    return {
      messageList: [
        { title: '新消息通知', content: [
          { msg: '服务信息', text: '行程、订单类消息', data: 0 },
          { msg: '促销信息', text: '精选优惠、活动类消息', data: 0 }
        ] },
        { title: '推荐设置', content: [
          { msg: '附近推荐', text: '基于当前地理位置的推荐消息', data: 0 }
        ] }
      ],
      accountList: [
        { text: '微信', isBind: false },
        { text: 'QQ', isBind: false },
        { text: '微博', isBind: false }
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
  body,page {
    font-family: "Microsoft YaHei";
    background: #EFEFF1;
  }
  .bind-account {
    .bind-account-type {
      .list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFFFFF;
        padding: 24rpx 40rpx 24rpx 28rpx;
        .iconfont{

        }
        .bind-Btn {
          border-width: 0;
          border: 1px solid #228BAE;
          border-radius: 40rpx;
          line-height: 1;
          padding: 16rpx 20rpx;
          color: #228BAE;
          &:active {
            border: 1px solid #B5B5B5;
            color: #B3B3B3;
          }
        }
      }
    }
  }
</style>
