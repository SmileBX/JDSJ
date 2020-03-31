<template>
  <div class="commentPage bg_fff" style="min-height: 100%;">
     <div class="commentGrade">
			<span :class="['type',Grade==0?'active':'']" @click="tapTab(0)">全部({{allcommentnum}})</span>
			<span :class="['type',Grade==1?'active':'']" @click="tapTab(1)">有图</span>
			<span :class="['type',Grade==2?'active':'']" @click="tapTab(2)">好评</span>
		</div>
    <!-- 评论区 start -->
		<div class="or_list mt2" v-if="hasData">
			<block v-for="(item,index) in commentlist" :key="index">
				<div class="or_item bg_fff mt2 flex flexColumn justifyContentBetween pw3">
						<div class="hd ali-c jus-b">
							<div class="ali-c">
								<img class="left" :src="item.MemberAvatar||'http://jd.wtvxin.com/images/images/ava.png'" alt="">
								<div>
									<p class="name">{{item.MemberName}}</p>
									<p class="font24 cg">{{item.AddTime}}</p>
								</div>
							</div>
							<div>
								<img v-for="(i,e) in item.Star" :key="e" class="right" src="http://jd.wtvxin.com/images/images/index/star.png" alt="">
							</div>
						</div>
            <div class="bd">
                <p class="mt1">{{item.ContentText}}</p>
                <p class="flex flexWrap"  v-if="item.imgArr">
                  <block v-for="(i,e) in item.imgArr" :key="e">
                    <img v-if="e<4" :src="i" alt="" 
						class="shop_pic" @click="previewImg(item.imgArr,i)">
                  </block>
                </p>
            </div>
        </div>
			</block>
			<view class="loading">
        <load-more :loadingType="loadingType"></load-more>
      </view>
		</div>
		<!-- 评论区 end -->
    <noData :isShow="noDataIsShow"></noData>
  </div>
</template>

<script>
import {post,get,dateUtils} from '@/utils'
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
				curPage: "",
				loadingType: 0, //0加载前，1加载中，2没有更多了
				isLoad: false,
				hasData: false,
				noDataIsShow: false,
				page: 1,
				pageSize: 6,
				allPage: 0,
				count: 0,
				Pid: "",//商品id
				allcommentnum:0,//全部评价数量
				Grade: 0, //0全部，1有图，2好评
				commentlist: {},
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid=wx.getStorageSync("shopid");
    this.Pid = this.$root.$mp.query.id;
    this.tapTab(0);
  },
  methods: {
    goUrl(url,param){
        wx.navigateTo({
          url:url+'?id='+param
        })
    },
    tapTab(type){
				this.Grade=type;
				this.loadingType = 0;
				this.hasData = false;
				this.noDataIsShow = false;
				this.isLoad = false;
				this.page = 1;
				this.allPage = 0;
				this.count = 0;
				this.commentlist = {};
				this.GetEvaluate();
    },
    async GetEvaluate() {
				let result = await post("Goods/GetEvaluateList", {
					"UserId": this.userId,
					"Token": this.token,
					"PageIndex": this.page,
					"pageSize": this.pageSize,
					"proId": this.Pid,
					"Type": this.Grade
				});
				if (result.code === 0) {
          let _this=this;
					if (result.data.length) {
						this.hasData = true;
						result.data.forEach(function(item) {
              item.AddTime = dateUtils.format(item.AddTime);
              let arr = item.PicNo.split(",");
							if(arr[arr.length-1] ==""){
								arr.splice(arr.length-1,1);
							}
							_this.$set(item, "imgArr",arr);
            })
					}
					this.count = result.count;
					if(this.Grade==0){
						this.allcommentnum=this.count;
					}
					if (this.count == 0) {
						this.noDataIsShow = true;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (this.page === 1) {
						this.commentlist = result.data;
					}
					if (this.page > 1) {
						this.commentlist = this.commentlist.concat(
							result.data
						);
					}
					if (this.allPage <= this.page) {
						this.isLoad = false;
						this.loadingType = 2;
					} else {
						this.isLoad = true;
						this.loadingType = 0
          }
				} else {
					wx.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
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
      this.page++;
      this.GetEvaluate();
    } else {
      this.loadingType = 2;
    }
  },
	onPullDownRefresh() { //下拉刷新
		//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
		let _this=this;
		_this.page=1;
		_this.loadingType = 1;
		setTimeout(function () {
			_this.GetEvaluate();
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		}, 1000);
	}
}
</script>

<style scoped lang='scss'>
.commentGrade{padding: 10rpx 0 0 20rpx;}
.commentGrade .type{ display: inline-block; border: 1px solid #e2e2e2; border-radius: 200rpx; font-size: 26rpx; color: #333; padding: 4rpx 20rpx; margin: 20rpx 20rpx 0 0;}
.commentGrade .type.active{ color: #ff5722; border-color: #ff5722; background: #feefeb;}
.or_list{
  .shop{
    width:200rpx;height:200rpx;
  }
  .or_item{
		margin-top:20rpx;border-radius:15rpx;
		.hd{
			height: 114rpx;
			.name{
				font-size: 30rpx;
      	font-weight: bold;
			}
      .left{
        width: 68rpx;
        height: 68rpx;
        border-radius: 50%;
        margin-right: 20rpx;
        background: #eee;
      }
      .right{
        width: 24rpx;
        height: 24rpx;
        margin-left: 10rpx;
      }
		}
		.bd{ padding-bottom: 20rpx}
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
  width:160rpx;
  height:160rpx;
  margin-right:15rpx;
  margin-top:10rpx;
  border-radius:6rpx;
  &:nth-child(4n){
    margin-right:0
  }
}
</style>
