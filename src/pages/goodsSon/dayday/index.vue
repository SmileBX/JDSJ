<template>
  <div>
      <img class="top" src="/static/images/index/tehui.png" alt="">
      <div class="list-box">
        <div class="list ali-c jus-b">
          <img class="left" src="/static/images/index/goods.png" alt="">
          <div class="right">
            <p class="tit oneline">短袜浅口女士棉袜</p>
            <p class="price">
              <span>￥</span><span>25.00</span><span>￥30.00</span>
            </p>
            <div class="rob ali-c jus-b">
              <span>已抢1235</span>
              <p class="flexc">去购买</p>
            </div>
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
     showEdit:false,
      
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
  padding: 0 20rpx;
  margin-top: 20rpx;
  border-radius: 16rpx;
  .left{
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
  }
  .right{
    width: 420rpx;
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
  width: 750rpx;
  height: 560rpx;
  
}
.list-box{
  background-color: #f8aeaa;
  padding: 30rpx;
  min-height: 590rpx;
  margin-top: -10rpx;
}
</style>
