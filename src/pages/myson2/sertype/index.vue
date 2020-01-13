<template>
  <div class="sertype">
      <div class="mt2 bg_fff pp3 flex justifyContentBetween">
          <img src="http://jd.wtvxin.com/images/images/shop.png" alt="" class="shop">
          <div class="flex1 mr2">
              <p>SKG颈椎按摩器治疗仪经络电脉 冲针灸护冲针灸护</p>
              <p class="cg font24 mt1">白色  L</p>
          </div>
      </div>
      <div class="pw3 mt2 bg_fff">
          <div class="menu_item flex justifyContentBetween flexAlignCenter">
              <p class="flex">
                  <img src="http://jd.wtvxin.com/images/images/icons/huan.png" alt="" class="huan">
                  <span class="mr2">申请换货</span>
              </p>
              <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
          </div>
          <div class="menu_item flex justifyContentBetween flexAlignCenter">
              <p class="flex">
                  <img src="http://jd.wtvxin.com/images/images/icons/tui.png" alt="" class="huan">
                  <span class="mr2">申请退货退款</span>
              </p>
              <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
          </div>
          <div class="menu_item flex justifyContentBetween flexAlignCenter">
              <p class="flex">
                  <img src="http://jd.wtvxin.com/images/images/icons/tuiq.png" alt="" class="huan">
                  <span class="mr2">仅退款（无需退货）</span>
              </p>
              <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
          </div>
      </div>
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
  .shop{
    width:161rpx;height:161rpx;
  }
  .huan{
    width:42rpx;height:40rpx;
  }
  .menu_item{
    border-bottom:1rpx solid #f5f5f5;
    padding:30rpx 0;
  }
</style>
