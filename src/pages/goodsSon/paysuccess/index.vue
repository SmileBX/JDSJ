<template>
  <div>
      <div class="tit_red flex flexColumn flexAlignCenter justifyContentCenter">
          <div class="flex flexAlignCenter">
              <img v-if="paystaus!='fail'" src="http://jd.wtvxin.com/images/images/icons/gou_w.png" alt="" class="gou_w">
              <span class="font30 mr2">{{paystaus=="fail"?"支付失败":"支付成功"}}</span>
          </div>
          <div class="mt2"><span class="font20">￥</span><span class="font30 fb">{{TotalPrice}}</span></div>
          <div class="mt2 flex btn_tt justifyContentAround">
              <p class="btn_ccc" @click="goshop">返回首页</p>
              <p class="btn_ccc" v-if="GroupId" @click="goGroup">查看拼团</p>
              <p class="btn_ccc" @click="goOrder">查看订单</p>
          </div>
      </div>
      <div class="pp2 flex justifyContentCenter flexAlignCenter">
          <img src="http://jd.wtvxin.com/images/images/icons/ll_left.png" alt="" class="mm_ll">
          <span class="mm_cc fb">为你推荐</span>
          <img src="http://jd.wtvxin.com/images/images/icons/ll_right.png" alt="" class="mm_ll">
      </div>
      <div class="goods-box">
        <div class="goods jus-b flex-wrap" v-if="hasData">
          <div class="list" v-for="(item, index) in goodsList" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.Id)">
            <img class="img" :src="item.Pic" :alt="item.Name">
            <div class="text-box">
              <p class="tit twoline">{{item.Name}}</p>
              <div class="price">
                <span>￥</span><span>{{item.Price}}</span><span>￥{{item.MarketPrice}}</span>
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
      OrderNo:"",
      NOarr:[],
      userId: "",
      token: "",
      paystaus:"",
      TotalPrice:"",
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
      goodsList:{},
      GroupId:'',
      GroupRecordId:'',
    }
  },
  onLoad(options){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.GroupId = options.GroupId||'';
    this.GroupRecordId = options.GroupRecordId||'';
  },
  onShow(){
    this.OrderNo=this.$root.$mp.query.OrderNo;
    this.NOarr=this.OrderNo.split(",");
    this.paystaus=this.$root.$mp.query.msg||'';
    this.shopid = wx.getStorageSync("shopid");
    this.GetOrdersMoney();
    this.GetProductList();
  },
  methods: {
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    
    //查询订单金额
    async GetOrdersMoney(){
      let res=await post("Order/GetPayAfterOrdersMoney",{
          OrderNo: this.OrderNo,
          UserId: this.userId,
          Token: this.token
      })
      if(res.code==0){
        this.TotalPrice=res.data;
      }
    },
    goshop(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    goGroup(){
        wx.navigateTo({
          url:`/pages/team/pintuan/main?GroupId=${this.GroupId}&GroupRecordId=${this.GroupRecordId}`
        })
    },
    goOrder(){
      if(this.NOarr.length>1){
        wx.redirectTo({
          url:'/pages/myson2/order/main?type=0'
        })
      }else{
        wx.redirectTo({
          url:'/pages/myson2/orderdetail/main?id='+this.OrderNo
        })
      }
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
  .goods-box{
    .goods{
      padding: 10rpx 30rpx 30rpx;
        .list{
          width: 335rpx;
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
  .tit_red{
    background: #ff3333;width:100%;height:320rpx;
    color:#ffffff;
    .gou_w{
      width:48rpx;height:48rpx;
    }
    .font30{
      font-size:38rpx;
    }
    .btn_ccc{
      width:230rpx;height:66rpx;line-height: 66rpx;
      border:1rpx solid #f5f5f5;border-radius:30rpx;
      text-align: center;
    }
    .btn_tt{
      width:100%;
    }
  }
  .mm_ll{
    width:29rpx;height:24rpx;
  }
  .mm_cc{
    margin:0 40rpx;
  }
</style>
