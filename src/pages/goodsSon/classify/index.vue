<template>
  <div class="page">
      <div class="top">
        <img class="bg" mode='aspectFill' :src="datainfo.bannerPicNo" alt="">
        <div class="main">
          <div class="flexc search-box">
            <div class="search flexc" @click="goSearch">
              <img src="http://jd.wtvxin.com/images/images/index/search_b.png" alt="">
              <span>搜索本店商品</span>
            </div>
          </div>
          <div class="shop ali-c">
            <img :src="datainfo.logo" :alt="datainfo.shopNick">
            <p>{{datainfo.shopNick}}</p>
          </div>
        </div>
      </div>
      <div class="main-box" v-for="(item, index) in datalist" :key="index" style="display:none">
        <div class="tit ali-c">
          <p>{{item.TypeName}}</p>
        </div>
        <div class="tag flex-wrap jus-b">
          <p class="ali-c" v-for="(i,e) in item.classilyList" :key="e"  @click="goUrl(i.Id,i.ClassName)">{{i.ClassName}}</p>
        </div>
      </div>
        <view class="page-body">
          <scroll-view class="nav-left" scroll-y style="height:100%">
            <view class="nav-left-item" @click="categoryClickMain(item.Id,index)" :key="index" :class="index==categoryActive?'active':''"
            v-for="(item,index) in categoryList">
              {{item.ClassName}}
            </view>
          </scroll-view>
          <scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scrolltolower="loadMore" style="height:100%" scroll-with-animation>
            <view class="nav-rightList"  v-if="hasData">
              <view :id="index===0?'first':''" class="nav-right-item" v-for="(item,index) in subCategoryList" :key="index" @click="goUrl(item.Id,item.ClassName)">
                <image :src="item.PicUrl" v-if="item.PicUrl" />
                <image src="/static/noPicmin.png" v-else mode="widthFix"></image>
                <view class="txt">{{item.ClassName}}</view>
              </view>
            </view>
            <block v-if="hasProData">
						<view class="level__product-list mt10" style="padding-left: 20rpx;">
							<view class="item flex flex-center-between" v-for="(item,index) in prolist" :key="index" @click="goDetail(item.Id)">
								<image :src="item.Pic" class="item_img" mode=""></image>
								<view class="item_info">
									<view class="item_title twoline">{{item.Name}}</view>
									<view class="flex flex-center-between">
										<view class="flex">
											<span class="item_price red"><i class="fz12">￥</i>{{item.Price}}</span>
											<span class="item_market" v-if="item.MarketPrice>item.Price">￥{{item.MarketPrice}}</span>
										</view>
										<view class="fz12 c-999">已售{{item.SalesVolume}}</view>
									</view>
								</view>
							</view>
						</view>
						<view class="loading">
              <load-more :loadingType="loadingType"></load-more>
            </view>
					</block>
					<noData :isShow="noDataIsShow"></noData>
          </scroll-view>

        </view>
      

  </div>
</template>

<script>
import {post,get} from '@/utils'
import noData from '@/components/noData.vue'; //暂无数据
import LoadMore from '@/components/load-more.vue';
export default {
  components: {
			noData,
			LoadMore
		},
  data () {
    return {
     datainfo:{},//店铺信息
     typelist:{},//类型
     datalist:{},//分类数据
     shopid:"" ,

     categoryList: [], //左边的数据
    subCategoryList: [], //右边的数据
    categoryActive: 0,
    scrollTop: 0,
    scrollHeight: 0,
    typeId: '',
    parentId: 0, //顶级分类id,如果为-1，就是查询全部

    hasData: false,//是否有下级分类
    hasProData: false,//是否有产品
    noDataIsShow: false,
    page: 1,
    pageSize: 6,
    loadingType: 0, //0加载前，1加载中，2没有更多了
    isLoad: false,
    prolist:[],
    }
  },
  onLoad(){
    this.categoryActive=0;
  },
  onShow(){
    this.shopid = wx.getStorageSync("shopid");
    this.GetMerchantDetail();
    //this.GetProductType();
		this.classifyNavList();
  },
  methods: {
    goUrl(id,name){
      wx.navigateTo({
        url:'/pages/goodsSon/classifyDetail/main?cid='+id+'&name='+name
      })
    },
    goSearch(){
       wx.navigateTo({
        url:'/pages/goodsSon/goodsSearch/main'
      })
    },
    async GetMerchantDetail(){
      let res = await post("Shop/GetMerchantDetail",{
        ShopId:this.shopid
      })
      if(res.code==0){
        this.datainfo=res.data.ShopInfo;
        this.datainfo.bannerPicNo=this.datainfo.bannerPicNo.split(',')[0];
      }
    },
    async GetProductType(){
      let res=await post("Goods/GetProductType",{})
      if(res.code==0){
        this.typelist=res.data;
        this.GetProductClass();
      }
    },
    async GetProductClass(){
      let res=await post("Goods/GetProductClass",{
        ShopId:this.shopid,
        typeId: 0,
        parentId: 0
      })
      if(res.code==0){
        let _this=this;
				const newData =[];
        res.data.forEach(item=>{
          _this.typelist.forEach(i=>{
            if(i.Id==item.TypeId){
               _this.$set(item, "TypeName", i.TypeName);
            }
          })
          const indexFound = newData.findIndex(newItem => newItem.TypeId === item.TypeId);
          const currentClassily={
            Id: item.Id,
            ClassName: item.ClassName
          }
          if (indexFound > -1) {
						  newData[indexFound].classilyList.push(currentClassily)
						} else {
						  newData.push({
							TypeId: item.TypeId,
              TypeName: item.TypeName,
							classilyList: [currentClassily]
						  })
						}
        });
        this.datalist=newData;
      }
    },

    //
    scroll(e) {
      this.scrollHeight = e.detail.scrollHeight;
    },
    categoryClickMain(id, index) {
      this.categoryActive = index;
      this.parentId = id;
      this.scrollTop = -this.scrollHeight * index;
      this.page=1;
      this.isLoad=false;
      this.prolist=[];
      this.hasProData=false;
      this.hasData=false;
      this.subCategoryList=[];
      this.classifyList();
    },
    async classifyNavList() {
      //顶级分类
      let result = await post("Goods/GetProductClass",{
        ShopId:this.shopid,
        typeId: 0,
        parentId: 0
      });
      if (result.code === 0&&result.data.length) {
        this.categoryList = result.data;
        //this.typeId = result.data[0].TypeId;
        this.parentId=result.data[0].Id;
        this.categoryClickMain(this.parentId, this.categoryActive); //默认的第一条顶级分类(获取下级分类)
      }else{
            this.noDataIsShow=true;
            this.hasData=false;
            this.hasProData=false;
            this.categoryList=[];
      }
    },
			async classifyList() {
				//获取下级分类
				let result = await post("Goods/GetProductClass", {
          ShopId:this.shopid,
					typeId: 0,
					parentId: this.parentId
				});
				if (result.code === 0) {
          if(result.data.length){
						this.hasData=true;
						this.hasProData=false;
						this.noDataIsShow=false;
						this.subCategoryList = result.data;
					}else{
						this.hasData=false;
						this.getprolist();
					}
				}
      },
      //无二级分类显示产品
			async getprolist(){
				let res = await post("Goods/GetClassProductList", {
          PageIndex: this.page,
          PageSize: this.pageSize,
          ShopId: this.shopid,
          ClassId:this.parentId,
				});
				if(res.code==0){
					let len=res.data.length;
					if (len > 0) {
					  this.hasProData = true;
					  this.noDataIsShow = false;
					}
					if (len == 0&&this.page==1) {
					  this.noDataIsShow = true;
					  this.hasProData = false;
					}
					if (this.page === 1) {
					  this.prolist = res.data;
					}
					if (this.page > 1) {
					  this.prolist = this.prolist.concat(
					    res.data
					  );
					}
					if (len < this.pageSize) {
					  this.isLoad = false;
					  this.loadingType = 2;
					} else {
					  this.isLoad = true;
					  this.loadingType = 0
					}
				}
      },
      goDetail(id) {
				wx.navigateTo({
					url: '/pages/goodsSon/goodsDetail/main?id='+id
				})
			},
      loadMore(){
				if (this.isLoad) {
					this.loadingType = 1;
					this.page++;
					this.getprolist();
				} else {
					this.loadingType = 2;
				}
			}
  },
}
</script>

<style scoped lang='scss'>
.page{
  height: 100vh;
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
  height: 22%;
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
.page-body {
	display: flex;
	background: #fff;
  height: 78%;
.nav {
	display: flex;
	width: 100%;
}

.nav-left {
	width: 25%;
	background: #f5f5f5;
}

.nav-left-item {
	height: 100rpx;
	font-size: 28rpx;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: center;
}

.nav-right {
	width: 75%;
}
.nav-right-item {
	width: 33.3%;
	float: left;
	text-align: center;
	padding: 10rpx;
	box-sizing: border-box;
}

.nav-right-item image {
	width: 100rpx;
	height: 100rpx;
  border-radius:6rpx;
}
.nav-right-item .txt{
	font-size: 26rpx;
	color: #333;
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.active {
	color: #ff3333;
	background: #fff;
	position: relative;
}
.active:before{
	content: "";
	display: block;
	position: absolute;
	left: 0;
	top: 50%;
	height: 36rpx;
	width: 6rpx;
	background: #ff3333;
	margin-top: -18rpx;
}
}
.level__product-list{
	padding:0 20rpx;
	.item{
		padding: 20rpx 0;
		border-bottom: 1px solid #f5f5f5;
		.item_img{ height: 180rpx; width: 180rpx; display: block; border-radius: 12rpx; overflow: hidden; }
		.item_info{
			width: 320rpx;
      height: 180rpx;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			padding: 10rpx 0;
			.item_title{
				font-size:30rpx;font-weight:600;
			}
			.item_price{
				color:#f00000;font-size:35rpx;
				line-height: 1;
        display: flex;
        align-items: center
			}
			.item_market{
				color:#999;font-size:24rpx;text-decoration: line-through;
			}
		}
	}
	.item:last-child{
		border-bottom: none;
	}
}
</style>
