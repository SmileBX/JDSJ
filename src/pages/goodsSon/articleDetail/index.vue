<template>
  <div class="page">
      <div class="detail">
        <div v-html="list.ContentDetails"></div>
      </div>
      <div class="goods ali-c jus-b" v-for="(item,index) in list.ProductInfo" :key="index" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.Id)">
        <div class="left ali-c">
          <img :src="item.Image" alt="">
          <div>
            <p>{{item.Name}}</p>
            <span><span>¥</span>{{item.Price}}</span>
          </div>
        </div>
        <img class="right" src="http://jd.wtvxin.com/images/images/index/go.png" alt="">
      </div>
      <div class="foot ali-c jus-b">
        <div class="ali-c">
          <img class="one" src="http://jd.wtvxin.com/images/images/index/good_n.png" alt="" @click="FindlikeOperation(0)" v-if='list.IsLike==0'>
          <img class="one" src="http://jd.wtvxin.com/images/images/index/good_y.png" alt="" @click="FindlikeOperation(1)" v-else>
          <span>{{list.LikeNum}}</span>
          <button open-type='share' class="button"><img class="two" src="http://jd.wtvxin.com/images/images/index/zhuanfa.png" alt=""></button>
        </div>
        <p class="flexc mai" v-if="list.ProductInfo&&list.ProductInfo.length" @click="goUrl('/pages/goodsSon/goodsDetail/main',list.ProductInfo[0].Id)">立即购买</p>
      </div>
  </div>
</template>

<script>
import {post,get,filePath} from '@/utils'
export default {

  data () {
    return {
      userId: "",
			token: "",
      ArticleId:"",
      list:{}
    }
  },

  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
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
        "UserId": this.userId,
        "Token": this.token,
        ArticleId :this.ArticleId
      })
      if(res.code==0){
        const data = res.data;
        let content=data.ContentDetails;
        content = content.replace(/<img/g,'<img style="max-width:100%;"');
        content = content.replace(/src="\//g,'src="'+filePath);
        data.ContentDetails = content;
        this.list = res.data;
      }
    },
    async FindlikeOperation(index){
      let res=await post("Find/FindlikeOperation",{
        "UserId": this.userId,
        "Token": this.token,
        "FindId": this.ArticleId,
        "TypeStatu": 0
      })
      if(res.code==0){
         wx.showToast({
          title: res.msg,
          icon: 'none',
        })
        if(index==0){
          this.$set(this.list,'IsLike',1)
        }else{
          this.$set(this.list,'IsLike',0)
        }
      }
    },
  },
  onShareAppMessage: function() {
    return {
      title: '集店', //转发页面的标题
      path: '/pages/goodsSon/articleDetail/main?id='+this.ArticleId
    }
  }
}
</script>

<style scoped lang='scss'>
.page{
  min-height: 100vh;
  background-color: #fff;
  .detail{
    margin: 0 30rpx;
    width: 690rpx;
    padding: 20rpx 0 82rpx;
    line-height: 1.7
  }
  .foot{
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0 -3rpx 8rpx 0 rgba($color: #000000, $alpha: 0.1);
    width: 100vw;
    height: 80rpx;
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
    .button{
      background: #fff!important;
      line-height:1;
    }
    .button::after{
      border: none!important;
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
