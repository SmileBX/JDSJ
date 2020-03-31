<template>
  <div class="foot_list">
      <div class="pp3 text_right" v-if="list&&list.length>0" @click="showEdit=!showEdit">{{showEdit?'完成':'编辑'}}</div>
      <div class="or_list">
        <div class="or_item bg_fff flex flex1 justifyContentBetween flexAlignCenter pw3 gou" v-for="(item,index) in list" :key="index">
            <label v-show="showEdit">
              <input type="checkbox" class="checkbox-cart" :checked="item.hascheck" @click="selectInv(index)">
            </label>
            <div class="flex or_main flex1">
                <img :src="item.PicFrist" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p>{{item.AssociationName}}</p>
                      <p class="cr font30">￥{{item.Price}} <span class="line_through font22 cg" v-if="false">￥600</span> </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
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
export default {

  data () {
    return {
      showEdit:false,
      page: 1,
      pageSize: 8,
      count:0,
      allPage:0,
      userId: "",
      token: "",
      shopid:"",
      isLoad:true,
      list:[],
      allSelect:false,//全选
      selectlen:0,
      IdTxt:"",//删除的足迹id集合
    }
  },

  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid=wx.getStorageSync("shopid");
    this.page=1
    this.list=[]
    this.allSelect=false
    this.selectlen=0
    this.geSiteList()
  },
  methods: {
    async geSiteList(){
      const res = await post('User/MemberFootprintList',{
        UserId: this.userId,
        Token: this.token,
        ShopId:this.shopid,
        Page: this.page,
        PageSize: this.pageSize
      })
      if(res.code==0){
        this.count = res.count;
        if(this.count==0){
          this.isshownodata=true
        }else{
          this.isshownodata=false
        }
        if(this.page == 1){
          this.list = []
        }
        if(parseInt(this.count) % this.pageSize == 0){
          this.allPage = this.count / this.pageSize
        }else{
          this.allPage = parseInt(this.count / this.pageSize) + 1
        }
        if(this.allPage > this.page){
          this.isLoad = true;
        }else{
          this.isLoad = false
        }
        if(res.data.length>0){
          res.data.map(item=>{
            this.$set(item,"hascheck",false)
          })
          this.list = this.list.concat(res.data)
        }
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
      if(this.selectlen==0){
        wx.showToast({
          icon:"none",
          title:"请选择要删除的足迹！"
        })
      }else{
        var that=this;
        var OrderId=[];
        that.list.forEach(function(item) {
          if(item.hascheck){
            OrderId.push(item.Id);
          }
        });
        that.IdTxt=OrderId.join(",");
        that.SureDel()
      }
    },
    SureDel(id){
      post("User/DeleteMyFootprint",
        {
          Id: this.IdTxt,
          UserId: this.userId,
          Token: this.token
        }
      ).then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: "删除成功!",
          });
          var that=this
          setTimeout(res=>{
            that.geSiteList();
          },1500)
        }
      });
    },
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
  },
  onReachBottom() {
    console.log("ddddd");
    //加载更多
    console.log(this.allPage,this.page,this.isLoad)
    if (this.isLoad) {
      this.page++;
      this.geSiteList()
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
    }
    .line_through{
      text-decoration: line-through;
    }
    .or_main{
      padding:20rpx 0;
      position: relative;
      &::after{
        position: absolute;bottom:0;width:660rpx;
        content: '';height:2rpx;background: #f5f5f5;
      }
    }
  }
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
