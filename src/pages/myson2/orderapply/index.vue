<template>
  <div class="apply">
      <div class="pp3 bg_fff">
          <div>退款原因</div>
          <div class="flex reason_in flexAlignCenter mt2" @click="showList=!showList">
              <!-- <input type="text" placeholder="请选择退款原因" class="flex1"> -->
              <p class="flex1">{{changeReason.message||'请选择退款原因'}}</p>
              <img :class="{'rot':!showList}" src="http://jd.wtvxin.com/images/images/icons/down.png" alt="" class="icon_down">
              <div class="list-box" v-if="showList">
                <p class="list ali-c" @click="cliList(item)" v-for="(item, index) in reasonList" :key="index">{{item.message}}</p>
              </div>
          </div>
          <div class="mt3">退款金额 <span class="cr mr2">¥ 1980</span> </div>
          <div class="mt3">退款说明 <span class="font22 cg">(选填)</span> </div>
          <textarea name="" id="" cols="30" rows="10" placeholder="200字内" class="reas_text mt2"></textarea>
          <div class=" mt3 font24 cg">
              温馨提示：订单退款金额以实际支付金额为准，不包括优惠券抵扣金额，且订单申请退款后优惠券将不会返还，请您谨慎操作。
          </div>
          <div class="mt3 font24 cg">无质量问题退货所产生的的物流费用由购买者承担，从退款中直接扣除。</div>
      </div>
      <div class="app_btn">提交退款申请</div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {

  data () {
    return {
      reasonList:[],
      showList:false,
      changeReason:{}
    }
  },
  
  onShow(){
    this.showList = false
    console.log(this.$mp.query)
    this.getReason()
  },
  methods: {
    cliList(item){
      this.changeReason = item
    },
    getReason(){
      get('Order/GetRefundReason').then(res=>{this.reasonList = res.data})
    },
    getGoodsDetail(){
      
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
