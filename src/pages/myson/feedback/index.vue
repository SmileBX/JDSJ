<template>
    <div>
        <div class="pp3 mt2 bg_fff">
            <div class="flex justifyContentBetween fed_title">
                <p>问题类型</p>
                <p class="flex flexAlignCenter">
                  <span>请选择</span>
                  <img src="/static/images/icons/right.png" alt="" class="icon_right ml1">
                </p>
            </div>
            <textarea name="" id="" cols="30" rows="10" class="fed_text" placeholder="请输入您的问题或意见"></textarea>
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
        <div class="mt2 pw3 bg_fff">
            <div class="flex p2 bor_bott">
              <p>联系人</p>
              <input type="text" placeholder="请输入姓名" class="flex1 text_right">
            </div>
            <div class="flex p2">
              <p>联系方式</p>
              <input type="text" placeholder="请输入联系方式" class="flex1 text_right">
            </div>
        </div>
        <div class="btn">提交</div>
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
  .fed_title{
    padding-bottom:30rpx;border-bottom: 1rpx solid #f5f5f5;
  }
  .fed_text{
    padding-top:30rpx;height:200rpx;width:100%;
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
  .bor_bott{
    border-bottom: 1rpx solid #f5f5f5
  }
  .btn{
    color:#ffffff;background: #f00;
    margin:50rpx auto 0rpx;
  }
</style>
