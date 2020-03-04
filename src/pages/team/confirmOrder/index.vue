<template>
  <div>
	  <div class="bg_top">
      <div></div>
    </div>
    <div class="p30 content">
      <div class="address p30">
          <div class="flex-column-center-center notAddress" v-if="!hasaddress" @click="goUrl('/pages/myson/address/main?pagetype=confirm')">
              <img src="http://jd.wtvxin.com/images/images/goods/address-icon.png" alt="">
              <p>暂无收货地址，点击添加</p>
          </div>
          <div class="addressShow flex-center-between" v-else @click="goUrl('/pages/myson/address/main?pagetype=confirm&checkId='+addressinfo.id)">
            <div class="left">
              <div class="name flex-center-start" ><p>{{addressinfo.name}}</p><p>{{addressinfo.tel}}</p></div>
              <div class="addressInfo ellipsis2">{{addressinfo.addressinfo}}</div>
            </div>
            <div class="right">
              <van-icon name="arrow" color="#999"/>
            </div>
          </div>
      </div>
      <div class="pro plr30">
        <h3 class="flex-center-start" @click="goshop">{{data.ShopName}}<span class="icon"><van-icon name="arrow" color="#999"/></span></h3>
        <div class="item flex-center-between">
          <img :src="data.ProductImage" alt="">
          <div class="right">
            <h4 class="ellipsis2">{{data.GroupProductName}}</h4>
            <!-- <div class="sku">白色</div> -->
            <div class="num-price flex-center-between">
              <p>x{{options.Number}}</p>
              <h4 class="c-primary"><span>￥</span>{{data.FightingPrice}}</h4>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="coupon plr30">
        <div class="item">
          <h3>优惠劵</h3>
          <h4 class="c-999 flex-center">暂无可用优惠劵 <span class="icon"><van-icon name="arrow" color="#999"/></span></h4>
        </div>
        <div class="item">
          <h3>开票类型</h3>
          <h4 class="flex-center">不开发票<span class="icon"><van-icon name="arrow" color="#999"/></span> </h4>
        </div>
      </div> -->
      <div class="price-box plr30">
        <div class="item">
          <h3>商品金额</h3>
          <h4>¥{{data.FightingPrice}}</h4>
        </div>
        <div class="item">
          <h3>运费</h3>
          <h4>{{Freight*1?'+¥'+Freight:'包邮'}}</h4>
        </div>
        <div class="msg">
          <h3>买家留言</h3>
          <textarea v-model="Remark" name="" id="" cols="30" rows="10" placeholder="填写内容需与商家协商并确认，45字以内"></textarea>
        </div>
      </div>
    </div>

    <div class="footer flex-center-between">
      <p>总计：<span class="c-primary">¥{{total}}</span></p>
      <div class="confirm" @click="playOrder">去付款</div>
    </div>
  </div>
</template>

<script>
import {post} from '@/utils';
export default {
  data () {
      return {
         userId: "",
         token: "", 
         data:{},
         options:{},
         addressinfo:{},
         hasaddress:false,
         Freight:0,//邮费
         Remark:'',//备注
      }
  },
	computed:{
		total(){
			return (this.data.FightingPrice*1+this.Freight*1).toFixed(2);
		}
  },
  watch:{
    addressId(){
    }
  },
  onLoad(){
		this.userId = wx.getStorageSync("userId");
		this.token = wx.getStorageSync("token");
      this.WxCode=wx.getStorageSync("wxCode");
      this.WxOpenid=wx.getStorageSync("openId");
      this.hasaddress = false;
      this.addressId='';
      this.getData();
  },
  onShow(){
    if(wx.getStorageSync("addressinfo")){
      this.addressinfo=wx.getStorageSync("addressinfo");
      wx.setStorageSync("addressinfo",null)
      this.hasaddress=true;
      this.BuyNowToFreight();
    }
  },
  methods: {
    async getData(){
		const options = wx.getStorageSync('groupSubmit');
		this.options = options;
		wx.setStorageSync('groupSubmit',{});
		options.UserId = this.userId;
		options.Token = this.token;
		const res = await post('GroupBuy/ConfirmationGroup',options);
		this.data = res.data;
      this.getAdress();
	 },
	//  下单
	 async playOrder(){
		const res = await post('GroupBuy/CreateGroupOrder',{
			UserId: this.userId,
			Token: this.token,
			GroupId: this.options.GroupId,
			AddressId: this.addressinfo.id,
			Number: this.options.Number,
			GroupRecordId: this.options.groupRecordId,
			Remark: this.Remark,
			IsPayWallet: 0
      })
      this.ConfirmWeiXinSmallPay(res.data.OrderNo,res.data.GroupRecordId);
	 },
    //微信支付需参数
    async ConfirmWeiXinSmallPay(OrderNo,GroupRecordId){
      const that = this;
      let result = await post('Pay/WeiXinSmallPayByOrder',{
        OrderNo:OrderNo,
        UserId: this.userId,
        Token: this.token,
        WxCode:this.WxCode,
        WxOpenid:this.WxOpenid,
      })
      let payData=JSON.parse(result.data.JsParam)
      if(result.code==0){
        wx.requestPayment({
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success(res) {
              wx.redirectTo({
                url: `/pages/goodsSon/paysuccess/main?OrderNo=${OrderNo}&GroupId=${that.options.GroupId}&GroupRecordId=${GroupRecordId}`
              })
            },
          fail(res) {
            wx.redirectTo({
              url: `/pages/goodsSon/paysuccess/main?OrderNo=${OrderNo}&GroupId=${that.options.GroupId}&GroupRecordId=${GroupRecordId}&msg=fail`
            })
          }
        })
      }
    },
    //获取默认地址
    async getAdress(){
      let res=await post("Address/defaultaddress_New",{
        UserId: this.userId,
        Token: this.token
      })
      if(res.code==0){
        if(res.data){
          this.addressinfo=res.data;
          this.addressId=res.data.id;
          this.hasaddress=true;
          this.BuyNowToFreight();
        }else{
          this.hasaddress=false;
        } 
      }
    },
    //立即购买运费
    async BuyNowToFreight(){
      let res=await post("Order/BuyNowToFreight",{
        UserId: this.userId,
        Token: this.token,
        ProId:this.data.ProductId,
        AddressId:this.addressinfo.id,
        Number:this.options.Number
      })
      this.Freight=res.data.toFixed(2);
      // this.BuyNowOrderMoney();
    },
    goshop(){
      wx.switchTab({
        url: '/pages/index/main'
      })
    },
    goUrl(url){
      wx.navigateTo({
        url:url
      })
    },
  }
}
</script>

<style scoped lang='scss'>
  .bg_top{
      width:100%;
      height:170rpx;
      overflow:hidden;
    div{
      background:#ff3333;
      width:850rpx;
      height:170rpx;
      margin-left:-50rpx;
      border-bottom-left-radius:130rpx;
      border-bottom-right-radius:130rpx;
    }
  }
  h3{
    font-size:30rpx;
    line-height:80rpx;
  }
  h4{
    font-size:28rpx;
    line-height:1.5;
  }
  h5{
    color:#999;
  }
  .icon{
    padding-top:10rpx;
  }
  .content{
    &>div{
      border-radius:15rpx;
      background:#fff;
      margin-bottom:20rpx;
    }
    padding-bottom:100rpx;
  }

  .address{
    margin-top:-180rpx;
    .notAddress{
      img{
        width:89rpx;
        height:83rpx;
      }
      p{
        color:#999;
        font-size:26rpx;
        line-height:2;
      }
    }
    .addressShow{
      .left{
        .name{
          line-height: 2;
          p{
            font-size:32rpx;
            margin-right:35rpx;
          }
        }
        .addressInfo{
          font-size:28rpx;
          line-height: 1.3;
          height:72rpx;
        }
      }
      .right{
        width:40rpx;
        text-align:right;
      }
    }
  }

  .pro{
    h3{
      line-height:60rpx;
    }
    .item{
    padding-bottom:20rpx;
      img{
        width:160rpx;height:160rpx;border-radius:10rpx;
      }
      .right{
        width:450rpx;
        &>h4{
          height:85rpx;
        }
        .sku{
          color:#999;
          font-size:26rpx;
        }
        .num-price{
          p{
            color:#999;
            font-size:26rpx;
            line-height:1.5;
          }
          span{
            font-size:23rpx;
          }
          h4{
          line-height:1.2;}
        }
      }
    }
  }
  .coupon,.price-box{
    .item{
      display:flex;
      justify-content:space-between;
      align-items:center;
    }
  }
  .msg{
    textarea{
      width:100%;
      height:160rpx;
    }
    padding-bottom:20rpx;
  }

  .footer{
    padding:15rpx 30rpx;
    background:#fff;
    position:fixed;
    left:0;
    bottom:0;
    width:100%;
    height:98rpx;
    p{
      font-size:28rpx;
      span{
        font-size:32rpx;
      }
    }
    div{
        font-size:32rpx;
        color:#fff;
        background:#ff3333;
        border-radius:50rpx;
        text-align:center;
        width:200rpx;
        height:68rpx;
        line-height:68rpx;
    }
  }
</style>
