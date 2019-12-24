<template>
  <div>
      <div class="list ali-c jus-b">
        <img class="left" src="/static/images/index/icon4.png" alt="">
        <div class="right">
          <p class="tit oneline">动感单车 运动 女家用型</p>
          <div class="ali-c jus-b hot">
            <div class="one flexc">
              <img src="/static/images/index/hot.png" alt="">
              <span>已拼1623件</span>
            </div>
            <p class="flexc">3人团</p>
          </div>
          <div class="price ali-c jus-b">
            <p>
              <span>￥</span><span>19.90</span><span>￥29.90</span>
            </p>
            <div class="flexc">去开团</div>
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
  width: 690rpx;
	height: 261rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
  margin:20rpx auto 0;
  padding: 0 20rpx 0 35rpx;
  .left{
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
    margin-right: 20rpx
  }
  .right{
    width:400rpx;
    .price{
      p span:nth-child(1){
        font-size: 20rpx;
        color: #ff3333;
        font-weight: 900
      }
      p span:nth-child(2){
        font-size: 36rpx;
        color: #ff3333;
        font-weight: 900
      }
      p span:nth-child(3){
        font-size: 20rpx;
        color: #999;
        margin-left: 10rpx;
        text-decoration: line-through
      }
      div{
        width: 140rpx;
        height: 52rpx;
        background-color: #ff3333;
        border-radius: 26rpx;
        font-size: 26rpx;
        color: #ffffff;
      }
    }
    .tit{
      font-weight: bold;
    }
    .hot{
      width: 280rpx;
	    height: 45rpx;
      border: 1rpx solid #ff5165;
      border-radius: 19rpx;
      overflow: hidden;
      margin: 20rpx 0 40rpx;
      img{
        width: 43rpx;
        height: 33rpx;
        margin-right: 5rpx;
      }
      .one{
        width: 200rpx;
        height: 100%;
        background-color: #ff5165;
        color: #fff;
        font-size: 22rpx;
      }
      p{
        color: #ff5165;
        font-size: 22rpx;
        width: 80rpx
      }
    }
  }
}
</style>
