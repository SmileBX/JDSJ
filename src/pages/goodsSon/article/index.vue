<template>
  <div>
      <div class="list" @click="goUrl('/pages/goodsSon/articleDetail/main',item.Id)" v-for="(item,index) in list" :key="index">
        <p class="tit oneline">{{item.Title}}</p>
        <img class="img" mode='aspectFill' :src="item.Pic" alt="">
        <div class="foot jus-b ali-c">
          <span>{{item.AddTime}}</span>
          <div class="ali-c">
            <img class="one" src="http://jd.wtvxin.com/images/images/index/look.png" alt="">
            <span>{{item.BrowseNum}}</span>
            <img class="two" src="http://jd.wtvxin.com/images/images/index/good_y.png" alt="" v-if="item.IsLike==1">
            <img class="two" src="http://jd.wtvxin.com/images/images/index/good_n.png" alt="" v-else>
            <span>{{item.LikeNum}}</span>
          </div>
        </div>
      </div>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
  </div>
</template>

<script>
import {post,get} from '@/utils'
import noData from "@/components/noData"; //没有数据的通用提示
import LoadMore from '@/components/load-more';
export default {
  components: {
		noData,
		LoadMore
  },
  data () {
    return {
      userId: "",
			token: "",
      hasData:false,
			noDataIsShow: false,//没有数据的提示是否显示
			page: 1,
      pageSize: 4,
      allPage: 0,
			count: 0,
			isLoad: false,
			isOved:false,       //显示已经到底了
			loadingType: 0, //0加载前，1加载中，2没有更多了。
      shopid:"",
      list:[],
    }
  },
  onShow(){
    this.page=1;
    this.list=[];
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid=wx.getStorageSync("shopid");
    this.GetArticleList()
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    async GetArticleList(){
      let res=await post("Find/GetArticleList",{
        PageIndex: this.page,
        PageSize: this.pageSize,
        "UserId": this.userId,
        "Token": this.token,
        ShopId:this.shopid
      })
      if(res.code==0){
        let _this=this;
        if (res.data.length > 0) {
          this.hasData = true;
          this.noDataIsShow = false;
          res.data.map(function (item) {
            item.AddTime=item.AddTime.replace(/T/,' ');
          });
        }
        this.count = res.count;
        if (this.count == 0) {
          this.noDataIsShow = true;
          this.hasData = false;
        }
        if (parseInt(this.count) % this.pageSize === 0) {
          this.allPage = this.count / this.pageSize;
        } else {
          this.allPage = parseInt(this.count / this.pageSize) + 1;
        }
        if (this.page === 1) {
          this.list = res.data;
        }
        if (this.page > 1) {
          this.list = this.list.concat(
            res.data
          );
        }
        if (this.allPage <= this.page) {
          this.isLoad = false;
          this.loadingType = 2;
        } else {
          this.isLoad = true;
          this.loadingType = 0
        }
      }
    },
  },
  onReachBottom: function() {
    if (this.isLoad) {
			this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.GetArticleList();
    } else {
			this.loadingType = 2;
      if (this.page > 1) {
        this.isOved = true;
      } else {
        this.isOved = false;
      }
    }
  }
}
</script>

<style scoped lang='scss'>
.list{
  background-color: #fff;
  margin-top: 20rpx;
  padding: 0 30rpx;
  .tit{
    line-height: 90rpx;
    font-size: 32rpx;color: #00051f;
  }
  .img{
    width: 690rpx;
	  height: 381rpx;
    border-radius: 10rpx;
  }
  .foot{
    font-size: 24rpx;
    color: #999999;
    height: 90rpx;
    img{
      margin: 0 10rpx 0 20rpx
    }
    .one{
      width: 34rpx;
	    height: 24rpx;
    }
    .two{
      width: 26rpx;
	    height: 26rpx;
    }
  }
}
</style>
