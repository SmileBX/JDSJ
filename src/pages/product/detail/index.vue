<template>
  <div class="shop" style="padding-bottom:100rpx">
    <swiper :autoplay="true" :indicator-dots="true" :circular="true" class="swiper-box">
      <swiper-item v-for="(item, index) in info.ProductPhotoPath" :key="index">
        <img :src="item.url" alt="">
      </swiper-item>
    </swiper>
    <div class="top">
      <div class="jus-b ali-c tit">
        <div class="left">
          <p class="twoline">{{info.Name}}</p>
          <span><span>￥</span>{{info.Price}}</span>
        </div>
        <!-- <div class="right">
          <img src="http://hxjp.wtvxin.comhttp://jd.wtvxin.com/images/images/my/zhuanfa.png" alt="">
          <p>分享</p>
          <p>邮费￥0</p>
        </div> -->
      </div>
      <p v-if="info.Price==199" class="huodong ali-c">参与活动第二件9.9元得30ml旅行装</p>
    </div>
    <div class="bpm-box jus-b ali-c change" @click="toCat()">
      <span>请选择 颜色 规格 款式</span>
      <img src="http://hxjp.wtvxin.comhttp://jd.wtvxin.com/images/images/my/more.png" alt="">
    </div>
    <div class="bpm-box jus-b ali-c change">
      <span>商品评价</span>
      <div class="ali-c" @click="goPingjia()">
        <span class="all">查看全部</span>
        <img src="http://hxjp.wtvxin.comhttp://jd.wtvxin.com/images/images/my/more.png" alt="">
      </div>
    </div>
    <div class="com-box" v-if="evaluate!=null">
      <div class="jus-b ali-c title">
        <div class="ali-c">
          <img :src="evaluate.MemberAvatar" alt="">
          <p>{{evaluate.MemberName}}</p>
        </div>
        <div class="ali-c star-box">
          <img v-for="(item, index) in evaluate.ServiceRank" :key="index" src="http://hxjp.wtvxin.comhttp://jd.wtvxin.com/images/images/my/star_lig.png" alt="">
          <img v-for="(item, index) in 5-evaluate.ServiceRank" :key="index" src="http://hxjp.wtvxin.comhttp://jd.wtvxin.com/images/images/my/noColl.png" alt="">
        </div>
      </div>
      <p class="detail">{{evaluate.ContentText}}</p>
      <div class="imgbox"><img :src="item1" alt="" v-for="(item1,index1) in evaluate.EvaluateImg" :key="index1"></div>
      <span class="time">{{evaluate.AddTime}}</span>
    </div>
    <div v-else class="list-data">
        该商品还没有评论呢~
    </div>
    <div class="bpm-box ali-c goods-detail-title">商品详情</div>
    <div class="detail-box">
      <div v-html="info.ContentDetail"></div>
      <div v-if="info.ContentDetail==''" class="list-data">卖家暂时还没有为该商品提供详细信息！</div>
    </div>
    <div class="foot flex bt1">
      <div class="flex left">
        <div class="ali-c jus-c" @click="collection()">
          <div>
            <img v-if="!info.IsCollection" src="http://hxjp.wtvxin.comhttp://jd.wtvxin.com/images/images/my/noColl.png" alt="">
            <img v-else src="http://hxjp.wtvxin.comhttp://jd.wtvxin.com/images/images/my/star_lig.png" alt="">
			<p>客服</p>
          </div>
        </div>
        <div class="ali-c jus-c" @click="switchTab(2)">
          <div>
            <img src="http://hxjp.wtvxin.com/static/tabBar/car.png" alt="">
			<p>购物车</p>
			<span>3</span>
          </div>
        </div>
      </div>
      <div class="flex right">
        <div class="jus-c ali-c" @click="toCat()">加入购物车</div>
        <div class="jus-c ali-c" @click="toCat()">立即购买</div>
      </div>
    </div>
    <!-- <car :show.sync='showCat' :data="cartData" @success="addCart"></car> -->

    <!-- 购物车弹窗 -->
    <div v-if="showCat" @click="cancel()" class="mengban"></div>
        <div class="main" id="main" :style="mainHeight" :class="showCat?'show':''">
            <div class="top-box">
                <div class="one jus-b">
                    <div class="img-box jus-c ali-c">
                        <img :src="info.ProductPhotoPath[0].url" alt="">
                    </div>
                    <div class="right jus-b">
                        <div>
                            <p class="title">{{info.Name}}</p>
                            <span>
                                <span class="fuhao">￥</span>{{skuPrice==''?info.Price:skuPrice}}</span>
                        </div>
                        <span @click="cancel()" class="chacha">+</span>
                    </div>
                </div>
                <div class="guige" v-if="info.ProductColorSpecs!=''">
                    <p>颜色</p>
                    <div class="flex-wrap">
                        <span @click="cliTag(item,1)" :class="color==item?'active':''" v-for="(item, index) in info.ProductColorSpecs" :key="index" class="ali-c jus-c">{{item}}</span>
                    </div>
                </div>
                <div class="guige" v-if="info.ProductSpecifications!=''">
                    <p>规格</p>
                    <div class="flex-wrap">
                        <span @click="cliTag(item,2)" :class="guige==item?'active':''" v-for="(item, index) in info.ProductSpecifications" :key="index" class="ali-c jus-c">{{item}}</span>
                    </div>
                </div>
                <div class="guige" v-if="info.ProductStyleSpecs!=''">
                    <p>款式</p>
                    <div class="flex-wrap">
                        <span @click="cliTag(item,3)" :class="style==item?'active':''" v-for="(item, index) in info.ProductStyleSpecs" :key="index" class="ali-c jus-c">{{item}}</span>
                    </div>
                </div>
                <div class="two jus-b ali-c">
                    <span>购买数量</span>
                    <!-- <span>x1</span> -->
                    <div class="ali-c">
                        <span @click="suan(1)">-</span>
                        <input type="number" v-model="goodsNum">
                        <span @click="suan(2)">+</span>
                    </div>
                </div>
            </div>
            <div class="flex bot">
                <p class="flex1 jus-c ali-c" @click="pay(1)">加入购物车</p>
                <p class="flex1 jus-c ali-c" @click="pay(2)">立即购买</p>
            </div>
        </div>

  </div>
</template>

<script>
import {post} from '@/utils'
// import car from '@/components/car'
export default {
  name: "",
  data() {
    return {
      mainHeight:'',//弹框样式
      showSort:false,
      info:{},
      showCat:false,
      color:'',
      guige:'',
      style:'',
      seachHeight:'',
      guigeId:'',
      goodsNum:1,
      evaluate:{},
      skuPrice:''
    };
  },
  onLoad() {},
  onShow() {
    this.guigeId = ''
    this.evaluate = null
    this.skuPrice = ''
    this.showCat = false
    this.color = ''
    this.guige = ''
    this.style = ''
    this.goodsNum = 1
    this.mainHeight = ''
    this.getInfo()
    this.getPinglun()
    setTimeout(() => {
      var query = wx.createSelectorQuery();
      query.select("#main").boundingClientRect((rect)=> {
        this.seachHeight = rect.height*2
        this.mainHeight = 'height:'+this.seachHeight+'rpx;bottom:'+(-this.seachHeight-50)+'rpx'
        console.log('gaodu',rect.height)
      }).exec();
    }, 200);
    setTimeout(() => {
      console.log(this.info.IsCollection,'zhehsi')
    }, 100);
    
  },
  watch: {
    goodsNum(e){
      if(e<1){
        this.goodsNum = 1
      }
    },
    houseup(e){
      console.log(this.info.ProductSpecsList)
      this.info.ProductSpecsList.map((item,index)=>{
        if(item.ColorSpecs==e.color&&item.StyleSpecs==e.style&&item.Specifications==e.guige){
          this.skuPrice = item.PunitPrice
        }
      })
    }

  },
  computed: {
    houseup(){
      const {color,guige,style} = this
      return {color,guige,style}
    },
  },
  // components: {
  //   car
  // },
  methods: {
    goPingjia(){
      console.log(1)
      wx.navigateTo({
        url:'/pages/allpingjia/main?id='+this.$mp.query.id
      })
    },
    getPinglun(){
      post('Goods/GetEvaluate',{
        proId:this.$mp.query.id,
        page:1,
        pageSize:1
      }).then(res=>{
        if(res.code==0){
          this.evaluate = res.data.EvaluateList[0];
          var _this=this;
          var EvaluateImg=this.evaluate.EvaluateImgList.split(',')
          this.$set(_this.evaluate,'EvaluateImg',EvaluateImg) 
        }
      })
    },
    switchTab(index){//底部跳页
      wx.switchTab({
        url:index==1?'/pages/index/main':'/pages/car/main'
      })
    },
    collection(){//收藏
      post('Goods/ProductCollection',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        proId:this.info.Id
      }).then(res=>{
        if(res.code==0){
          wx.showToast({
            icon:'none',
            title:res.msg
          })
          this.getInfo()
        }
      })
    },
    pay(type){
      // if(this.color==''||this.guige==''||this.style==''){//如果规格没有选齐
      //   wx.showToast({
      //     icon:'none',
      //     title:'请选择 颜色 规格 款式'
      //   })
      // }
      if(this.info.ProductSpecsList==null){//没有规格，可以直接购买
        if(this.goodsNum<=this.info.Stock){//有库存
          if(type==1){
            this.addCar()
            this.showCat = false
          }else{
            this.goOrder()
          }
        }else{//没有库存
          wx.showToast({
            icon:'none',
            title:'库存不足！！！'
          })
        }
      }else{//有规格，需要判断
        if(this.color==''&&this.guige==''&&this.style==''){//没有选择规格，提示进行选择
          wx.showToast({
            icon:'none',
            title:'请选择产品规格哦，亲'
          })
        }else{//选择了规格,判断该规格有没有库存
        let status = false;
          this.info.ProductSpecsList.forEach(item=>{
            if(item.ColorSpecs==this.color&&item.Specifications==this.guige&&item.StyleSpecs==this.style){
              status = true;
              if(this.goodsNum<=item.ProStock){//有库存
                if(type==1){
                  console.log('添加购物车')
                  this.guigeId = item.Id
                  this.addCar()
                  this.showCat = false
                }else{
                  this.guigeId = item.Id
                  this.goOrder()
                }
              }else{//没有库存
                wx.showToast({
                  icon:'none',
                  title:'库存不足！！！'
                })
              }
            }
          })
          if(!status){
              wx.showToast({
                  icon:'none',
                  title:'请选齐规格！！！'
                })
          }
        }
      }
    },
    addCar(){
      post('Cart/AddCart',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        ProId:this.info.Id,
        Count:this.goodsNum,
        SpecId:this.guigeId
      }).then(res=>{
        if(res.code==0){
          wx.showToast({
            icon:'success',
            title:'已添加至购物车！'
          })
        }
      })
    },
    suan(tip){
        if(tip==1&&this.goodsNum!=1){
            this.goodsNum--
        }else if(tip==2){
            this.goodsNum++
        }
    },
    cliTag(item,type){
      if(type==1){
        this.color = item
      }else if(type==2){
        this.guige = item
      }else if(type==3){
        this.style = item
      }
      console.log(this.color,this.guige,this.style)
    },
    cancel(){
      this.showCat = false
    },
    toCat(){
      this.showCat = true
      console.log(this.mainHeight,this.seachHeight)
    },
    goOrder(){
      wx.navigateTo({
        url:'/pages/shop/order/main?proId='+this.$mp.query.id+'&num='+this.goodsNum+'&guige='+this.guigeId+'&orderType=0'
      })
    },
    getInfo(){
      post('Goods/ProductInfo',{
        proId:this.$mp.query.id,
        // UserId:wx.getStorageSync("userId"),
        // Token:wx.getStorageSync("token"),
      }).then(res=>{
        this.info = res.data
        this.info.ProductPhotoPath.forEach(item=>{//商品详情解码
          item.url = 'http://hxjp.wtvxin.com'+item.url
        })
        this.info.ProductColorSpecs = [...new Set(this.info.ProductColorSpecs)]//规格去重
        this.info.ProductSpecifications = [...new Set(this.info.ProductSpecifications)]//规格去重
        this.info.ProductStyleSpecs = [...new Set(this.info.ProductStyleSpecs)]//规格去重
        this.info.ContentDetail = decodeURI(this.info.ContentDetail);
        this.info.ContentDetail = this.info.ContentDetail.replace(/<img/, "<img style='width:100%;height:auto;'");console.log(this.info.ContentDetail)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
.list-data{
  background-color: #fff
}
.detail-box{
  background-color: #fff;
  padding: 50rpx 0;
  image{
    max-width:100%!important
  }
}
.foot{
  width: 100%;
  height: 80rpx;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left:0;
  padding:15rpx 0 ;
  justify-content:space-between;
  .right{
    width: 65%;
    color: #fff;
	font-size: 32rpx;
	border-radius:50rpx;
	overflow:hidden;
	margin-right:30rpx;
	div{
		text-align:center;
		width:100%;
		color:#fff;
	}
    div:nth-child(1){
      background-color: #fda33a;
    }
    div:nth-child(2){
      background-color: #ff3333;
    }
  }
  .left{
    text-align: center;
    font-size: 22rpx;
    width:30%;
    &>div{
		display:flex;
		flex-flow:column nowrap;
		align-items:center;
		justify-content:center;
		width:50%;
		position:relative;
		span{
			display:block;
			line-height:1.5;
			color:#fff;
			font-size:20rpx;
			background:#ff3333;
			border-radius:20rpx;
			padding:0 10rpx;
			position:absolute;
			right:20rpx;
			top:-5rpx;
		}
		p{
				color: #999;
				font-size:22rpx;
		}
        img{
          display: block;
          margin: auto;
          width:40rpx;
          height:40rpx;
        }
    }
  }
  img{
    width: 32rpx;
    height: 32rpx;
  }
}
.goods-detail-title{
  height: 90rpx;
  font-size: 30rpx;
  color: #000;
}
.com-box{
  background-color: #fff;
  border-top: 1rpx solid #ededed;
  padding: 20rpx 30rpx;
  .detail{
    font-size: 28rpx;
    color: #212121;
    margin: 20rpx 0;
  }
  .time{
    color: #999
  }
  .title{
    height: 60rpx;
    img{
      width: 68rpx;
      height: 68rpx;
      border-radius: 50%;
    }
    p{
      font-size: 30rpx;
      color: #333;
      margin-left: 20rpx
    }
    .star-box{
      img{
        width: 24rpx;
        height: 24rpx;
        margin-left: 10rpx
      }
    }
  }
}
.change{
  height: 90rpx;
  font-size: 28rpx;
  color: #333;
  .all{
    color: #999
  }
  span{
    margin-right: 20rpx
  }
  img{
    width: 12rpx;
	  height: 20rpx;
  }
}
.top{
  background-color: #fff;
  padding-bottom: 25rpx;
}
.huodong{
  width: 690rpx;
	height: 40rpx;
	background-color: #fef4f5;
  border-radius: 4rpx;
  margin: auto;
  font-size: 22rpx;
  color: #ed2f39;
  padding-left: 20rpx;
}
.swiper-box{
  width: 100vw;
  height: 750rpx;
  img{
    width: 100%;
    height: 100%;
  }
}
.tit{
  padding: 0 37rpx 0 30rpx;
  height: 200rpx;
  background-color: #fff;
  .left{
    width: 580rpx;
    p{
      font-size: 32rpx;
      color: #333;
      margin-bottom: 15rpx
    }
    span{
      color: #fb4f45;
      font-size: 44rpx;
      span{
        font-size: 30rpx;
      }
    }
  }
  .right{
    color: #999;
    font-size: 24rpx;
    text-align: right;
      img{
        width: 32rpx;
	      height: 32rpx;
      }
      p{
        line-height: 60rpx;
      }
  }
}
.main{
    position: fixed;
    // bottom: -950rpx;
    transition: all 0.3s;
    width: 100vw;
    // height: 900rpx;
    z-index: 99;
    background-color: #fff;
    .guige{
        p{
            font-size: 28rpx;
            color: #333;
            line-height: 80rpx;
        }
        span{
            background-color: #f5f5f5;
            color: #666;
            font-size: 24rpx;
            padding: 10rpx 20rpx;
            border-radius: 10rpx;
            margin: 0 20rpx 20rpx 0;
            border: 1rpx solid #f5f5f5;
        }
        .active{
          background-color:#f3f8fc;
          color: #3592ea;
          border: 1rpx solid #3592ea;
        }
    }
    .top-box{
        padding: 30rpx 30rpx 130rpx;
        .two{
            height: 100rpx;
            font-size: 28rpx;
            color: #999;
            .ali-c{
                width: 200rpx;
                span{
                    font-size: 40rpx;
                    font-weight: 900;
                    color: #333
                }
                input{
                   width: 80rpx;
                    height: 44rpx;
                    background-color: #eeeeee;
                    border-radius: 8rpx; 
                    margin: 0 30rpx;
                    text-align: center;
                    position: relative;
                    top: 5rpx
                }
            }
        }
        .one{
            border-bottom: 1rpx solid #ededed;
            .img-box{
                width: 200rpx;
                height: 200rpx;
                border-radius: 10rpx;
                border:1rpx solid #ededed;
                position: relative;
                top: -50rpx;
                background-color: #fff
            }
            img{
                width: 180rpx;
                height: 180rpx;
            }
            .right{
                width: 475rpx;
                .chacha{
                    font-size: 50rpx;
                    transform: rotate(45deg);
                    width: 30rpx;
                    height: 30rpx;
                    position: relative;
                    top: -20rpx;
                    left: 20rpx;
                }
                div{
                    width: 410rpx;
                    p{
                        font-size: 28rpx;
                        color: #333;
                        margin-bottom: 30rpx
                    }
                    span{
                        color: #f0370b;
                        font-size: 32rpx;
                        .fuhao{
                            font-size: 22rpx
                        }
                    }
                }
            }
        }
    }
    .bot{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 98rpx;
        color: #fff;
        font-size: 28rpx;
        p:nth-child(1){
            background-color: #666666;
        }
        p:nth-child(2){
            background-color: #29a49f;
        }
    }
}
.mengban{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 98;
}

.show{
    bottom: 0!important
}
.imgbox{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.imgbox img{
  width: 33.3%;
  height: 260rpx;
}
</style>
