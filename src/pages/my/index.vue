<template>
  <div>
      <div class="top-box">
        <div class="top ali-c">
          <img mode='aspectFill' class="left" :src="info.Avatar" alt="">
          <div class="right">
            <div class="ali-c one">
              <p>{{info.NickName}}</p>
            </div>
            <p class="two">{{info.Mobile}}</p>
          </div>
        </div>
        <img class="bg" mode='aspectFill' src="/static/images/mine_bg.png" alt="">
      </div>
      <div class="card-box">
        <div class="card">
          <p class="flex justifyContentBetween less_bb">
              <span>我的订单</span>
              <span class="flex cg flexAlignCenter" @click="switchPath('/pages/myson2/order/main')">
                <span class="font24">全部订单</span>
                <img src="/static/images/icons/right.png" alt="" class="icon_right mr1">
              </span>
          </p>
          <div class="icon-box flex-wrap ali-c">
            <div class="icon2 flexc" @click="switchPath('/pages/myson/focus/main')">
              <div>
                <img src="/static/images/icons/1.png" alt="">
                <p>待付款</p>
                <span class="flexc">2</span>
              </div>
            </div>
            <div class="icon2 flexc" @click="switchPath('/pages/myson/focus/main')">
              <div>
                <img src="/static/images/icons/2.png" alt="">
                <p>待发货</p>
                <span class="flexc">2</span>
              </div>
            </div>
            <div class="icon2 flexc" @click="switchPath('/pages/myson/focus/main')">
              <div>
                <img src="/static/images/icons/3.png" alt="">
                <p>待收货</p>
                <span class="flexc">2</span>
              </div>
            </div>
            <div class="icon2 flexc" @click="switchPath('/pages/myson/focus/main')">
              <div>
                <img src="/static/images/icons/4.png" alt="">
                <p>评价</p>
                <span class="flexc">2</span>
              </div>
            </div>
            <div class="icon2 flexc" @click="switchPath('/pages/myson/focus/main')">
              <div>
                <img src="/static/images/icons/5.png" alt="">
                <p>退款/售后</p>
                <span class="flexc">2</span>
              </div>
            </div>
          </div>

        </div>

        <div class="card">
          <p class="tit ali-c">常用功能</p>
          <div class="icon-box icon-boxb flex-wrap ali-c">
            <div class="icon flexc"  @click="switchPath('/pages/myson/ticket/main')">
              <div>
                <img src="/static/images/icons/6.png" alt="">
                <p>优惠劵</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/collect/main')">
              <div>
                <img src="/static/images/icons/7.png" alt="">
                <p>我的收藏</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/invite/main')">
              <div>
                <img src="/static/images/icons/8.png" alt="">
                <p>浏览记录</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/address/main')">
              <div>
                <img src="/static/images/icons/9.png" alt="">
                <p>地址管理</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/shop/index/main')">
              <div>
                <img src="/static/images/icons/10.png" alt="">
                <p>店铺列表</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/shop/join/main')">
              <div>
                <img src="/static/images/icons/11.png" alt="">
                <p>申请店铺</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <p class="tit ali-c">更多工具</p>
          <div class="icon-box icon-boxb flex-wrap ali-c">
            <div class="icon flexc" @click="switchPath('/pages/myson/mytuan/main')">
              <div>
                <img src="/static/images/icons/12.png" alt="">
                <p>我的拼团</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/mycomment/main')">
              <div>
                <img src="/static/images/icons/13.png" alt="">
                <p>我的评价</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/invoiceList/main')">
              <div>
                <img src="/static/images/icons/14.png" alt="">
                <p>我的发票</p>
              </div>
            </div>
            <div class="icon flexc" @click="switchPath('/pages/myson/kefu/main')">
              <div>
                <img src="/static/images/icons/15.png" alt="">
                <p>在线客服</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {post} from "@/utils";
export default {

  data () {
    return {
      info:{}
    }
  },
  onShow(){
    this.getInfo()
  },
  computed: {
    domStyle(){
      return 'top:'+(this.clientY*2)+'rpx;left:'+(this.clientX*2)+'rpx'
    }
  },
  methods: {
    getInfo(){
      post('User/GetMemberInfo',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token")
      }).then(res=>{
        if(res.code===0){
          this.info = res.data
        }
      })
    },
    switchPath(path){
      setTimeout(() => {
        wx.navigateTo({
          url:path
        })
      }, 0);
    }
  },
}
</script>

<style scoped lang='scss'>
.less_bb{
  padding:20rpx 30rpx;
  border-bottom:1rpx solid #ededed;
}
.card-box{
  padding: 0 30rpx;
  width: 100vw;
  box-sizing: border-box;
  position: relative;
  top: -150rpx;
  z-index: 99;
  .card{
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    border-radius: 15rpx;
    margin-bottom: 20rpx;
    .tit{
      // display: flex;
      height: 92rpx;
      padding-left: 30rpx;
      border-bottom: 1px solid #ededed;
      font-weight: 900;
      font-size: 30rpx
    }
    .icon-boxb .icon{
      font-size: 24rpx!important;
      width:25%;
      box-sizing: border-box;
    }
    
    .icon-box{
      padding-bottom: 30rpx;
      .icon2{
        width:20%;
        text-align: center;
        margin-top: 30rpx;
        position: relative;
      }
      .icon{
        width: 25%;
        text-align: center;
        margin-top: 30rpx;
        position: relative;
      }
      span{
          width: 28rpx;
          height: 28rpx;
          border-radius: 50%;
          color: #fff;
          font-size: 20rpx;
          background-color: #ff3333;
          position: absolute;
          top: -16rpx;
          right: 30rpx;
        }
      img{
          width: 50rpx;
          height: 50rpx;
          margin-bottom: 5rpx
        }
    }
  }
}
.top-box{
  height: 407rpx;
  width: 100vw;
  position: relative;
  .bg{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5
  }
  .top{
    width: 100%;
    height: 270rpx;
    position: absolute;
    z-index: 9;
    padding-left: 40rpx;
    .left{
      width: 130rpx;
	    height: 130rpx;
      border-radius: 50%;
      border: 2rpx solid #fff;
      margin-right: 20rpx
    }
    .right{
      .one{
        p{
          font-size: 35rpx;
          font-weight: 900;
          color: #fff;
        }
        .vip{
          width: 124rpx;
          height: 32rpx;
          background-color: #bb945c;
          border-radius: 16rpx;
          margin-left: 20rpx;
          img{
            width: 32rpx;
	          height: 32rpx;
            margin-right: 5rpx;
          }
          span{
            font-size: 20rpx;
            color: #fff
          }
        }
      }
      .two{
        color: #fff;
        margin-top: 20rpx
      }
    }
  }
}
</style>
