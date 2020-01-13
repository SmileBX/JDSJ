<template>
  <div class="foot_list">
      <div class="or_list mt2">
        <div class="or_item bg_fff mt2 pw3">
            <div class="flex or_main">
                <img src="http://jd.wtvxin.com/images/images/shop.png" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>精华液面部精华雪域滋润保湿补水提亮肤色官</p>
                        <p class="cg font24 mt1">规格：白色</p>
                      </div>
                    </div>
                </div>
            </div>
            <!--评分-->
            <div class="flex flexAlignCenter mt2">
              <span class="mb1">评分</span>
              <span class="ml1">
                  <img src="http://jd.wtvxin.com/images/images/icons/xh.png" alt="" v-for="(item,index) in score" :key="index" class="xing">
                  <img src="http://jd.wtvxin.com/images/images/icons/xg.png" alt="" v-for="(item2,key) in 5-score" :key="key" class="xing">
              </span>
              <span class="mb1">{{score==5?'非常满意':score==4?'满意':score==3?'一般':score==2?'差':'很差'}}</span>
            </div>
            <!--遇到的问题-->
            <div class="mt2">
                <p class="cg font24">请选择您遇到的问题</p>
                <div class="mt2 flex flexWrap">
                    <p v-for="(item,oll) in plist" :key="oll" class="pp_item" :class="{'active':oll==1}">{{item.name}}</p>
                </div>
            </div>
            <textarea name="" id="" cols="30" rows="10" class="com_text mt1" placeholder="填写您对商品的评价~"></textarea>
            <div class="p3" style="border-bottom:1rpx solid #ededed">
            <!-- <div>上传图片（不超过5张）</div> -->
                <div class="fed_pic flex flexWrap">
                  <!-- <div v-for="(item,index) in 5" :key="index" class="picbox">
                    <img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim">
                  </div> -->
                  <div class="picbox upBtnImg">
                    <img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim">
                  </div>
                </div>
            </div>
            <div class="porela">
                <p>提交</p>
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
      score:3,
      plist:[{id:1,name:'商品问题'},{id:1,name:'客服问题'},{id:1,name:'包装问题'},{id:1,name:'物流问题'},{id:1,name:'其他'}]
      
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
    margin-top:20rpx;
    .or_left{
      height:100%;
    }
    .or_main{
      padding:20rpx 0;
    }
  }
  .xing{
    width:42rpx;height:40rpx;
    margin-right:10rpx;
  }
  .mb1{
    margin-bottom: 10rpx;
  }
  
}
.pp_item{
  font-size:24rpx;
  padding:8rpx 20rpx;
  border:1rpx solid #ededed;border-radius: 10rpx;
  margin-right:25rpx;
  margin-top:10rpx;
  &:nth-child(4n){
    margin-right: 0;
  }
  &.active{
    border:1rpx solid #f00;color:#f00;
  }
}
.com_text{
  padding:20rpx;height:200rpx;
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
  .porela{
    padding:20rpx 0;position: relative;height:64rpx;
    p{
      width:184rpx;height:64rpx;color:#444444;border:1rpx solid #444444;
      border-radius: 10rpx;text-align: center;line-height: 64rpx;
      position: absolute;right:0;
    }
  }

</style>
