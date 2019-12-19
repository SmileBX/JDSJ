<template>
  <div class="foot_list">
      <div class="pp3 text_right">{{showEdit?'完成':'编辑'}}</div>
      <div class="or_list">
        <div class="or_item bg_fff flex justifyContentBetween flexAlignCenter pw3 gou" v-for="(item,index) in 3" :key="index">
            <label style="display:none">
              <input type="checkbox" class="checkbox-cart">
            </label>
            <div class="flex or_main">
                <img src="/static/images/shop.png" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p>精华液面部精华雪域滋润保湿补水提亮肤色官</p>
                      <p class="cr font30">￥199 <span class="line_through font22 cg">￥600</span> </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <div class="foot_fot flex justifyContentBetween flexAlignCenter">
          <label class="flex foot_btnl">
              <input type="checkbox" class="checkbox-cart chppo">
              <span>全选</span>
          </label>
          <p class="foot_btnr">删除</p>
      </div>
  </div>
</template>

<script>
import {switchPath,isJump} from '@/utils'
export default {

  data () {
    return {
     showEdit:false,
      
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
    width:161rpx;height:161rpx;
  }
  .or_item{
    .or_left{
      height:100%;
    }
    .line_through{
      text-decoration: line-through;
    }
    .or_main{
      padding:20rpx 0;
      position: relative;
      &::after{
        position: absolute;bottom:0;width:660rpx;
        content: '';height:2rpx;background: #f5f5f5;
      }
    }
  }
}
.foot_fot{
  width:100%;position: fixed;
  box-sizing: border-box;bottom:0;
  color:#ffffff;
  height:98rpx;
  .foot_btnl{
    width:75%;height:100%;
    line-height: 98rpx;
    padding-left:30rpx;
    background: #333333;
  }
  .foot_btnr{
    width:25%;height:100%;
    text-align:center;
    background: #f00;
    line-height: 98rpx;
  }
  
}

</style>
