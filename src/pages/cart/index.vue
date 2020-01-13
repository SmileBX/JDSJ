<template>
  <div>
      <div class="pw3" v-if="hasData">
          <img src="/static/images/red_bg.png" alt="" class="mine_red">
          <div class="cart_main">
              <div class="text_right cf p3"  @click="EditCart">{{isEdit?'完成':'编辑'}}</div>
              <div class="cart_list">
                  <div class="cart_shop bg_fff mt2">
                      <div class="flex justifyContentBetween">
                          <div class="left">
                            <span>{{cartList[0].ShopName}}</span>
                          </div>
                          <div class="cr" v-if="couponlist.length" @click="openCoupon">领券</div>
                      </div>
                      <div class="shopcar_list" v-for="(item,index) in cartList" :key="index">
                          <div class="shopcart_item flex justifyContentBetween flexAlignCenter">
                            <div class="left" @click="selectStyle(item,index,item.select,item.disBuy,$event)">
                              <input type="checkbox" class="checkbox-cart" :checked="item.select">
                            </div>
                            <div class="flex justifyContentBetween">
                                <img :src="item.ProductImg" alt="" class="shop" @click="goUrl('/pages/goodsSon/goodsDetail/main?id='+item.ProductId)">
                                <div class="flex1 mr2 txtbox">
                                    <div class="twoline" @click="goUrl('/pages/goodsSon/goodsDetail/main?id='+item.ProductId)">{{item.ProductName}}</div>
                                    <span class="mt1 spec" v-if="item.SpecText" @click="showSKU(item.Id)">
                                        <span class="cg font24">{{item.SpecText}}</span>
                                        <img src="/static/images/icons/down.png" alt="" class="down">
                                    </span>
                                    <div class="flex justifyContentBetween mt1">
                                        <p class="cr font30 flex ali-c">￥{{item.SalePrice}}</p>
                                        <div class="selNumRow flex ali-c">
                                          <span class="red" v-if="item.MinBuyNum>1">{{item.MaxBuyNum}}件起购</span>
                                          <span class="red" v-if="item.MaxBuyNum>0">限购{{item.MaxBuyNum}}件</span>
                                          <number-box :disabled="false" :value="item.Number" :min="item.MinBuyNum" :max="item.MaxBuyNum" v-on:change="change(arguments)" :index="index"></number-box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!--底部按钮-->
        <div style="height: 100rpx;"></div>  
        <div class="flex btn_bot flexAlignCenter justifyContentBetween">
          <div class="left btn_left" @click="Allcheck()">
            <input type="checkbox" class="checkbox-cart" :checked="allSelect">
            <span>全选</span>
          </div>
          <div class="flex flexAlignCenter btn_rr justifyContentEnd">
              <div class="flex1" v-if="!isEdit">总计: ￥<span class="cr font30">{{allPrice}}</span></div>
              <div class="btn_right flex">
                  <div class="btn_del" v-if="isEdit" @click="DelCartBtn">删除</div>
                  <div class="btn_del mr5" @click="settle" v-if="!isEdit">结算（{{selectlen}}）</div>
              </div>
          </div>
        </div> 
      </div>
      <!--空-->
      <div class="flex flexAlignCenter flexColumn" v-if="noDataIsShow">
          <img src="/static/images/icons/box.png" alt="" class="box">
          <p class="cg">购物车空空如也~~~</p>
          <span class="go_shop" @click="goshop">去购物</span>
      </div>
      <!-- 优惠券弹窗 -->
      <uni-popup mode="fixed" :show="showCoupon" :h5Top="true" position="bottom" @hidePopup="closeCoupon">
        <div class="couponbox" style="z-index: 10000;">
          <div class="titlebox">
            <div class="title">优惠券</div>
            <div  @click="closeCoupon" class="close">×</div>
          </div>
          <div class="tips">可领优惠券<span>领取后可用于购物车商品</span></div>
          <scroll-view scroll-y style="width: 100%;height: 560rpx;">
            <div class="ticket" >
                <div class="list jus-b" v-for="(item,index) in couponlist" :key="index">
                  <div class="left flex">
                    <div class="price">
                      {{item.DiscountType==1?item.Denomination:item.Denomination*10}}<span>{{item.DiscountType==1?'元':'折'}}</span>
                    </div>
                    <div class="info">
                      <p v-if="item.DiscountType==1">满{{item.MeetConditions}}元减{{item.Denomination}}元券</p>
                      <p v-else>满{{item.MeetConditions}}元打{{item.Denomination*10}}折券</p>
                      <span>有效期至{{item.EndTime}}</span>
                    </div>
                    <div class="flexc back_col">{{item.DiscountType==1?'减满券':'折扣券'}}</div>
                  </div>
                  <div class="right flexc back_col" @click="ReceiveCoupon(item.Id)">
                    <div>
                      <p>立即领取</p>
                    </div>
                  </div>
                </div>
            </div>
          </scroll-view>
        </div>
      </uni-popup>
  </div>
</template>

<script>
import {post,get} from '@/utils'
import NumberBox from '@/components/number-box.vue';
import uniPopup from '@/components/uni-popup.vue';
export default {
  components: {
    NumberBox,
    uniPopup
  },
  data () {
    return {
      userId: "",
      token: "",
      hasData:false,
      noDataIsShow:false,
      cartList:{},
      isEdit:false,
      allSelect:false,//判断是否全选
      checklen:0,//有效产品数量
      selectlen:0,//累计选中的产品
      allPrice:0,//累计选中产品的金额
      showCoupon:false,
      couponlist:{},//优惠券列表
    }
  },
  onLoad(){
    
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid = wx.getStorageSync("shopid");
    this.getCartList();
    this.getCouponShop();
  },
  methods: {
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
   // 购物车列表
    async getCartList(){
      let res=await post("Cart/CartList",{
        userId: this.userId,
        token: this.token,
        ShopId:this.shopid
      })
      if(res.code==0){
        this.cartList=res.data;
        if(res.data.length){
          this.hasData=true; 
          this.noDataIsShow=false;
          this.checklen=0;
          let _this = this;
          _this.$nextTick(function() {
            _this.cartList.forEach(item=> {
              _this.$set(item, "select", false);
              if(item.IsBuy!=0){
									_this.$set(item, "disBuy", true);
									_this.$set(item, "select", false);
								}else{
									_this.checklen++;
									_this.$set(item, "disBuy", false);
								}
            }); 
            _this.selectlen=_this.checklen;
            this.AllPrice();//合计   
          });
        }else{
          this.hasData=false;
          this.noDataIsShow=true;
        }
      }
    },
    //合计 金额、数量
    AllPrice(){
      let _this = this;
      let eaditallPrice =0;
      let eaditnum =0;
      let singelPrice=0;
      _this.cartList.forEach(function(item){
        if(item.select==true){
          singelPrice =Number(item.SalePrice)*parseInt(item.Number);
          eaditallPrice += singelPrice;
          eaditnum++;
        }
      });
      if(eaditnum==this.checklen){
          this.allSelect=true;
      }else{
        this.allSelect=false;
      }
      this.selectlen=eaditnum;
      this.allPrice= parseFloat(eaditallPrice).toFixed(2);
    },
    //全选、反选
    Allcheck() {
      this.allSelect=!this.allSelect;
      let _this = this;
      if(!this.isEdit){//未打开编辑按钮的全选
        if(this.allSelect){
            this.selectlen = this.checklen;
        }else{
            this.selectlen = 0;
        }
        _this.cartList.forEach(function(item) {
          if(_this.allSelect && item.IsBuy==0){
            _this.$set(item, "select", true); 
          }else{
            _this.$set(item, "select", false);
          }
        }); 
        this.AllPrice();//合计   
      }else{//打开编辑按钮的全选
        _this.cartList.forEach(function(item) {
          if(_this.allSelect){
            _this.selectlen = _this.cartList.length;
            _this.$set(item, "select", true);
          }else{
            _this.selectlen=0;
            _this.$set(item, "select", false);
          }
        }); 
      } 
    },
    //单选
    selectStyle(item,index,select,disBuy,event) {
      if(!this.isEdit){//未打开编辑按钮的单选
        if(disBuy){
          this.$set(item, "select", false);
          event.preventDefault();
        }else{       
          if(select){
            if(this.selectlen>0){
              this.selectlen--;
            }
            this.$set(item, "select", false);
          }else{
            this.$set(item, "select", true);
            this.selectlen++;      
          }
          if(this.selectlen==this.checklen){            
              this.allSelect=true;
          }else{
              this.allSelect=false;
          }
          this.AllPrice();//合计
        }
      }else{
        if(select){
          if(this.selectlen>0){
            this.selectlen--;
          }
          this.$set(item, "select", false);
        }else{
          this.selectlen++; 
          this.$set(item, "select", true);
        }
        if(this.selectlen==this.cartList.length){
          this.allSelect=true;
        }else{
          this.allSelect=false;
        }
      }
    },
    //编辑购物车
    EditCart(){
      this.isEdit=!this.isEdit;
      let _this=this;
      if(this.isEdit==false){
        _this.cartList.forEach(function(item) {
          if(item.IsBuy!=0){
            _this.$set(item, "disBuy", true); 
            _this.$set(item, "select", false);
          }
        }); 
      }else{
        _this.cartList.forEach(function(item) {
          _this.$set(item, "disBuy", false);
        }); 
      }
      this.AllPrice();//合计
    },
    //加减商品的数量
    change(msg){
      let number=msg[0];
      let index=msg[1];
      if(this.cartList[index].IsBuy==0){
        let dataArr=[],json = {};
        json["CartId"] = this.cartList[index].Id;
        json["Total"] = number;
        json["SpecText"] = this.cartList[index].SpecText;
        dataArr.push(json);
        this.eaditCart(JSON.stringify(dataArr),index,number);
      }
    },
    //编辑商品规格数量
    async eaditCart(Arr,index,number) {
      let res = await post("Cart/UpdateCart", {
        UserId: this.userId,
        Token: this.token,
        Data: Arr
      });
      if (res.code == 0) {
        if(number){
          this.cartList[index].Number = number;
          this.cartList[index].select = true;
        }else{
          this.checklen=0;
          this.getCartList()
        }
        //合计
        this.AllPrice();
      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1500
        });
      }
    },
    // 获取购物车sku
    showSKU(id){
      this.GetProductSpec(id)
    },
    async GetProductSpec(id){
      let res = await post("Cart/GetProductSpec", {
        UserId: this.userId,
        Token: this.token,
        CartId: id
      });
      if(res.code==0){

      }else{
        wx.showToast({
          title: res.msg,
          icon: "none",
          duration: 1500
        });
      }
    },
    //删除购物车
    async DelCart(ids){
      let res = await post("Cart/DeleteCart",{
        UserId: this.userId,
        Token: this.token,
        CartIdList: ids
      })
      if (res.code == 0){
        this.getCartList();
      }
    },
    //删除按钮
    DelCartBtn(){
      let _this = this;
      let dataArr=[];
      _this.cartList.forEach(function(item){
        if(item.select==true){
          dataArr.push(item.Id);
        }
      })
      if(dataArr.length){
        let that = this;
        wx.showModal({
          content: "您确定要删除所选商品吗？",
          confirmColor:"#ff3333",
          success: function(res) {
            if (res.confirm) {
              _this.DelCart(dataArr.join(','));
            } else if (res.cancel) {
            }
          }
        });
      }else{
        wx.showToast({
          title: "请选择你要删除的数据！",
          icon: "none",
          duration: 1500
        });
      }
    },
    //弹出优惠券
    openCoupon(){
      this.showCoupon=true;
    },
    //获取可领取优惠券
    async getCouponShop(){
      let res=await post("Coupon/CouponCenter",{
        UserId: this.userId,
        Token: this.token,
        ShopId:this.shopid,
        page: 1,
        pageSize: 100
      })
      if(res.code==0){
        if(res.data.length){
          res.data.forEach(item=>{
            item.EndTime=item.EndTime.split(" ")[0];
          })
          this.couponlist=res.data;
        }
      }
    },
    closeCoupon(){
      this.showCoupon=false;
    },
    //领券
    async ReceiveCoupon(id){
      let res=await post("Coupon/ReceiveCoupon",{
        UserId: this.userId,
        Token: this.token,
        CouponId: id
      })
      wx.showToast({
        title: res.msg,
        icon: 'none',
      })
    },
    //点击结算
    settle(){
      let _this = this;
      let idString=[];
      _this.cartList.forEach(function(item){
        if(item.select==true){
          idString.push(item.Id);
        }
      });
      if(idString.length){
        wx.navigateTo({ 
          url: "/pages/goodsSon/confirmOrder/main?cartItem=" + idString.join(",")+'&orderSType=1'
        });
      }else{
        wx.showToast({
          title: "请选择你要购买的产品！",
          icon: "none",
          duration: 1500
        });
      }
    },
  },
  
}
</script>

<style scoped lang='scss'>
  .box{
    width:311rpx;height:343rpx;
    margin:150rpx 0 50rpx 0;
  }
  .go_shop{
    display: inline-block;
    height:65rpx;line-height: 65rpx;
    margin-top:50rpx;
    border:1rpx solid red;color:#f00;
    border-radius: 10rpx;padding:0 60rpx;
  }
  .mine_red{
    width:100%;position: absolute;top:-120rpx;left:0;
  }
  .cart_main{
    position: absolute;
    box-sizing: border-box;
    right:30rpx;left:30rpx;
    z-index:20;width:690rpx;
  }
  .cart_list{
    .cart_shop{
      padding:30rpx;border-radius:15rpx;
    }
  }
  .shopcart_item{
    margin-top:20rpx;
    .shop{
      width:172rpx;height:172rpx;
    }
    .down{
      width:20rpx;height:10rpx;margin-left:10rpx;margin-bottom:5rpx;
    }
    .selNumRow span{ margin-right: 4rpx; font-size: 24rpx}
    .spec{
      background: #f5f5f5;display: inline-block;
      padding:0 20rpx;
    }
    .txtbox{ width: 400rpx}
  }
  .btn_bot{
  position:fixed;
  z-index:60;
  bottom:0;
  width:750rpx;left:0;
  background:#ffffff;
  .btn_left{
    padding-left:30rpx
  }
  .btn_rr{
    width:60%;text-align: right;
  }
  .btn_right{
    div{
      width:210rpx;
      height:95rpx;
      line-height:95rpx;
      color:#ffffff;
      text-align:center;
    }
    .btn_coll{
      background:#666666;
    }
    .btn_del{
      background:#f00
    }
  }
}
 /* 优惠券弹窗 */
.couponbox{
	background-color: #f5f5f5;
	width: 100%;
  .titlebox{
    width: 100%;
    height: 100rpx;
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
  .tips{ padding: 0 30rpx; text-align: left;line-height: 1.2;font-size: 32rpx;
      span{
        font-size: 24rpx;
        margin-left: 10rpx;
      }
  }
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
      min-width: 100rpx;
      span{
        font-size: 30rpx!important;
        color: #f00;
      }
    }
    .info{
      line-height: 1.2;
      text-align: left;
      p{margin-bottom: .1rem}
    }
    span{
      font-size: 24rpx;
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
}

</style>
