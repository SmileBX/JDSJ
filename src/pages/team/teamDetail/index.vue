<template>
  <div>
      <swiper class="swiper" @change="changeBanner">
        <div class="numpage">{{bannerindex+1}}/{{BannerNum}}</div>
        <swiper-item class="flexc" v-for="(item,index) in proInfo.ProductImgList" :key="index">
          <img mode='aspectFill' :src="item.PicUrl" alt="">
        </swiper-item>
      </swiper>    
      <div class="top">
        <div  class="limitTiem jus-b ali-c">
            <div class="limt-left">
                  <h3><span>¥</span>{{proInfo.FightingPrice}}</h3>
                  <p>¥{{proInfo.OriginalPrice}}</p>
                  <!-- <div class="percentage">赚{{proInfo.SalesVolume}}</div> -->
            </div>
            <div class="limt-right">
              <div class="txt">{{proInfo.MinPeopleNum}}人团</div>
              <div class="timetxt">已拼{{proInfo.SuccessGroup}}件</div>
            </div>
        </div>
        <div class="proName">
          <div class="proTitle">
              <div class="tit">{{proInfo.GroupProductName}}</div>
              <!-- 分享按钮 -->
              <div class="shareBtn">
                <button  open-type='share' class="sharebutton">
                  <img src="http://jd.wtvxin.com/images/images/index/fenxiang.png" alt="">
                </button>
              </div>
          </div>
          <div class="jus-b ali-c">
            <span class="txtinfo">已售{{proInfo.SuccessGroup}}</span>
            <span class="txtinfo">{{proInfo.ShopAddress}}</span>
          </div>
        </div>
      </div>
      <div class="list-box">
        <!-- <div class="list ali-c jus-b" v-if="proInfo.Score!=0||(proInfo.CouponList.length&&proInfo.IsUseCoupons)" @click="openCoupon">
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
        </div> -->
        <div class="list ali-c jus-b"  @click="showSku(0)" v-if="false">
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
      <div class="play">
        <div class="tit ali-c jus-b">
          <p>拼团玩法</p>
          <div class="ali-c" @click="showRule=true">
            <span>详细规则</span>
            <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="">
          </div>
        </div>
        <div class="flexc img">
          <img src="http://jd.wtvxin.com/images/images/index/play.png" alt="">
        </div>
      </div>
      <div class="pin" v-if="groupingList.length>0">
        <div class="tit ali-c">
          <h3>他们都在拼，可直接参团</h3> 
          <p @click="showGruopingList = true">查看更多参团</p>
        </div>
        <div class="list ali-c jus-b" v-for="(item,index) in groupingList" :key="index" 
          v-show="index<2&&item.RemainingNum>0"
          >
          <div class="left ali-c">
            <img :src="item.MemberHeadImg" alt="">
            <div>
              <span>{{item.MemberHeadNick}}</span>
              <p>还差{{item.RemainingNum}}人成团，剩余<span>{{item.timeEnd}}</span>结束</p>
            </div>
          </div>
          <p class="flexc right" @click="submit(item.Id)">去参团</p>
        </div>
      </div>
      <!-- 参团列表 -->
      <div class="groupingBox" v-if="showGruopingList">
        <div class="masks" @click="showGruopingList=false"></div>
        <div class="box">
          <div class="list ali-c jus-b" v-for="(item,index) in groupingList" :key="index" v-show="item.RemainingNum>0">
            <div class="left ali-c">
              <img :src="item.MemberHeadImg" alt="">
              <div>
                <span>{{item.MemberHeadNick}}</span>
                <p>还差{{item.RemainingNum}}人成团，剩余<span>{{item.timeEnd}}</span>结束</p>
              </div>
            </div>
            <p class="flexc right" @click="submit(item.Id)">去参团</p>
          </div>
        </div>
      </div>
      <!-- 参团列表end -->
      <div class="comment">
        <div class="tit ali-c jus-b">
          <p class="left">商品评价<span>({{proInfo.EvaluateCount}})</span></p>
          <div class="right" v-if="proInfo.EvaluateCount>0" @click="goUrl('/pages/goodsSon/allcomment/main',proInfo.ProductId)">
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
              <div class="imgList">
                <img :src="PicItem" alt="" 
                  v-for="(PicItem,PricIndex) in item.Pic" :key="PricIndex" 
                  v-show="PricIndex<4" @click="onPreviewImg(item.Pic,PricIndex)"
                  >
              </div>
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
      <!-- 店铺 -->
      <!-- <div class="shopInfoBox">
        <div class="left">
          <img :src="proInfo.ShopLogo" alt="">
          <div class="shopName">
            <p>{{proInfo.ShopName}}</p>
            <div class="star">
              综合体验
              <img v-for="item in proInfo.ServiceScore" :key="item" 
              src="/static/star1.png" alt="">
              <img v-for="item in 5-proInfo.ServiceScore" :key="item" 
              src="/static/star2.png" alt="">
            </div>
          </div>
        </div>
        <div class="right">进店逛逛</div>
      </div> -->

      <div class="goods-detail">
        <p class="tit">商品详情</p>
        <div class="detail-box">
          <div v-html="proInfo.GroupContentDetail"></div>
          <div v-if="proInfo.GroupContentDetail==''" style="text-align: center;">卖家暂时还没有为该商品提供详细信息！</div>
        </div>
      </div>
      <div style="height: 100rpx;"></div>

      <div class="foot ali-c jus-b">
        <div class="left" @click="gouBuy">
          <p>￥{{proInfo.OriginalPrice}}</p>
          <span>单独购买</span>
        </div>
        <div class="right" @click="playGroup">
          <p>￥{{proInfo.FightingPrice}}</p>
          <span>{{proInfo.MinPeopleNum}}人团</span>
        </div>
      </div>
      <div class="topbtn" @click="Top" v-if="isTop"></div>
      <!-- <div v-if="showPopupSku" @click="hidePopup" class="mengban"></div>
        <div class="main" id="main" :style="mainHeight" :class="showPopupSku?'show':''">
            <div class="top-box">
                <div class="one jus-b">
                    <div class="img-box jus-c ali-c">
                        <img :src="SpecInfo.SpecImage||(proInfo.ProductImgList&&proInfo.ProductImgList[0].PicUrl)" alt="">
                    </div>
                    <div class="right jus-b">
                        <div>
                            <p class="tit">{{proInfo.ProductName}}</p>
                            <span ><span class="fuhao">￥</span>{{!SpecInfo.PunitPrice?proInfo.FightingPrice:SpecInfo.PunitPrice}}</span>
                            <p class="font_four">库存：{{reStock}}</p>
                        </div>
                        <span @click="hidePopup" class="chacha">+</span>
                    </div>
                </div>
                <div class="guige" v-for="(item, index) in specList" :key="index">
                    <p>{{index}}</p>
                    <div class="flex-wrap">
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
              <block >
                <block v-if="reStock>0">
                  <block v-if="showbtntype==0">
                    <p class="flex1 jus-c ali-c" @click="gocart">单独购买</p>
                    <p class="flex1 jus-c ali-c btn_red" @click="gouBuy">立即开团</p>
                  </block>
                  <p v-else class="flex1 jus-c ali-c btn_red" @click="confirmBtn">确定</p>
                </block>
                <p v-else class="flex1 jus-c ali-c">商家补货中</p>
              </block>
            </div>
		</div> -->
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
      <!-- 拼团规则 -->
      <div class="rule" v-if="showRule">
        <div class="ruleMask" @click="showRule=false"></div>
          <div class="mains">
            <div class="content">
              <h3>拼团活动规则</h3>
              <div v-for="(item,index) in rule" :key="index">
                <h4>{{item.tit}}</h4>
                <p v-for="(valItem,valIndex) in item.val" :key="valIndex">{{valItem}}</p>
              </div>
            </div>
            <div class="close" @click="showRule=false">×</div>
          </div>
      </div>
  </div>
</template>

<script>
import {post,get,previewImg,editTime} from '@/utils'
import uniPopup from '@/components/uni-popup.vue';
export default {
  components: {
    uniPopup
  },
  data () {
    return {
      userId: "",
      token: "",
      teamId:"",
      GroupRecordId:'',
      groupingList:[],//参团列表
      showGruopingList:false,//显示参团列表
      isTop:false,//是否显示置顶
      timeStr:[],//倒计时
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
      // showCoupon:false,//是否显示优惠券弹窗
      reStock:0,//库存
      maxbuy:0,//最大购买量
      minbuy:1, //最小购买量
      showRule:false,//拼团规则
      rule:[],//规则内容
    }
  },
  onLoad(optins){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.teamId=this.$root.$mp.query.id;
    this.GroupRecordId=this.$root.$mp.query.GroupRecordId||'';
    this.ProductInfo();
    this.getGroupingList();
    this.goodsNum = 1;
    this.specList=[];
    this.SpecText="";
    this.SpecValue={};
    this.SpecInfo={};
    this.showPopupSku = false;
    this.isMatch=false;
    this.timeStr=[];
    this.groupingList=[];
    this.showGruopingList = false;
	 this.showRule = false;
	 this.onRule();
	// this.quety();//   设置sku框的高度
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
  },
  watch:{
    goodsNum(e){
      if(e<1){
        this.goodsNum = 1
      }
    },
  },
  methods: {
	//   设置sku框的高度
	//   quety(){
	// 	setTimeout(() => {
	// 		var query = wx.createSelectorQuery();
	// 		query.select("#main").boundingClientRect((rect)=> {
	// 			console.log(rect)
	// 		this.seachHeight = rect.height*2
	// 		this.mainHeight = 'height:'+this.seachHeight+'rpx;bottom:'+(-this.seachHeight-50)+'rpx'
	// 		console.log('gaodu',rect.height)
	// 		}).exec();
	// 	}, 200);
	//   },
    // 获取产品信息
    async ProductInfo(){
      let res=await post("GroupBuy/GroupProductInfo",{
        userId: this.userId,
        token: this.token,
        GroupId: this.teamId
      })
      const data = res.data;
      this.proInfo=res.data;

      this.BannerNum=res.data.ProductImgList.length;
      this.specList = JSON.parse(res.data.SpecificationValue);
      this.reStock=res.data.Stock;
      this.maxbuy=res.data.MaxBuyNum;//最大购买量
      this.minbuy=res.data.MinBuyNum; //最小购买量
      if(!res.data.ProductSpecList.length){
        this.isMatch=true;
      }
      // 评价
      if(data.EvaluateList.length>0){
        data.EvaluateList.map(item=>{
          item.Pic = item.EvaluateImgList.split(',');
        })
      }
      // 优惠券列表
      // if(this.proInfo.CouponList.length){
      //   this.proInfo.CouponList.forEach(item=>{
      //     item.EndTime=item.EndTime.split("T")[0];
      //   })
      // }
    },
    // 团购中的列表
    async getGroupingList(){
      const res = await post('GroupBuy/GetGroupRecordList',{
        GroupId:this.teamId,
        GroupRecordId:this.GroupRecordId,
        userId: this.userId,
        token: this.token,
        TopNum:7
      });
      const data = res.data;
      data.map(item=>{
          const timeend = new Date(editTime(item.EndTime,'s')).getTime();
          const diff = timeend - new Date().getTime();
          console.log(timeend,'---',new Date().getTime())
          item.timeEnd='';
          //每天毫秒数
          const nd = 1000 * 24 * 60 * 60;
          //每小时毫秒数
          const nh = 1000 * 60 * 60;
          //每分钟毫秒数
          const nm = 1000 * 60;
          // 秒数
          const ns = 1000;
          // 天
          let d= parseInt(diff / nd);
          // 时
          let h = parseInt(diff % nd / nh);
          // 分
          let m = parseInt(diff % nd % nh / nm);
          // 秒
          let s = parseInt(diff % nd % nh % nm /ns);
          console.log(d,h,m,s)
          let timeText = '';
          clearInterval(item.interval);
          item.interval = setInterval(()=>{
            if(s<1&&m>0){
              m-=1;
              s=60;
              if(m<1&&h>0){
                h-=1;
                m=59;
                if(h<1&&d>0){
                  d-=1;
                  h=23;
                }
              }
            }
            s-=1;
            if(d){
              timeText+=d+'天 '
            }
            if(h){
              timeText+=this.formatNumber(h)+':'
            }
            if(m){
              timeText+=this.formatNumber(m)+':'
            }
            timeText+=this.formatNumber(s)
            item.timeEnd =timeText;
            timeText = '';
          },1000);
      })
      this.groupingList = data;
      console.log(data);
      
    },
	//点击选择规格标签--name:规格名称 value:所选规格值
    cliTag(name,value){
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
    // confirmBtn(){
    //   if(this.showbtntype==1){
    //     this.gocart();
    //   }else if(this.showbtntype==2){
    //     this.gouBuy();
    //   }
    // },
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
    // 单独购买
    gouBuy(){
      wx.navigateTo({
        url:'/pages/goodsSon/goodsDetail/main?id='+this.proInfo.ProductId
      })
    },
    //立即开团
    playGroup(){
		this.submit();
		// ,后台没有做sku，先隐藏，如果后台要的话，再开
		// 有sku
      // if(this.proInfo.ProductSpecList&&this.proInfo.ProductSpecList.length>0){
      //   if(this.isMatch){
      //   		this.submit();
      //   }else{
      //     wx.showToast({
      //       title: "请选择产品规格",
      //       icon:"none",
      //       duration: 1500
      //     });
      //   }
      // }
      // // 没有sku
      // else{
      //   this.submit();
      // }
    },
    // 提交订单
    submit(groupRecordId){
      this.checkSubmit().then(res=>{
        console.log('123',{
          GroupId:this.teamId,
          ShopId:this.proInfo.ShopId,
          Number: this.goodsNum,
          GroupRecordId: groupRecordId
        })
        wx.setStorageSync('groupSubmit',{
          GroupId:this.teamId,
          ShopId:this.proInfo.ShopId,
          Number: this.goodsNum,
          GroupRecordId: groupRecordId||''
        })
        this.showGruopingList = false;
        wx.navigateTo({
				url: `/pages/team/confirmOrder/main`
        })
      })
    },
    // 检测是否可提交
    checkSubmit(){
      return new Promise((resolve,reject)=>{
        post('GroupBuy/VerificationIsJoin',{
          UserId: this.userId,
          Token: this.token,
          GroupId: this.teamId,
          ShopId: this.proInfo.ShopId,
          Number: this.goodsNum,
          GroupRecordId: ''
        }).then(()=>{
          resolve(true)
        })
      }) 
   },
  //  查看评价图片
  onPreviewImg(arr,index){
    previewImg(arr,index);
  },
  // 时间格式化工具
  formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
  },
	//  规则数据
	 onRule(){
		 this.rule=[{
        tit:'更新时间:',
        val:['不定期更新，限量放送,售完即止']
      },{
        tit:'购买须知:',
        val:['1.在拼团商品活动页面中选择商品，点击购买进入支付页',
        '2.在5分钟内完成支付，否则订单自动取消',
        '3.开团成功后，可将拼团信息分享给好友，指定时间内邀请到成团人数的好友享拼团价,即为拼团成功;否则，系统自动退款'
        ]
      },{
        tit:'活动说明:',
        val:[
          '1.拼团商品不与网站其它优惠福利同享',
          '2.拼团商品不可使用优惠券',
          '3.同一登录账号、同一手机号、同一终端设备号、同一支付账户、同一收货地址等合理显示为同一用户的情形，均视为同一用户',
          '4.通过不正当手段参与拼团活动，集店有权撤销相关订单'
          ]
      }]
	 }
  },
  onPageScroll(e){
    if(e.scrollTop>300){
      this.isTop=true;
    }else{
      this.isTop=false;
    }
  },
  onShareAppMessage: function() {
    return {
      title: this.proInfo.GroupProductName, //转发页面的标题
      imageUrl:this.proInfo.ProductImgList[0].PicUrl,
      path: '/pages/team/teamDetail/main?id='+this.teamId
    }
  }
}
</script>

<style scoped lang='scss'>
.shareBtn{
  width:80rpx;
  height:80rpx;
  overflow:hidden;
  .sharebutton{
    padding: 0;
    background: #fff!important;
    img{
      width:80rpx;
      height:80rpx;
    }
  }
  .sharebutton::after{
    border: none!important;
  }
}
.pin{
  background-color: #fff;
  margin-top: 20rpx;
  .tit{
    height: 90rpx;
    border-bottom: 1rpx solid #ededed;
    padding: 0 30rpx;
    display:flex;
    align-items:center;
    justify-content:space-between;
    h3{
      font-size: 32rpx;
      font-weight: bold;
    }
    p{
      color:#999;
    }
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
      background-color: #eee;
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
.groupingBox{
  position:fixed;
  z-index:99;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
  .masks{
    background:rgba(0, 0, 0, 0.5);
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    z-index:100;
  }
  .box{
    position:relative;
    z-index:101;
    background:#fff;
    width:90%;
    border-radius:20rpx;
    padding:20rpx 0;
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
      background-color: #eee;
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
    &:last-child{
      border-bottom:none;
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
      height: 165rpx;
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
  box-shadow: 0 -3rpx 8rpx 0rpx rgba($color: #000000, $alpha: 0.1);
  div{
    width:50%;
    text-align:center;
    font-size:30rpx;
    height: 98rpx;
    padding:15rpx 0;
    p{
      line-height:1;
    }
    span{
      font-size:22rpx;
    }
  }
  .left{
    color:#ff3333;
  }
  .right{
    background:#ff3333;
    color:#fff;
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
    .imgList{
      display:flex;
      align-items:center;
      margin-right:-16rpx;
      margin-top:20rpx;
      img{
        width:160rpx;
        height:160rpx;
        margin-right:15rpx;
        border-radius:5rpx;
      }
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
  .txtinfo{
    font-size: 26rpx;
    color: #999
  }
  .limitTiem{
    background: #ff3333;
    color: #fff;
    padding: 15rpx 30rpx;
    .limt-left{
      display:flex;
      align-items:flex-end;
      h3{ font-size: 40rpx;
        span{ font-size: 28rpx !important}
      }
      p{
        text-decoration: line-through;
        line-height:50rpx;
        margin:0 15rpx;
      }
      .percentage{
          height:28rpx;
          line-height:28rpx;
          font-size:20rpx;
          padding:0 10rpx;
          margin-bottom:11rpx;
          background:#ffaa01;
          border-radius:20rpx;
        }
    }
    .limt-right{
      color: #fff; 
      text-align:right;
     .txt{ 
      font-size: 20rpx; 
      text-align: text;
      border-radius:20rpx;
      padding:0 20rpx;
      background:rgba(114, 114, 114, 0.4);
      display:inline-block;
      }
      .timetxt{
        font-size: 25rpx; 
      }
    }
  }
  .proName{
    padding:15rpx 30rpx;
    .proTitle{
      display:flex;
      align-items:center;
      justify-content:space-between;
    }
    .tit{
      font-size:40rpx;
    }
    .jus-b{
      margin-top:10rpx;
      span{
        font-size:24rpx;
      }
    }
  }
}
.shopInfoBox{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:30rpx;
  background:#fff;
  margin-top: 20rpx;
  .left{
    display:flex;
    align-items:center;
    &>img{
      width:88rpx;
      height:88rpx;
    }
    .shopName{
      margin-left:15rpx;
      p{
        font-size:28rpx;
      }
      .star{
        display:flex;
        align-items:center;
        background:#ccc;
        border-radius:15rpx;
        padding:0 15rpx;
        font-size:20rpx;
        color:#fff;
        margin-top:5rpx;
        line-height:30rpx;
        img{
          margin-left:5rpx;
          width:20rpx;
          height:20rpx;
        }
      }
    }
  }
  .right{
    border:1rpx #f75f5f solid;
    border-radius:30rpx;
    color:#ff3333;
    padding:0 20rpx;
    line-height:52rpx;

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
// sku弹窗
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
                    color: #333;
                    padding: 0 30rpx;
                }
                input{
                   width: 80rpx;
                    height: 44rpx;
                    background-color: #eeeeee;
                    border-radius: 8rpx; 
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
// 拼团规则
.rule{
  position:fixed;
  top:0;
  left:0;
  display:flex;
  width:100%;
  height:100vh;
  align-items:center;
  justify-content:center;
  .ruleMask{
    width:100%;
    height:100vh;
    background:rgba(0,0,0,.4);
    position:absolute;
    top:0;
    left:0;
    z-index:100;
  }
  .mains{
    position:relative;
    z-index:101;
    width:80%;
    .content{
      padding:40rpx;
      background:#fff;
      border-radius:15rpx;
      font-size:26rpx;
      h3{
        font-size:32rpx;
        text-align:center;
      }
      h4{
        line-height:2;
      }
      p{
        color:#999;
      }
    }
    .close{
      color:#fff;
      border:1rpx solid #fff;
      border-radius:50%;
      width:60rpx;
      height:60rpx;
      line-height:55rpx;
      font-size:50rpx;
      text-align:center;
      margin:50rpx auto 0;
    }
  }
}
</style>
