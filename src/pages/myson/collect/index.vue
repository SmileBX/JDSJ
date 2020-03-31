<template>
  <div class="foot_list" style="min-height:100vh">
      <div class="pp3 text_right" v-if="hasData" @click="showEdit=!showEdit">{{showEdit?'完成':'编辑'}}</div>
      <div class="or_list" v-if="hasData">
        <div class="or_item bg_fff flex flex1 justifyContentBetween flexAlignCenter pw3 gou" v-for="(item,index) in list" :key="index">
            <label v-show="showEdit">
              <input type="checkbox" class="checkbox-cart" :checked="item.hascheck" @click="selectInv(index)">
            </label>
            <div class="flex or_main flex1" @click="goUrl('/pages/goodsSon/goodsDetail/main',item.AssociationId)">
                <img :src="item.PicFrist" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p class="name twoline">{{item.AssociationName}}</p>
                      <p class="c-999 fz12">{{item.Scount}}人收藏</p>
                      <p class="cr font30">￥{{item.Price}}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <noData :isShow="noDataIsShow"></noData>
      <view class="loading" v-if="hasData">
        <load-more :loadingType="loadingType"></load-more>
      </view>
      <div style="height:100rpx" v-show="showEdit"></div>
      <div class="foot_fot flex justifyContentBetween flexAlignCenter" v-show="showEdit">
          <label class="flex foot_btnl">
              <input type="checkbox" class="checkbox-cart chppo" :checked=allSelect @click="selectAll">
              <span>全选</span>
          </label>
          <p class="foot_btnr" @click="deletec">删除</p>
      </div>
      
  </div>
</template>

<script>
import {post} from '@/utils'
import noData from "@/components/noData"; //没有数据的通用提示。
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
      showEdit:false,
      hasData:false,
			noDataIsShow: false,//没有数据的提示是否显示
      list:{},
      page:1,
      pageSize: 6,
      allPage: 0,
			count: 0,
			isLoad: false,
			isOved:false,       //显示已经到底了
      loadingType: 0, //0加载前，1加载中，2没有更多了
      allSelect:false,//全选
      selectlen:0
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid =wx.getStorageSync("shopid");
    this.GetProductList()
  },
  methods: {
    async GetProductList(){
      let res=await post('User/MemberCollectionsList',{
        UserId:this.userId,
        Token:this.token,
        Page:this.page,
        PageSize:this.pageSize,
        Type:0,
        ShopId:this.shopid
      })
      if(res.code===0){
           let _this=this;
					if (res.data.length > 0) {
						this.hasData = true;
						this.noDataIsShow = false;
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
        }else{
           wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 1000
          });
        }
    },
    //全选
    selectAll(){
      var that=this;
      if(this.allSelect){
        this.allSelect=false;
        this.selectlen=0;
        this.list.forEach(function(item) {
          that.$set(item,"hascheck",false)
        });
        
      }else{
        this.allSelect=true;
        this.selectlen=this.list.length;
        this.list.forEach(function(item) {
          that.$set(item,"hascheck",true)
        });
        
      }
    },
    //单选
    selectInv(index){
      var that=this
      var selectId=!this.list[index].hascheck;
      this.$set(this.list[index],"hascheck",selectId);
      if(selectId){
        this.selectlen++
      }else{
        this.selectlen--
      }
      var len=this.list.length;
      if(this.selectlen==len){
        this.allSelect=true
      }else{
        this.allSelect=false
      }
    },
    //删除
    deletec(){
      let that=this;
      let OrderId=[];
      that.list.forEach(function(item) {
        if(item.hascheck){
          OrderId.push(item.Id);
        }
      });
      if(this.selectlen==0){
        wx.showToast({
          icon:"none",
          title:"请选择要删除的产品！"
        })
      }else{
        wx.showModal({
          content: "您确定要删除所选商品吗？",
          confirmColor:"#ff3333",
          success: function(res) {
							if (res.confirm) {
                that.SureDel(OrderId.join(","))
							} else if (res.cancel) {
							}
						}
        }) 
      }
    },
    SureDel(ids){
      post('User/DeleteCollections',{
        UserId:this.userId,
        Token:this.token,
        Id:ids
      }).then(res=>{
        if (res.code === 0) {
          wx.showToast({
            title: "删除成功!",
          });
          var that=this
          setTimeout(res=>{
            that.getList();
          },1500)
        }
      })
    },
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    
  },
  onReachBottom: function() {
    if (this.isLoad) {
			this.loadingType = 1;
      this.isOved = false;
      this.page++;
      this.GetProductList();
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
    width:161rpx;height:161rpx;
  }
  .or_item{
    .or_left{
      height:100%;
      width: 500rpx;
    }
    .line_through{
      text-decoration: line-through;
    }
    .or_main{
      padding:20rpx 0;
      .name{ font-size: 30rpx}
    }
  }
}
.or_list .or_item {
  position: relative;
}
.or_list .or_item::before,
.or_list .item::before {
  display: none;
}
.foot_fot{
  width:100%;position: fixed;
  box-sizing: border-box;bottom:0;
  color:#ffffff;
  height:98rpx;
  .foot_btnl{
    width:75%;height:100%;
    line-height: 98rpx;
    padding-left:30rpx;
    background: #333333;
  }
  .foot_btnr{
    width:25%;height:100%;
    text-align:center;
    background: #f00;
    line-height: 98rpx;
  }
  
}
</style>
