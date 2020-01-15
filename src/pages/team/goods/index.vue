<template>
  <div>
      <!-- <div class="list ali-c jus-b">
        <img class="left" src="http://jd.wtvxin.com/images/images/index/icon4.png" alt="">
        <div class="right">
          <p class="tit oneline">动感单车 运动 女家用型</p>
          <div class="ali-c jus-b hot">
            <div class="one flexc">
              <img src="http://jd.wtvxin.com/images/images/index/hot.png" alt="">
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
      </div> -->
      <div class="list ali-c jus-b" v-for="(item,index) in goodsList" :key="index">
        <img class="left" :src="item.ProductImg" alt="">
        <div class="right">
          <p class="tit oneline">{{item.ProductName}}</p>
          <div class="ali-c jus-b hot">
            <div class="one flexc">
              <img src="http://jd.wtvxin.com/images/images/index/hot.png" alt="">
              <span>已拼{{item.SuccessGroup}}件</span>
            </div>
            <p class="flexc">{{item.MinPeopleNum}}人团</p>
          </div>
          <div class="price ali-c jus-b">
            <p>
              <span>￥</span><span>{{item.FightingPrice}}</span><span>￥{{item.OriginalPrice}}</span>
            </p>
            <div class="flexc">去开团</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {post,switchPath,isJump} from '@/utils'
export default {

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
      goodsList:[],
    }
  },

  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid=wx.getStorageSync("shopid");
    this.GetProductList()
  },
  methods: {
    async GetProductList(){
      let res=await post("GroupBuy/GetGroupProductList",{
        Page: this.page,
        PageSize: this.pageSize,
        ShopId: this.shopid,
        // SalesVolumeFilter: this.sFilter,
        // PriceFilter: this.pFilter,
        // Key: ""
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
