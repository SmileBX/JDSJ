<template>
  <div>
    <div class="top">
      <div class="search ali-c">
        <p>家乐福</p>
        <div class="right flexc">
          <img src="/static/images/index/search.png" alt="">
          <span>搜索</span>
        </div>
      </div>
      <swiper class="swiper" indicator-dots autoplay circular>
        <swiper-item class="flexc">
          <img src="/static/images/index/banner.png" alt="">
        </swiper-item>
      </swiper>
    </div>
    <div class="bai"></div>
    <div class="icon flex">
      <div class="flex1 flexc" @click="goUrl('/pages/goodsSon/dayday/main')">
        <div>
          <img src="/static/images/index/icon1.png" alt="">
          <p>天天特惠</p>
        </div>
      </div>
      <div class="flex1 flexc" @click="goUrl('/pages/goodsSon/article/main')">
        <div>
          <img src="/static/images/index/icon2.png" alt="">
          <p>动态文章</p>
        </div>
      </div>
      <div class="flex1 flexc" @click="goUrl('/pages/myson/ticket/main')">
        <div>
          <img src="/static/images/index/icon3.png" alt="">
          <p>优惠券</p>
        </div>
      </div>
      <div class="flex1 flexc" @click="goUrl('/pages/goodsSon/classify/main')">
        <div>
          <img src="/static/images/index/icon4.png" alt="">
          <p>商品分类</p>
        </div>
      </div>
    </div>
    <div class="youhui ali-c jus-b">
      <img @click="goUrl('/pages/goodsSon/rob/main')" src="/static/images/index/qianggou.png" alt="">
      <img src="/static/images/index/pintuan.png" alt="">
    </div>
    <div class="goods-box">
      <div class="xd">
        <div class="all flexc">
          <img src="/static/images/index/title.png" alt="">
        </div>
        <div class="shai flex">
          <div class="flex1 flexc">
            <span>默认</span>
          </div>
          <div class="flex1 flexc">
            <span>销量</span>
            <img src="/static/images/index/shai.png" alt="">
          </div>
          <div class="flex1 flexc">
            <span>价格</span>
            <img src="/static/images/index/shai.png" alt="">
          </div>
        </div>
      </div>
      <div class="goods jus-b flex-wrap">
        <div class="list" v-for="(item, index) in goodsList" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main')">
          <img class="img" src="/static/images/index/goods.png" alt="">
          <div class="text-box">
            <p class="tit oneline">至本舒颜修护氨基酸洁至本舒颜修护氨基酸洁</p>
            <div class="price">
              <span>￥</span><span>29.00</span><span>￥39.00</span>
            </div>
            <div class="carda ali-c jus-b">
              <span>已售1235</span>
              <img src="/static/images/index/shop_card.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <movable-area class="move-box-fa">
      <movable-view class="move-box" direction='all' inertia x='10000' y='0' damping='1000000' friction='1'>
        <img class="car" src="/static/images/index/card.png" alt="">
      </movable-view>
    </movable-area>
    
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      goodsList:[,,,,,,],
    }
  },
  
  methods: {
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
  }
}
</script>

<style scoped lang='scss'>
.xd{
  position:sticky;
  top: 0;
  background-color: #fff;
  box-shadow: 0 5rpx 8rpx 0rpx rgba($color: #000000, $alpha: 0.1)
}
.move-box-fa{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none
}
.move-box{
  pointer-events: auto;
  position: fixed;
  bottom: 30rpx;
  right: 30rpx;
  width: 98rpx;
	height: 98rpx;
}
// .xd{
//   transition: all 0.3s;
//   width:100%;
//   height: 170rpx;
//   background-color: #fff;
// }
// .isxd{
//   position: fixed;
//   top: 0;
//   left: 0;
// }
.car{
  width: 98rpx;
	height: 98rpx;
}
.goods-box{
  background-color: #fff;
  margin-top: 20rpx;
  .goods{
    padding: 30rpx;
    .list{
      width: 335rpx;
      height: 525rpx;
      border-radius: 10rpx;
      overflow: hidden;
      margin-bottom: 20rpx;
      box-shadow: 0rpx 2rpx 5rpx 0rpx rgba(0, 0, 0, 0.1);
      .text-box{
        padding: 0 20rpx;
      }
      .carda{
        span{
          font-size: 22rpx;
          color: #999999;
        }
        img{
          width: 50rpx;
	        height: 50rpx;
        }
      }
      .img{
        width: 335rpx;
	      height: 342rpx;
      }
      .tit{
        color: #000000;
        line-height: 70rpx;
      }
      .price span:nth-child(1){
        font-size: 20rpx;
        color: #ff3333;
        font-weight: 900;
      }
      .price span:nth-child(2){
        font-size: 36rpx;
        color: #ff3333;
        font-weight: 900;
      }
      .price span:nth-child(3){
        font-size: 22rpx;
        color: #999;
        text-decoration:line-through;
        margin-left: 15rpx;
      }
    }
  }
  .shai{
    height: 70rpx;
    color: #000;
    font-size: 28rpx;
    img{
      width: 13rpx;
	    height: 22rpx;
      margin-left: 15rpx;
    }
  }
  .all{
    height: 100rpx;
    img{
      width: 378rpx;
	    height: 32rpx;
    }
  }
}
.youhui{
  background-color: #fff;
  padding: 0 30rpx 40rpx;
  img{
    width: 335rpx;
    height: 160rpx;
    border-radius: 16rpx;
  }
}
.icon{
  background-color: #fff;
  text-align: center;
  height: 200rpx;
  font-size: 26rpx;
  p{
    margin-top: -10rpx;
  }
  img{
    width: 100rpx;
	  height: 100rpx;
  }
}
.bai{
  height: 70rpx;
  background-color: #fff
}
.top{
  height: 320rpx;
	background-image: linear-gradient(#ff3333, #fff);
  position: relative;
  .swiper{
    height: 300rpx;
    margin-top: 26rpx;
    img{
      width: 690rpx;
      height: 300rpx;
      border-radius: 20rpx;
    }
  }
  .search{
    height: 60rpx;
    padding: 0 30rpx;
    p{
      font-size: 48rpx;
      color: #fff;
      margin-right: 50rpx;
    }
    .right{
      width: 301rpx;
	    height: 60rpx;
      border-radius: 30rpx;
      background-color: rgba($color: #fff, $alpha: 0.3);
      img{
        width: 28rpx;
        height: 28rpx;
        margin-right: 20rpx;
      }
      span{
        color: #fff;
      }
    }
  }
}

</style>
