<template>
  <div class="foot_list">
      <div class="or_list pw3">
        <div class="or_item bg_fff flex flexColumn justifyContentBetween  pw3" v-for="(item,index) in list" :key="index">
            <div class="flex or_main">
                <img :src="item.OneImage" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>{{item.GroupTitle}}</p>
                        <!-- <p class="cg font24 mt1">白色</p> -->
                      </div>
                      <p class="cr font30">￥{{item.GroupPrice}} <span class="line_through font22 cg">￥{{item.ProductPrice}}</span> </p>
                    </div>
                </div>
            </div>
            <div class="flex justifyContentBetween p25">
                <p class="cr">{{item.GroupStatusStr}}</p>
                <div class="flex font22">
                    <p class="btn_btn" @click="goOrderDetail(item.OrderNo)">订单详情</p>
                    <p class="btn_btn" @click="goGroupDetail(item)">拼团详情</p>
                </div>
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>
import {switchPath,isJump,post} from '@/utils'
export default {

  data () {
    return {
      userId: "",
      token: "",
      list:[],
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.getData();
  },
  onShow(){
  },
  methods: {
    async getData(){
      const res = await post('GroupBuy/GroupRecordList',{
        UserId: this.userId,
        Token: this.token,
        Page:1,
        PageSize:12,
        GroupStatus:0
      })
      this.list = res.data;
    },
    goOrderDetail(orderNo){
        wx.navigateTo({
          url:'/pages/myson2/orderdetail/main?id='+orderNo
        })
    },
    goGroupDetail(param){
        wx.navigateTo({
          url:`/pages/team/pintuan/main?GroupId=${param.GroupId}&GroupRecordId=${param.Id}`
        })
    },
    
  },
}
</script>

<style scoped lang='scss'>
.or_list{
  .shop{
    width:180rpx;height:180rpx;border-radius:10rpx;
  }
  .or_item{
    margin-top:20rpx;border-radius:15rpx;
    .or_left{
      height:100%;
      div{
        p{
          font-size:30rpx;
        }
      }
      .font30{
        font-size:35rpx;
      }
    }
    .line_through{
      text-decoration: line-through;
    }
    .or_main{
      padding:30rpx 0;
      position: relative;
    }
  }
  .p25{
    padding:25rpx 0!important;
    border-top:#f5f5f5 solid 2rpx;
  }
  .btn_btn{
    width:164rpx;height:55rpx;line-height: 52rpx;text-align: center;
    border:1rpx solid #ececec;
    margin-left:20rpx;
    border-radius:5rpx;
  }
}
</style>
