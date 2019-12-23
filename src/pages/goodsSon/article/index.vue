<template>
  <div>
      <div class="list" @click="goUrl('/pages/goodsSon/articleDetail/main')">
        <p class="tit oneline">蒸饭蒸菜蒸鸡汤，- -煲搞定三顿饭</p>
        <img class="img" mode='aspectFill' src="/static/images/index/goods_banner.png" alt="">
        <div class="foot jus-b ali-c">
          <span>01-17</span>
          <div class="ali-c">
            <img class="one" src="/static/images/index/look.png" alt="">
            <span>1.2万</span>
            <img class="two" src="/static/images/index/good_n.png" alt="">
            <span>99</span>
          </div>
        </div>
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
.list{
  background-color: #fff;
  margin-top: 20rpx;
  padding: 0 30rpx;
  .tit{
    line-height: 90rpx;
    font-size: 32rpx;color: #00051f;
  }
  .img{
    width: 690rpx;
	  height: 381rpx;
    border-radius: 10rpx;
  }
  .foot{
    font-size: 24rpx;
    color: #999999;
    height: 90rpx;
    img{
      margin: 0 10rpx 0 20rpx
    }
    .one{
      width: 34rpx;
	    height: 24rpx;
    }
    .two{
      width: 26rpx;
	    height: 26rpx;
    }
  }
}
</style>
