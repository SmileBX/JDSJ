<template>
  <div>
      <div class="pin-box">
        <div class="goods ali-c">
          <img src="http://jd.wtvxin.com/images/images/index/shop.png" alt="">
          <div>
            <p class="flexc status">拼团进行中</p>
            <p class="tit oneline">动感单车 运动 女家用型...</p>
            <p class="price">
              <span>￥</span>
              <span>95.00</span>
              <span>￥699.00</span>
            </p>
          </div>
        </div>
        <div class="tuan">
          <p class="one">还差4人即可成团</p>
          <p class="two flexc">剩余<span>4天23小时</span>结束</p>
          <div class="flexc thr">
            <div v-for="(item, index) in 5" :key="index">
              <img src="http://jd.wtvxin.com/images/images/index/defute.png" alt="">
            </div>
          </div>
          <p class="fou flexc">邀请好友参团</p>
          <p class="fiv">请尽快成团，否则就被抢光了哦！</p>
        </div>
      </div>
      <div class="rule ali-c jus-b">
        <span>拼团规则</span>
        <div class="ali-c">
          <p>好友拼团 人满发货 人不满退款</p>
          <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="">
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
.rule{
  width: 690rpx;
	height: 88rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
  margin: 20rpx auto;
  padding: 0 20rpx;
  img{
    width: 14rpx;
	  height: 24rpx;
    margin-left: 10rpx;
  }
  span{
    font-weight: 900
  }
}
.pin-box{
  background-color: #fff;
  width: 690rpx;
  margin: 30rpx;
  padding: 20rpx;
  border-radius: 15rpx;
  .tuan{
    padding: 40rpx 0;
    text-align: center;
    .one{
      font-size: 32rpx;
      color: #202020;
    }
    .two{
      font-size: 24rpx;
      color: #999999;
      margin: 20rpx 0 30rpx;
      span{
        width: 140rpx;
        height: 41rpx;
        background-color: #ff3333;
        border-radius: 4rpx;
        color: #fff;
        margin: 0 10rpx;
      }
    }
    .thr{
      div{
        margin: 0 10rpx;
      }
      img{
        width: 104rpx;
	      height: 104rpx;
        border-radius: 50%;
      }
    }
    .fou{
      width: 630rpx;
      height: 81rpx;
      background-color: #ff3333;
      border-radius: 8rpx;
      color: #ffffff;
      margin: 40rpx 0 20rpx;
    }
    .fiv{
      font-size: 20rpx;
      color: #999
    }
  }
  .goods{
    height: 261rpx;
    border-bottom: 1rpx solid #ededed;
    img{
      width: 200rpx;
      height: 200rpx;
      border-radius: 10rpx;
      margin-right: 30rpx;
    }
    .status{
      width: 144rpx;
      height: 36rpx;
      background-color: #ff3333;
      border-radius: 4rpx;
      font-size: 24rpx;
      color: #fff;
    }
    .tit{
      font-weight: bold;
      margin: 20rpx 0 50rpx;
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
      font-size: 24rpx;
      text-decoration: line-through;
      margin-left: 20rpx;
    }
  }
}
</style>
