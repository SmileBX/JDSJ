<template>
  <div class="ticket">
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="or_list mt2">
        <div class="or_item bg_fff">
            <div class="flex pp3 justifyContentBetween">
                <p class="flex flexAlignCenter">
                    <img src="/static/images/icons/shop_logo.png" alt="" class="shop_logo">
                    <span class="ml1">花田半亩旗舰店</span>
                </p>
                <p class="cr">待付款</p>
            </div>
            <div class="bg_gray pp3 flex">
                <img src="/static/images/shop.png" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p>精华液面部精华雪域滋润保湿补水提亮肤色官</p>
                      <p class="cr font30">￥199</p>
                    </div>
                    <div class="mr3">x1</div>
                </div>
            </div>
            <div class="text_right font24 bor_tit">共1件商品 合计 <span class="cr font30">  ¥199</span></div>
            <div class="flex justifyContentEnd pp3">
                <p class="btn btn_gray">取消</p>
                <p class="btn btn_red">去支付</p>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import {switchPath,isJump} from '@/utils'
export default {

  data () {
    return {
      tabList:['全部','待付款','待发货','待收货','待评价'],
      tabIndex:0,
      isJump:false
      
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
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
    cliServer(index){
      this.serverIndex = index
    },
    cliTab(index){
      this.tabIndex = index
      // console.log(this.tabIndex,"this.tabIndex")
    },
  },
}
</script>

<style scoped lang='scss'>
.tab{
  position: relative;
  height: 92rpx;
  background-color: #fff;
  position: relative;
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
