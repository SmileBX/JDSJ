<template>
  <div>
    <div class='goods-box ali-c'>
      <img :src="msg.logo" alt="">
      <div>
        <p><span>物流公司：</span>{{msg.kuaidiInfo.companyName}}</p>
        <p class="ali-c"><span>物流单号：</span>{{msg.kuaidiInfo.nu}}<span class="copy ali-c jus-c" @click="cop">复制</span></p>
        <!-- <p>预计8月22日送达</p> -->
      </div>
    </div>
    <div class="border"></div>
    <div class="top flex">
      <span class="jus-c ali-c">收</span>
      <p>[收货地址] {{address}}</p>
    </div>
    <div class="route-box">
      <div class="list-box ali-c" v-for="(item, index) in msg.kuaidiInfo.data" :key="index">
        <div class="list ali-c">
          <img :src="index==0?'http://jd.wtvxin.com/images/images/icons/l_active.png':'http://jd.wtvxin.com/images/images/icons/ll.png'" alt="">
          <div>
            <span>{{item.time}}</span>
            <p>{{item.context}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {
  data(){
    return {
      msg:{},
      address:'',
      imgUrl:''
    }
  },
  onLoad(){

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
          data: this.msg.nu,
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
        this.msg = res.data
        console.log(this.msg)
        post('Order/OrderDetails',{//订单详情
          UserId:wx.getStorageSync("userId"),
          Token:wx.getStorageSync("token"),
          OrderNo:this.$mp.query.id
        }).then(resu=>{
          console.log(resu)
          this.address = resu.data.Address
          this.imgUrl = resu.data.ShopLogo
        })
      })
    }
    
  }
}
</script>

<style lang="scss" scoped>
.route-box{
  margin-left: 50rpx;
  border-left: 3rpx dashed #ededed;
  z-index: 9;
  position: relative;
  top: 0rpx;
  left: 4rpx;
  .list-box{
    height: 140rpx;
    position: relative;
    .list{
      font-size: 24rpx;
      position: absolute;
      top: 80rpx;
      left: -13rpx;
      img{
        width: 22rpx;
	      height: 26rpx;
        margin-right: 34rpx;
      }
      div{
        width: 520rpx
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
  padding: 0 30rpx;
  z-index: 99;
  position: relative;
  top: 40rpx;
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
