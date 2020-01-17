<template>
  <div>
    <div class="goods-box">
      <div class="xd">
        <div class="shai flex">
          <div :class="['flex1 flexc',item.active?'active':'']" @click="filter(index)" v-for="(item,index) in filterTab" :key="index">
            <span>{{item.name}}</span>
            <span v-if="item.isSortorder" :class="['filterBtn','f_'+item.sortorder]"><i class="icon-top"></i><i class="icon-down"></i></span>
          </div>
        </div>
      </div>
      <div class="goods jus-b flex-wrap" v-if="hasData">
        <div class="list" v-for="(item, index) in goodsList" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.Id)">
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
  </div>
</template>

<script>
import {post,get} from '@/utils'
import noData from "@/components/noData"; //没有数据的通用提示
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
      title:"商品列表",
      shopid:"",
      ClassId:"",
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
      sFilter:0,//按销量
      pFilter:0//按价格
    }
  },
  onShow(){
    this.shopid = wx.getStorageSync("shopid");
    this.title=this.$root.$mp.query.name;
    this.ClassId=this.$root.$mp.query.cid;
    wx.setNavigationBarTitle({
      title: this.title
    });
    this.GetProductList();
  },
  methods: {
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    async GetProductList(){
      let res=await post("Goods/GetClassProductList",{
        PageIndex: this.page,
        PageSize: this.pageSize,
        ShopId: this.shopid,
        ClassId:this.ClassId,
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
.goods-box{
  background-color: #f5f5f5;
  .goods{
    padding: 30rpx;
    .list{
      width: 335rpx;
      height: 525rpx;
      border-radius: 10rpx;
      overflow: hidden;
      margin-bottom: 20rpx;
      background: #fff;
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
</style>
