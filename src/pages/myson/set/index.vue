<template>
  <div class="mt_5 bg_fff">
    <div class="list flex-center-between" @click="golink('/pages/myson/authentication/main')">
			<span>实名认证</span>
			<img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
		</div>
		<div class="list flex-center-between" @click="golink('/pages/myson/verPhone/main')">
			<span>修改绑定手机号</span>
			<img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
		</div>
     
  </div>
</template>

<script>
import {post} from '@/utils'
export default {
  data () {
    return {
      token: "",
      userId: ""
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    wx.setNavigationBarTitle({
      title: "设置"
    });
  },
  methods:{
   golink(url){
      wx.navigateTo({
          url:url
        })
    },
  },
}
</script>

<style lang='scss' scoped>
.list{
    height: 90rpx;
    border-bottom: 1rpx solid #ededed;
    font-size: 28rpx;
    padding: 0 20rpx;
    span{
      color: #333;
      display:inline-block;
    }
    img{
      width: 11rpx;
      height: 20rpx;
    }
  }
</style>
