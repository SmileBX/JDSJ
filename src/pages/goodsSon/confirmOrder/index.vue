<template>
  <div>
	  <div class="bg_top">
      <div></div>
    </div>
    <div class="p30 content">
      <div class="address p30">
          <div class="addressShow flex-center-between" v-if="hasaddress" @click="goUrl('/pages/myson/address/main?pagetype=confirm&checkId='+addressinfo.id)">
            <div class="left">
              <div class="name flex-center-start" ><p>{{addressinfo.name}}</p><p>{{addressinfo.tel}}</p><span class="tag" v-if="addressinfo.is_def==1">默认</span></div>
              <div class="addressInfo ellipsis2">{{addressinfo.addressinfo}}</div>
            </div>
            <div class="right">
              <van-icon name="arrow" color="#999"/>
            </div>
          </div>
          <div class="flex-column-center-center notAddress" v-else @click="goUrl('/pages/myson/address/main?pagetype=confirm')">
              <img src="http://jd.wtvxin.com/images/images/goods/address-icon.png" alt="">
              <p>暂无收货地址，点击添加</p>
          </div>
      </div>
      <div class="pro plr30">
        <h3 class="flex-center-start" @click="goshop">{{shopName}}<span class="icon"><van-icon name="arrow" color="#999"/></span></h3>
        <block v-if="sourceType==1">
          <div class="item flex-center-between" v-for="(item,index) in prolist" :key="index">
            <img :src="item.ProductImg" :alt="item.ProductName">
            <div class="right">
              <h4 class="ellipsis2">{{item.ProductName}}</h4>
              <div class="sku" v-if="item.SpecText">{{item.SpecText}}</div>
              <div class="num-price flex-center-between">
                <p>x{{item.Number}}</p>
                <h4 class="c-primary"><span>￥</span>{{item.SalePrice}}</h4>
              </div>
            </div>
          </div>
        </block>
        <div class="item flex-center-between p_re" v-else>
          <span v-if="isLimint==1" class="tag tag-limit">限时</span>
          <img :src="prolist.ProductImage" :alt="prolist.ProductName">
          <div class="right">
            <h4 class="ellipsis2">{{prolist.ProductName}}</h4>
            <div class="sku" v-if="prolist.ProductSpec">{{prolist.ProductSpec}}</div>
            <div class="num-price flex-center-between">
              <p>x{{buynum}}</p>
              <h4 class="c-primary"><span>￥</span>{{prolist.Price}}</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon plr30">
        <div class="item" @click="ChooseCoupon">
          <h3>优惠劵</h3>
          <h4 class="flex-center"><span :class="[couponid>0?'red':'']">{{coupontxt}}</span> <span class="icon"><van-icon name="arrow" color="#999"/></span></h4>
        </div>
        <div class="item" @click="ChooseInvoice">
          <h3>开票类型</h3>
          <h4 class="flex-center">{{Invoicetxt}}<span v-if="InvoiceId>0" @click.stop="delInvoicet" class="delinvoice">×</span><span class="icon"><van-icon name="arrow" color="#999"/></span> </h4>
        </div>
        <div class="item" v-if="InvoiceId>0&&InvoiceType==2">
          <h3>接收邮箱</h3>
          <h4 class="flex-center"><input type="text" v-model="InvoiceEmail" style="text-align: right;" placeholder="请填写接收发票邮箱"></h4>
        </div>
      </div>
      <div class="price-box plr30">
        <div class="item">
          <h3>商品金额</h3>
          <h4>¥{{allprice}}</h4>
        </div>
        <div class="item">
          <h3>优惠券</h3>
          <h4>-¥{{couponprice}}</h4>
        </div>
        <div class="item">
          <h3>运费</h3>
          <h4>{{Freight>0?'+¥'+Freight:'免邮'}}</h4>
        </div>
        <div class="item" v-if="Taxes>0">
          <h3>税费</h3>
          <h4>+¥{{Taxes}}</h4>
        </div>
        <div class="msg">
          <h3>买家留言</h3>
          <textarea v-model="orderRemarksArr" @click="bindContentBlur" v-if="isInputContentFocus" v-bind:focus="isFocus" cols="30" rows="10" placeholder="填写内容需与商家协商并确认，45字以内"></textarea>
          <scroll-view scroll-y class="msgcontent" v-text="orderRemarksArr" @click="bindContentFocus" v-if="isContentFocus">
            <div class="placeholder" v-if="!orderRemarksArr">填写内容需与商家协商并确认，45字以内</div>
          </scroll-view>
        </div>
      </div>
    </div>
    
    <div class="footer flex-center-between">
      <p>总计：<span class="c-primary">¥{{totalMoney}}</span></p>
      <div class="confirm" @click="Submitorder">去付款</div>
    </div>
    <!-- 优惠券弹窗 -->
		<uni-popup mode="fixed" :show="showCoupon" :h5Top="true" position="bottom" @hidePopup="closeCoupon">
			<div class="couponbox" style="z-index: 10000;">
				<div class="titlebox">
					<div class="title">选择优惠券</div>
          <div  @click="closeCoupon" class="close">×</div>
				</div>
				<scroll-view scroll-y style="width: 100%;height: 560rpx;">
					<div class="coupon">
						<div class="couponitem" @click="selectCoupon(-1)">
							<div class="couponname">不使用优惠券</div>
							<div style="margin: 0;">
                <span :class="['checkbox',couponindex<0?'checked':'']"></span>
              </div>
						</div>
						<div class="couponitem" v-for="(item,index) in CouponList" :key="index" @click="selectCoupon(index)">
							<div class="couponname">{{item.Title}}：
							  <block v-if="item.DiscountType==1">省{{item.Denomination}}元</block>
                <block v-else>{{item.Denomination*10}}折</block>
							</div>
							<div style="margin: 0;">
                <span :class="['checkbox',couponindex==index?'checked':'']"></span>
              </div>
						</div>
					</div>
				</scroll-view>
        <div style="height:100rpx"></div>
        <div class="ft_btn">
        <div class="btn_ok" @click="confirmCoupon">完成</div>
        </div>
			</div>
		</uni-popup>
  </div>
</template>

<script>
import {post,get,trim} from '@/utils'
import uniPopup from '@/components/uni-popup.vue';
export default {
  components: {
    uniPopup
  },
  data () {
    return {
      userId: "",
      token: "", 
      shopid:"",
      shopName:"",//店铺名
      sourceType:0,//1表示购物车进入，0表示详情页进入
      cartids:"",//购买产品的id
      prolist:{},//商品信息
      hasaddress:false,//是否有地址
      addressId:"",//地址的id
      addressinfo:{},//地址信息
      InvoiceId: 0,//发票的id
      InvoiceType: 0,//发票的类型
      InvoiceEmail:"",
      InvoiceInfo:{},//发票信息
      Invoicetxt:"不开发票",//发票文本
      CouponList:{},//可用优惠券列表
      couponindex:0,//当前选中优惠券
      couponItem:{},//当前选中优惠券信息
      couponid:"",//选择优惠券的id
      coupontxt:"",//选中优惠券名称
      showCoupon:false,//显示优惠券弹窗
      isLimint: 0, //是否是限时购
      orderRemarksArr:"",//备注
      isContentFocus: true,
      isInputContentFocus: false,
      isFocus: false,
      buynum:1,//立即购买数量
      SpecText:"",//立即购买产品规格
      allprice:0,//商品总金额
      couponprice:0,//商品优惠金额
      Freight:0,//运费
      Taxes:0,//税费
      totalMoney:0,//实付金额
      ShareMemberId:"",
      OrderNo:"",
      WxOpenid:"",
			WxCode:"",
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.WxCode=wx.getStorageSync("wxCode");
    this.WxOpenid=wx.getStorageSync("openId");
    this.sourceType=this.$root.$mp.query.orderSType;
    this.cartids=this.$root.$mp.query.cartItem;
  },
  onShow(){
    this.shopid = wx.getStorageSync("shopid");
    this.couponprice=0;
    this.Freight=0;
    this.orderRemarksArr="";//清空留言
    if(wx.getStorageSync("addressinfo")){
      this.addressinfo=wx.getStorageSync("addressinfo");
      wx.setStorageSync("addressinfo",null)
      this.hasaddress=true;
      this.addressId=this.addressinfo.id;
    }else{
      this.getAdress();
    }
    if(wx.getStorageSync("invoiceinfo")){
      this.InvoiceInfo=wx.getStorageSync("invoiceinfo");
      this.InvoiceId=this.InvoiceInfo.Id;//发票的id
      this.InvoiceType=this.InvoiceInfo.InvoiceTitle;//发票的类型
      this.Invoicetxt=this.InvoiceInfo.InvoiceTitlestr+"："+this.InvoiceInfo.HeaderName;
      this.InvoiceEmail=this.InvoiceInfo.QQEmail;
    }else{
      this.InvoiceId=0;//发票的id
      this.InvoiceType=0;//发票的类型
      this.Invoicetxt="不开发票";
      this.InvoiceEmail="";
    }
    if(this.sourceType==1){//购物车
      this.GetConfirmOrderGoods();
    }else{//详情页
      this.BuyNowGoodsInfo();
    }
  },
  methods: {
    bindContentFocus(e) {
      this.isFocus = true; //触发焦点
      this.isContentFocus = false; //聚焦时隐藏内容文本标签
      this.isInputContentFocus = true;
    },
    bindContentBlur(e) {
      this.isContentFocus = true; //聚焦时隐藏内容文本标签
      this.isInputContentFocus = false;
      this.isFocus = false; //失去焦点
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
    //获取默认地址
    async getAdress(){
      let res=await post("Address/defaultaddress_New",{
        UserId: this.userId,
        Token: this.token
      })
      if(res.code==0){
        if(res.data){
          this.addressinfo=res.data;
          this.hasaddress=true;
          this.addressId=res.data.id;
        }else{
          this.hasaddress=false;
        } 
      }
    },
    //选择发票
    ChooseInvoice(){
      wx.navigateTo({
        url:'/pages/myson/invoiceList/main?pagetype=confirm&checkId='+this.InvoiceId
      })
    },
    delInvoicet(){
      wx.setStorageSync("invoiceinfo","");
      this.InvoiceId=0;//发票的id
      this.InvoiceType=0;//发票的类型
      this.Invoicetxt="不开发票";
      this.InvoiceEmail="";
    },
    //获取已领可用优惠券
    async getCouponList(){
      let para ={};
      if(this.sourceType==1){
        para = {
          UserId: this.userId,
          Token: this.token,
          CartIds:this.cartids,
          Type: 1,
          ShopId:this.shopid
        };
      }else{
        para = {
          UserId: this.userId,
          Token: this.token,
          ProductId: this.cartids,
          ProductNumber:this.buynum,
          ProductSpec:this.SpecText,
          Type: 0,
          ShopId:this.shopid
        };
      }
      let res=await post("Order/GetCouponList",para)
      if(res.code==0){
        this.CouponList=res.data;
        if(this.CouponList.length){
          this.couponid=res.data[0].Id;
          this.coupontxt=res.data[0].Title;
          if(this.sourceType!=1){
            if(res.data[0].DiscountType==1){
              if(res.data[0].MeetConditions!=0){
                this.couponprice=res.data[0].Denomination;
              }else {
                this.couponprice=this.allprice;
              }
            }else {
              this.couponprice=this.allprice*(1-res.data[0].Denomination).toFixed(2);
            }
          }
        }else{
          this.coupontxt="暂无可用优惠券";
          this.couponprice=0;
          this.couponid=0;
        }
        if(this.sourceType==1){
          this.BuyCartShopMoney();
        }else{
         this.BuyNowToFreight(this.addressId);
        }
      }
    },
    ChooseCoupon(){
      if(this.CouponList.length){
        this.showCoupon=true;
      }else{
        wx.showToast({
          title: "暂无可用优惠券",
          icon: "none",
          duration: 1000
        });
      }
    },
    closeCoupon(){
      this.showCoupon=false;
    },
    //选择优惠券
    selectCoupon(index){
      this.couponindex=index;
      this.couponItem=this.CouponList[index];
    },
    //点击优惠券完成按钮
    confirmCoupon(){
      if(this.couponindex<0){
        this.couponid=0;
        this.coupontxt = "不使用优惠券";
        this.couponprice=0;
      }else{
        this.couponid=this.couponItem.Id;
        this.coupontxt = this.couponItem.Title;
      }
      if(this.sourceType==1){
        this.BuyCartShopMoney();
      }else{
        if(this.couponindex>=0){
          if(this.couponItem.DiscountType==1){
            if(this.couponItem.MeetConditions!=0){
              this.couponprice=this.couponItem.Denomination;
            }else {
              this.couponprice=this.allprice;
            }
					}else if(this.couponItem.DiscountType==2){
						this.couponprice=this.allprice*(1-this.couponItem.Denomination);
          }
        }
        
        this.BuyNowOrderMoney();
      }
    },
    //购物车下单产品渲染
    async GetConfirmOrderGoods(){
      let res=await post("Cart/GetConfirmOrderGoods",{
        UserId: this.userId,
        Token: this.token,
        CartIdList:this.cartids
      })
      if(res.code==0){
        this.prolist=res.data;
        this.shopName=res.data[0].ShopName;
        this.getCouponList();
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
      }
    },
    //购物车下单价格计算
    async BuyCartShopMoney(){
      let res=await post("Order/BuyCartShopMoney",{
        UserId: this.userId,
        Token: this.token,
        CartIds:this.cartids,
        AddressId:this.addressId,
        MemberCouponId:this.couponid
      })
      if(res.code==0){
       let _res= res.data[0];
       this.couponprice=_res.DiscountedMoney;//优惠
       this.allprice=_res.OrderTotal;//商品金额
       this.Freight=_res.ShopFreight;//运费
       this.Taxes=_res.Taxes;
       this.totalMoney=_res.OrderMoney;//实付金额
       this.closeCoupon();
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
      }
    },
    //立即购买产品信息
    async BuyNowGoodsInfo(){
      this.buynum=this.$root.$mp.query.number;
      this.isLimint=this.$root.$mp.query.isLimint||0;
      this.SpecText=this.$root.$mp.query.SpecText||"";

      let protype=0;//0普通产品，1限时，2一元购
      if(this.isLimint==1){
				protype=1;
			}
      let res=await post("Goods/BuyNowInfo",{
        UserId: this.userId,
        Token: this.token,
        proId:this.cartids,
        proSpecText:this.SpecText,
        productType:protype,
        ShopId:this.shopid
      })
      if(res.code==0){
       this.prolist=res.data;
       this.shopName=res.data.ShopName;
       this.Taxes=res.data.Taxes;
       this.allprice=parseFloat(res.data.Price * this.buynum).toFixed(2);
       this.getCouponList();
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
      }
    },
    //立即购买运费
    async BuyNowToFreight(AddrId){
      let res=await post("Order/BuyNowToFreight",{
        UserId: this.userId,
        Token: this.token,
        ProId:this.cartids,
        AddressId:AddrId,
        Number:this.buynum
      })
      this.Freight=res.data;
      this.BuyNowOrderMoney();
    },
    BuyNowOrderMoney(){
      let number=parseFloat(this.allprice)+parseFloat(this.Freight)-parseFloat(this.couponprice)+parseFloat(this.Taxes);
      this.totalMoney=Math.round(number * 100)/100;
      this.closeCoupon();
    },
    //购物车下单
    async BuyCart(remark){
      let res=await post("Order/BuyCart",{
        UserId: this.userId,
        Token: this.token,
        CartIds:this.cartids,
        AddressId:this.addressId,
        InvoiceId: this.InvoiceId,//发票的id
        InvoiceType: this.InvoiceType,//发票的类型
        InvoiceEmail:this.InvoiceEmail,//发票邮箱
        MemberCouponId:this.couponid,
        OrderRemarks:remark
      })
      if(res.code==0){
        this.OrderNo=res.data;
        this.ConfirmWeiXinSmallPay();
      }else if(res.code==200){
        wx.redirectTo({ 
          url: "/pages/goodsSon/paysuccess/main?orderNo=" + res.data+'&status='+res.code+'&price=0'
        });
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
      }
    },
    //提交订单立即购买
    async NowSubmitOrder(){
      let url ="";
      if(this.isLimint==1){
        url="Order/BuyFlashSaleeCreateOrder";
      }else {
        url="Order/BuyNowSubmitOrder";
      }
      let res=await post(url,{
        UserId: this.userId,
        Token: this.token,
        ProId:this.cartids,
        Number:this.buynum,
        AddressId:this.addressId,
        InvoiceId: this.InvoiceId,//发票的id
        InvoiceType: this.InvoiceType,//发票的类型
        InvoiceEmail:this.InvoiceEmail,//发票邮箱
        SpecText:this.SpecText,
        Remark:this.orderRemarksArr,
        MemberCouponId:this.couponid,
        ShareMemberId:this.ShareMemberId,
        ShopId:this.shopid
      })
      if(res.code==0){
        this.OrderNo=res.data;
        this.ConfirmWeiXinSmallPay();
      }else if(res.code==200){
        wx.redirectTo({ 
          url: "/pages/goodsSon/paysuccess/main?orderNo=" + res.data+'&status='+res.code+'&price=0'
        });
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1000
        });
      }
    },
    Submitorder(){
      let RemarksArr = [];//购物车店铺备注
      if(this.sourceType==1){
        RemarksArr=[{"ShopId":this.shopid,"Text":this.orderRemarksArr}];
      }
      if (this.addressId) {
        if(this.valmail()){
          if(this.sourceType==1){
          this.BuyCart(RemarksArr);
          }else{
            this.NowSubmitOrder();
          }
        }
      } else {
        wx.showToast({
          title: '请填写地址!',
          icon: "none",
          duration: 1000
        });
      }
    },
    //使用公司邮箱验证邮箱
    valmail(){
      if(this.InvoiceType==2){
        if(trim(this.InvoiceEmail)==""){
          wx.showToast({
            title: '请填写邮箱地址!',
            icon: "none",
            duration: 1000
          });
          return false;
        }
        if (
            !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.InvoiceEmail)
          ) {
            wx.showToast({
              title: "请输入正确的邮箱地址！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
         return true
      }
        return true
    },
    //微信支付需参数
    async ConfirmWeiXinSmallPay(){
      let result = await post('Pay/WeiXinSmallPayByOrder',{
        OrderNo:this.OrderNo,
        UserId: this.userId,
        Token: this.token,
        WxCode:this.WxCode,
				WxOpenid:this.WxOpenid,
      })
      let payData=JSON.parse(result.data.JsParam)
      if(result.code==0){
        let _this=this;
        wx.requestPayment({
          timeStamp: payData.timeStamp,
          nonceStr: payData.nonceStr,
          package: payData.package,
          signType: payData.signType,
          paySign: payData.paySign,
          success(res) {
              wx.redirectTo({
                url: "/pages/goodsSon/paysuccess/main?OrderNo="+_this.OrderNo
              })
            },
          fail(res) {
            console.log(res);
            wx.redirectTo({
              url: "/pages/goodsSon/paysuccess/main?OrderNo="+_this.OrderNo+"&msg=fail"
            })
          }
        })
      }
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
          .tag{ 
            color: #fff;
            font-size: 24rpx;
            background: #ff3333;
            border-radius: 6rpx;
            padding: 0 10rpx;
            line-height: 1.6;
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
      .tag{
        position: absolute; 
        left: 0; 
        top: 10rpx; 
        z-index: 3;
        background: #f0370b;
        color: #fff; 
        font-size: 24rpx; 
        padding: 2rpx 16rpx;
        border-radius: 0 100px 100px 0;
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
    textarea,.msgcontent{
      width:100%;
      height:160rpx;
      color: #666;
      font-size: 30rpx;
    }
    padding-bottom:20rpx;
    .placeholder{ color: #999}
  }

  .footer{
    padding:15rpx 30rpx;
    background:#fff;
    position:fixed;
    left:0;
    right: 0;
    bottom:0;
    height:98rpx;
    z-index: 999;
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
  /* 优惠券弹窗 */
.couponbox{
	background-color: #fff;
	width: 100%;
  .titlebox{
    width: 100%;
    height: 100rpx;
    border-bottom: 1px #ECECEC solid;
    display: flex;
    justify-content: center;
    align-items: center;
    .title{
      font-size: 34rpx;
    }
    .close{
      height: 50rpx;
      width: 50rpx;
      text-align: center;
      position:absolute;
      right:20rpx;
      top:20rpx;
      font-size:40rpx;
      line-height: 46rpx;
      border:#ccc solid 2rpx;
      color:#ccc;
      border-radius:50%;
    }
  }
  .coupon{
    width: 690rpx;
    margin: 0 30rpx;
  }
  .couponitem{
    width: 100%;
    height: 120rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px #ECECEC solid;
  }
  .couponname{
    font-size: 30rpx;
  }
  .ft_btn{
    position:absolute;
    left:0; 
    right: 0;
    width: 100%;
    color:#fff;
    font-size:30rpx;
    bottom:10rpx; 
    text-align: center;
    .btn_ok{ margin: 0 30rpx; border-radius: 40rpx; height: 80rpx; line-height: 80rpx; background:#ff3333;}
  }

}
.delinvoice{ display: block; height: 40rpx; width: 40rpx; text-align: center; line-height: 40rpx; border-radius: 50%; background: #ccc; color: #fff; margin: 0 20rpx;}
</style>
