<template>
  <div class="p30">
      <img class="shopImg" src="http://jd.wtvxin.com/images/images/shop/joinShop.png" alt="" @click="goUrl('/pages/news/newslist/main')">
      <h3>为你收集港澳台心意店铺<span class="red" @click="goUrl('/pages/shop/join/main')">(开店)</span></h3>
      <div class="list">
        <block v-for="(item,index) in ShopList" :key="index">
          <div class="item flex-center-start" @click="goshop(item.Id)">
            <img :src="item.Logo" :alt="item.Name">
            <div class="item_r">
              <div class="item-top flex-center-between">
                <div class="tit ellipsis">{{item.Name}}</div>
                <div class="inShop">进店</div>
              </div>
              <!-- <p class="ellipsis">{{item.Describe}}</p> -->
            </div>
          </div>
        </block>
      </div>
      <div style="height:90rpx"></div>
      <div class="footbox">
        <div class="footItem" @click="goUrl('/pages/news/newsdetail/main?type=1')">购物须知</div>
        <div class="footItem" @click="goUrl('/pages/news/newsdetail/main?type=2')">服务条款</div>
        <div class="footItem" @click="notUrl">物流查询</div>
      </div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {
  data () {
    return {
      ShopList:[]
    }
  },
  onLoad(){
  },
  onShow(){
    if(this.ShopList.length<1){
      this.GetVisitShopList();
    }
  },
  methods: {
      goshop(id){
        wx.switchTab({
          url: '/pages/index/main'
        })
        wx.setStorageSync("shopid", id);
      },
      goUrl(str){
        wx.navigateTo({
          url:str
        })
      },
      // 店铺列表
      async GetVisitShopList(){
        let res=await post("User/GetVisitShopList",{
          userId: wx.getStorageSync("userId"),
          token: wx.getStorageSync("token"),
        },this.GetVisitShopList)
        if(res.code==0){
          this.ShopList=res.data
        }
      },
      notUrl(){
        wx.showToast({
          title:'该功能暂未开放，敬请期待',
          icon:'none'
        })
      }
  },
  onPullDownRefresh() {
    //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
    this.ShopList={};
    this.GetVisitShopList();
    wx.stopPullDownRefresh();  //停止下拉刷新动画
  }
}
</script>

<style scoped lang='scss'>
    .shopImg{
      width:100%;
      height:220rpx;
    }
    h3{
      font-size:30rpx;
      line-height:80rpx;
    }
    .list{
      .item{
        font-size:26rpx;
        background:#fff;
        margin-bottom:20rpx;
        padding:20rpx;
        &>img{
          width:120rpx;
          height:120rpx;
          border-radius:7rpx;
        }
        .item_r{
          margin-left:30rpx;
          width:500rpx;
          .item-top{
            .tit{
              font-size:32rpx;
              line-height:2;
              width:400rpx;
            }
            .inShop{
              border:1rpx solid #ff3333;
              color:#ff3333;
              padding:0 20rpx;
              line-height:2;
              border-radius:30rpx;
            }
          }
          p{
            color:#999;
            line-height:2;
              width:500rpx;
          }
        }
      }
    }
    .footbox{
      width: 100%;
      padding: 0 30rpx;
      height: 90rpx;
      background: #f5f5f5;
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius:7rpx;
      .footItem{
        text-align: center;
        width: 30%;
        height: 60rpx;
        line-height: 60rpx;
        background: #fff;
      }
    }
</style>
