<template>
  <div>
    <div class="bgf220"></div>
    <div class="plr30 bfff">
      <img class="upLogo" src="/static/images/shop/upLogo.png" alt="">
      <div class="cell bb1">
        <h4>名称：</h4>
        <div class="right">
          <input type="text" placeholder="请输入店铺名称">
        </div>
      </div>
      <div class="cell bb1">
        <h4>地址：</h4>
        <div class="right">
          <input type="text" placeholder="请输入店铺地址">
        </div>
      </div>
      <div class="cell bb1">
        <h4>主营产品：</h4>
        <div class="right">
          <input type="text" placeholder="比如美妆">
        </div>
      </div>
      <div class="cell bb1">
        <h4>姓名：</h4>
        <div class="right">
          <input type="text" placeholder="请输入您的姓名">
        </div>
      </div>
      <div class="cell bb1">
        <h4>手机号：</h4>
        <div class="right">
          <input type="text" placeholder="请输入您的手机号">
        </div>
      </div>
    </div>

    <div class="bgf220"></div>
    <div class="bfff plr30 upIDcard">
        <h4>请上传身份证正反面照片</h4>
        <div class="upBox flex-center-between">
          <img src="/static/images/shop/upIDcard1.png" alt="">
          <img src="/static/images/shop/upIDcard2.png" alt="">
        </div>
        <p>拍摄时请确保身份证<span>边框完整  字体清晰</span></p>
    </div>
    
    <div class="bgf220"></div>
    <div class="remark bfff plr30">
      <h4>备注</h4>
      <div class="texta">
        <textarea name="" id="" cols="30" rows="10" placeholder="简单描述一下您的行业，商品类型，业务范围等信息"></textarea>
        <span>0/150</span>
      </div>
    </div>

    <div class="p30">
      <div class="ans-maxBtn">立即申请</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    }
  },
  
  methods: {
  }
}
</script>

<style scoped lang='scss'>
  .upLogo{
    width:172rpx;
    height:172rpx;
    margin:0 auto;
    padding:20rpx;
    border-radius:50%;
    display:block;
  }
  h4{
    font-size:30rpx;
    color:#333;
    line-height:88rpx;
  }
  .cell{
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:30rpx;
    &:last-child{
      border-bottom:none;
    }
    h4{
      width:200rpx;
      line-height:109rpx;
    }
    .right{
      width:500rpx;
    }
  }
  .upIDcard{
    .upBox{
      padding:0 30rpx;
      margin-top:10rpx;
      img{
        width:294rpx;
        height:194rpx;
      }
    }
    p{
      text-align:center;
      font-size:28rpx;
      color: #6c6c6c;
      line-height:4;
      span{
        color:#ff3333;
      }
    }
  }
  .remark{
    padding-bottom:30rpx;
    textarea {
      width:100%;
      height:200rpx;
    }
    .texta{
      position:relative;
      span{
        color:#999;
        position:absolute;
        right:20rpx;
        bottom:10rpx;
      }
    }
  }
</style>
