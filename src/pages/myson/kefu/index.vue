<template>
    <div>
        <div class="pw3 bg_fff mt2">
            <div class="font30 fb k_item k_bor">常见问题</div>
            <div class="flex justifyContentBetween k_item flexAlignCenter">
                <p>如何查看商品尺码</p>
                <img src="/static/images/icons/right.png" alt="" class="icon_right">
            </div>
            <div class="flex justifyContentBetween k_item flexAlignCenter">
                <p>我要申请退款</p>
                <img src="/static/images/icons/right.png" alt="" class="icon_right">
            </div>
            <div class="flex justifyContentBetween k_item flexAlignCenter">
                <p>退款申请被拒绝</p>
                <img src="/static/images/icons/right.png" alt="" class="icon_right">
            </div>
            <div class="flex justifyContentBetween k_item flexAlignCenter">
                <p>如何换绑手机号</p>
                <img src="/static/images/icons/right.png" alt="" class="icon_right">
            </div>
            <div class="flex justifyContentBetween k_item flexAlignCenter">
                <p>我要修改地址</p>
                <img src="/static/images/icons/right.png" alt="" class="icon_right">
            </div>
        </div>
        <div class="bg_fff pp3 flex justifyContentBetween mt2 flexAlignCenter">
          <div class="flex flexAlignCenter">
            <img src="/static/images/icons/k_f.png" alt="" class="sign">
            <span class="ml1">意见反馈</span>
          </div>
          <img src="/static/images/icons/right.png" alt="" class="icon_right">
        </div>
        <div class="kf_bottom bg_fff flex justifyContentAround">
            <div class="cell_kf cell_left">
                <p class="flex flexAlignCenter">
                    <img src="/static/images/icons/call.png" alt="" class="call">
                    <span class="font24 ml1">400-8523-555</span>
                </p>
                <p class="font20 cg">09:00-22:00</p>
            </div>
            <div class="cell_kf cell_right">
                <p class="flex flexAlignCenter">
                    <img src="/static/images/icons/mess.png" alt="" class="call">
                    <span class="font24 ml1">在线客服</span>
                </p>
                <p class="font20">09:00-22:00</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {

  data () {
    return {
     showEdit:false,
      
    }
  },

  onShow(){
    
  },
  methods: {
    
    
  },
}
</script>

<style scoped lang='scss'>
  .k_item{
    padding:20rpx 0;
  }
  .k_bor{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .sign{
    width:32rpx;height:30rpx;
  }
  .call{
    width:30rpx;height:30rpx;
  }
  .kf_bottom{
    position: fixed;bottom:0;padding:30rpx;width:100%;
    box-sizing: border-box;
  }
  .cell_kf{
    width:275rpx;height:80rpx;text-align: center;
    border-radius: 40rpx;
    display: flex;
    flex-direction: column;align-items: center;justify-content: center;
  }
  .cell_left{
    border:1rpx solid #ededed;
  }
  .cell_right{
    background: #f00;color:#ffffff;
  }
</style>
