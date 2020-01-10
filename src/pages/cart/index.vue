<template>
  <div>
      <div class="pw3" v-if="hasData">
          <img src="/static/images/red_bg.png" alt="" class="mine_red">
          <div class="cart_main">
              <div class="text_right cf p3"  @click="isEdit=!isEdit">{{isEdit?'完成':'编辑'}}</div>
              <div class="cart_list">
                  <div class="cart_shop bg_fff mt2">
                      <div class="flex justifyContentBetween">
                          <div class="left">
                            <span>{{cartList[0].ShopName}}</span>
                          </div>
                          <div class="cr">领券</div>
                      </div>
                      <div class="shopcar_list" v-for="(item,index) in cartList" :key="index">
                          <div class="shopcart_item flex justifyContentBetween flexAlignCenter">
                            <div class="left">
                              <input type="checkbox" class="checkbox-cart" :checked="item.select">
                            </div>
                            <div class="flex justifyContentBetween">
                                <img :src="item.ProductImg" alt="" class="shop" @click="goUrl('/pages/goodsSon/goodsDetail/main?id'+item.ProductId)">
                                <div class="flex1 mr2 txtbox">
                                    <div class="twoline" @click="goUrl('/pages/goodsSon/goodsDetail/main?id'+item.ProductId)">{{item.ProductName}}</div>
                                    <span class="mt1 spec" v-if="item.SpecText">
                                        <span class="cg font24">{{item.SpecText}}</span>
                                        <img src="/static/images/icons/down.png" alt="" class="down">
                                    </span>
                                    <div class="flex justifyContentBetween mt1">
                                        <p class="cr font30">￥{{item.SalePrice}}</p>
                                        <p class="flex flexAlignCenter jj_dao">
                                            <span class="jia_num input_num"><img src="/static/images/icons/jian.png" alt="" class="jian"></span>
                                            <input type="text" v-model="item.Number" class="input_num input_bo">
                                            <span class="jia_num input_num"><img src="/static/images/icons/jia.png" alt="" class="jia"></span>
                                        </p>
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
          <div class="left btn_left">
            <input
              type="checkbox"
              class="checkbox-cart"
            >
            <span>全选</span>
          </div>
          <div class="flex flexAlignCenter btn_rr justifyContentEnd">
              <div class="flex1" v-if="!isEdit">总计: ￥<span class="cr font30">600</span></div>
              <div class="btn_right flex">
                  <div class="btn_del" v-if="isEdit" @tap="MenuCart(1)">删除</div>
                  <div class="btn_del mr5" @tap="Order" v-if="!isEdit">结算（2）</div>
              </div>
          </div>
        </div> 
      </div>
      <!--空-->
      <div class="flex flexAlignCenter flexColumn" v-else>
          <img src="/static/images/icons/box.png" alt="" class="box">
          <p class="cg">购物车空空如也~~~</p>
          <span class="go_shop" @click="goshop">去购物</span>
      </div>
  </div>
</template>

<script>
import {post,get} from '@/utils'
export default {
  data () {
    return {
      userId: "",
      token: "",
      hasData:false,
      cartList:{},
      isEdit:false,
    }
  },
  onLoad(){
    
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.shopid = wx.getStorageSync("shopid");
    this.getCartList();
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
        if(res.data.length){
          this.hasData=true; 
          this.cartList=res.data;
          let _this = this;
          _this.$nextTick(function() {
            _this.cartList.forEach(item=> {
              _this.$set(item, "select", false);
            }); 
          });
        }else{
          this.hasData=false;
        }
      }
    }
    
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
    width:100%;position: absolute;top:-100rpx;left:0;
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
    .jian{
      width:18rpx;height:2rpx;
    }
    .jia{
      width:18rpx;height:18rpx;
    }
    .input_num{
      width:58rpx;
      text-align: center;
    }
    .jia_num{
      display: flex;justify-content: center;align-items: center;
    }
    .input_bo{
      border-left:1rpx solid #f5f5f5;
      border-right:1rpx solid #f5f5f5;
    }
    .jj_dao{
      border:1rpx solid #f5f5f5;border-radius: 25rpx;
    }
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


</style>
