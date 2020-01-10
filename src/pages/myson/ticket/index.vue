<template>
  <div class="ticket">
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="list jus-b" v-for="(item,index) in list" :key="index">
        <div class="left">
          <p>{{item.title}}</p>
          <span>有效期至{{item.endTime}}</span>
          <div class="flexc" :class="tabIndex==0?'back_col':'use'">{{item.discountType==1?'减满券':'折扣券'}}</div>
        </div>
        <div class="right flexc" :class="tabIndex==0?'back_col':''">
          <div>
            <p>{{item.discountType==1?item.denomination:item.denomination*10}}<span>{{item.discountType==1?'元':'折'}}</span></p>
            <span>满{{item.meetConditions}}元可使用</span>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import {switchPath,isJump,post,get} from '@/utils'
export default {

  data () {
    return {
      tabList:['未使用','已使用','已失效'],
      tabIndex:0,
      userId: "",
			token: "",
      shopid:"",
      isJump:false,
      page: 1,
      pageSize: 99,
      list:[],
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onShow(){
    this.shopid=wx.getStorageSync("shopid");
    this.userId=wx.getStorageSync("userId");
    this.token=wx.getStorageSync("token");
    this.tabIndex=0,
    this.GetMyCouponList()
  },
  methods: {
    async GetMyCouponList(){console.log(this.tabIndex)
      let res=await post("Coupon/MyCouponList",{
        "UserId": this.userId,
        "Token": this.token,
        "page": this.page,
        "pageSize": this.pageSize,
        "ShopId": this.shopid,
        "ProClassId": 0,
        "Enable": this.tabIndex+1
      })
      if(res.code==0){
        if(res.data.length>0){
          res.data.map(item=>{
            item.endTime=item.endTime.replace(/T/,' ')
          })
        }
        this.list = res.data;
      }
    },
    goUrl(url,param){
      this.isJump = true
      setTimeout(() => {
        this.isJump = false
        wx.navigateTo({
          url:url+'?id='+param
        })
      }, 100);
    },
    cliServer(index){
      this.serverIndex = index
    },
    cliTab(index){
      this.tabIndex = index;
      this.GetMyCouponList()
      // console.log(this.tabIndex,"this.tabIndex")
    },
  },
}
</script>

<style scoped lang='scss'>
.list::after{
  content:'';
  display: inline-block;
  position: absolute;
  top: -20rpx;
  left: 440rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list::before{
  content:'';
  display: inline-block;
  position: absolute;
  bottom: -20rpx;
  left: 440rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background-color: #f5f5f5;
}
.list{
  width: 690rpx;
  height: 180rpx;
  border-radius: 15rpx;
  margin: 30rpx;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  .use{
    background-color: #d4d5d6!important
  }
  .left{
    width: 460rpx;
    padding: 60rpx 0 0 35rpx;
    position: relative;
    span{
      font-size: 20rpx;
      color: #999;
    }
    div{
      width: 128rpx;
	    height: 40rpx;
      border-radius: 0 0 24px 0;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 24rpx;
      color: #fff
    }
  }
  .right{
    width: 230rpx;
    background-color: #d4d5d6;
    text-align: center;
    p{
      color: #fff;
      font-size: 56rpx;
      font-weight: 900;
      span{
        font-size: 20rpx
      }
    }
    span{
      font-size: 20rpx;
      color: #fff;
    }
  }
}
.tab{
  position: relative;
  height: 92rpx;
  background-color: #fff;
  position: relative;
  .active{
    color: #f00
  }
  span{
    position: absolute;
    bottom: 0;
    transition: all .2s;
    height: 5rpx;
    width: 50rpx;
    background-color: #f00
  }
}
.back_col{
  background-color: #f00!important;
}

</style>
