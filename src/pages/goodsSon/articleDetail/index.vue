<template>
  <div class="page">
      <div class="detail"><div v-html="list.ContentDetails"></div></div>
      <div class="goods ali-c jus-b" v-for="(item,index) in list.ProductInfo" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.Id)">
        <div class="left ali-c">
          <img :src="item.Image" alt="">
          <div>
            <p>{{item.Name}}</p>
            <span><span>¥</span>{{item.Price}}</span>
          </div>
        </div>
        <img class="right" src="/static/images/index/go.png" alt="">
      </div>
      <div class="foot ali-c jus-b">
        <div class="ali-c">
          <img class="one" src="/static/images/index/good_n.png" alt="">
          <span>{{list.LikeNum}}</span>
          <img class="two" src="/static/images/index/zhuanfa.png" alt="">
        </div>
        <p class="flexc mai" @click="goUrl('/pages/goodsSon/goodsDetail/main',list.ProductInfo[0].Id)">立即购买</p>
      </div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {

  data () {
    return {
      ArticleId:"",
      list:{}
    }
  },

  onShow(){
    this.ArticleId=this.$root.$mp.query.id;
    this.GetArticleInfo()
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    async GetArticleInfo(){
      let res=await post("Find/GetArticleInfo",{
        ArticleId :this.ArticleId
      })
      if(res.code==0){
        this.list = res.data;
      }
    },
    
  },
}
</script>

<style scoped lang='scss'>
.page{
  min-height: 100vh;
  background-color: #fff;
  .detail{
    margin: 0 30rpx;
    width: 690rpx;
    padding: 20rpx 0;
    line-height: 1.7
  }
  .foot{
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 -3rpx 8rpx 0 rgba($color: #000000, $alpha: 0.1);
    width: 100vw;
    height: 98rpx;
    position: fixed;
    bottom: 0;
    padding: 0 30rpx;
    .mai{
      width: 200rpx;
      height: 60rpx;
      background-color: #ff3333;
      border-radius: 30rpx;
      font-size: 30rpx;
      color: #ffffff;
    }
    .one{
      width: 36rpx;
	    height: 36rpx;
    }
    .two{
      width: 41rpx;
	    height: 33rpx;
    }
    span{
      font-size: 24rpx;
      color: #999999;
      margin: 0 60rpx 0 20rpx;
    }
  }
  .goods{
    width: 690rpx;
    height: 180rpx;
    background-color: #f4f4f4;
    border-radius: 16rpx;
    box-sizing: border-box;
    padding: 0 40rpx 0 20rpx;
    margin: 20rpx auto;
    .right{
      width: 50rpx;
	    height: 50rpx;
    }
    .left{
      img{
        width: 140rpx;
        height: 140rpx;
        border-radius: 6rpx;
        margin-right: 20rpx
      }
      p{
        font-size: 30rpx;
	      font-weight: bold;
        margin-bottom: 20rpx
      }
      span{
        color: #ff3333;
        font-size: 36rpx;
        font-weight: bold;
        span{
          font-size: 20rpx;
        }
      }
    }
  }
}
</style>
