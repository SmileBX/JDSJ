<template>
  <div>
      <swiper class="swiper" @change="changeBanner">
        <div class="numpage">{{bannerindex+1}}/{{BannerNum}}</div>
        <swiper-item class="flexc" v-for="(item,index) in proInfo.ProductImgList" :key="index">
          <img mode='aspectFill' :src="item.PicUrl" alt="">
        </swiper-item>
      </swiper>
      <div class="top">
        <div v-if="isLimint==1" :class="['limitTiem jus-b ali-c',starTimetype!=1?'no':'']">
            <div class="limt-left">
              <div class="active-price jus-a ali-c">
                  <h3><span>¥</span>{{proInfo.TimePrice}}</h3>
                   <p>¥{{proInfo.MarketPrice}}</p>
              </div>
              <div class="percentage">
                <span :style="['width:'+percentage+'%']"><i>已抢{{proInfo.SalesVolume}}件</i></span>
              </div>
            </div>
            <div class="limt-right">
              <div class="txt">限时秒杀</div>
              <div class="time ali-c jus-b" >
                  <span class="timetxt">{{starTimetype==1?'距离结束':'距离开始'}}</span>
                  <div class="countDown" v-if="timeStr.length">
                    <span>{{timeStr[1]}}</span>:<span>{{timeStr[2]}}</span>:<span>{{timeStr[3]}}</span>
                  </div>
              </div>
            </div>
        </div>
        <div class="jus-b ali-c">
          <div class="left">
            <p class="price" v-if="isLimint==0">
              <span>￥</span><span>{{proInfo.ProductPrice}}</span><span>￥{{proInfo.MarketPrice}}</span>
            </p>
            <p class="tit">{{proInfo.ProductName}}</p>
          </div>
          <div class="right">
            <img src="http://jd.wtvxin.com/images/images/index/fenxiang.png" alt="">
          </div>
        </div>
        <div class="jus-b ali-c">
          <span class="txtinfo">已售：{{proInfo.SalesVolume}}</span>
          <span class="txtinfo">好评：{{proInfo.PraiseRate}}%</span>
        </div>
      </div>
      <div class="list-box">
        <div class="list ali-c jus-b" v-if="proInfo.Score!=0||(proInfo.CouponList.length&&proInfo.IsUseCoupons)" @click="openCoupon">
          <div class="left ali-c">
            <span>领券</span>
            <div>
              <div class="couponico ali-c jus-b">
                <block v-for="(item,index) in proInfo.CouponList" :key="index">
                  <div class="coupontxt" v-if="index<2">
                    <block v-if="item.DiscountType==1">
                      <block v-if="item.MeetConditions!=0">
                        满{{item.MeetConditions}}
                      </block>
                      <block v-else>下单立</block>
                      减{{item.Denomination}}
                    </block>
                    <block v-else>
                      <block v-if="item.MeetConditions!=0">
                        满{{item.MeetConditions}}
                      </block>
                      <block v-else>下单立</block>
                      打{{item.Denomination*100/10}}折
                    </block>
                  </div>
                </block>
              </div>
              <p v-if="proInfo.Score!=0">购物返<text class="red">{{proInfo.Score}}</text>积分</p>
            </div>
          </div>
          <div class="right ali-c">
            <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b" v-if="isLimint!=1" @click="showSku(0)">
          <div class="left ali-c">
            <span>规格</span>
            <p class="quan">{{SpecText||'请选择规格数量'}}</p>
          </div>
          <div class="right ali-c">
            <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b" v-if="false">
          <div class="left ali-c">
            <span>送至</span>
            <p class="quan">广东深圳</p>
          </div>
          <div class="right ali-c">
            <span>包邮</span>
            <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <span>服务</span>
            <img src="http://jd.wtvxin.com/images/images/index/ok.png" alt="">
            <p>品质保证</p>
            <img src="http://jd.wtvxin.com/images/images/index/ok.png" alt="">
            <p>破损补寄</p>
            <img src="http://jd.wtvxin.com/images/images/index/ok.png" alt="">
            <p>及时发货</p>
          </div>
        </div>
      </div>
      <div class="play" v-if="isPin==1">
        <div class="tit ali-c jus-b">
          <p>拼团玩法</p>
          <div class="ali-c">
            <span>详细规则</span>
            <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="flexc img">
          <img src="http://jd.wtvxin.com/images/images/index/play.png" alt="">
        </div>
      </div>
      <div class="pin" v-if="isPin==1">
        <div class="tit ali-c">他们都在拼，可直接参团</div>
        <div class="list ali-c jus-b">
          <div class="left ali-c">
            <img src="http://jd.wtvxin.com/images/images/index/ok.png" alt="">
            <div>
              <span>如果</span>
              <p>还差1人成团，剩余<span>02:54:03</span>结束</p>
            </div>
          </div>
          <p class="flexc right">去参团</p>
        </div>
      </div>

      <div class="comment">
        <div class="tit ali-c jus-b">
          <p class="left">商品评价<span>({{proInfo.EvaluateCount}})</span></p>
          <div class="right" v-if="proInfo.EvaluateCount>0">
            <span>查看全部</span>
            <img src="http://jd.wtvxin.com/images/images/index/more_r.png" alt="">
          </div>
        </div>
        <div class="commentlist" v-if="proInfo.EvaluateCount>0">
          <block v-for="(item,index) in proInfo.EvaluateList" :key="index">
            <div v-if="index<1">
              <div class="name ali-c jus-b">
                <div class="ali-c">
                  <img class="left" :src="item.MemberAvatar||'http://jd.wtvxin.com/images/images/ava.png'" alt="">
                  <p>{{item.MemberName}}</p>
                </div>
                <div>
                  <img v-for="(i,e) in item.Star" :key="e" class="right" src="http://jd.wtvxin.com/images/images/index/star.png" alt="">
                </div>
              </div>
              <p class="detail">
                {{item.ContentText}}
              </p>
              <p class="time">{{item.AddTime}}</p>
            </div>
          </block>
        </div>
        <div class="commentlist" v-else>
          <p style="padding: 20rpx; color: #999; text-align: center;">
            暂无评论
          </p>
        </div>
      </div>
      <div class="goods-detail">
        <p class="tit">商品详情</p>
        <div class="detail-box">
          <div v-html="proInfo.ContentDetail"></div>
          <div v-if="proInfo.ContentDetail==''" style="text-align: center;">卖家暂时还没有为该商品提供详细信息！</div>
        </div>
      </div>
      <div style="height: 100rpx;"></div>
      <div class="foot ali-c jus-b">
        <div class="left ali-c">
          <div>
            <img src="http://jd.wtvxin.com/images/images/index/ans.png" alt="">
            <p>客服</p>
          </div>
          <div @click="collect"> 
            <img v-if="IsCollect" src="http://jd.wtvxin.com/images/images/index/collect_y.png" alt="">
            <img v-else src="http://jd.wtvxin.com/images/images/index/collect_n.png" alt="">
            <p>收藏</p>
          </div>
          <div @click="goCart">
            <img src="http://jd.wtvxin.com/images/images/index/cart.png" alt="">
            <p>购物车</p>
            <span class="num flexc" v-if="CartNumber>0">{{CartNumber}}</span>
          </div>
        </div>
        <div class="right flex">
          <p :class="['flex1 flexc',starTimetype!=1?'dis':'']" @click="showSku(1)">加入购物车</p>
          <p :class="['flex1 flexc',starTimetype!=1?'dis':'']" @click="showSku(2)">立即购买</p>
        </div>
      </div>
      <div class="topbtn" @click="Top" v-if="isTop"></div>
      <div v-if="showPopupSku" @click="hidePopup" class="mengban"></div>
        <div class="main" id="main" :style="mainHeight" :class="showPopupSku?'show':''">
            <div class="top-box">
                <div class="one jus-b">
                    <div class="img-box jus-c ali-c">
                        <img :src="SpecInfo.SpecImage||(proInfo.ProductImgList&&proInfo.ProductImgList[0].PicUrl)" alt="">
                    </div>
                    <div class="right jus-b">
                        <div>
                            <p class="tit">{{proInfo.ProductName}}</p>
                            <span v-if="isLimint">{{proInfo.TimePrice}}</span>
                            <span v-else><span class="fuhao">￥</span>{{SpecInfo.PunitPrice===undefined?proInfo.ProductPrice:SpecInfo.PunitPrice}}</span>
                            <p class="font_four">库存：{{reStock}}</p>
                                <!-- :SpecInfo.PunitPrice -->
                        </div>
                        <span @click="hidePopup" class="chacha">+</span>
                    </div>
                </div>
                <div class="guige" v-for="(item, index) in specList" :key="index">
                    <p>{{index}}</p>
                    <div class="flex-wrap">
                        <!-- 下面span选中绑定一个‘active类’ -->
                        <span :class="{'active':ite.name==SpecValue[index]}" @click="cliTag(index,ite.name)" class="ali-c jus-c" v-for="(ite, ind) in item" :key="ind">{{ite.name}}</span>
                    </div>
                </div>
                <div class="two jus-b ali-c">
                    <span>购买数量</span>
                    <div class="ali-c">
                        <span @click="suan(1)">-</span>
                        <input type="number" v-model="goodsNum" disabled>
                        <span @click="suan(2)">+</span>
                    </div>
                </div>
            </div>
            <div class="flex bot">
              <p v-if="isLimint==1&&starTimetype==0" class="flex1 jus-c ali-c">即将开始 敬请期待</p>
              <p v-else-if="isLimint==1&&starTimetype==2" class="flex1 jus-c ali-c btn_ccc">秒杀已结束</p>
              <block v-else>
                <block v-if="reStock>0">
                  <block v-if="showbtntype==0">
                    <p class="flex1 jus-c ali-c" @click="gocart">加入购物车</p>
                    <p class="flex1 jus-c ali-c btn_red" @click="gouBuy">立即购买</p>
                  </block>
                  <p v-else class="flex1 jus-c ali-c btn_red" @click="confirmBtn">确定</p>
                </block>
                <p v-else class="flex1 jus-c ali-c">商家补货中</p>
              </block>
            </div>
        </div>
        <!-- 优惠券弹窗 -->
      <uni-popup mode="fixed" :show="showCoupon" :h5Top="true" position="bottom" @hidePopup="hidePopup">
        <div class="couponbox" style="z-index: 10000;">
          <div class="titlebox">
            <div class="title">优惠券</div>
            <div  @click="hidePopup" class="close">×</div>
          </div>
          <div class="tips">可领优惠券<span>领取后可用于该商品</span></div>
          <scroll-view scroll-y style="width: 100%;height: 560rpx;">
            <div class="ticket" >
                <div class="list jus-b" v-for="(item,index) in proInfo.CouponList" :key="index">
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
import uniPopup from '@/components/uni-popup.vue';
export default {
  components: {
    uniPopup
  },
  data () {
    return {
      userId: "",
      token: "",
      proId:"",
      shopid:"",
      isTop:false,//是否显示置顶
      IsCollect:false, //是否收藏该商品
      isLimint:0,//0非限时购产品，1限时购产品
      timer:null,
      timeStr:[],//倒计时
      starTimetype:1,//0秒杀未开始，1一开始，2已结束
      percentage:0,//已售百分比
      isPin:0,//0非拼团产品，1拼团产品
      proInfo:{},//商品信息
      bannerindex:0,//当前轮播图
      BannerNum:0,//轮播图数量
      CartNumber:0,//购物车数量
      showPopupSku:false,//是否显示sku
      goodsNum:1,//购买商品数量
      // seachHeight:'',
      // mainHeight:'',//弹框样式

      specList:[],//规格总列表
      SpecText:"",//当前选择规格的文本
      SpecValue:{},//当前选择规格的对象
      SpecInfo:{},//当前选择规格的信息--图片，价钱
      showbtntype:0,
      isMatch:false,//是否已匹配sku
      ShareMemberid:"",//分享的会员id
      showCoupon:false,//是否显示优惠券弹窗
      reStock:0,//库存
      maxbuy:0,//最大购买量
      minbuy:1, //最小购买量
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
  },
  onShow(){
    this.shopid = wx.getStorageSync("shopid");
    this.proId=this.$root.$mp.query.id;
    this.isLimint=this.$root.$mp.query.isLimint||0;
    this.goodsNum = 1;
    this.specList=[];
    this.SpecText="";
    this.SpecValue={};
    this.SpecInfo={};
    this.showPopupSku = false;
    this.timeStr=[];
    clearInterval(this.timer);
    this.ProductInfo();
    this.GetAllCartNumber();
    setTimeout(() => {
      var query = wx.createSelectorQuery();
      query.select("#main").boundingClientRect((rect)=> {
        this.seachHeight = rect.height*2
        this.mainHeight = 'height:'+this.seachHeight+'rpx;bottom:'+(-this.seachHeight-50)+'rpx'
        console.log('gaodu',rect.height)
      }).exec();
    }, 200);
  },
  watch:{
    goodsNum(e){
      if(e<1){
        this.goodsNum = 1
      }
    },
  },
  methods: {
    goCart(){
      wx.navigateTo({
        url:'/pages/cart/main'
      })
    },
    cliTag(name,value){//点击选择规格标签--name:规格名称 value:所选规格值
      this.$set(this.SpecValue,name,value)
      this.proInfo.ProductSpecList.map((item,index)=>{
        const please = JSON.parse(item.SpecValue)
        if(this.isObjectValueEqual(please,this.SpecValue)){
          this.SpecInfo = item//匹配到的sku
          this.reStock=item.ProStock;
          if(this.reStock==0){
            console.log("库存不足")
          }
          this.SpecText = this.SpecInfo.SpecText;
          this.isMatch=true;
        }
      })
    },
    isObjectValueEqual(a, b) {//判断两个对象里面属性值是否相等
        var aProps = Object.keys(a);
        var bProps = Object.keys(b);
        if (aProps.length != bProps.length) {return false;}
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        return true;
    },
    
    // 显示sku
    showSku(type){
      this.showPopupSku = true;
      this.showbtntype=type;
    },
    //弹出优惠券
    openCoupon(){
      this.showCoupon=true;
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
    suan(tip){
      if(tip==1){
        if(this.goodsNum>1){
          if(this.goodsNum>this.minbuy){
            this.goodsNum--
          }else{
            this.goodsNum=this.minbuy;
            wx.showToast({
							title: this.minbuy+'件起购',
							icon:"none",
							duration: 1500
						});
          }
        }

      }else if(tip==2){
        if(this.maxbuy==0){
          if(this.goodsNum>=this.reStock){
            this.goodsNum=this.reStock;
            wx.showToast({
							title: "库存不足！",
							icon:"none",
							duration: 1500
						});
          }else{
            this.goodsNum++
          }
        }else{
          if(this.reStock>=this.goodsNum){
            if(this.goodsNum<this.maxbuy){
              this.goodsNum++
            }else{
              this.goodsNum=this.maxbuy;
              wx.showToast({
                title: "限购"+this.maxbuy+"件",
                icon:"none",
                duration: 1500
              });
            }
          }else{
            this.goodsNum=this.reStock;
          }
        }
      }
    },
    //统一的关闭弹窗方法
    hidePopup() {
      this.showPopupSku=false;
      this.showCoupon=false;
    },
    confirmBtn(){
      if(this.showbtntype==1){
        this.gocart();
      }else if(this.showbtntype==2){
        this.gouBuy();
      }
    },
    //加入购物车
    async gocart(){
      if(this.isMatch){
        let res=await post("Cart/AddCart",{    
          userId: this.userId,
          token: this.token,
          ShopId:this.shopid,
          proId: this.proId,
          Count: this.goodsNum,
          SpecText: this.SpecText,
          IsFlashSale: this.isLimint,
          ShareMemberId: this.ShareMemberid
        })
        if(res.code==0){
          this.GetAllCartNumber();
           wx.showToast({
            title: res.msg,
            icon:"none",
            duration: 1500
          });
          this.showPopupSku=false;
        }else{
          wx.showToast({
            title: res.msg,
            icon:"none",
            duration: 1500
          });
        }
      }else{
        wx.showToast({
          title: "请选择产品规格",
          icon:"none",
          duration: 1500
        });
      }
    },
    //立即购买
    gouBuy(){
      if(this.isMatch){
        wx.setStorageSync("addressinfo",'');
        wx.navigateTo({
          url: '/pages/goodsSon/confirmOrder/main?cartItem='+this.proId+'&SpecText='+this.SpecText+'&number='+this.goodsNum+'&orderSType=0'+'&isLimint='+this.isLimint+'&ShareMemberId='+this.ShareMemberid,
        })
      }else{
        wx.showToast({
          title: "请选择产品规格",
          icon:"none",
          duration: 1500
        });
      }
    },
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },
    //返回顶部
    Top(){
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 200
      });
    },
    changeBanner(e){
      this.bannerindex=e.detail.current;
    },
    async ProductInfo(){
      let res=await post("Goods/ProductInfo",{
        userId: this.userId,
        token: this.token,
        ShopId:this.shopid,
        proId: this.proId
      })
      if(res.code==0){
        this.proInfo=res.data;
        this.BannerNum=res.data.ProductImgList.length;
        this.IsCollect=res.data.IsCollectionPro;
        this.specList = JSON.parse(res.data.SpecificationValue);
        this.reStock=res.data.Stock;
        this.maxbuy=res.data.MaxBuyNum;//最大购买量
        this.minbuy=res.data.MinBuyNum; //最小购买量
        this.percentage=res.data.SalesVolume/res.data.Stock*100;
        if(!res.data.ProductSpecList.length){
          this.isMatch=true;
        }
        if(this.proInfo.CouponList.length){
          this.proInfo.CouponList.forEach(item=>{
            item.EndTime=item.EndTime.split("T")[0];
          })
        }
        if(this.isLimint==1){
          //比较秒杀是否开始
					let dateBegin = new Date(this.proInfo.FlashSaleStartTime.replace(/T/g, " "));
					let dateNow = new Date(); //获取当前时间
					let beginDiff = dateNow.getTime() - dateBegin.getTime(); //时间差的毫秒数 
          var beginDayDiff = Math.floor(beginDiff / (24 * 3600 * 1000)); //计算出相差天数  
					if(beginDayDiff < 0){
						this.starTimetype=0;
						this.GetRTime(this.proInfo.FlashSaleStartTime);
					}else{
						this.starTimetype=1;
						this.GetRTime(this.proInfo.FlashSaleEndTime);
					}
					let StartTimestr=this.proInfo.FlashSaleStartTime.split("T")[1].substr(0,5);
					this.proInfo.FlashSaleStartTime=StartTimestr;
        }
        
      }
    },
    //倒计时
    GetRTime(endTime) {
      let _this = this;
      //倒计时
      let endtime=endTime.replace(/-/g, '/').replace(/T/g, ' ');
      let EndTime = new Date(endtime); //结束时间
      this.timer = setInterval(function() {
      let NowTime = new Date(); //当前时间
      let t = EndTime.getTime() - NowTime.getTime();
      if (t > 0) {
        let d = Math.floor(t / 1000 / 60 / 60 / 24); //天
        let h = Math.floor((t / 1000 / 60 / 60) % 24); //时
        let m = Math.floor((t / 1000 / 60) % 60); //分
        let s = Math.floor((t / 1000) % 60); //秒
        if (parseInt(d) < 1) {
        d = "";
        } else {
        d = d + "天";
        }
        if (parseInt(h) < 10) {
        h = "0" + h;
        }
        if (parseInt(m) < 10) {
        m = "0" + m;
        }
        if (parseInt(s) < 10) {
        s = "0" + s;
        }
        _this.timeStr = [d,h,m,s];
      } else {
        this.starTimetype=2;
        clearInterval(this.timer);
      }
      }, 1000);
    },
    //获取购物车数
    async GetAllCartNumber(){
      let res=await post("Cart/GetAllCartNumber",{
        userId: this.userId,
        token: this.token,
        ShopId:this.shopid
      })
      if(res.code==0){
        this.CartNumber=res.data.AllNumber;
      }
    },
    //添加取消收藏
			async collect(){
				let res = await post("Goods/ProductCollection", {
					proId: this.proId,
					userId:this.userId,
					token:this.token
				  });
				if(res.code==0){
					if(this.IsCollect){
						wx.showToast({
							title: "已取消收藏！",
							icon:"none",
							duration: 1500
						});
						this.IsCollect=false;
					}else{
						wx.showToast({
							title: "添加收藏成功！",
							icon:"none",
							duration: 1500
						});
						this.IsCollect=true;
					}
				};
			},
  },
  onPageScroll(e){
    if(e.scrollTop>300){
      this.isTop=true;
    }else{
      this.isTop=false;
    }
  },
}
</script>

<style scoped lang='scss'>
.pin{
  background-color: #fff;
  margin-top: 20rpx;
  .tit{
    height: 90rpx;
    border-bottom: 1rpx solid #ededed;
    font-size: 32rpx;
	  font-weight: bold;
    padding: 0 30rpx
  }
  .list{
    height: 142rpx;
    border-bottom: 1rpx solid #ededed;
    padding: 0 30rpx;
    .right{
      width: 144rpx;
      height: 49rpx;
      background-color: #ff3333;
      border-radius: 24rpx;
      font-size: 24rpx;
      color: #fff
    }
    img{
      width: 72rpx;
	    height: 73rpx;
      border-radius: 50%;
      margin-right: 20rpx
    }
    .left{
      p{
        font-size: 24rpx;
        color: #666666;
        span{
          color: #ff3333;
        }
      }
    }
  }
}
.play{
  background-color: #fff;
  padding: 0 30rpx;
  margin-top: 20rpx;
  .img{
    img{
      width: 690rpx;
      height: 190rpx;
      margin: 10rpx 0
    }
  }
  .tit{
    height: 88rpx;
    img{
      width: 12rpx;
	    height: 20rpx;
      margin-left: 20rpx
    }
    p{
      font-size: 32rpx;
	    font-weight: bold;
    }
    span{
      color: #999999;
    }

  }
}
.foot{
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 98rpx;
  box-sizing: border-box;
  padding: 0 30rpx 0 0;
  box-shadow: 0 -3rpx 8rpx 0rpx rgba($color: #000000, $alpha: 0.1);
  .left div:nth-child(1) img{
    width: 34rpx;
	  height: 34rpx;
  }
  .left div:nth-child(2) img{
    width: 32rpx;
	  height: 32rpx;
  }
  .left div:nth-child(3) img{
    width: 34rpx;
	  height: 32rpx;
  }
  .right{
    width: 400rpx;
    height: 70rpx;
    border-radius: 35rpx;
    color: #fff;
    font-size: 26rpx;
	  font-weight: bold;
    overflow: hidden;
  }
  .right p:nth-child(1){
    background-color: #fda33a
  }
  .right p:nth-child(2){
    background-color: #ff3333
  }
  .right p.dis{
    opacity: .5;
  }
  .left{
    div{
      width: 105rpx;
      text-align: center;
      font-size: 22rpx;
      color: #999;
      position: relative;
    }
    span{
      position: absolute;
      width: 26rpx;
      height: 26rpx;
      border-radius: 50%;
      background-color: #fa3d34;
      color: #fff;
      font-size: 20rpx;
      top: -10rpx;
      right: 23rpx
    }
  }
}
.goods-detail{
  background-color: #fff;
  margin-top: 20rpx;
  .tit{
    padding: 0 30rpx;
    line-height: 90rpx;
    font-size: 32rpx;
	  font-weight: bold;
  }
  .detail-box{
    image{
      max-width:100%!important
    }
  }
}
.comment{
  background-color: #fff;
  margin-top: 20rpx;
  .commentlist{
    padding: 0 30rpx;
    .time{
      font-size: 26rpx;
      color: #999999;
      line-height: 80rpx;
    }
    .detail{
      color: #212121;
    }
    .name{
      font-size: 30rpx;
      font-weight: bold;
      height: 114rpx;
      .left{
        width: 68rpx;
        height: 68rpx;
        border-radius: 50%;
        margin-right: 20rpx;
        background: #eee;
      }
      .right{
        width: 24rpx;
        height: 24rpx;
        margin-left: 10rpx;
      }
    }
  }
  .tit{
    padding: 0 30rpx;
    border-bottom: 1rpx solid #ededed;
    height: 90rpx;
    .left{
      font-size: 32rpx;
      font-weight: bold;
      span{
        font-size: 22rpx;
        color: #999999;
      }
    }
    .right{
      color: #ff3333;
      font-size: 24rpx;
      img{
        width: 12rpx;
        height: 20rpx;
        margin-left: 10rpx;
      }
    }
  }
}
.list-box{
  margin-top: 20rpx;
  background-color: #fff;
  .list{
    height:100rpx;
    box-sizing: border-box;
    padding: 0 30rpx;
    border-bottom: 1rpx solid #ededed;
    .left{
      span{
        font-size: 30rpx;
        color: #999999;
        margin-right: 46rpx;
      }
      img{
        width: 31rpx;
        height: 31rpx;
        margin-right: 11rpx
      }
      p{
        margin-right: 46rpx;
      }
    }
    .right{
      img{
        width: 12rpx;
        height: 20rpx;
        margin-left: 23rpx;
      }
      span{
        color: #999999;
      }
    }
  }
}
.top{
  background-color: #fff;
  padding: 0 30rpx 20rpx;
  .right{
    text-align: right;
    img{
      width: 88rpx;
	    height: 88rpx;
    }
    p{
      margin-top: 15rpx; 
      font-size: 26rpx;
      color: #999
    }
  }
  .left{
    width: 500rpx;
    .price span:nth-child(1){
      color: #fb4f45;
      font-size: 30rpx;
      font-weight: 900
    }
    .price span:nth-child(2){
      color: #fb4f45;
      font-size: 44rpx;
      font-weight: 900
    }
    .price span:nth-child(3){
      color: #999;
      font-size: 22rpx;
      margin-left: 15rpx;
      text-decoration:line-through
    }
    .tit{
      font-size: 36rpx;
      font-weight: bold;
      margin: 5rpx 0 10rpx;
    }
  }
  .txtinfo{
    font-size: 26rpx;
    color: #999
  }
  .limitTiem{
    background: #ff3333;
    color: #fff;
    margin: 0 -30rpx;
    padding: 20rpx 30rpx;
    .limt-left{
      .active-price{
        h3{ font-size: 40rpx; margin-right: 10rpx;
          span{ font-size: 28rpx !important}
        }
        p{text-decoration: line-through}
      } 
      .percentage{
          width:210rpx;
          height:24rpx;
          line-height:24rpx;
          font-size:24rpx;
          background:#ff747a;
          border-radius:20rpx;
          text-align:center;
          position:relative;
          overflow: hidden;
          span{
            position:absolute;
            top:0;
            left:0;
            height:100%;
            border-radius:20rpx;
            background:#ffaa01;
            display:block;
            i{ display: inline-block;width: 220rpx}
          }
        }
    }
    .limt-right .txt{ font-size: 40rpx; font-weight: bold;text-align: right;}
    .countDown span{
      background: #fff; color: #ff3333; border-radius: 4rpx; margin: 0 6rpx; padding: 0 4rpx;
    }
  }
}
.swiper{
  height: 700rpx;
  position: relative;
  .numpage{
    position: absolute;
    right: 20rpx; 
    bottom: 20rpx;
    padding: 0 10rpx;
    color: #fff;
    font-size: 24rpx;
    background: rgba(0,0,0,.4); 
    border-radius: 100px;
    z-index: 2;
  }
  img{
    width: 100%;
    height: 100%;
  }
}
.couponico {
  margin: 10rpx 0 4rpx;
   .coupontxt {
    line-height: 1;
    padding: 6rpx 16rpx;
    color: #f63517;
    font-size: 26rpx;
    border: 1px solid #f63517;
    margin-right: 20rpx;
    border-radius: 4px;
    position: relative;
  }
  .coupontxt:before,.coupontxt:after {
    display: block;
    content: "";
    position: absolute;
    height: 16rpx;
    width: 16rpx;
    border-top: 1px solid #f63517;
    border-right: 1px solid #f63517;
    top: 50%;
    margin-top: -8rpx;
    background: #fff;
    border-radius: 50%;
    box-sizing: border-box;
  }
  .coupontxt:before {
    left: -8rpx;
    transform: rotate(45deg);
  }
  .coupontxt:after {
    right: -8rpx;
    transform: rotate(-135deg);
  }
}
.main{
    position: fixed;
    bottom: -950rpx;
    transition: all 0.3s;
    width: 100vw;
    // height: 900rpx;
    z-index: 99;
    background-color: #fff;
    border-radius: 20rpx;
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
          background-color:#f9eeec;
          color: #f0370b;
          border: 1rpx solid #f0370b;
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
        p{
            background-color: #fda33a;
        }
        p.btn_red{
            background-color: #ff3333;
        }
        p.btn_ccc{ background-color: #ccc}
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
