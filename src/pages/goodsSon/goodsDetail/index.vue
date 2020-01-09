<template>
  <div>
      <swiper class="swiper" @change="changeBanner">
        <div class="numpage">{{bannerindex+1}}/{{BannerNum}}</div>
        <swiper-item class="flexc" v-for="(item,index) in proInfo.ProductImgList" :key="index">
          <img mode='aspectFill' :src="item.PicUrl" alt="">
        </swiper-item>
      </swiper>
      <div class="top">
        <div class="jus-b ali-c">
          <div class="left">
            <p class="price">
              <span>￥</span><span>{{proInfo.ProductPrice}}</span><span>￥{{proInfo.MarketPrice}}</span>
            </p>
            <p class="tit">{{proInfo.ProductName}}</p>
          </div>
          <div class="right">
            <img src="/static/images/index/fenxiang.png" alt="">
          </div>
        </div>
        <div class="jus-b ali-c">
          <span class="txtinfo">已售：{{proInfo.SalesVolume}}</span>
          <span class="txtinfo">好评：{{proInfo.PraiseRate}}%</span>
        </div>
      </div>
      <div class="list-box">
        <div class="list ali-c jus-b" v-if="proInfo.Score!=0||proInfo.CouponList.length">
          <div class="left ali-c">
            <span>领券</span>
            <div>
              <div class="couponico ali-c jus-b">
                <block v-for="(item,index) in proInfo.CouponList" :key="index">
                  <div class="coupontxt" v-if="index<2">
                    <block v-if="item.DiscountType==1">
                      <block v-if="item.MeetConditions!=0">
                        满{{item.MeetConditions}}
                      </block>
                      <block v-else>下单立</block>
                      减{{item.Denomination}}
                    </block>
                    <block v-else>
                      <block v-if="item.MeetConditions!=0">
                        满{{item.MeetConditions}}
                      </block>
                      <block v-else>下单立</block>
                      打{{item.Denomination}}折
                    </block>
                  </div>
                </block>
              </div>
              <p v-if="proInfo.Score!=0">购物返<text class="red">{{proInfo.Score}}</text>积分</p>
            </div>
          </div>
          <div class="right ali-c">
            <img src="/static/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <span>规格</span>
            <p class="quan">{{SpecText||'请选择规格数量'}}</p>
          </div>
          <div class="right ali-c">
            <img src="/static/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b" v-if="false">
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
      <div class="play" v-if="isPin==1">
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
      <div class="pin" v-if="isPin==1">
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
          <p class="left">商品评价<span>({{proInfo.EvaluateCount}})</span></p>
          <div class="right" v-if="proInfo.EvaluateCount>0">
            <span>查看全部</span>
            <img src="/static/images/index/more_r.png" alt="">
          </div>
        </div>
        <div class="main" v-if="proInfo.EvaluateCount>0">
          <block v-for="(item,index) in proInfo.EvaluateList" :key="index">
            <div v-if="index<1">
              <div class="name ali-c jus-b">
                <div class="ali-c">
                  <img class="left" :src="item.MemberAvatar||'/static/images/ava.png'" alt="">
                  <p>{{item.MemberName}}</p>
                </div>
                <div>
                  <img class="right" src="/static/images/index/star.png" alt="">
                </div>
              </div>
              <p class="detail">
                {{item.ContentText}}
              </p>
              <p class="time">{{item.AddTime}}</p>
            </div>
          </block>
        </div>
        <div class="main" v-else>
          <p style="padding: 20rpx; color: #999; text-align: center;">
            暂无评论
          </p>
        </div>
      </div>
      <div class="goods-detail">
        <p class="tit">商品详情</p>
        <div class="detail-box">
          <div v-html="proInfo.ContentDetail"></div>
          <div v-if="proInfo.ContentDetail==''" style="text-align: center;">卖家暂时还没有为该商品提供详细信息！</div>
        </div>
      </div>
      <div style="height: 100rpx;"></div>
      <div class="foot ali-c jus-b">
        <div class="left ali-c">
          <div>
            <img src="/static/images/index/ans.png" alt="">
            <p>客服</p>
          </div>
          <div @click="collect"> 
            <img v-if="IsCollect" src="/static/images/index/collect_y.png" alt="">
            <img v-else src="/static/images/index/collect_n.png" alt="">
            <p>收藏</p>
          </div>
          <div>
            <img src="/static/images/index/cart.png" alt="">
            <p>购物车</p>
            <span class="num flexc" v-if="CartNumber>0">{{CartNumber}}</span>
          </div>
        </div>
        <div class="right flex">
          <p class="flex1 flexc">加入购物车</p>
          <p class="flex1 flexc">立即购买</p>
        </div>
      </div>
      <div class="topbtn" @click="Top" v-if="isTop"></div>
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
      shopid:"",
      isTop:false,//是否显示置顶
      IsCollect:false, //是否收藏该商品
      isLimint:0,//0非限时购产品，1限时购产品
      isPin:0,//0非拼团产品，1拼团产品
      proInfo:{},//商品信息
      bannerindex:0,//当前轮播图
      BannerNum:0,//轮播图数量
      CartNumber:0,//购物车数量
      SpecText:""
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
    this.GetAllCartNumber();
  },
  methods: {
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    //返回顶部
    Top(){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 200
      });
    },
    changeBanner(e){
      this.bannerindex=e.detail.current;
    },
    async ProductInfo(){
      let res=await post("Goods/ProductInfo",{
        userId: this.userId,
        token: this.token,
        ShopId:this.shopid,
        proId: this.proId
      })
      if(res.code==0){
        this.proInfo=res.data;
        this.BannerNum=res.data.ProductImgList.length;
        this.IsCollect=res.data.IsCollectionPro;
      }
    },
    //获取购物车数
    async GetAllCartNumber(){
      let res=await post("Cart/GetAllCartNumber",{
        userId: this.userId,
        token: this.token,
        ShopId:this.shopid
      })
      if(res.code==0){
        this.CartNumber=res.data;
      }
    },
    //添加取消收藏
			async collect(){
				let res = await post("Goods/ProductCollection", {
					proId: this.proId,
					userId:this.userId,
					token:this.token
				  });
				if(res.code==0){
					if(this.IsCollect){
						wx.showToast({
							title: "已取消收藏！",
							icon:"none",
							duration: 1500
						});
						this.IsCollect=false;
					}else{
						wx.showToast({
							title: "添加收藏成功！",
							icon:"none",
							duration: 1500
						});
						this.IsCollect=true;
					}
				};
			},
  },
  onPageScroll(e){
    if(e.scrollTop>300){
      this.isTop=true;
    }else{
      this.isTop=false;
    }
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
  .detail-box{
    image{
      max-width:100%!important
    }
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
  padding: 0 30rpx 20rpx;
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
  }
  .txtinfo{
    font-size: 26rpx;
    color: #999
  }
}
.swiper{
  height: 700rpx;
  position: relative;
  .numpage{
    position: absolute;
    right: 20rpx; 
    bottom: 20rpx;
    padding: 0 10rpx;
    color: #fff;
    font-size: 24rpx;
    background: rgba(0,0,0,.4); 
    border-radius: 100px;
    z-index: 2;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.couponico {
  margin: 10rpx 0 4rpx;
   .coupontxt {
    line-height: 1;
    padding: 6rpx 16rpx;
    color: #f63517;
    font-size: 26rpx;
    border: 1px solid #f63517;
    margin-right: 20rpx;
    border-radius: 4px;
    position: relative;
  }
  .coupontxt:before,.coupontxt:after {
    display: block;
    content: "";
    position: absolute;
    height: 16rpx;
    width: 16rpx;
    border-top: 1px solid #f63517;
    border-right: 1px solid #f63517;
    top: 50%;
    margin-top: -8rpx;
    background: #fff;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .coupontxt:before {
    left: -8rpx;
    transform: rotate(45deg);
  }
  .coupontxt:after {
    right: -8rpx;
    transform: rotate(-135deg);
  }
}
</style>
