<!--
 维护人：杨振宇
 时间：2020年12月07日
 更新时间：
-->
<template>
  <view class="dataEdit" style="display: flex; flex-direction: column;">
    <!--    <headerBar style="border-bottom: 1px solid #DFDFDF;flex-grow: 0;letter-spacing: 2rpx;align-items: center;" title="编辑个人资料" textAlign="center" />-->
    <view class="edit" style="flex-grow: 1;">
      <view class="group">
        <view class="userAvatarEdit" @click="chooseAvatar">
          <text>头像</text>
          <view class="avatar-module">
            <view class="avatar">
              <image class="avatarImg" :src="userInfo.avatar" />
            </view>
            <text class="iconfont icon-fanhui" />
          </view>
        </view>
      </view>
      <view class="group">
        <view class="msg" :class="{'border-bottom': true}">
          <text class="msg-text">真实姓名</text>
          <u-input v-model="realName" clearable class="userNameInput" placeholder="" type="text" />
        </view>
      </view>
      <view class="group">
        <view class="msg">
          <text class="msg-text">社区昵称</text>
          <u-input v-model="nickName" clearable class="userNameInput" type="text" placeholder="4-30个中英文字符、数字或符号" />
        </view>
      </view>
      <u-gap height="40" bg-color="#F1F1F1" />
      <view class="group">
        <view class="msg" :class="{'border-bottom': true}">
          <text class="msg-text">性别</text>
          <view class="gender">
            <view class="genderType" @click=" genderActive = 'man' ">
              <text :class="{ active: genderActive == 'man' }" class="iconfont icon-228yonghu_xingbienan" />
              <text :class="{ active: genderActive == 'man' }" class="text">男</text>
            </view>
            <view class="genderType" @click=" genderActive = 'woman' ">
              <text :class="{ active: genderActive != 'man' }" class="iconfont icon-229yonghu_xingbienv" />
              <text :class="{ active: genderActive != 'man' }" class="text">女</text>
            </view>
          </view>
        </view>
      </view>
      <view class="group" @click="show = true">
        <view class="msg born">
          <view class="born">
            <text>生日</text>
            <text>{{ born }} </text>
          </view>
          <text class="iconfont icon-fanhui" />
        </view>
      </view>
      <!--   出生日期  picker选择器   -->
      <u-picker v-model="show" mode="time" :params="params" @confirm="dates" />
    </view>
    <view class="saveData">
      <button>保存</button>
    </view>
  </view>
</template>

<script>
import UPicker from '../../uview-ui/components/u-picker/u-picker'
export default {
  name: 'UserInfoSet',
  components: { UPicker },
  data() {
    return {
      realName: '', // 输入框  真实姓名
      nickName: '', // 输入框  社区昵称
      born: '', // 生日
      height: 0,
      genderActive: 'man', // 性别选择
      show: false, // 日期选择器 picker   默认关闭
      params: { // 日期选择器  只传入年月日
        year: true, // 年
        month: true, // 月
        day: true // 日
      },
      userInfo: { // 用户信息
        userName: '', // 用户名
        avatar: '' // 头像
      },
      // 名字列表
      userDataList: [
        { msg: '真实姓名', data: 0, class: 'border-bottom' },
        { msg: '社区昵称', data: 0, placeholder: '4-30个中英文字符、数字或符号', class: '' }
      ],
      // 性别列表
      genderList: [
        { name: '男', class: 'icon-228yonghu_xingbienan' },
        { name: '女', class: 'icon-229yonghu_xingbienv' }
      ]
    }
  },
  onShow() {
    // 获取窗口高度
    this.getHeight()
  },
  mounted() {
    this.getUserInfo()
  },
  created() {
    // 监听从裁剪页发布的时间，获得裁剪结果
    uni.$on('uAvatarCropper', path => {
      this.userInfo.avatar = path
      // 在此上传到服务端
      this.util.request(this.api.upload, {
        file: path
      }, 'POST').then(res => {
        console.log(res)
        if (res.code == 1) {
          this.userInfo.avatar = res.data
          this.$refs.uToast.show({
            title: res.msg,
            type: 'success',
            icon: true,
            position: 'center'
          })
        } else {
          this.$refs.uToast.show({
            title: '上传失败',
            type: 'error',
            icon: true,
            position: 'center'
          })
        }
      })
    })
  },
  methods: {
    // 获取手机视窗高度
    getHeight() {
      this.height = this.util.getSystemInfo().windowHeight
    },
    // 选择出生日期函数
    dates(num) {
      console.log(num)
      this.born = ''
      for (const i in num) {
        const n = num[i] + '-'
        this.born += n
      }
      this.born = this.born.substring(0, this.born.length - 1)
    },
    // 头像裁剪
    chooseAvatar() {
      this.$u.route({
        url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
        params: {
          // 输出图片宽度，高等于宽，单位px
          destWidth: 300,
          // 裁剪框宽度，高等于宽，单位px
          rectWidth: 200,
          // 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
          fileType: 'jpg'
        }
      })
    },
    // 获取头像
    getAvatarImg() {

    },
    // 获取用户信息
    getUserInfo() {
      this.userInfo = uni.getStorageSync('userInfo')
      this.util.request(this.api.getUserInfo).then(res => {
        console.log(res)
      })
    }

  }

}
</script>

<style lang="scss" scoped>
  /* 设置页面全局背景色和字体 */
  page {
    background: #F1F1F1;
    font-family: "Microsoft YaHei";
  }
  /* 用户编辑样式*/
  .dataEdit{
    height: 100vh;
    padding-bottom: 60rpx;
    .edit{
      .group{
        padding: 0 32rpx;
        background: $uni-bg-color;
         /* 用户头像样式 */
        .userAvatarEdit{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24rpx 0;
          border-bottom: 1px solid #F6F6F6;
          .avatar-module{
            display: flex;
            align-items: center;
            .avatar{
              width: 78rpx;
              height: 78rpx;
              margin-right: 10rpx;
              .avatarImg{
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
        }
        /* 用户名字样式 */
        .msg {
          display: flex;
          align-items: center;
          padding: 32rpx 0;
          .msg-text {
            margin-right: 40rpx;
          }
          .userNameInput {
            width: 480rpx;
          }
          /* 性别样式 */
          .gender {
            display: flex;
            align-items: center;
            width: 380rpx;
            justify-content: space-around;
            .genderType {
              .text{
                margin-left: 20rpx;
                color: #CBCBCB;
              }
              .text.active {
                color: #1E1E1E;
              }
            }
          }
          /* 用户生日样式 */
          .born {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 310rpx;
            .text {
              margin-left: 100rpx;
            }
          }
        }
        .msg.born {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
    /* 保存按钮样式 */
    .saveData {
      margin: 0 28rpx;
      position: relative;
      letter-spacing: 4rpx;
      //top: 490px;
      button {
        color: #ffffff;
        background-color: #0F8DF6;
      }
    }
  }
  /* 下边框线样式 */
  .border-bottom {
    border-bottom: 1px solid #F6F6F6;
  }
  /* 右箭头图标样式 */
  .icon-fanhui {
    display:block;
    transform: rotate(180deg);
    color: #B9B9B9;
  }
  /* 性别图标样式 */
  .icon-228yonghu_xingbienan, .icon-229yonghu_xingbienv {
    color: #919191;
  }
  /* 性别图标选中样式 */
  .icon-228yonghu_xingbienan.active, .icon-229yonghu_xingbienv.active {
    color:#0F8DF6;
  }
</style>
