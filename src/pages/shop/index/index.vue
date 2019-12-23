<template>
  <div class="p30">
      <img class="shopImg" src="/static/images/shop/joinShop.png" alt="" @click="joinShop">
      <h3>为你收集港澳台心意店铺</h3>
      <div class="list">
        <div class="item flex-center-start" v-for="item in 5" :key="item">
          <img src="/static/images/shop2.png" alt="">
          <div class="item_r">
            <div class="item-top flex-center-between">
              <div class="tit ellipsis">浅恋旗舰店</div>
              <div class="inShop">进店</div>
            </div>
            <p class="ellipsis">外贸原单精选百万商品</p>
          </div>
        </div>
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
      // 加入店铺
      joinShop(){
        wx.navigateTo({
          url:'/pages/shop/join/main'
        })
      }
  }
}
</script>

<style scoped lang='scss'>
    .shopImg{
      width:100%;
      height:220rpx;
    }
    h3{
      font-size:30rpx;
      line-height:80rpx;
    }
    .list{
      .item{
        font-size:26rpx;
        background:#fff;
        margin-bottom:20rpx;
        padding:20rpx;
        &>img{
          width:120rpx;
          height:120rpx;
        }
        .item_r{
          margin-left:30rpx;
          width:500rpx;
          .item-top{
            .tit{
              font-size:32rpx;
              line-height:2;
              width:400rpx;
            }
            .inShop{
              border:1rpx solid #ff3333;
              color:#ff3333;
              padding:0 20rpx;
              line-height:2;
              border-radius:30rpx;
            }
          }
          p{
            color:#999;
            line-height:2;
              width:500rpx;
          }
        }
      }
    }
</style>
