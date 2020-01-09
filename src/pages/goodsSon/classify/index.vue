<template>
  <div class="page">
      <div class="top">
        <img class="bg" mode='aspectFill' :src="datainfo.bannerPicNo" alt="">
        <div class="main">
          <div class="flexc search-box">
            <div class="search flexc">
              <img src="/static/images/index/search_b.png" alt="">
              <span>搜索本店商品</span>
            </div>
          </div>
          <div class="shop ali-c">
            <img :src="datainfo.logo" :alt="datainfo.companyName">
            <p>{{datainfo.companyName}}</p>
          </div>
        </div>
      </div>
      <div class="main-box" v-for="(item, index) in datalist" :key="index">
        <div class="tit ali-c">
          <p>{{item.TypeName}}</p>
        </div>
        <div class="tag flex-wrap jus-b">
          <p class="ali-c" v-for="(i,e) in item.classilyList" :key="e"  @click="goUrl(i.Id,i.ClassName)">{{i.ClassName}}</p>
        </div>
      </div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {
  data () {
    return {
     datainfo:{},//店铺信息
     typelist:{},//类型
     datalist:{},//分类数据
     shopid:"" 
    }
  },
  onLoad(){
    this.shopid = wx.getStorageSync("shopid");
  },
  onShow(){
    this.GetMerchantDetail();
    this.GetProductType();
  },
  methods: {
    goUrl(id,name){
      wx.navigateTo({
        url:'/pages/goodsSon/classifyDetail/main?cid='+id+'&name='+name
      })
    },
    async GetMerchantDetail(){
      let res=await post("Shop/GetMerchantDetail",{
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
    }
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
