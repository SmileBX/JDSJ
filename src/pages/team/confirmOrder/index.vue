<template>
  <div>
	  <div class="bg_top">
      <div></div>
    </div>
    <div class="p30 content">
      <div class="address p30">
          <div class="flex-column-center-center notAddress" v-if="false">
              <img src="http://jd.wtvxin.com/images/images/goods/address-icon.png" alt="">
              <p>暂无收货地址，点击添加</p>
          </div>
          <div class="addressShow flex-center-between">
            <div class="left">
              <div class="name flex-center-start" ><p>啊啊啊</p><p>1501401111</p></div>
              <div class="addressInfo ellipsis2"> 广东省 深圳市 龙华新区 民治街道展滔科技大厦C座716</div>
            </div>
            <div class="right">
              <van-icon name="arrow" color="#999"/>
            </div>
          </div>
      </div>
      <div class="pro plr30">
        <h3 class="flex-center-start">炫宝迪旗舰店<span class="icon"><van-icon name="arrow" color="#999"/></span></h3>
        <div class="item flex-center-between">
          <img src="http://jd.wtvxin.com/images/images/shop.png" alt="">
          <div class="right">
            <h4 class="ellipsis2">床头灯智能家用卧室宿舍阳台书桌装饰氛围LED小台灯家用卧室宿舍阳台书桌装饰氛围LED小台灯</h4>
            <div class="sku">白色</div>
            <div class="num-price flex-center-between">
              <p>x1</p>
              <h4 class="c-primary"><span>￥</span>128.00</h4>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon plr30">
        <div class="item">
          <h3>优惠劵</h3>
          <h4 class="c-999 flex-center">暂无可用优惠劵 <span class="icon"><van-icon name="arrow" color="#999"/></span></h4>
        </div>
        <div class="item">
          <h3>开票类型</h3>
          <h4 class="flex-center">不开发票<span class="icon"><van-icon name="arrow" color="#999"/></span> </h4>
        </div>
      </div>
      <div class="price-box plr30">
        <div class="item">
          <h3>商品金额</h3>
          <h4>¥107.80</h4>
        </div>
        <div class="item">
          <h3>优惠券</h3>
          <h4>-¥0.00</h4>
        </div>
        <div class="item">
          <h3>运费</h3>
          <h4>+¥0.00</h4>
        </div>
        <div class="msg">
          <h3>买家留言</h3>
          <textarea name="" id="" cols="30" rows="10" placeholder="填写内容需与商家协商并确认，45字以内"></textarea>
        </div>
      </div>
    </div>

    <div class="footer flex-center-between">
      <p>总计：<span class="c-primary">¥107.80</span></p>
      <div class="confirm">去付款</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
        
    }
  },
  
  methods: {
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
