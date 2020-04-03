<template>
  <div class="ticket" style="padding-top:98rpx;">
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="or_list mt2">
        <div class="or_item bg_fff" v-for="(item,index) in list" :key="index">
            <div class="flex pp2 justifyContentBetween">
                <!-- <p class="flex flexAlignCenter">
                    <img src="http://jd.wtvxin.com/images/images/icons/shop_logo.png" alt="" class="shop_logo">
                    <span class="ml1">{{item.ShopName}}</span>
                </p> -->
                <p class="cr">{{item.StatueName}}</p>
            </div>
            <div class="bg_gray pp3 flex" v-for="(ite, ind) in item.OrderDetailInfoList" @click="goUrl('/pages/proAdminSon/orderDetail/main',item.OrderInfo.OrderId)" :key="ind">
                <img :src="ite.ProductPicture" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p class="twoline">{{ite.ProductName}}</p>
                      <p class="cr font30">￥{{ite.UnitPrice}}</p>
                    </div>
                    <div class="mr3">x{{ite.Number}}</div>
                </div>
            </div>
            <div class="address">收货人：{{item.OrderInfo.Name}}</div>
            <div class="text_right font24 bor_tit">共{{item.OrderInfo.Number}}件商品 合计 <span class="cr font30">  ¥{{item.OrderInfo.Total}}</span></div>
            <div class="flex justifyContentEnd pp2" v-if="item.OrderInfo.Statue<4&&item.OrderInfo.Statue>0">
                <!-- 0待付款,  1待发货,  2已发货,  3已收货,   4已评价,  -->
                <!-- <p class="btn btn_gray" @click="cliListBtn(item,2)" v-if="item.OrderInfo.Statue==1">修改地址</p> -->
                <p class="btn btn_gray" @click="cliListBtn(item,3)" v-if="item.OrderInfo.Statue==2||item.OrderInfo.Statue==3">查看物流</p>
                <p class="btn btn_red" @click="ship(item.OrderInfo.OrderId)" v-if="item.OrderInfo.Statue==1">发货</p>
            </div>
        </div>
      </div>
      <p class="list-data" v-if="isHaveData">您暂无该项订单数据~</p>
      <p class="list-data" v-if="isOver">没有更多了~</p>
  </div>
</template>

<script>
import {get,post} from '@/utils'
export default {

  data () {
    return {
      tabList:['全部','待付款','待发货','已发货','已收货'],
      tabIndex:0,//0:全部 1: 待付款, 2: 待发货 3: 已发货, 4: 已收货
      isJump:false,
      showCancel:false,
      active:0,
      cancelText:'',
      cancelActive:null,
      cancelId:'',
      cancelGoodsId:'',
      page:1,
      pagesize:10,
      list:[],
      isHaveData:false,
      isOver:false,
      changeNumId:'',//评价多商品订单时选中的订单id
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onLoad(){
    this.tabIndex = 0;
  },
  onShow(){
    this.page = 1
    this.isOver = false
    this.isHaveData = false
    this.list = []
    this.active = 0
    this.showCancel = false
    this.showgoodlist = false
    this.cancelId = ''
    this.cancelGoodsId = ''
    this.getList()
  },
  methods: {
    getList(){
      post('Shop/GetOrderList',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        PageIndex:this.page,
        PageSize:this.pagesize,
        Statue:this.tabIndex,
        ShopId:wx.getStorageSync("shopid")
      }).then(res=>{
        if(res.code===0){
          res.data.map(item=>{
            switch(item.OrderInfo.Statue){
              case 0:
                item.StatueName = '待付款';
                break;
              case 1:
                item.StatueName = '待发货';
                break;
              case 2:
                item.StatueName = '已发货';
                break;
              case 3:
                item.StatueName = '已收货';
                break;
              case 4:
                item.StatueName = '已评价';
                break;
            }
            this.list.push(item);
          })
          if(this.list.length == 0){
            this.isHaveData = true
          }
          if(!this.isHaveData&&res.data.length!=this.pagesize){
            this.isOver = true
          }
        }
      })
    },
    goUrl(url,param,param2,param3){
        wx.navigateTo({
          url:url+'?id='+param+'&goodsId='+param2+'&type='+param3
        })
    },
    cliTab(index){
      this.tabIndex = index
      this.page = 1
      this.isOver = false
      this.isHaveData = false
      this.list = []
      this.getList()
      // console.log(this.tabIndex,"this.tabIndex")
    },
    // 查看物流
      // Statue  0待付款,  1待发货,  2已发货,  3已收货,   4已评价
    cliListBtn(item,btnIndex){
      const info = item.OrderInfo;
      // if(btnIndex===1){
      //   this.showCancel = true
      //   this.cancelGoodsId = id
      // }else if(btnIndex===2){
      //   this.goUrl('/pages/myson2/orderRoute/main',info.OrderId)
      // }else 
      if(btnIndex===3){
        this.goUrl('/pages/myson2/orderRoute/main',info.OrderId)
      }
    },
    // 跳转发货
    ship(orderId){
      wx.navigateTo({
        url:`/pages/proAdminSon/ship/main?OrderId=${orderId}`
      })
    },
  },
  onReachBottom(){
    if(!this.isOver&&!this.isHaveData){
      this.page++
      this.getList()
    }
  },
}
</script>

<style scoped lang='scss'>
.change-goods{
  background-color: rgba(0,0,0,0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  .main{
    background-color: #fff;
    width: 500rpx;
    border-radius: 20rpx;
    overflow: hidden;
    .tit{
      text-align: center;
      line-height: 88rpx;
      font-weight: 900;
      border-bottom: 1rpx solid #ededed;
    }
    .list{
      height: 120rpx;
      padding: 0 30rpx;
      border-bottom: 1rpx solid #ededed;
      img{
        width: 80rpx;
        height: 80rpx;
        border-radius: 10rpx;
      }
    }
  }
}
.cancel{
  // display: none;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  .active{
    background-color: #e6ece6;
    color: #999;
  }
  .main{
    position: absolute;
    width: 450rpx;
    top: 50%;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%,-50%);
    border-radius: 20rpx;
    .btn-box{
      height: 88rpx;
      color: #999;
      font-size: 30rpx;
      span:nth-child(1){
        border-right: 1rpx solid #ededed;
        background-color: rgba(131, 160, 128, 0.2)
      }
      span:nth-child(2){
        
      }
    }
    .list{
      border-bottom: 1rpx solid #ededed;
      height: 88rpx;
      font-size: 28rpx;
      color: #333;
    }
    .tit{
      height: 100rpx;
      padding-left: 30rpx;
      font-size: 32rpx;
      color: #333;
      border-bottom: 1rpx solid #eeeeee;
    }
  }
}
.tab{
  height: 92rpx;
  background-color: #fff;
  position: fixed;
  width: 100vw;
  top: 0;
  .active{
    color: #f00
  }
  span{
    position: absolute;
    bottom: 0;
    transition: all .2s;
    height: 5rpx;
    width: 50rpx;
    background-color: #f00
  }
}
.back_col{
  background-color: #f00!important;
}
.or_list{
  .shop_logo{
    width:40rpx;height:36rpx;
  }
  .shop{
    width:161rpx;height:161rpx;
    border-radius:7rpx;
  }
  .or_item{
    margin-top:20rpx;
    &:first-child{
      margin-top:0;
    }
    .or_left{
      width:88%;
      height:98%;
    }
    .bor_tit{
      border-bottom:1rpx solid #f5f5f5;padding:20rpx 30rpx;
    }
    .btn{
      width:168rpx;height:64rpx;text-align: center;line-height: 64rpx;
      margin-left:20rpx;border-radius: 5rpx;
    }
    .btn_gray{
      border:1rpx solid #e3e3e3;color:#858585;
    }
    .btn_red{
      border:1rpx solid #f00;color:#f00;
    }
  }
}
.address{
  padding:0 20rpx;
  line-height:3;
  font-size:24rpx;
  color:#999;
  border-bottom:1rpx solid #f2f2f2;
}
</style>
