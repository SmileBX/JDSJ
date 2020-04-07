<template>
  <div class="apply">
      <div class="pp3 bg_fff">
          <div>{{text}}原因</div>
          <div class="flex reason_in flexAlignCenter mt2" @click="showList=!showList">
              <!-- <input type="text" placeholder="请选择退款原因" class="flex1"> -->
              <p class="flex1">{{changeReason.message||'请选择'+text+'原因'}}</p>
              <img :class="{'rot':!showList}" src="http://jd.wtvxin.com/images/images/icons/down.png" alt="" class="icon_down">
              <div class="list-box" v-if="showList">
                <p class="list ali-c" @click="cliList(item)" v-for="(item, index) in reasonList" :key="index">{{item.message}}</p>
              </div>
          </div>
          <div class="mt3">{{text}}金额 <span class="cr mr2">¥ {{price}}</span> </div>
          <div class="mt3">{{text}}说明 <span class="font22 cg">(选填)</span> </div>
          <textarea @blur="bindContentBlur" v-show="isInputContentFocus"  v-bind:focus="isFocus" v-model="content" cols="30" rows="10" placeholder="200字内" class="reas_text mt2"></textarea>
          <scroll-view scroll-y class="reas_text mt2" v-text="content" @click="bindContentFocus" v-show="isContentFocus">
            <div class="c-999" v-if="!content">200字内</div>
          </scroll-view>
          <div class=" mt3 font24 cg">
              温馨提示：订单{{text}}金额以实际支付金额为准，不包括优惠券抵扣金额，且订单申请{{text}}后优惠券将不会返还，请您谨慎操作。
          </div>
          <div class="mt3 font24 cg">无质量问题退货所产生的的物流费用由购买者承担，从退款中直接扣除。</div>
      </div>
      <div class="app_btn" @click="pub()">提交{{text}}申请</div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {

  data () {
    return {
      reasonList:[],
      showList:false,
      changeReason:{},
      price:0,
      content:'',
      type:0,
      text:'',
      isContentFocus: true,
      isInputContentFocus: false,
      isFocus: false,
    }
  },
  onLoad(){
    this.content='';
    this.showList=false;
    this.isContentFocus=false;
    this.isInputContentFocus=false;
    this.isFocus=false;
    this.changeReason={};

  },
  onShow(){
    this.type = this.$mp.query.type
    wx.setNavigationBarTitle({
      title: this.type==1?'申请退款':'申请退货'
    })
    this.text = this.type==1?'退款':'退货'
    this.showList = false;
    this.getReason()
    this.getGoodsDetail()
  },
  methods: {
    bindContentFocus(e) {
      this.isFocus = true; //触发焦点
      this.isContentFocus = false; //聚焦时隐藏内容文本标签
      this.isInputContentFocus = true;
    },
    bindContentBlur(e) {
      this.isContentFocus = true; //聚焦时隐藏内容文本标签
      this.isInputContentFocus = false;
      this.isFocus = false; //失去焦点
    },
    pub(){
      post(this.type==1?'Order/ApplicationRefund':'Order/ApplicationReturn',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id,
        OrderDetailId:0,
        RefundReasonId:this.changeReason.code,
        RefundContent:this.content
      }).then(res=>{
        wx.showToast({
          icon:'none',
          title:res.msg
        })
        if(res.code==0){
          setTimeout(() => {
            wx.navigateBack()
          }, 300);
        }
      })
    },
    cliList(item){
      this.changeReason = item
    },
    getReason(){
      get('Order/GetRefundReason').then(res=>{this.reasonList = res.data})
    },
    getGoodsDetail(){
      post('Order/OrderDetails',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id
      }).then(res=>{
        this.price = res.data.TotalAmount
      })
    },
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
.rot{
  transform: rotate(-90deg)
}
  .reason_in{
    border:1rpx solid #f5f5f5;
    height: 88rpx;
    padding:0 20rpx;border-radius:15rpx;
    position: relative;
    .list-box{
      width: 690rpx;
      position: absolute;
      left: 0rpx;
      top: 88rpx;
      background-color: #fff;
      z-index: 999;
      border-left: 1rpx solid #ededed;
      border-right: 1rpx solid #ededed;
      border-bottom: 1rpx solid #ededed;
      .list{
        height: 80rpx;
        padding-left: 30rpx;
        color: #666;
        border-bottom: 1rpx solid #ededed;
      }
    }
    input{
      height:80rpx;
    }
    .icon_down{
      width:24rpx;height:12rpx;transition: all .2s
    }
  }
  .reas_text{
    height:180rpx;width:100%;
    border-radius:15rpx;
    border:1rpx solid #f5f5f5;padding:10rpx;
    box-sizing: border-box;
  }
  .app_btn{
    position: fixed;bottom:0;width:750rpx;
    height:90rpx;line-height: 90rpx;
    color:#ffffff;background: #f00;text-align: center;
  }

</style>
