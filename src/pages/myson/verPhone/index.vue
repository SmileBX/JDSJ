<template>
  <view class="mt_5">
		<view class="item bg_fff flex-center-between">
			<input type="text" class="ipt tel" placeholder="请输入手机号" v-model="phoneNumber">
			<!-- <text class="red">获取验证码</text> -->
		</view>
		<!-- <view class="item bg_fff flex-center-between">
			<input type="text" class="ipt" placeholder="请输入验证码">
		</view> -->
		<view class="btn_fix" @tap="submit">确定</view>
		<view class="tip pw3">
			<view>温馨提示:</view>
			<view class="mt2">
				1、请确保手机号码真实有效。<br>
			</view>
		</view>
	</view>
</template>

<script>
import {post} from '@/utils'
export default {
  data () {
    return {
      token: "",
      userId: "",
      phoneNumber:""
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    wx.setNavigationBarTitle({
      title: "修改绑定手机号"
    });
  },
  methods:{
   submit(){
     if(!/^1(3|4|5|6|7|8)\d{9}$/.test(this.phoneNumber)){
         wx.showToast({
          title: "请填写正确的手机号",
          icon: "none",
          duration: 2000
        });
        return false;
      }
      post('User/BindMobile',{
          userId:this.userId,
          Token: this.token,
          Mobile: this.phoneNumber
        }).then(res=>{
            wx.showToast({
              title: res.msg
            });
            setTimeout(()=> {
              this.phoneNumber="";
              wx.navigateBack() 
            },1500)
        })
   }
  },
}
</script>

<style lang='scss' scoped>
.item{
  padding:20rpx 30rpx;
  border-bottom: 1px solid #ededed;
}
.btn_fix{
  background: #ff3333;
  text-align: center;
	height:88rpx;line-height:88rpx;
	width:690rpx;margin:100rpx auto;
	color:#ffffff;border-radius:12rpx;
}
.ipt{
  height: 100%;
  width: 100%;
}
// .tel{
//   max-width:520rpx; border-right:1px solid #eee
// }
.tip{ color: #999}
</style>
