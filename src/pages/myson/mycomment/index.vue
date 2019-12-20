<template>
  <div class="foot_list">
      <div class="pp2 fb bg_fff">全部评价(2)</div>
      <div class="or_list mt2">
        <div class="or_item bg_fff mt2 flex flexColumn justifyContentBetween pw3" v-for="(item,index) in 3" :key="index">
            <div class="p2">
                <p class="font24 cg">2019.09.15</p>
                <p class="mt1">这款茶深得我心，茶泡出来很香又爽口，入喉回甘。好茶就 是这样，顺滑，蜜香型浓郁，下次可以尝试其他口味。</p>
                <p class="flex flexWrap">
                    <img src="/static/images/shop.png" alt="" class="shop_pic" v-for="(item,key) in 3" :key="key">
                </p>
            </div>
            <div class="flex or_main bg_gray">
                <img src="/static/images/shop.png" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>精华液面部精华雪域滋润保湿补水提亮肤色官</p>
                        <p class="cg font24 mt1">规格：白色</p>
                      </div>
                      <p class="cr font30">￥199</p>
                    </div>
                </div>
            </div>
            <div class="p2 btn_box bg_fff">
                <p class="btn_btn">再次购买</p>
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
.or_list{
  .shop{
    width:200rpx;height:200rpx;
  }
  .or_item{
    margin-top:20rpx;border-radius:15rpx;
    .or_left{
      height:100%;
    }
    .line_through{
      text-decoration: line-through;
    }
    .or_main{
      padding:20rpx 30rpx;
      position: relative;
      &::after{
        position: absolute;bottom:0;width:660rpx;
        content: '';height:2rpx;background: #f5f5f5;
      }
    }
  }
  .btn_btn{
    width:164rpx;height:55rpx;line-height: 55rpx;text-align: center;
    border:1rpx solid #f00;color:#f00;
    margin-left:20rpx;
    position: absolute;right:0;
  }
}
.btn_box{
  position: relative;height:55rpx;
}
.shop_pic{
  width:210rpx;margin-right:30rpx;height:210rpx;
  margin-top:10rpx;
  &:nth-child(3n){
    margin-right:0
  }
}
</style>
