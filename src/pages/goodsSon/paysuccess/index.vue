<template>
  <div>
      <div class="tit_red flex flexColumn flexAlignCenter justifyContentCenter">
          <div class="flex flexAlignCenter">
              <img src="/static/images/icons/gou_w.png" alt="" class="gou_w">
              <span class="font30 mr2">支付成功</span>
          </div>
          <div class="mt2"><span class="font20">￥</span><span class="font30 fb">56.33</span></div>
          <div class="mt2 flex btn_tt justifyContentAround">
              <p class="btn_ccc">返回首页</p>
              <p class="btn_ccc">查看订单</p>
          </div>
      </div>
      <div class="pp2 flex justifyContentCenter flexAlignCenter">
          <img src="/static/images/icons/ll_left.png" alt="" class="mm_ll">
          <span class="mm_cc fb">为你推荐</span>
          <img src="/static/images/icons/ll_right.png" alt="" class="mm_ll">
      </div>
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
  .goods-box{
    background-color: #fff;
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
