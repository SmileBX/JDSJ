<template>
  <div>
    <block v-if="hasTime">
      <scroll-view scroll-x :scroll-left="scrollLeft" class="navscroll">
        <div class="top">
          <block v-for="(item, index) in timelist" :key="index">  
          <div class="navitem" :class="{active:navindex==index,on:item.staus=='疯抢中'}" @click="navselect(index,item.staus)" :id="'tabNum'+index">
            <div class="flexv flexc">
              <p class="time">{{item.StartTimeStr}}</p>
              <p class="txt">{{item.staus}}</p>
            </div>
          </div>
          </block>
        </div>
      </scroll-view>
      <view style="height:110rpx;"></view>
    </block>
    <block v-if="hasData">
      <div class="list ali-c jus-b" v-for="(item,index) in limitlist" :key="index" @click="goUrl(item.Id)">
        <img class="left" :src="item.Pic" :alt="item.Name">
        <div class="right">
          <p class="tit oneline">{{item.Name}}</p>
          <p class="price">
            <span>￥</span><span>{{item.Price}}</span>
            <!-- <span>￥30.00</span> -->
          </p>
          <div class="rob ali-c jus-b">
            <!-- <span>已抢1235</span> -->
            <p v-if="timeType==0||timeType==1" class="flexc">马上抢</p>
            <p v-else-if="timeType==2" class="flexc btn_yellow">敬请期待</p>
            <p v-else class="flexc btn_ccc">已结束</p>
          </div>
        </div>
      </div>
    </block>
      <noData :isShow="noDataIsShow"></noData>
      <div class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </div>
  </div>
</template>

<script>
import {post,get,dateUtils} from '@/utils';
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
      hasTime:false,
      scrollLeft:0,
      loadingType: 0, //0加载前，1加载中，2没有更多了
      isLoad: false,
      hasData: false,
      noDataIsShow: false,
      page: 1,
      pageSize: 10,
      allPage: 0,
      count: 0,
      limitlist:{},
      starTime:"",//开始时间
      isactive:0,
      timeType:0,//0当前，1已开始，2即将开始
      timelist:{},
      navindex:0,
      isShowRemind:false
      
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId");
		this.token = wx.getStorageSync("token");
  },
  onShow(){
    this.shopid = wx.getStorageSync("shopid");
    this.FlashSaleTimeList();
  },
  methods: {
    goUrl(id){
      wx.navigateTo({
        url:'/pages/goodsSon/goodsDetail/main?id='+id+'&isLimint=1'
      })
    },
    navselect(index,staus){
      this.navindex=index;
      this.starTime=this.timelist[index].StartTime;
      this.loadingType = 0;
      this.hasData = false;
      this.noDataIsShow = false;
      this.isLoad = false;
      this.page = 1;
      this.allPage = 0;
      this.count = 0;
      this.limitlist = {};
      if(index==this.timelist.length-1){
        this.setScrollLeft(index);
      }else{
        this.setScrollLeft(index+1);
      }
      if(staus=="疯抢中"){
        this.timeType=0;
      }
      if(staus=="已开始"){
        this.timeType=1;
      }
      if(staus=="即将开抢"){
        this.timeType=2;
      }
      this.limitList();
    },
    setScrollLeft: async function(tabIndex) {
      let leftWidthSum = 0;
      for (var i = 0; i <= tabIndex; i++) {
        leftWidthSum = leftWidthSum + 75;
      }
      let winWidth = wx.getSystemInfoSync().windowWidth;
      this.scrollLeft = leftWidthSum > winWidth ? (leftWidthSum - winWidth) : 0;
    },
    //限时购时间
			async FlashSaleTimeList(){
				let result = await post("Goods/FlashSaleTimeList",{
          ShopId:this.shopid
        });
				if (result.code === 0){
					let _this=this;
					if (result.data.length > 0) {
						this.hasTime = true;
						this.hasData=true;
						this.timelist=result.data;
						let timecount=this.timelist.length;
						let nowtime=new Date().getHours();
						let i=0;
						if(timecount==1){
							i=0;
							this.navindex=i;
							let startime=this.timelist[i].StartTime;
							let stardiff=nowtime-startime;
							if(stardiff<0){
							  this.timelist[i]["staus"]="即将开抢";
							}
							if(stardiff==0){
							  this.timelist[i]["staus"]="疯抢中";
							}
							if(stardiff>0){
							  this.timelist[i]["staus"]="已开抢";
							}
						}else if(timecount>1){
							for(i=1;i<timecount;i++){
								let startime1=this.timelist[i-1].StartTime;
								let startime2=this.timelist[i].StartTime;
								let stardiff1=nowtime-startime1;
								let stardiff2=startime2-nowtime;
								if(stardiff1<0&&stardiff2>0){
									this.timelist[i]["staus"]="即将开抢";	
									this.timelist[i-1]["staus"]="即将开抢";
								}
								if(stardiff1>=0&&stardiff2>0){
									this.timelist[i]["staus"]="即将开抢";
									this.timelist[i-1]["staus"]="疯抢中";
								}
								if(stardiff1>0&&stardiff2<=0){
									this.timelist[i]["staus"]="疯抢中";
									this.timelist[i-1]["staus"]="已开始";
									this.isactive=i;
								}
							}
						}
						this.navselect(this.isactive,this.timelist[this.isactive].staus);
					}else{
						this.noDataIsShow = true;
					}
				}
      },
    async limitList(){
      let result = await post("Goods/GetFlashSaleList", {
          PageIndex: this.page,
          PageSize: this.pageSize,
          ShopId: this.shopid,
					Time: this.starTime
				});
				if (result.code === 0) {
					let _this=this;
					if (result.data.length > 0) {
						this.hasData = true;
						// result.data.forEach(function(item){
						// 	_this.GetRTime(item,item.FlashSaleEndTime);
						// })
					}
					this.count = result.count;
					if (this.count == 0) {
						this.noDataIsShow = true;
					}
					if (parseInt(this.count) % this.pageSize === 0) {
						this.allPage = this.count / this.pageSize;
					} else {
						this.allPage = parseInt(this.count / this.pageSize) + 1;
					}
					if (this.page === 1) {
						this.limitlist = result.data;
					}
					if (this.page > 1) {
						this.limitlist = this.limitlist.concat(
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
				}else {
					wx.showToast({
						title: result.msg,
						icon: "none",
						duration: 2000
					});
				}
    },
  },
  onReachBottom: function() {
			if (this.isLoad) {
				this.loadingType = 1;
				this.page++;
				this.limitList();
			} else {
				this.loadingType = 2;
			}
		},
		onPullDownRefresh() { //下拉刷新
			//监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
			let _this=this;
			_this.page = 1;
			_this.loadingType = 1;
			setTimeout(function () {
				_this.limitList();
				wx.stopPullDownRefresh();  //停止下拉刷新动画
			}, 1000);
		}
}
</script>

<style scoped lang='scss'>
.list{
  box-sizing: border-box;
  height: 261rpx;
  background-color: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  .left{
    width: 200rpx;
    height: 200rpx;
    border-radius: 10rpx;
  }
  .right{
    width: 462rpx;
    .tit{
      font-weight: 900;
      margin-bottom: 10rpx
    }
    .rob{
      margin-top: 40rpx;
      span{
        color: #999;
        font-size: 22rpx;
      }
      p{
        width: 140rpx;
        height: 53rpx;
        background-color: #ff3333;
        border-radius: 26rpx;
        color: #fff
      }
      .btn_yellow{
        background-color: #fda33a;
      }
      .btn_ccc{
        background-color: #ccc;
      }
    }
    .price span:nth-child(1){
      color: #ff3333;
      font-size: 20rpx;
      font-weight: 900
    }
    .price span:nth-child(2){
      color: #ff3333;
      font-size: 36rpx;
      font-weight: 900
    }
    .price span:nth-child(3){
      color: #999;
      font-size: 22rpx;
      margin-left: 15rpx;
    }
  }
}
.navscroll{
	position: fixed;
	white-space: nowrap;
	width: 100%;
	top: 0;
  z-index: 10;
  .top{
    height: 100rpx;
    // background-color: #31353b;
    text-align: center;
    color: #7d7d7d;
     border-bottom: 10rpx solid #f5f5f5;
	   box-sizing: content-box;
    .navitem{
      width: 150rpx;
      height: 100%;
      display: inline-block;
      text-align: center;
      position: relative;
      box-sizing: content-box;
      background-color: #31353b;
      div{
        line-height: 1.2;
        height: 100%;
      }
      .time{
        font-size: 30rpx;
      }
      .txt{font-size: 24rpx}
    }
    .active{
      background-color: #ff3333;
      color: #fff!important;
      position: relative;
      overflow: visible
    }
    .active::before{
      content:"";
      width: 16rpx;
      height: 16rpx;
      background-color: #ff3333;
      position: absolute;
      bottom: -8rpx;
      left: 65rpx;
      transform: rotate(45deg)
    }
  }
}


</style>
