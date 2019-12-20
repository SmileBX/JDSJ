<template>
  <div>
      <div class="bgf220"></div>
      <div class="addImg p30">
          <div class="flex-column-center-center">
            <img src="/static/images/service/addImg.png" alt="">
            <p>点击上传商品图片</p>
          </div>
      </div>
      <div class="bgf220"></div>
      <div class="inputItem bb1">
          <input type="text" placeholder="请输入商品标题" v-model="title" v-if="!showPopwinStatus">
          <div v-else>{{title}}</div>
      </div>
      <div class="inputItem">
          <input type="text" placeholder="请输入商品价格" v-model="price" v-if="!showPopwinStatus">
          <div v-else>{{price}}</div>
      </div>
      <div class="p30">
        <div class="ans-maxBtn" @click="showPopwinStatus = true">生成链接</div>
      </div>
    <!-- 弹窗 -->
      <div class="ans-popwin" v-if="showPopwinStatus">
            <div class="ans-mask" @click="showPopwinStatus = false"></div>
            <div class="ans-main p30">
                <p>https://blog.csdn.net/yang450712123/article/details/80916523</p>
                <div class="btn">复制链接</div>
            </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        showPopwinStatus:false,
        title:'',
        price:'',
    }
  },
  
  methods: {

  }
}
</script>

<style scoped lang='scss'>
    .addImg {
        background:#fff;
        div{
            width:100%;
            height:340rpx;
            border:dashed #999 1rpx;
            border-radius:10rpx;
            background:#fbfbfb;
            img{
                width:130rpx;
                height:115rpx;
            }
            p{
                color:#999;
                font-size:26rpx;
                text-align:center;
                line-height:3;
            }
        }
    }
    .inputItem{
        background:#fff;
        padding:0 30rpx;
        input,div{
            height:90rpx;
            line-height:90rpx;
        }
        div{
            color:#999;
        }
    }
    .ans-maxBtn{
        margin-top:50rpx;
    }
    .ans-main{
        width:500rpx;
        border-radius:20rpx;
        p{
        width:500rpx;
        word-wrap:break-word;
        }
        .btn{
            color:#ff3333;
            width:200rpx;
            margin:30rpx auto 10rpx;
            border:1rpx solid #ff3333;
            padding:0 20rpx;
            line-height:70rpx;
            height:70rpx;
            border-radius:50rpx;
        }
    }
</style>
