<template>
  <div class="sertype">
      <div class="mt2 bg_fff pp3 flex justifyContentBetween">
          <img src="/static/images/shop.png" alt="" class="shop">
          <div class="flex1 mr2">
              <p>SKG颈椎按摩器治疗仪经络电脉 冲针灸护冲针灸护</p>
              <p class="cg font24 mt1">白色  L</p>
          </div>
      </div>
      <div class="pw3 mt2 bg_fff">
          <!--仅退款才有的-->
          <div class="menu_item flex justifyContentBetween flexAlignCenter">
              <p>货物状态</p>
              <p class="flex flex1 flexAlignCenter">
                  <input type="text" placeholder="请选择" disabled class="flex1 text_right">
                  <img src="/static/images/icons/right.png" alt="" class="icon_right mr2">
              </p>
          </div>
          <!--仅退款才有的 end     !!!!!-->
          <div class="menu_item flex justifyContentBetween flexAlignCenter">
              <p>退款原因</p>
              <p class="flex flex1 flexAlignCenter">
                  <input type="text" placeholder="请选择" disabled class="flex1 text_right">
                  <img src="/static/images/icons/right.png" alt="" class="icon_right mr2">
              </p>
          </div>
          <div class="menu_item flex justifyContentBetween flexAlignCenter">
              <p>退款金额</p>
              <p class="cr">¥138</p>
          </div>
          <div class="mt2">
              <p>退款说明</p>
              <textarea name="" id="" cols="30" rows="10" class="sign" placeholder="请输入说明详情"></textarea>
          </div>
      </div>
      <div class="mt2 bg_fff pp3">
        <div>上传凭证（不超过5张）</div>
        <div class="fed_pic flex flexWrap">
          <div v-for="(item,index) in 5" :key="index" class="picbox">
            <img src="/static/images/icons/add2.png" alt="" class="pic_itim">
          </div>
          <div class="picbox upBtnImg">
            <img src="/static/images/icons/add2.png" alt="" class="pic_itim">
          </div>
        </div>
      </div>
      <div class="sub_btn">提交</div>
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
  .menu_item{
    border-bottom:1rpx solid #f5f5f5;
    padding:25rpx 0;
  }
  .sign{
    height:150rpx;width:100%;margin-top:20rpx;
  }
  .picbox{
    width:25%;
    box-sizing: border-box;
    display: flex;justify-content: center;
    margin-top:20rpx;
  }
  .pic_itim{
    width:144rpx;height:144rpx;
  }
  .sub_btn{
    background: #f00;color:#ffffff;width:100%;
    height:98rpx;line-height: 98rpx;text-align: center;
    position: fixed;bottom:0;
  }
  .sertype{
    padding-bottom:100rpx;
  }
</style>
