<template>
  <div class="foot_list">
      <div class="or_list pw3">
        <div class="or_item bg_fff flex flexColumn justifyContentBetween  pw3" v-for="(item,index) in 3" :key="index">
            <div class="flex or_main">
                <img src="/static/images/shop.png" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>精华液面部精华雪域滋润保湿补水提亮肤色官</p>
                        <p class="cg font24 mt1">白色</p>
                      </div>
                      <p class="cr font30">￥199 <span class="line_through font22 cg">￥600</span> </p>
                    </div>
                </div>
            </div>
            <div class="flex justifyContentBetween p2">
                <p class="cr">拼团中</p>
                <div class="flex font22">
                    <p class="btn_btn">订单详情</p>
                    <p class="btn_btn">拼团详情</p>
                </div>
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
      padding:30rpx 0;
      position: relative;
      &::after{
        position: absolute;bottom:0;width:660rpx;
        content: '';height:2rpx;background: #f5f5f5;
      }
    }
  }
  .btn_btn{
    width:164rpx;height:55rpx;line-height: 55rpx;text-align: center;
    border:1rpx solid #ececec;
    margin-left:20rpx;
  }
}
</style>
