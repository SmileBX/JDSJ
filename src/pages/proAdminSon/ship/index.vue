<template>
  <div class="ca">
      <div class="bpm-box">
          <div class="list ali-c jus-b" @tap="showInc = true">
            <span>快递公司</span>
            <div class="ali-c flex1">
              <input type="text" placeholder="请选择快递公司" class="flex1" disabled v-model="express.text">
              <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
            </div>
          </div>
          <div class="list ali-c">
            <span>快递号</span>
            <input type="text" placeholder="请输入快递号" v-model="no">
          </div>
          <p class="btn" @tap="submit">立即发货</p>
      </div>
      <van-popup
        :show="showInc"
        position="bottom"
        custom-style="height: 500rpx;"
        @close="onClose"
      >
        <van-picker :columns="expressList" 
        @change="onChange" 
        :show-toolbar="true"
        @confirm="confirm"
        @cancel="showInc=false"
        />
      </van-popup>
  </div>
</template>

<script>
import {post,get} from '@/utils';

export default {
  data () {
    return {
      token: "",
      userId: "",
      OrderId:'',//订单号
      express:{
        id:'',
        text:'',
        code:''
      },//快递公司
      expressList:[],//快递公司列表
      no:'',//快递单号
      showInc:false,
    }
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title: "发货"
    });
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.OrderId=this.$mp.query.OrderId||'';
    this.getData();
  },
  methods:{
    getData(){
      get('Order/GetExpressCompanyList').then(res=>{
        const list  = JSON.parse(res.data);
        list.map(item=>{
          this.expressList.push({
            id:item.Id,
            text:item.company,
            code:item.code
          })
        })
      })
    },
    // 完成选择快递公司
    confirm(e){
      this.express = e.mp.detail.value;
      this.showInc= false;
    },
    submit(){
        const toast = this.jiaoyan();
        if(toast){
            wx.showToast({
              title:toast,
              icon: "none",
              duration: 2000
            });
            return false;
        }
        post('Shop/Dlivery',{
            UserId:this.userId,
            Token: this.token,
            OrderId:this.OrderId,
            "ExpressId": this.no,
            "ExpressCompany": this.express.id
          }).then(res=>{
            wx.showToast({
              title: res.msg
            });
            setTimeout(()=> {
              wx.navigateBack()
              },1500)
        })
            
    },
    jiaoyan(){
      const detail =this.detail;
      if(!this.express.id){
          return '请选择快递公司'
      }
      if(!this.no){
          return '请输入快递号'
      }
      return false;
    },
  },
}
</script>

<style lang='scss' scoped>
.ddd{
  margin-top: 20rpx
}
.checkbox{
  font-size: 50rpx;
  text{
  position: relative;
  top: 6rpx;
  left: 10rpx;
  }
}
.btn{
  width: 690rpx;
	height: 88rpx;
	background-color: #f00;
	border-radius: 10rpx;
  position: fixed;
  bottom: 100rpx;
  font-size: 30rpx;
  color: #fff
}
  .bpm-box{
    height:100vh;
  }
  .list{
    height: 88rpx;
    border-bottom: 1rpx solid #ededed;
    font-size: 28rpx;
    span{
      color: #333;
      display:inline-block;
      width:30%; 
    }
    img{
      width: 11rpx;
      height: 20rpx;
    }
  }

</style>
