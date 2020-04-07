<template>
  <div class="bg_fff" style="min-height:100vh">
    <div class='goods-box ali-c'>
      <img :src="logo" alt="">
      <div>
        <p><span>物流公司：</span>{{companyName}}</p>
        <p class="ali-c"><span>物流单号：</span>{{nu||'信息错误，请联系商家'}}<span class="copy ali-c jus-c" @click="cop" v-if="nu">复制</span></p>
        <!-- <p>预计8月22日送达</p> -->
      </div>
    </div>
    <div class="border"></div>
    <div>
      <div class="top flex">
        <span class="jus-c ali-c">收</span>
        <p>[收货地址] {{address}}</p>
      </div>
      <div class="route-box" v-if="msg">
        <div class="list-box ali-c" v-for="(item, index) in msg" :key="index">
          <div class="list ali-c">
            <img :src="index==0?'http://jd.wtvxin.com/images/images/icons/l_active.png':'http://jd.wtvxin.com/images/images/icons/ll.png'" alt="">
            <div>
              <span>{{item.time}}</span>
              <p>{{item.context}}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="c-999 center">该订单暂无物流信息返回</div>
    </div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {
  data(){
    return {
      msg:{},
      logo:"",
      companyName:"",
      nu:"",
      address:'',
      isAdmin:0,
    }
  },
  onLoad(options){
    this.isAdmin = 0;
    this.isAdmin = options.isAdmin||0;
  },
  onShow(){
    this.getInfo()

  },
  methods: {
    cop(){
        wx.showToast({
          icon:'none',
          title: '复制成功',
        })
        wx.setClipboardData({
          data: this.nu,
          success: function (res) {
            wx.getClipboardData({ 
              success: function (res) {
                console.log(res.data) // data
              }
            })
          }
        })
    },
    getInfo(){
      post('Order/GetLogistics',{//物流信息
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id
      }).then(res=>{
        this.logo=res.data.logo;
        this.companyName=res.data.kuaidiInfo.companyName;
        this.nu=res.data.kuaidiInfo.nu;
        this.msg=res.data.kuaidiInfo.data;
        // 商家
        if(this.isAdmin){
          post('Shop/GetOrderDetail',{//订单详情
            UserId:wx.getStorageSync("userId"),
            Token:wx.getStorageSync("token"),
            OrderId:this.$mp.query.id
          }).then(resu=>{
            const data= resu.data.OrderInfo;
            console.log(data)
            this.address = data.areaName + data.addr;
          })
        }else{
          post('Order/OrderDetails',{//订单详情
            UserId:wx.getStorageSync("userId"),
            Token:wx.getStorageSync("token"),
            OrderNo:this.$mp.query.id
          }).then(resu=>{
            this.address = resu.data.Address
          })
        }
      })
    }
    
  }
}
</script>

<style lang="scss" scoped>
.route-box{
  margin-left: 50rpx;
  border-left: 2rpx dashed #ededed;
  // z-index: 9;
  // position: relative;
  // top: 0rpx;
  // left: 4rpx;
  .list-box{
    padding: 10rpx 0;
    // height: 140rpx;
    // position: relative;
    .list{
      font-size: 24rpx;
      // position: absolute;
      // top: 80rpx;
      // left: -13rpx;
      img{
        width: 22rpx;
	      height: 26rpx;
        margin-left: -12rpx;
      }
      div{
        width: 520rpx;
        padding-left: 34rpx;
      }
      span{
        color: #999;
      }
      p{
        color: #333
      }
    }
  }
}
.top{
  padding: 30rpx;
  // z-index: 99;
  // position: relative;
  // top: 40rpx;
  p{
    width: 520rpx
  }
  span{
    width: 52rpx;
    height: 52rpx;line-height: 52rpx;
    background-color: #f00;
    border-radius: 50%;
    color: #fff;
    margin-right: 20rpx;
  }
}
.border{
  width: 100vw;
  height: 20rpx;
  background-color: #f5f5f5;
}
.goods-box{
  height: 180rpx;
  padding: 0 30rpx;
  img{
    width: 140rpx;
	  height: 140rpx;
    border-radius: 8rpx;
    margin-right: 20rpx
  }
  div{
    p{
      font-size: 28rpx;
      color: #333;
      line-height: 50rpx;
      span{
        color: #999
      }
      .copy{
        width: 80rpx;
        height: 36rpx;
        border-radius: 4rpx;
        border: solid 1rpx #999999;
        margin-left: 15rpx
      }
    }

  }
}
</style>
