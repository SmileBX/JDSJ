<template>
  <div>
      <swiper class="swiper" indicator-dots autoplay circular>
        <swiper-item class="flexc">
          <img mode='aspectFill' src="/static/images/index/goods_banner.png" alt="">
        </swiper-item>
      </swiper>
      <div class="top jus-b ali-c">
        <div class="left">
          <p class="price">
            <span>￥</span><span>199.00</span><span>￥168.00</span>
          </p>
          <p class="tit oneline">仙醇城 吸尘器家用  DK-2302</p>
          <p class="shou">已售485</p>
        </div>
        <div class="right">
          <img src="/static/images/index/fenxiang.png" alt="">
          <p>福建泉州</p>
        </div>
      </div>
      <div class="list-box">
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <span>领券</span>
            <p class="quan">满100减50</p>
          </div>
          <div class="right ali-c">
            <img src="/static/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <span>规格</span>
            <p class="quan">1件</p>
          </div>
          <div class="right ali-c">
            <img src="/static/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <span>送至</span>
            <p class="quan">广东深圳</p>
          </div>
          <div class="right ali-c">
            <span>包邮</span>
            <img src="/static/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <span>服务</span>
            <img src="/static/images/index/ok.png" alt="">
            <p>品质保证</p>
            <img src="/static/images/index/ok.png" alt="">
            <p>破损补寄</p>
            <img src="/static/images/index/ok.png" alt="">
            <p>及时发货</p>
          </div>
        </div>
      </div>
      
      <div class="comment">
        <div class="tit ali-c jus-b">
          <p class="left">商品评价<span>(1)</span></p>
          <div class="right">
            <span>查看全部</span>
            <img src="/static/images/index/more_r.png" alt="">
          </div>
        </div>
        <div class="main">
          <div class="name ali-c jus-b">
            <div class="ali-c">
              <img class="left" src="/static/images/ava.png" alt="">
              <p>巴啦啦小魔仙</p>
            </div>
            <div>
              <img class="right" src="/static/images/index/star.png" alt="">
            </div>
          </div>
          <p class="detail">
            不管有多忙，总要付诸一定的时间与精力，细心经营彼此的
关系，肌肤水嫩润泽，底妆才能更好地贴合
          </p>
          <p class="time">2019-09-08</p>
        </div>
      </div>
      <div class="goods-detail">
        <p class="tit">商品详情</p>
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
.goods-detail{
  background-color: #fff;
  margin-top: 20rpx;
  .tit{
    padding: 0 30rpx;
    line-height: 90rpx;
    font-size: 32rpx;
	  font-weight: bold;
  }
}
.comment{
  background-color: #fff;
  margin-top: 20rpx;
  .main{
    padding: 0 30rpx;
    .time{
      font-size: 26rpx;
      color: #999999;
      line-height: 80rpx;
    }
    .detail{
      color: #212121;
    }
    .name{
      font-size: 30rpx;
      font-weight: bold;
      height: 114rpx;
      .left{
        width: 68rpx;
        height: 68rpx;
        border-radius: 50%;
        margin-right: 20rpx
      }
      .right{
        width: 24rpx;
        height: 24rpx;
        margin-left: 10rpx;
      }
    }
  }
  .tit{
    padding: 0 30rpx;
    border-bottom: 1rpx solid #ededed;
    height: 90rpx;
    .left{
      font-size: 32rpx;
      font-weight: bold;
      span{
        font-size: 22rpx;
        color: #999999;
      }
    }
    .right{
      color: #ff3333;
      font-size: 24rpx;
      img{
        width: 12rpx;
        height: 20rpx;
        margin-left: 10rpx;
      }
    }
  }
}
.list-box{
  margin-top: 20rpx;
  background-color: #fff;
  .list{
    height:100rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #ededed;
    .left{
      span{
        font-size: 30rpx;
        color: #999999;
        margin-right: 46rpx;
      }
      img{
        width: 31rpx;
        height: 31rpx;
        margin-right: 11rpx
      }
      p{
        margin-right: 46rpx;
      }
    }
    .right{
      img{
        width: 12rpx;
        height: 20rpx;
        margin-left: 23rpx;
      }
      span{
        color: #999999;
      }
    }
  }
}
.top{
  background-color: #fff;
  height: 200rpx;
  padding: 0 30rpx;
  .right{
    text-align: right;
    img{
      width: 88rpx;
	    height: 88rpx;
    }
    p{
      margin-top: 15rpx; 
      font-size: 26rpx;
      color: #999
    }
  }
  .left{
    width: 500rpx;
    .price span:nth-child(1){
      color: #fb4f45;
      font-size: 30rpx;
      font-weight: 900
    }
    .price span:nth-child(2){
      color: #fb4f45;
      font-size: 44rpx;
      font-weight: 900
    }
    .price span:nth-child(3){
      color: #999;
      font-size: 22rpx;
      margin-left: 15rpx;
      text-decoration:line-through
    }
    .tit{
      font-size: 36rpx;
      font-weight: bold;
      margin: 5rpx 0 10rpx;
    }
    .shou{
      font-size: 26rpx;
      color: #999
    }
  }
}
.swiper{
  height: 700rpx;
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
