<template>
  <div class="bg">
      <img class="top" src="http://jd.wtvxin.com/images/images/index/tehui.png" alt="">
      <div class="list-box" v-if="hasData">
        <div class="list ali-c jus-b" v-for="(item, index) in goodsList" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.Id)">
          <img class="left" :src="item.Pic" :alt="item.Name">
          <div class="right">
            <p class="tit oneline">{{item.Name}}</p>
            <p class="price">
              <span>￥</span><span>{{item.Price}}</span><span>￥{{item.MarketPrice}}</span>
            </p>
            <div class="rob ali-c jus-b">
              <span>已抢{{item.SalesVolume}}</span>
              <p class="flexc">去购买</p>
            </div>
          </div>
        </div>
      </div>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
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
      shopid:"",
      hasData:false,
			noDataIsShow: false,//没有数据的提示是否显示
			page: 1,
      pageSize: 8,
      allPage: 0,
			count: 0,
			isLoad: false,
			isOved:false,       //显示已经到底了
			loadingType: 0, //0加载前，1加载中，2没有更多了
      goodsList:{}
    }
  },
  onLoad(){
    this.init();
  },
  onShow(){
  },
  methods: {
    init(){
      this.page = 1;
      this.isLoad = false;
      this.isOved = false;
      this.noDataIsShow = false;
      this.hasData = false;
      this.userId = wx.getStorageSync("userId");
      this.token = wx.getStorageSync("token");
      this.shopid = wx.getStorageSync("shopid");
      this.GetProductList();
    },
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    //列表
    async GetProductList(){
      let res=await post("Goods/GetDiscountProductList",{
        PageIndex: this.page,
        PageSize: this.pageSize,
        ShopId: this.shopid
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
.list{
  box-sizing: border-box;
  height: 261rpx;
  background-color: #fff;
  padding: 0 20rpx;
  margin-top: 20rpx;
  border-radius: 16rpx;
  .left{
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
  }
  .right{
    width: 420rpx;
    .tit{
      font-weight: 900;
      margin-bottom: 10rpx
    }
    .rob{
      margin-top: 40rpx;
      span{
        color: #999;
        font-size: 22rpx;
      }
      p{
        width: 140rpx;
        height: 53rpx;
        background-color: #ff3333;
        border-radius: 26rpx;
        color: #fff
      }
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
      font-size: 22rpx;
      margin-left: 15rpx;
    }
  }
}
.top{
  width: 750rpx;
  height: 560rpx;
  
}
.list-box{
  padding: 30rpx;
  // min-height: 590rpx;
  margin-top: -10rpx;
}
.bg{
  background-color: #f8aeaa;
  min-height:100vh;
  & /deep/ .loading-text{
    color:#fff!important;
  }
}
</style>
