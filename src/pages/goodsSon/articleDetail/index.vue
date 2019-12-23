<template>
  <div class="page">
      <div class="detail">文章详情</div>
      <div class="goods ali-c jus-b">
        <div class="left ali-c">
          <img src="/static/images/index/goods_banner.png" alt="">
          <div>
            <p>九阳多功能蒸气饭煲</p>
            <span><span>¥</span>25.00</span>
          </div>
        </div>
        <img class="right" src="/static/images/index/go.png" alt="">
      </div>
      <div class="foot ali-c jus-b">
        <div class="ali-c">
          <img class="one" src="/static/images/index/good_n.png" alt="">
          <span>24</span>
          <img class="two" src="/static/images/index/zhuanfa.png" alt="">
        </div>
        <p class="flexc mai">立即购买</p>
      </div>
  </div>
</template>

<script>
export default {

  data () {
    return {

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
.page{
  min-height: 100vh;
  background-color: #fff;
  .detail{
    margin: 0 30rpx;
  }
  .foot{
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 -3rpx 8rpx 0 rgba($color: #000000, $alpha: 0.1);
    width: 100vw;
    height: 98rpx;
    position: fixed;
    bottom: 0;
    padding: 0 30rpx;
    .mai{
      width: 200rpx;
      height: 60rpx;
      background-color: #ff3333;
      border-radius: 30rpx;
      font-size: 30rpx;
      color: #ffffff;
    }
    .one{
      width: 36rpx;
	    height: 36rpx;
    }
    .two{
      width: 41rpx;
	    height: 33rpx;
    }
    span{
      font-size: 24rpx;
      color: #999999;
      margin: 0 60rpx 0 20rpx;
    }
  }
  .goods{
    width: 690rpx;
    height: 180rpx;
    background-color: #f4f4f4;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 0 40rpx 0 20rpx;
    margin: auto;
    .right{
      width: 50rpx;
	    height: 50rpx;
    }
    .left{
      img{
        width: 140rpx;
        height: 140rpx;
        border-radius: 6rpx;
        margin-right: 20rpx
      }
      p{
        font-size: 30rpx;
	      font-weight: bold;
        margin-bottom: 20rpx
      }
      span{
        color: #ff3333;
        font-size: 36rpx;
        font-weight: bold;
        span{
          font-size: 20rpx;
        }
      }
    }
  }
}
</style>
