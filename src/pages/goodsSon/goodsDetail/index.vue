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

      <div class="play">
        <div class="tit ali-c jus-b">
          <p>拼团玩法</p>
          <div class="ali-c">
            <span>详细规则</span>
            <img src="/static/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="flexc img">
          <img src="/static/images/index/play.png" alt="">
        </div>
      </div>

      <div class="pin">
        <div class="tit ali-c">他们都在拼，可直接参团</div>
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <img src="/static/images/index/ok.png" alt="">
            <div>
              <span>如果</span>
              <p>还差1人成团，剩余<span>02:54:03</span>结束</p>
            </div>
          </div>
          <p class="flexc right">去参团</p>
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
      <div class="foot ali-c jus-b">
        <div class="left ali-c">
          <div>
            <img src="/static/images/index/ans.png" alt="">
            <p>客服</p>
          </div>
          <div>
            <img src="/static/images/index/collect_n.png" alt="">
            <p>收藏</p>
          </div>
          <div>
            <img src="/static/images/index/cart.png" alt="">
            <p>购物车</p>
            <span class="num flexc">2</span>
          </div>
        </div>
        <div class="right flex">
          <p class="flex1 flexc">加入购物车</p>
          <p class="flex1 flexc">立即购买</p>
        </div>
      </div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {
  data () {
    return {
      userId: "",
      token: "",
      proId:"",
      shopid:"" 
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid = wx.getStorageSync("shopid");
    this.proId=this.$root.$mp.query.id;
  },
  onShow(){
    this.ProductInfo();
  },
  methods: {
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    async ProductInfo(){
      let res=await post("Goods/ProductInfo",{
        userId: this.userId,
        token: this.token,
        ShopId:this.shopid,
        proId: this.proId
      })
      if(res.code==0){
        
      }
    },

  },
}
</script>

<style scoped lang='scss'>
.pin{
  background-color: #fff;
  margin-top: 20rpx;
  .tit{
    height: 90rpx;
    border-bottom: 1rpx solid #ededed;
    font-size: 32rpx;
	  font-weight: bold;
    padding: 0 30rpx
  }
  .list{
    height: 142rpx;
    border-bottom: 1rpx solid #ededed;
    padding: 0 30rpx;
    .right{
      width: 144rpx;
      height: 49rpx;
      background-color: #ff3333;
      border-radius: 24rpx;
      font-size: 24rpx;
      color: #fff
    }
    img{
      width: 72rpx;
	    height: 73rpx;
      border-radius: 50%;
      margin-right: 20rpx
    }
    .left{
      p{
        font-size: 24rpx;
        color: #666666;
        span{
          color: #ff3333;
        }
      }
    }
  }
}
.play{
  background-color: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  .img{
    img{
      width: 690rpx;
      height: 190rpx;
      margin: 10rpx 0
    }
  }
  .tit{
    height: 88rpx;
    img{
      width: 12rpx;
	    height: 20rpx;
      margin-left: 20rpx
    }
    p{
      font-size: 32rpx;
	    font-weight: bold;
    }
    span{
      color: #999999;
    }

  }
}
.foot{
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 98rpx;
  box-sizing: border-box;
  padding: 0 30rpx 0 0;
  box-shadow: 0 -3rpx 8rpx 0rpx rgba($color: #000000, $alpha: 0.1);
  .left div:nth-child(1) img{
    width: 34rpx;
	  height: 34rpx;
  }
  .left div:nth-child(2) img{
    width: 32rpx;
	  height: 32rpx;
  }
  .left div:nth-child(3) img{
    width: 34rpx;
	  height: 32rpx;
  }
  .right{
    width: 400rpx;
    height: 70rpx;
    border-radius: 35rpx;
    color: #fff;
    font-size: 26rpx;
	  font-weight: bold;
    overflow: hidden;
  }
  .right p:nth-child(1){
    background-color: #fda33a
  }
  .right p:nth-child(2){
    background-color: #ff3333
  }
  .left{
    div{
      width: 105rpx;
      text-align: center;
      font-size: 22rpx;
      color: #999;
      position: relative;
    }
    span{
      position: absolute;
      width: 26rpx;
      height: 26rpx;
      border-radius: 50%;
      background-color: #fa3d34;
      color: #fff;
      font-size: 20rpx;
      top: -10rpx;
      right: 23rpx
    }
  }
}
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
