<template>
  <div class="bg_fff" style="min-height:100vh">
      <div class="search_inn bg_fff">
        <div class="sear_iner flex flexAlignCenter">
            <input type="text" placeholder="请输入要搜索的商品" class="flex1">
            <span class="sear_btn">
                <img src="/static/images/index/search.png" alt="" class="search">
            </span>
        </div>
      </div> 
      <!--展示搜索历史-->
      <div class="pw3" style="display:none">
          <div class="flex justifyContentBetween flexAlignCenter">
              <span>搜索历史</span>
              <img src="/static/images/icons/delete.png" alt="" class="del">
          </div>
          <div class="flex flexWrap">
              <span class="mt2 ser_iitem" v-for="(item,index) in 34" :key="index">煲仔饭</span>
          </div>
      </div>
      <!--搜索列表-->
    <div class="goods-box">
      <div class="xd">
        <div class="shai flex">
          <div class="flex1 flexc">
            <span>默认</span>
          </div>
          <div class="flex1 flexc">
            <span>销量</span>
            <img src="/static/images/index/shai.png" alt="">
          </div>
          <div class="flex1 flexc">
            <span>价格</span>
            <img src="/static/images/index/shai.png" alt="">
          </div>
        </div>
      </div>
      <div class="goods jus-b flex-wrap">
        <div class="list" v-for="(item, index) in 5" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main')">
          <img class="img" src="/static/images/index/goods.png" alt="">
          <div class="text-box">
            <p class="tit oneline">至本舒颜修护氨基酸洁至本舒颜修护氨基酸洁</p>
            <div class="price">
              <span>￥</span><span>29.00</span><span>￥39.00</span>
            </div>
            <div class="carda ali-c jus-b">
              <span>已售1235</span>
              <img src="/static/images/index/shop_card.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {switchPath,isJump} from '@/utils'
export default {

  data () {
    return {
     showEdit:false,
      
    }
  },

  onShow(){
    
  },
  methods: {
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
  .search{
    width:28rpx;height:28rpx;
  }
  .search_inn{
   padding:30rpx;
  }
  .sear_iner{
    border:1rpx solid #f5f5f5;border-radius: 30rpx;
    padding-left:30rpx;
    height:70rpx;
  }
  .sear_btn{
    background: #f00;height:70rpx;
    width:100rpx;text-align: center;line-height: 70rpx;
    border-radius:0 30rpx 30rpx 0;
  }
  .del{
    width:32rpx;height:32rpx;
  }
  .ser_iitem{
    background: #f2f2f2;border-radius:25rpx;
    padding:10rpx 30rpx;
    margin-right:20rpx;
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
</style>
