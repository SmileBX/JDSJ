<template>
  <div class="ticket" style="padding-top:98rpx;">
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="or_list mt2">
        <div class="or_item bg_fff" v-for="(item,index) in list" :key="index">
            <div class="flex pp2 justifyContentBetween">
                <p class="flex flexAlignCenter">
                    <img src="http://jd.wtvxin.com/images/images/icons/shop_logo.png" alt="" class="shop_logo">
                    <span class="ml1">{{shopName}}</span>
                </p>
                <p class="cr">{{item.StatusName}}</p>
            </div>
            <div class="bg_gray pp3 flex" v-for="(ite, ind) in item.orderDetails" @click="goUrl('/pages/myson2/orderdetail/main',item.OrderNumber)" :key="ind">
                <img :src="ite.ProductImg" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p class="twoline">{{ite.ProductName}}</p>
                      <p class="cr font30">￥{{ite.UnitPrice}}</p>
                    </div>
                    <div class="mr3">x{{ite.ProductCount}}</div>
                </div>
            </div>
            <div class="text_right font24 bor_tit">共{{item.orderDetails.length}}件商品 合计 <span class="cr font30">  ¥{{item.TotalPrice}}</span></div>
            <div class="flex justifyContentEnd pp2">
                <p class="btn btn_gray">取消</p>
                <p class="btn btn_red">去支付</p>
            </div>
        </div>
      </div>
      <p class="list-data" v-if="isHaveData">您暂无该项订单数据~</p>
      <p class="list-data" v-if="isOver">没有更多了~</p>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      tabList:['全部','待付款','待发货','待收货','待评价'],
      tabIndex:0,
      isJump:false,
      page:1,
      pagesize:12,
      list:[],
      isHaveData:false,
      isOver:false,
      shopName:''
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onReachBottom(){
    if(!this.isOver&&!this.isHaveData){
      this.page++
      this.getList()
    }
  },
  onShow(){
    this.page = 1
    this.isOver = false
    this.isHaveData = false
    this.list = []
    this.tabIndex = this.$mp.query.type
    this.getList()
    this.GetMerchantDetail()
  },
  methods: {
    GetMerchantDetail(){
      post("Shop/GetMerchantDetail",{
        ShopId:wx.getStorageSync("shopid")
      }).then(res=>{
        if(res.code==0){
          this.shopName=res.data.ShopInfo.companyName;
        }
      })
      
    },
    getList(){
      post('Order/OrderList',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        Page:this.page,
        PageSize:this.pagesize,
        Status:this.tabIndex,
        Type:0,
        ShopId:wx.getStorageSync("shopid")
      }).then(res=>{
        if(res.code===0){
          this.list.push(...res.data)
          if(this.list.length == 0){
            this.isHaveData = true
          }
          if(!this.isHaveData&&res.data.length!=this.pagesize){
            this.isOver = true
          }
        }
      })
    },
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    cliServer(index){
      this.serverIndex = index
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
  },
}
</script>

<style scoped lang='scss'>
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

</style>
