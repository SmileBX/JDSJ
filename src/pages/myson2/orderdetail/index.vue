<template>
  <div class="ticket">
      <div class="or_list">
        <div class="bg_statu">{{info.StatusName}}</div>
        <div class="pp2 flex justifyContentBetween  bg_fff bor_tit flexAlignEnd">
            <img src="/static/images/icons/kc.png" alt="" class="kc_icon">
            <div class="flex flex1 flexAlignCenter">
                <div class="flex1">
                    <p class="cr">
                         [深圳市] 投递并签收，签收人：他人收 韵达，感谢使用 EMS经济快递，期待...
                    </p>
                    <p class=" cg mt1">2019-09-26 18:52:10</p>
                </div>
                <img src="/static/images/icons/right.png" alt="" class="icon_right mr2">
            </div>
        </div>
        <div class="pp2 flex justifyContentBetween flexWrap flexAlignEnd bg_fff">
            <img src="/static/images/icons/lc.png" alt="" class="icon_lc">
            <div class="flex1">
                <p>
                    <span>{{info.ContactName}}</span><span class="mr5">{{info.TelephoneNumber}}</span>
                </p>
                <p class="font24 cg mt1">{{info.Address}}</p>
            </div>
        </div>
        <div class="or_item bg_fff ">
            <div class="pp3 flex bor_tit" v-for="(item, index) in info.orderDetails" :key="index">
                <img :src="item.ProductImg" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p>{{item.ProductName}}</p>
                      <p class="cr font30">￥{{item.UnitPrice}}</p>
                    </div>
                    <div class="mr3">x{{item.ProductCount}}</div>
                </div>
            </div>
            <div class="bor_tit pp2">
                <p class="flex justifyContentBetween">
                    <span>运费(快递)</span>
                    <span>¥0.00</span>
                </p>
                <p class="flex justifyContentBetween mt1">
                    <span>订单总价</span>
                    <span>¥{{info.TotalPrice}}</span>
                </p>
            </div>
            <div class="flex justifyContentBetween mt1 pp2">
                <span>需付款</span>
                <span class="cr">¥{{info.TotalAmount}}</span>
            </div>
        </div>
      </div>
      <!---订单信息-->
      <div class="bg_fff mt2 pp3 bor_tit">
          <div class="">
              <span class="order_title">订单信息</span>
          </div>
          <div class="cg mt2 order_info font24">
              <p>订单编号：{{info.OrderNumber}} <span class="copy" @click="copy(info.OrderNumber)">复制</span> </p>
              <p>创建时间：{{info.AddTime}}</p>
              <p v-if="info.StatusId>0">支付时间：{{info.PayTime}}</p>
              <p v-if="info.StatusId>1">发货时间：{{info.FaHuoTime}}</p>
              <p v-if="info.StatusId>2">成交时间：{{info.CompleteTime}}</p>
          </div>
      </div>
      <div class="bg_fff flex justifyContentBetween">
          <p class="flex btn_menu justifyContentCenter flexAlignCenter" @click="call(info.ShopMobile)">
              <img src="/static/images/icons/ch.png" alt="" class="icon_ch"><span>拨打电话</span>
          </p>
          <p class="flex btn_menu justifyContentCenter flexAlignCenter">
              <img src="/static/images/icons/er.png" alt="" class="icon_ch"><span>在线客服</span>
          </p>
      </div>
      <div class="flex justifyContentEnd pp2 bg_fff mt2 bb_fix">
          <p class="btn btn_gray">取消</p>
          <p class="btn btn_red">去支付</p>
      </div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      info:{}
    }
  },
  onShow(){
    console.log(this.$mp.query.id)
    this.getDetail()
  },
  methods: {
    copy(str){
      wx.setClipboardData({
        data: str,
        success (res) {
          // wx.getClipboardData({
            
          // })
        }
      })
    },
    call(phone){
      wx.makePhoneCall({
        phoneNumber: phone
      })
    },
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    getDetail(){
      post('Order/OrderDetails',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id
      }).then(res=>{
        this.info = res.data
      })
    }
  },
}
</script>

<style scoped lang='scss'>

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
  }
}
  .bor_tit{
      border-bottom:1rpx solid #f5f5f5;
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
  .order_title{
   border-left:4rpx solid #f00;padding-left:20rpx;
 }
 .order_info p{
   padding:5rpx 0;
 }
 .copy{
   padding:0rpx 20rpx;border:1rpx solid red;color:#f00;font-size:20rpx;
   border-radius: 5rpx;
 }

 .bg_statu{
   width:100%;background: #f00;text-align: center;
   height:120rpx;line-height: 120rpx;
   color:#ffffff;
 }
 .icon_lc{
   width:28rpx;height:41rpx;margin-right:20rpx;
   margin-bottom:6rpx;
 }
 .kc_icon{
   width:43rpx;height:33rpx;margin-right:20rpx;
   margin-bottom:6rpx;
 }
  .icon_ch{
    width:34rpx;height:34rpx;margin-right:15rpx;
  }
  .btn_menu{
    height:80rpx;
    width:50%;border-left:1px solid #f5f5f5;
    &:first-child{
      border-left:0;
    }
  }
</style>
