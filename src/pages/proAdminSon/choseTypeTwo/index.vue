<template>
  <div class="pro_type bg_fff">
    <div class="slider"></div>
    <div class="list pw3 bg_fff">
      <radio-group>
        <label>
          <div class="item flex justifyContentBetween flexAlignCenter" v-for="(item,index) in 5" :key="index">
              <div>单鞋</div>
              <radio color="#ffffff"></radio>
          </div>
        </label>
       </radio-group>
    </div>
    <noData :isShow="noDataIsShow"></noData>
  </div>
</template>

<script>
import {post,get} from '@/utils'
import noData from "@/components/noData"; //没有数据的通用提示
export default {
  components: {
		noData,
  },
  data () {
    return {
      userId: "",
			token: "",
     
    }
  },
  onShow(){
    this.userId=wx.getStorageSync("userId");
    this.token=wx.getStorageSync("token");
   
  },
  methods: {
   
  },
}
</script>

<style scoped lang='scss'>
  .pro_type{
    height:100vh;
    .list{
      .item{
        padding:25rpx 0;border-bottom:1rpx solid #f5f5f5;
        .img{
          width:12rpx;height:22rpx;
        }
      }
    }
  }
</style>
