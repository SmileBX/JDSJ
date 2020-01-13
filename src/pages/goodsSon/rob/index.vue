<template>
  <div>
      <div class="top flex">
        <div class="flex1 flexc" :class="{'active':active==index}" v-for="(item, index) in 5" :key="index">
          <div>
            <p>09:00</p>
            <p>已结束</p>
          </div>
        </div>
      </div>
      <div class="list ali-c jus-b">
        <img class="left" src="http://jd.wtvxin.com/images/images/index/goods.png" alt="">
        <div class="right">
          <p class="tit oneline">短袜浅口女士棉袜</p>
          <p class="price">
            <span>￥</span><span>25.00</span><span>￥30.00</span>
          </p>
          <div class="rob ali-c jus-b">
            <span>已抢1235</span>
            <p class="flexc">马上抢</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {switchPath,isJump} from '@/utils'
export default {

  data () {
    return {
     active:3
      
    }
  },

  onShow(){
    
  },
  methods: {
    goUrl(url,param){
      this.isJump = true
      setTimeout(() => {
        this.isJump = false
        wx.navigateTo({
          url:url+'?id='+param
        })
      }, 100);
    },
    
  },
}
</script>

<style scoped lang='scss'>
.list{
  box-sizing: border-box;
  height: 261rpx;
  background-color: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  .left{
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
  }
  .right{
    width: 462rpx;
    .tit{
      font-weight: 900;
      margin-bottom: 10rpx
    }
    .rob{
      margin-top: 40rpx;
      span{
        color: #999;
        font-size: 22rpx;
      }
      p{
        width: 140rpx;
        height: 53rpx;
        background-color: #ff3333;
        border-radius: 26rpx;
        color: #fff
      }
    }
    .price span:nth-child(1){
      color: #ff3333;
      font-size: 20rpx;
      font-weight: 900
    }
    .price span:nth-child(2){
      color: #ff3333;
      font-size: 36rpx;
      font-weight: 900
    }
    .price span:nth-child(3){
      color: #999;
      font-size: 22rpx;
      margin-left: 15rpx;
    }
  }
}
.top{
  height: 100rpx;
  background-color: #31353b;
  text-align: center;
  color: #7d7d7d;
  .active{
    background-color: #ff3333;
    color: #fff!important;
    position: relative;
    overflow: visible
  }
  
}
.active::before{
    content:"";
    width: 16rpx;
    height: 16rpx;
    background-color: #ff3333;
    position: absolute;
    bottom: -8rpx;
    left: 65rpx;
    transform: rotate(45deg)
  }
</style>
