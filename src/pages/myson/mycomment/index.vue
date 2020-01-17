<template>
  <div class="foot_list">
      <div class="pp2 fb bg_fff">全部评价({{count}})</div>
      <div class="or_list mt2" v-if="hasData">
        <div class="or_item bg_fff mt2 flex flexColumn justifyContentBetween pw3"  v-for="(item, index) in dataList" :key="index">
            <div class="p2">
                <p class="font24 cg">{{item.AddTime}}</p>
                <p class="mt1">{{item.ContentText}}</p>
                <p class="flex flexWrap"  v-if="item.imgArr">
                  <block v-for="(i,e) in item.imgArr" :key="e">
                    <img v-if="e<3" :src="i" alt="" class="shop_pic" @click="previewImg(item.imgArr,i)">
                  </block>
                </p>
            </div>
            <div class="flex or_main bg_gray" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.ProductId)">
                <img :src="item.ProductPic" :alt="item.ProductTitle" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>{{item.ProductTitle}}</p>
                        <p v-if="item.ProductSpecification" class="cg font24 mt1">{{item.ProductSpecification}}</p>
                      </div>
                      <p class="cr font30">￥{{item.ProductPrice}}</p>
                    </div>
                </div>
            </div>
            <div class="p2 btn_box flex-center-end">
                <p class="btn_btn" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.ProductId)">再次购买</p>
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
      shopid:"",
      hasData:false,
			noDataIsShow: false,//没有数据的提示是否显示
			page: 1,
      pageSize: 8,
      allPage: 0,
			count: 0,
			isLoad: false,
			isOved:false,       //显示已经到底了
			loadingType: 0, //0加载前，1加载中，2没有更多了
      dataList:{} 
    }
  },

  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid = wx.getStorageSync("shopid");
    this.CommentList();
  },
  methods: {
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    //列表
    async CommentList(){
      let res=await post("User/CommentList",{
        Page: this.page,
        PageSize: this.pageSize,
        // ShopId: this.shopid,
        UserId: this.userId,
        Token: this.token,
      })
      if(res.code==0){
          let _this=this;
					if (res.data.length > 0) {
						this.hasData = true;
            this.noDataIsShow = false;
            res.data.forEach(function(item) {
							let arr = item.CommentPic.split(",");
							if(arr[arr.length-1] ==""){
								arr.splice(arr.length-1,1);
							}
							_this.$set(item, "imgArr",arr);
						})
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
						this.dataList = res.data;
					}
					if (this.page > 1) {
						this.dataList = this.dataList.concat(
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
       }else{
				 wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
			 }
    },
    //预览图片
			previewImg(imgurls,index){
				wx.previewImage({
					current:imgurls[index],
					urls: imgurls,
					indicator:imgurls.length
				});
			},
  },
  onReachBottom: function() {
    if (this.isLoad) {
			this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.CommentList();
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
.or_list{
  .shop{
    width:200rpx;height:200rpx;
  }
  .or_item{
    margin-top:20rpx;border-radius:15rpx;
    .or_left{
      height:100%;
    }
    .line_through{
      text-decoration: line-through;
    }
    .or_main{
      padding:20rpx 30rpx;
      position: relative;
      &::after{
        position: absolute;bottom:0;width:660rpx;
        content: '';height:2rpx;background: #f5f5f5;
      }
    }
  }
  .btn_btn{
    width:164rpx;height:55rpx;line-height: 55rpx;text-align: center;
    border:1rpx solid #f00;color:#f00;
    margin-left:20rpx;
  }
}
.shop_pic{
  width:210rpx;margin-right:30rpx;height:210rpx;
  margin-top:10rpx;
  &:nth-child(3n){
    margin-right:0
  }
}
</style>
