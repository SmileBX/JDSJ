<template>
  <div class="apply">
      <div class="pp3 bg_fff">
          <div>退款原因</div>
          <div class="flex reason_in flexAlignCenter mt2">
              <input type="text" placeholder="请选择退款原因" class="flex1">
              <img src="/static/images/icons/down.png" alt="" class="icon_down">
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
import {switchPath,isJump} from '@/utils'
export default {

  data () {
    return {
     
      
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
  .reason_in{
    border:1rpx solid #f5f5f5;
    padding:0 20rpx;border-radius:15rpx;
    input{
      height:80rpx;
    }
    .icon_down{
      width:24rpx;height:12rpx;
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
