<template>
  <div>
    <div class="top">
      <div class="search ali-c">
        <p class="oneline shopName">{{shopName}}</p>
        <div class="right flexc flex1" @click="goUrl('/pages/goodsSon/goodsSearch/main')">
          <img src="http://jd.wtvxin.com/images/images/index/search.png" alt="">
          <span>搜索</span>
        </div>
      </div>
      <swiper v-if="banner.length" class="swiper" indicator-dots autoplay circular>
        <swiper-item class="flexc" v-for="(item,index) in banner" :key="index">
          <img :src="item" alt="">
        </swiper-item>
      </swiper>
    </div>
    <div class="bai"></div>
    <div class="icon flex">
      <div class="flex1 flexc" @click="goUrl('/pages/goodsSon/dayday/main')">
        <div>
          <img src="http://jd.wtvxin.com/images/images/index/icon1.png" alt="">
          <p>天天特惠</p>
        </div>
      </div>
      <div class="flex1 flexc" @click="goUrl('/pages/goodsSon/article/main')">
        <div>
          <img src="http://jd.wtvxin.com/images/images/index/icon2.png" alt="">
          <p>动态文章</p>
        </div>
      </div>
      <div class="flex1 flexc" @click="goUrl('/pages/myson/ticketcenter/main')">
        <div>
          <img src="http://jd.wtvxin.com/images/images/index/icon3.png" alt="">
          <p>优惠券</p>
        </div>
      </div>
      <div class="flex1 flexc" @click="goUrl('/pages/goodsSon/classify/main')">
        <div>
          <img src="http://jd.wtvxin.com/images/images/index/icon4.png" alt="">
          <p>商品分类</p>
        </div>
      </div>
    </div>
    <div class="youhui ali-c jus-b">
      <img @click="goUrl('/pages/goodsSon/rob/main')" src="http://jd.wtvxin.com/images/images/index/qianggou.png" alt="">
      <img @click="goUrl('/pages/team/goods/main')" src="http://jd.wtvxin.com/images/images/index/pintuan.png" alt="">
    </div>
    <div class="goods-box" id="goods-box">
      <div class="xd">
        <div class="all flexc">
          <img src="http://jd.wtvxin.com/images/images/index/title.png" alt="">
        </div>
        <div class="shai flex">
          <div :class="['flex1 flexc',item.active?'active':'']" @click="filter(index)" v-for="(item,index) in filterTab" :key="index">
            <span>{{item.name}}</span>
            <span v-if="item.isSortorder" :class="['filterBtn','f_'+item.sortorder]"><i class="icon-top"></i><i class="icon-down"></i></span>
          </div>
        </div>
      </div>
      <div class="goods jus-b flex-wrap" v-if="hasData">
        <div class="list" v-for="(item, index) in goodsList" :key="index" 
          @click="goUrl('/pages/goodsSon/goodsDetail/main',item.Id)"
          >
          <img class="img" :src="item.Pic" :alt="item.Name">
          <div class="text-box">
            <p class="tit oneline">{{item.Name}}</p>
            <div class="price">
              <span>￥</span><span>{{item.Price}}</span><span>￥{{item.MarketPrice}}</span>
            </div>
            <div class="carda ali-c jus-b">
              <span>已售{{item.SalesVolume}}</span>
              <img src="http://jd.wtvxin.com/images/images/index/shop_card.png" alt="">
            </div>
          </div>
        </div>
      </div>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
    </div>
    <movable-area class="move-box-fa">
      <movable-view class="move-box" direction='all' inertia x='10000' y='0' damping='1000000' friction='1'>
        <img class="car" src="http://jd.wtvxin.com/images/images/index/card.png" alt="" @click="goCart">
      </movable-view>
    </movable-area>
    
  </div>
</template>

<script>
import {post,get,getNewMsgDot} from '@/utils'
import noData from "@/components/noData"; //没有数据的通用提示。
import LoadMore from '@/components/load-more';
export default {
  components: {
		noData,
		LoadMore
  },
  data () {
    return {
      userId: "",
			token: "",
      shopid:"",
      shopName:"",
      banner:[],
      hasData:false,
			noDataIsShow: false,//没有数据的提示是否显示
			page: 1,
      pageSize: 8,
      allPage: 0,
			count: 0,
			isLoad: false,
			isOved:false,       //显示已经到底了
			loadingType: 0, //0加载前，1加载中，2没有更多了
      goodsList:{},
      filterTab: [{
          name: "默认",
          sortname: "m",
          isSortorder: false,
          active: true
        },
        {
          name: "销量",
          sortorder: 0, //2：倒序；1:为顺序
          sortname: "s",
          isSortorder: true,
          active: false
        },
        {
          name: "价格",
          sortorder: 0, //2：倒序；1:为顺序
          sortname: "j",
          isSortorder: true,
          active: false
        }
      ],
      sortname: "m", //j：价格排序；s：销量排序；m：默认排序
      sFilter:0,//按销量 0:无 1:价格正序 2:价格倒序 ,
      pFilter:0//按价格
    }
  },
  onLoad(e){
    this.init();
  },
  onShow(){
  },
  methods: {
    init(){
      this.userId = wx.getStorageSync("userId");
      this.token = wx.getStorageSync("token");
      if(wx.getStorageSync("shopid")){
        this.shopid = wx.getStorageSync("shopid");
        this.AddVisitShop();//添加浏览店铺
      }else{
        this.shopid ="50FB070743F1853A";
      }
      this.GetMerchantDetail();
      this.GetShopRecruitment();
      // 初始化
      this.hasData=false;
      this.noDataIsShow=false;//没有数据的提示是否显示
      this.loadingType=0;
      this.page=1;
      this.isLoad=false;
      this.isOved=false; 
      this.sFilter=0;//按销量 0:无 1:价格正序 2:价格倒序 ,
      this.pFilter=0;
      this.goodsList={};
      this.GetProductList();
      getNewMsgDot()
    },
    goUrl(url,param){
      if(param==0){
         wx.showToast({
          title: "该功能暂未开放，敬请期待",
          icon: "none",
          duration: 2000
        });
      }else{
        wx.navigateTo({
          url:url+'?id='+param
        })
      }
    },
    goCart(){
      wx.navigateTo({
        url:'/pages/cart/main'
      })
    },
    // 店铺信息
    async GetMerchantDetail(){
      let res=await post("Shop/GetMerchantDetail",{
        ShopId:this.shopid
      })
      if(res.code==0){
        this.shopName=res.data.ShopInfo.shopNick;
      }
    },
    //添加浏览店铺
    async AddVisitShop(){
      let res=await post("Login/AddVisitShop",{
        OpenId:wx.getStorageSync("openId"),
        ShopId:this.shopid,
        Lng:"",
        Lat:""
      })
    },
    async GetShopRecruitment(){
      let res=await post("Shop/GetShopRecruitment",{
        ShopId:this.shopid
      })
      if(res.code==0){
        if(res.data){
          res.data=res.data.slice(0,res.data.length-1);
          this.banner=res.data.split(',');
        }
      }
    },
    async GetProductList(){
      let res=await post("Goods/GetProductList",{
        PageIndex: this.page,
        PageSize: this.pageSize,
        ShopId: this.shopid,
        SalesVolumeFilter: this.sFilter,
        PriceFilter: this.pFilter,
        Key: ""
      })
      if(res.code==0){
          let _this=this;
					if (res.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
					}
					this.count = res.count;
					if (this.count == 0) {
						this.noDataIsShow = true;
						this.hasData = false;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (this.page === 1) {
						this.goodsList = res.data;
					}
					if (this.page > 1) {
						this.goodsList = this.goodsList.concat(
							res.data
						);
					}
					if (this.allPage <= this.page) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
					}
       }else{
				 wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
			 }
    },
    filter(index){
      let _this=this;
      _this.filterTab.forEach(function(item, subIndex) {
        if (subIndex === index) {
          _this.$set(item, 'active', true);
          if (item.isSortorder) {
            if (item.sortorder == 0) {
              _this.$set(item, 'sortorder', 1);
              return false;
            } else if (item.sortorder == 1) {
              _this.$set(item, 'sortorder', 2);
              return false;
            } else if (item.sortorder == 2){
              _this.$set(item, 'sortorder', 1);
              return false;
            }
          }
        } else {
          _this.$set(item, 'active', false);
          _this.$set(item, 'sortorder', 0);
          return false;
        }
      });
      _this.sortname = _this.filterTab[index].sortname;
        if(_this.sortname=="s"){
          _this.sFilter=_this.filterTab[index].sortorder;
          _this.pFilter=0;
        }else if(_this.sortname=="j"){
          _this.sFilter=0;
          _this.pFilter=_this.filterTab[index].sortorder;
        }else{
          _this.sFilter=0;
          _this.pFilter=0;
        }
				_this.page = 1;
				_this.goodsList = {};
				_this.noDataIsShow = false;
				_this.isLoad = false;
				_this.isOved = false;
				_this.loadingType = 0; //0加载前，1加载中，2没有更多了
        _this.GetProductList();
        
    },
  },
  onReachBottom: function() {
    if (this.isLoad) {
			this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.GetProductList();
    } else {
			this.loadingType = 2;
      if (this.page > 1) {
        this.isOved = true;
      } else {
        this.isOved = false;
      }
    }
  },
   onPullDownRefresh() {
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
      let _this=this;
        _this.page=1;
				_this.goodsList = {};
				_this.GetProductList();
				wx.stopPullDownRefresh();  //停止下拉刷新动画
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
  top: auto;
  bottom: 30rpx;
  right: 30rpx;
  width: 130rpx;
	height: 130rpx;
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
  width: 100%;
	height: 100%;
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
        // margin-bottom:15rpx;
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
        line-height: 60rpx;
        width:294rpx;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display:block!important;
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
    .active{
      color: #ff3333;
    }
    .filterBtn{
      display: block;
      width: 16rpx;
	    height: 22rpx;
      margin-left: 15rpx;
      position: relative;
      i{
        position: absolute;
        display: block;
      }
      .icon-top{
        top: 0;
        border-left: 8rpx solid transparent;
        border-right: 8rpx solid transparent;
        border-bottom: 10rpx solid #999;
      }
      .icon-down{
        bottom: 0;
        border-left: 8rpx solid transparent;
        border-right: 8rpx solid transparent;
        border-top: 10rpx solid #999;
      }
    }
    .f_1 .icon-top{
      border-bottom-color: #ff3333
    }
    .f_2 .icon-down{
      border-top-color: #ff3333
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
    .shopName{
      max-width: 70%;
    }
    p{
      font-size: 48rpx;
      color: #fff;
      margin-right: 30rpx;
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
