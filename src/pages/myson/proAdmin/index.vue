<template>
  <div class="admin">
      <div class="tabs">
        <div class="left" @click="goUrl('proAdminSon/orderList')">
          <img src="/static/icons/order.png" alt="">
          <p>订单管理</p>
        </div>
        <div class="right">
          <img src="/static/icons/shop.png" alt="">
          <p>店铺管理</p>
        </div>
      </div>
      <div class="content">
        <div class="dataBox">
          <h2>今日数据</h2>
          <div class="data">
            <div class="list1">
              <p>访客数</p>
              <span>{{today.VisitCountToday}}</span>
            </div>
            <div class="list2">
              <p>订单数</p>
              <span>{{today.TodayOrderCount}}</span>
            </div>
            <div class="list1">
              <p>订单金额</p>
              <span>{{today.TodayAmount}}</span>
            </div>
          </div>
        </div>
        <div class="dataBox">
          <h2>总计数据</h2>
          <div class="data">
            <div class="list1">
              <p>访客数</p>
              <span>{{shop.VisitCount}}</span>
            </div>
            <div class="list2">
              <p>订单数</p>
              <span>{{shop.AllOrderCount}}</span>
            </div>
            <div class="list1">
              <p>订单金额</p>
              <span>{{shop.AllAmount}}</span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {post,get} from '@/utils';
export default {
  data () {
    return {
      userId: "",
			token: "",
      shopid:"",
      shop:{},
      today:{},
    }
  },
  onShow(){
    this.shopid=wx.getStorageSync("shopid");
    this.userId=wx.getStorageSync("userId");
    this.token=wx.getStorageSync("token");
    this.getShopData()
    this.getTodayData()
  },
  methods: {
    async getShopData(){
      let res=await post("Shop/GetStatisticsInfo",{
        "UserId": this.userId,
        "Token": this.token,
        "ShopId": this.shopid,
      })
      this.shop = res.data;
    },
    async getTodayData(id){
      let res=await post("Shop/GetStatisticsInfoToday",{
        "UserId": this.userId,
        "Token": this.token,
        "ShopId": this.shopid,
      })
      this.today = res.data;
    },
    goUrl(url){
      wx.navigateTo({
        url:'/pages/'+url+'/main'
      })
    }
  },
}
</script>

<style scoped lang='scss'>
  .tabs{
    display:flex;
    align-items:center;
    justify-content:center;
    padding:40rpx 0;
    margin:20rpx 0;
    background:#fff;
    &>div{
      margin:0 100rpx;
      img{
        display:flex;
        flex-flow:column nowrap;
        align-items:center;
        width:100rpx;
        height:100rpx;
      }
      p{
        font-size:28rpx;
        line-height:1.5;
      }
    }
  }
  .content{
    background:#fff;
    .dataBox{
      padding-top:25rpx;
    }
    h2{
      position:relative;
      font-size:32rpx;
      padding-left:20rpx;
      line-height:36rpx;
      &::before{
        content:'';
        display:block;
        width:8rpx;
        height:32rpx;
        background:#ff3333;
        position:absolute;
        left:0;
        top:2rpx;
      }
    }
    .data{
      margin:0 20rpx;
      padding:20rpx 0 ;
      display:flex;
      align-items:center;
      justify-content:space-between;
      text-align:center;
      border-bottom:#e8e8e8 solid 1rpx;
      &>div{
      }
      p{
        font-size:28rpx;
        color:#666;
        line-height:1.5;
      }
      span{
        font-size:36rpx;
        line-height:1.6;
      }
    }
  }
</style>
