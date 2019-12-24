<template>
  <div class="page">
      <div class="top">
        <img class="bg" mode='aspectFill' src="/static/images/index/goods_banner.png" alt="">
        <div class="main">
          <div class="flexc search-box">
            <div class="search flexc">
              <img src="/static/images/index/search_b.png" alt="">
              <span>搜索本店商品</span>
            </div>
          </div>
          <div class="shop ali-c">
            <img src="/static/images/index/goods_banner.png" alt="">
            <p>进鑫铭帮化妆店</p>
          </div>
        </div>
      </div>
      <div class="main-box" v-for="(item, index) in 2" :key="index">
        <div class="tit ali-c">
          <p>面部护肤</p>
          <!-- <img src="/static/images/icons/right.png" alt=""> -->
        </div>
        <div class="tag flex-wrap jus-b">
          <p class="ali-c"  @click="goUrl('/pages/goodsSon/classifyGoods/main')">套装礼盒</p>
          <p class="ali-c">套装礼盒</p>
          <p class="ali-c">套装礼盒</p>
        </div>
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
.page{
  min-height: 100vh;
  background-color: #fff!important
}
.main-box{
  padding: 0 30rpx;
  .tag{
    p{
      width: 320rpx;
      height: 70rpx;
      background-color: #eeeeee;
      border-radius: 8rpx;
      margin-bottom: 20rpx;
      padding-left:30rpx; 
    }
  }
  .tit{
    height: 150rpx;
    font-size: 30rpx;
    font-weight: bold;
    img{
      width: 10rpx;
      height: 21rpx;
      margin-left: 20rpx
    }
  }
}
.top{
  box-sizing: border-box;
  height: 280rpx;
  position: relative;
  .main{
    background-color: rgba($color: #000000, $alpha: 0.3);
    z-index: 9;
    width: 100%;
    height: 100%;
    position: absolute;
    .shop{
      padding: 0 30rpx;
      img{
        width: 80rpx;
        height: 80rpx;
        border-radius: 6rpx;
        margin-right: 20rpx;
      }
      p{
        font-size: 32rpx;
        font-weight: bold;
        color: #ffffff;
      }
    }
    .search-box{
      height: 150rpx;
      .search{
        width: 400rpx;
        height: 60rpx;
        background-color: #ffffff;
        border-radius: 30rpx;
        font-size: 26rpx;
        color: #999999;
        img{
          width: 28rpx;
          height: 28rpx;
          margin-right: 10rpx;
        }
      }

    }
  }
  .bg{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5
  }
}
</style>
