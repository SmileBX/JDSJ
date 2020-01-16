<template>
  <div class="ticket" style="padding-top:98rpx;">
      <div class="tab flex">
        <div class="flex1 flexc" :class="{'active':tabIndex==index}" v-for="(item, index) in tabList" :key="index" @click="cliTab(index)">{{item}}</div>
        <span :style="'left:'+tabStyle+'rpx'"></span>
      </div>
      <div class="or_list mt2">
        <div class="or_item bg_fff" v-for="(item,index) in list" :key="index">
            <div class="flex pp2 justifyContentBetween">
                <p class="flex flexAlignCenter">
                    <img src="http://jd.wtvxin.com/images/images/icons/shop_logo.png" alt="" class="shop_logo">
                    <span class="ml1">{{shopName}}</span>
                </p>
                <p class="cr">{{item.StatusName}}</p>
            </div>
            <div class="bg_gray pp3 flex" v-for="(ite, ind) in item.orderDetails" @click="goUrl('/pages/myson2/orderdetail/main',item.OrderNumber)" :key="ind">
                <img :src="ite.ProductImg" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <p class="twoline">{{ite.ProductName}}</p>
                      <p class="cr font30">￥{{ite.UnitPrice}}</p>
                    </div>
                    <div class="mr3">x{{ite.ProductCount}}</div>
                </div>
            </div>
            <div class="text_right font24 bor_tit">共{{item.orderDetails.length}}件商品 合计 <span class="cr font30">  ¥{{item.TotalPrice}}</span></div>
            <div class="flex justifyContentEnd pp2">
                <p class="btn btn_gray" @click="cliListBtn(btna[0],item.OrderNumber)" v-if="item.StatusId==0">{{btna[0]}}</p>
                <p class="btn btn_red" @click="cliListBtn(btnb[0],item.OrderNumber)" v-if="item.StatusId==0">{{btnb[0]}}</p>
                <p class="btn btn_red" @click="cliListBtn(btnb[1],item.OrderNumber)" v-if="item.StatusId==1">{{btnb[1]}}</p>
                <p class="btn btn_gray" @click="cliListBtn(btna[2],item.OrderNumber)" v-if="item.StatusId==2">{{btna[2]}}</p>
                <p class="btn btn_red" @click="cliListBtn(btnb[2],item.OrderNumber)" v-if="item.StatusId==2">{{btnb[2]}}</p>
                <p class="btn btn_red" @click="cliListBtn(btnb[3],item.OrderNumber,item.orderDetails)" v-if="item.StatusId==3">{{btnb[3]}}</p>
            </div>
        </div>
      </div>
      <!-- 取消弹框 -->
      <div class="cancel" v-if="showCancel">
        <div class="main">
          <p class="tit ali-c">取消原因</p>
          <p class="list jus-c ali-c" @click="cliCencel(index,item)" :class="cancelActive==index?'active':''" v-for="(item, index) in cancelList" :key="index">{{item.message}}</p>
          <div class="btn-box flex">
            <span class="flex1 ali-c jus-c" @click="showCancel=false">返回</span>
            <span class="flex1 ali-c jus-c" @click="confirmCencel()">确认取消</span>
          </div>
        </div>
      </div>

      <div class="change-goods flexc" v-if="showChange" @click="showChange=false">
        <div class="main">
          <div class="tit">请选择要评价的商品</div>
          <div class="list ali-c jus-b" v-for="(item, index) in needChangeGoods" @click.stop="changeGoods(item.Id)" :key="index">
            <img :src="item.ProductImg" alt="">
            <p>{{item.ProductName}}</p>
          </div>
        </div>
      </div>

      <p class="list-data" v-if="isHaveData">您暂无该项订单数据~</p>
      <p class="list-data" v-if="isOver">没有更多了~</p>
  </div>
</template>

<script>
import {get,post} from '@/utils'
export default {

  data () {
    return {
      tabList:['全部','待付款','待发货','待收货','待评价'],
      btna:['取消','取消','查看物流'],
      btnb:['去支付','提醒发货','确认收货','去评价'],
      tabIndex:0,
      isJump:false,
      showCancel:false,
      active:0,
      cancelList:[],
      cancelText:'',
      cancelActive:null,
      cancelId:'',
      cancelGoodsId:'',
      page:1,
      pagesize:12,
      list:[],
      isHaveData:false,
      isOver:false,
      shopName:'',
      needChangeGoods:[],
      showChange:false,
      changeNumId:'',//评价多商品订单时选中的订单id
    }
  },
  computed: {
    tabStyle(){
      return ((750/this.tabList.length)*this.tabIndex)+(((750/this.tabList.length)-50)/2)
    }
  },
  onReachBottom(){
    if(!this.isOver&&!this.isHaveData){
      this.page++
      this.getList()
    }
  },
  onShow(){
    this.changeNumId = ''
    this.needChangeGoods = []
    this.showChange = false
    this.page = 1
    this.isOver = false
    this.isHaveData = false
    this.list = []
    this.active = 0
    this.showCancel = false
    this.showgoodlist = false
    this.cancelId = ''
    this.cancelGoodsId = ''
    this.tabIndex = this.$mp.query.type
    this.getList()
    this.GetMerchantDetail()
    this.getCancelList()
  },
  methods: {
    changeGoods(id){
      this.goUrl('/pages/myson/addcomment/main',this.changeNumId,id)
    },
    getCancelList(){
      get('Order/CancelReason').then(res=>{
        this.cancelList = res.data
      })
    },
    cliListBtn(str,id,goods){
      if(str==='取消'){
        this.showCancel = true
        this.cancelGoodsId = id
      }else if(str==='去支付'){
        console.log('zhifu')
      }else if(str==='查看物流'){
        this.goUrl('/pages/myson2/orderRoute/main',id)
      }else if(str==='提醒发货'){
        post('Order/Remind',{
          UserId:wx.getStorageSync("userId"),
          Token:wx.getStorageSync("token"),
          OrderNo:id
        }).then(res=>{
            wx.showToast({
              icon:'none',
              title:res.msg
            })
        })
      }else if(str==='确认收货'){
        post('Order/ConfirmReceipt',{
          UserId:wx.getStorageSync("userId"),
          Token:wx.getStorageSync("token"),
          OrderNo:id
        }).then(res=>{
            wx.showToast({
              icon:'none',
              title:res.msg
            })
            this.list = []
            this.isOver = false
            this.isHaveData = false
            this.getList()
        })
      }else if(str==='去评价'){
        if(goods.length==1){
          this.goUrl('/pages/myson/addcomment/main',id,goods[0].Id)
        }else{
          this.showChange = true
          this.needChangeGoods = goods
          this.changeNumId = id
        }
        
      }
    },
    confirmCencel(){//确认取消
      if(this.cancelText!=''){//取消原因不为空时
        post('Order/CancelOrders',{
          UserId:wx.getStorageSync("userId"),
          Token:wx.getStorageSync("token"),
          OrderNo:this.cancelGoodsId,
          ReMarks:this.cancelText,
        }).then(res=>{
          this.showCancel = false
          this.list = []
          this.isOver = false
          this.isHaveData = false
          this.getList()
          wx.showToast({
            icon:'none',
            title:res.msg
          })
        })
      }else{//取消原因为空时
        wx.showToast({
          icon:'none',
          title:'请选择取消原因!'
        })
      }
    },
    cliCencel(index,item){
      this.cancelText = item.message
      this.cancelActive = index
    },
    GetMerchantDetail(){
      post("Shop/GetMerchantDetail",{
        ShopId:wx.getStorageSync("shopid")
      }).then(res=>{
        if(res.code==0){
          this.shopName=res.data.ShopInfo.companyName;
        }
      })
      
    },
    getList(){
      post('Order/OrderList',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        Page:this.page,
        PageSize:this.pagesize,
        Status:this.tabIndex,
        Type:0,
        ShopId:wx.getStorageSync("shopid")
      }).then(res=>{
        if(res.code===0){
          this.list.push(...res.data)
          if(this.list.length == 0){
            this.isHaveData = true
          }
          if(!this.isHaveData&&res.data.length!=this.pagesize){
            this.isOver = true
          }
        }
      })
    },
    goUrl(url,param,param2){
        wx.navigateTo({
          url:url+'?id='+param+'&goodsId='+param2
        })
    },
    cliServer(index){
      this.serverIndex = index
    },
    cliTab(index){
      this.tabIndex = index
      this.page = 1
      this.isOver = false
      this.isHaveData = false
      this.list = []
      this.getList()
      // console.log(this.tabIndex,"this.tabIndex")
    },
  },
}
</script>

<style scoped lang='scss'>
.change-goods{
  background-color: rgba(0,0,0,0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  .main{
    background-color: #fff;
    width: 500rpx;
    border-radius: 20rpx;
    overflow: hidden;
    .tit{
      text-align: center;
      line-height: 88rpx;
      font-weight: 900;
      border-bottom: 1rpx solid #ededed;
    }
    .list{
      height: 120rpx;
      padding: 0 30rpx;
      border-bottom: 1rpx solid #ededed;
      img{
        width: 80rpx;
        height: 80rpx;
        border-radius: 10rpx;
      }
    }
  }
}
.cancel{
  // display: none;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.4);
  .active{
    background-color: #e6ece6;
    color: #999;
  }
  .main{
    position: absolute;
    width: 450rpx;
    top: 50%;
    left: 50%;
    background-color: #fff;
    transform: translate(-50%,-50%);
    border-radius: 20rpx;
    .btn-box{
      height: 88rpx;
      color: #999;
      font-size: 30rpx;
      span:nth-child(1){
        border-right: 1rpx solid #ededed;
        background-color: rgba(131, 160, 128, 0.2)
      }
      span:nth-child(2){
        
      }
    }
    .list{
      border-bottom: 1rpx solid #ededed;
      height: 88rpx;
      font-size: 28rpx;
      color: #333;
    }
    .tit{
      height: 100rpx;
      padding-left: 30rpx;
      font-size: 32rpx;
      color: #333;
      border-bottom: 1rpx solid #eeeeee;
    }
  }
}
.tab{
  height: 92rpx;
  background-color: #fff;
  position: fixed;
  width: 100vw;
  top: 0;
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
.or_list{
  .shop_logo{
    width:40rpx;height:36rpx;
  }
  .shop{
    width:161rpx;height:161rpx;
  }
  .or_item{
    margin-top:20rpx;
    &:first-child{
      margin-top:0;
    }
    .or_left{
      width:88%;
      height:98%;
    }
    .bor_tit{
      border-bottom:1rpx solid #f5f5f5;padding:20rpx 30rpx;
    }
    .btn{
      width:168rpx;height:64rpx;text-align: center;line-height: 64rpx;
      margin-left:20rpx;border-radius: 5rpx;
    }
    .btn_gray{
      border:1rpx solid #e3e3e3;color:#858585;
    }
    .btn_red{
      border:1rpx solid #f00;color:#f00;
    }
  }
}

</style>
