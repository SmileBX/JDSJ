<template>
  <div class="p30">
      <img class="shopImg" src="http://jd.wtvxin.com/images/images/shop/joinShop.png" alt="" @click="joinShop">
      <h3>为你收集港澳台心意店铺</h3>
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
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {
  data () {
    return {
      userId: "",
      token: "",
      ShopList:{}
    }
  },
  onLoad(){
   
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.GetVisitShopList();
  },
  methods: {
      goshop(id){
        wx.switchTab({
          url: '/pages/index/main'
        })
        wx.setStorageSync("shopid", id);
      },
      // 加入店铺
      joinShop(){
        wx.navigateTo({
          url:'/pages/shop/join/main'
        })
      },
      // 店铺列表
      async GetVisitShopList(){
        let res=await post("User/GetVisitShopList",{
          userId: this.userId,
          token: this.token,
        })
        if(res.code==0){
          this.ShopList=res.data
        }
      }
  },
  onPullDownRefresh() {
    //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
    let _this=this;
    this.ShopList={};
    setTimeout(function () {
      _this.GetVisitShopList();
      wx.stopPullDownRefresh();  //停止下拉刷新动画
    }, 1000);
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
</style>
