<template>
  <div style="padding-bottom:120rpx">
    <radio-group class="radio-group" @tap="radioChange" v-if="list.length>0">
      <div class="list bpr-box" v-for="(item, index) in list" :key="index" @tap="choseAddress(index)">
        <div class="ali-c jus-b">
          <span v-if="item.id==checkId" :class="['checkbox',item.id==checkId?'checked':'']"></span>
          <div style="width:100%">
            <p class="jus-b"><span class="name">{{item.name}}</span><span>{{item.tel}}</span></p>
            <p class="address">{{item.addressinfo}}</p>
            <div class="ali-c jus-b foot">
              <label @tap.stop="changeDefault(index)">
                  <radio class="radio" color="#f00000" :checked="item.is_def==1" :value="item.Id" >
                    <text>默认地址</text>
                  </radio>
              </label>
              <div class="ali-c">
                <div class="ali-c btt" @tap.stop="editSite(item.id)">
                  <img class="write" src="http://jd.wtvxin.com/images/images/icons/write.png" alt="">
                  <span>编辑</span>
                </div>
                <div class="ali-c btt" @tap.stop="Delete(item.id,index)">
                  <img class="delete" src="http://jd.wtvxin.com/images/images/icons/delete.png" alt="">
                  <span>删除</span>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
      </radio-group>
      <p  class="nodata_log flex flexColumn flexAlignCenter" v-if="isshownodata">
          <img src="http://jd.wtvxin.com/images/images/icons/nosite.png" alt="" class="site_log">
          <span class="cg mt2">还没有收货地址哦~</span>
          <span class="add_new" @tap="toAddSite()">新建地址</span>
      </p>
      <p
        class="ovedMsg"
        v-if="isOved && page>1"
        style="text-align:center;padding:20rpx;font-size:26rpx;color:#666;"
      >我也是有底线的</p>
      <p class="btnl" @tap="toAddSite()" v-if="list.length>0">添加收货地址</p>
  </div>
</template>

<script>
import {post} from '@/utils'
import { formatTime } from '@/utils/index'

export default {
  data () {
    return {
      page: 1,
      pageSize: 4,
      count:0,
      allPage:0,
      userId: "",
      token: "",
      isLoad:true,
      list:[],
      checkId:"",//已选
      pagetype:"",//页面来源
      isshownodata:false
    }
  },
  onLoad(){

  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.checkId=this.$root.$mp.query.checkId||'';
    this.pagetype=this.$root.$mp.query.pagetype||'';
    this.list = []
    this.page = 1
    this.geSiteList()
  },
  methods: {
    
    async geSiteList(){
      const res = await post('Address/AddressList',{
        UserId: this.userId,
        Token: this.token,
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
          this.list = this.list.concat(res.data)
        }
      }
    },
    radioChange(e) {
      //设置选中样式
        var arrs = this.list;
        var that = this;
        for (const x in arrs) {
          if (arrs[x].id == e.target.value) {
            arrs[x].checked = true;
          } else {
            arrs[x].checked = false;
          }
        }
    },
    changeDefault(i) {
      //设置默认
      const params = {
        Id: this.list[i].id,
        UserId: this.userId,
        Token: this.token
      };
      post("Address/SetDefaultaddress", params)
      
    },
     Delete(id, index) {
      //删除地址
      const that = this;
      wx.showModal({
        title: '您确定删除该收货地址吗？',
        content: '删除后无法恢复',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '确定',
        confirmColor: '#29a49f',
        success: (result) => {
          if(result.confirm){
              this.SureDel(id,index)
          }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    SureDel(id,index){
      post(
            "Address/DeleteAddress",
            {
              Id: id,
              UserId: this.userId,
              Token: this.token
            }
          ).then(res => {
            if (res.code === 0) {
              wx.showToast({
                title: "删除成功!",
                success:()=>{
                  this.list.splice(index, 1);
                  if(this.list.length==0){
                    this.isshownodata=true
                  }
                }
              });
            }
          });
    },
    editSite(id){
      let ischecked=false;
      if(id==this.checkId){
        ischecked=true
      }else{
        ischecked=false;
      }
       wx.navigateTo({
        url:'/pages/myson/addaddress/main?id='+id+'&ischeck='+ischecked
      })
    },
    toAddSite(){
      wx.navigateTo({
        url:'/pages/myson/addaddress/main'
      })
    },
    choseAddress(i){
      if(this.pagetype == 'confirm'){
        wx.setStorageSync("addressinfo",this.list[i]);
        wx.navigateBack()
      }
    }
  },
  onReachBottom() {
      console.log("ddddd");
      //加载更多
      console.log(this.allPage,this.page,this.isLoad)
      if (this.isLoad) {
        this.page++;
        this.geSiteList()
      } else {
        if (this.page > 1) {
          this.isOved = true;
        } else {
          this.isOved = false;
        }
      }
    }
}
</script>

<style lang='scss' scoped>
.nodata_log{
  padding:200rpx 0;
}
.add_new{
  margin-top:80rpx;
  width:180rpx;
  border:1rpx solid #f00;border-radius:8rpx;
  color:#f00;
  height:50rpx;line-height: 50rpx;
  text-align: center;
}
.site_log{
  width:273rpx;height:363rpx;
}
.btnl{
  width: 100%;
	height: 100rpx;
  background-color: #f00;
  text-align: center;
  line-height: 100rpx;
  position: fixed;
  bottom: 0;
  font-size: 30rpx;
  color: #fff;
  margin:auto;
}
.list{
  margin: 20rpx 30rpx 0;
  padding: 40rpx 20rpx 0;
  .checkbox{ margin-right: 10rpx}
  .btt{
    margin-left: 50rpx
  }
  .foot{
    height: 100rpx;
  }
  .address{
    line-height: 80rpx;
    border-bottom: 1rpx solid #ededed;
    color: #333
  }
  .name{
    font-size: 28rpx;
    color: #3c3c3c;
  }
  .radio{
    transform: scale(0.7);
    position: relative;
    left: -30rpx;
    text{  
      font-size: 40rpx
    }
  }
  .write{
    width: 32rpx;
    height: 31rpx;
    margin-right: 10rpx
  }
  .delete{
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx
  }
}
</style>
