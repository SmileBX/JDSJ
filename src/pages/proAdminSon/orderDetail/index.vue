<template>
  <div class="ticket">
      <div class="or_list">
        <div class="bg_statu">{{info.StatusName}}</div>
        <div class="pp2 flexc  bg_fff bor_tit" v-if="info.StatusId==2||info.StatusId==3">
            <img src="http://jd.wtvxin.com/images/images/icons/kc.png" alt="" class="kc_icon">
            <div class="flex flex1 flexAlignCenter" @click="goUrl('/pages/myson2/orderRoute/main',info.OrderNumber)">
                <div class="flex1">
                  <block v-if="logistics.data">  
                    <p class="cr twoline">
                        {{logistics.data[0].context}} 
                    </p>
                    <p class=" cg mt1">{{logistics.data[0].time}}</p>
                  </block>
                  <p class="cr" v-else>该订单暂无物流信息返回</p>
                </div>
                <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right mr2">
            </div>
        </div>
        <div class="pp2 flexc bg_fff">
            <img src="http://jd.wtvxin.com/images/images/icons/lc.png" alt="" class="icon_lc">
            <div class="flex1">
                <p>
                    <span>{{info.contactName}}</span><span class="mr5">{{info.tel}}</span>
                </p>
                <p class="font24 cg mt1">{{info.addr}}</p>
            </div>
        </div>
        <div class="or_item bg_fff ">
            <div class="pp3 flex bor_tit" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.ProductId)" 
              v-for="(item, index) in info.OrderDetailInfoList" :key="index">
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
                <p class="flex justifyContentBetween mt1">
                    <span>商品合计</span>
                    <span>¥{{info.totalAmount}}</span>
                </p>
                <p class="flex justifyContentBetween mt1" v-if="info.discountedAmount>0">
                    <span>优惠</span>
                    <span>-¥{{info.discountedAmount}}</span>
                </p>
                
                <p class="flex justifyContentBetween">
                    <span>运费(快递)</span>
                    <span>+¥{{info.expressprice}}</span>
                </p>
                <p class="flex justifyContentBetween" v-if="info.Taxes>0">
                    <span>税费</span>
                    <span>+¥{{info.taxes}}</span>
                </p>
            </div>
            <div class="flex justifyContentBetween mt1 pp2">
                <span>需付款</span>
                <span class="cr">¥{{info.total}}</span>
            </div>
        </div>
      </div>
      <!---订单信息-->
      <div class="bg_fff mt2 pp3 bor_tit">
          <div class="">
              <span class="order_title">订单信息</span>
          </div>
          <div class="cg mt2 order_info font24">
              <p>订单编号：{{info.orderid}} <span class="copy" @click="copy(info.orderid)">复制</span> </p>
              <p>创建时间：{{info.addtime}}</p>
              <p v-if="info.statue>0">支付时间：{{info.paytime}}</p>
              <p v-if="info.statue>1">发货时间：{{info.fahuodate}}</p>
              <p v-if="info.statue>2">成交时间：{{info.barterDate}}</p>
              <p v-if="info.statue>0">付款方式：{{info.payment}}</p>
              <p v-if="info.remarks">备注：{{info.remarks}}</p>
          </div>
      </div>
      <div class="flex justifyContentEnd pp2 bg_fff mt2 bb_fix">
          <p class="btn btn_gray">修改地址</p>
          <p class="btn btn_gray">查看物流</p>
          <p class="btn btn_red">发货</p>
      </div>
  </div>
</template>

<script>
import {post,editTime} from '@/utils';
export default {

  data () {
    return {
      info:{},
      logistics: {}, //物流信息
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
    gokefu(){
      wx.switchTab({
        url:"/pages/service/chatRoom/main"
      });
    },
    getDetail(){
      post('Shop/GetOrderDetail',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderId:this.$mp.query.id||'202004011425515955371'
      }).then(res=>{
        const data= res.data;
        let p = data.OrderInfo;
        p.OrderDetailInfoList = data.OrderDetailInfoList;
        let StatueName='';
        switch(p.statue){
          case 0:
            StatueName = '待付款';
            break;
          case 1:
            StatueName = '待发货';
            break;
          case 2:
            StatueName = '已发货';
            break;
          case 3:
            StatueName = '已收货';
            break;
          case 4:
            StatueName = '已评价';
            break;
        }
        p.StatusName=StatueName;
        p.addtime = editTime(p.addtime,'time');
        p.paytime = editTime(p.paytime,'time');
        p.fahuodate = editTime(p.fahuodate,'time');
        p.barterDate = editTime(p.barterDate,'time');
        this.info = p;
        console.log(this.info,'info')
        if (this.info.StatusId == 2 || this.info.StatusId == 3) {
						this.getLogistics();
					}
      })
    },
    //物流信息
    async getLogistics() {
      let result = await post("Order/GetLogistics", {
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo: this.$mp.query.id||'202004011425515955371'
      });
      if (result.code == 0) {
        this.logistics = result.data.kuaidiInfo;
      }
    },
    //微信支付需参数
    async ConfirmWeiXinSmallPay(){
      let result = await post('Pay/WeiXinSmallPayByOrder',{
        OrderNo:this.$mp.query.id,
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        WxCode:wx.getStorageSync("wxCode"),
				WxOpenid:wx.getStorageSync("openId")
      })
      let payData=JSON.parse(result.data.JsParam)
      if(result.code==0){
        let _this=this;
        wx.requestPayment({
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success(res) {
              wx.redirectTo({
                url: "/pages/goodsSon/paysuccess/main?OrderNo="+_this.$mp.query.id
              })
            },
          fail(res) {
            console.log(res);
            wx.redirectTo({
              url: "/pages/goodsSon/paysuccess/main?OrderNo="+_this.$mp.query.id+"&msg=fail"
            })
          }
        })
      }
    },

  },
}
</script>

<style scoped lang='scss'>
.ticket{
  padding-bottom:94rpx;
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
  .justifyContentEnd{
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
  }
</style>
