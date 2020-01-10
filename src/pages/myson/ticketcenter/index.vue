<template>
  <div class="ticket">
      <div class="list jus-b" v-for="(item,index) in list" :key="index">
        <div class="left flex">
          <div class="price">
            {{item.DiscountType==1?item.Denomination:item.Denomination*10}}<span>{{item.DiscountType==1?'元':'折'}}</span>
          </div>
          <div>
            <p v-if="item.DiscountType==1">满{{item.MeetConditions}}元减{{item.Denomination}}元券</p>
            <p v-else>满{{item.MeetConditions}}元打{{item.Denomination*10}}折券</p>
            <span>有效期至{{item.EndTime}}</span>
          </div>
          <div class="flexc back_col">{{item.DiscountType==1?'减满券':'折扣券'}}</div>
        </div>
        <div class="right flexc back_col" @click="ReceiveCoupon(item.Id)">
          <div>
            <!-- <p>20<span>元</span></p>
            <span>满100可使用</span> -->
            <p>立即领取</p>
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
      userId: "",
			token: "",
      shopid:"",
      isJump:false,
      page: 1,
      pageSize: 99,
      list:[],
    }
  },
  onShow(){
    this.shopid=wx.getStorageSync("shopid");
    this.userId=wx.getStorageSync("userId");
    this.token=wx.getStorageSync("token");
    this.GetCouponCenter()
  },
  methods: {
    async GetCouponCenter(){
      let res=await post("Coupon/CouponCenter",{
        "UserId": this.userId,
        "Token": this.token,
        "page": this.page,
        "pageSize": this.pageSize,
        "ShopId": this.shopid,
        "ProClassId": 0,
        "Enable": 3
      })
      if(res.code==0){
        this.list = res.data;
      }
    },
    async ReceiveCoupon(id){
      let res=await post("Coupon/ReceiveCoupon",{
        "UserId": this.userId,
        "Token": this.token,
        "CouponId": id
      })
        wx.showToast({
          title: res.msg,
          icon: 'none',
        })
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
    .price{
      color: #f00;
      font-size: 48rpx;
      margin-right: 20rpx;
      span{
        font-size: 36rpx!important;
        color: #f00;
      }
    }
    span{
      font-size: 20rpx;
      color: #999;
    }
    .back_col{
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
      font-size: 38rpx;
      font-weight: bold;
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
.back_col{
  background-color: #ff3333!important;
}

</style>
