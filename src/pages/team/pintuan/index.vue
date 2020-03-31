<template>
  <div>
      <div class="pin-box">
        <div class="goods ali-c">
          <img :src="data.GroupImage" alt="" @click="goUrl('team/teamDetail')">
          <div>
            <p class="flexc status">{{data.GroupStatusStr}}</p>
            <p class="tit oneline">{{data.GroupTitle}}</p>
            <p class="price">
              <span>￥</span>
              <span>{{data.FightingPrice}}</span>
              <span>￥{{data.OriginalPrice}}</span>
            </p>
          </div>
        </div>
        <div class="tuan">
          <p class="one">还差{{data.RemainingNum}}人即可成团</p>
          <p class="two flexc" v-if="timeEnd">剩余<span>{{timeEnd}}</span>结束</p>
          <p class="two flexc" v-else><span>已结束</span></p>
          <div class="flexc thr">
            <div v-for="(item, index) in data.MemberList" :key="index">
              <img  :src="item.MemberAvatar||'http://jd.wtvxin.com/images/images/index/defute.png'" alt="">
            </div>
            <div v-for="(item, index) in data.RemainingNum" :key="index">
              <img src="http://jd.wtvxin.com/images/images/index/defute.png" alt="">
            </div>
          </div>
          <button class="fou flexc" open-type="share">邀请好友参团</button>
          <p class="fiv">请尽快成团，否则就被抢光了哦！</p>
        </div>
      </div>
      <div class="rule ali-c jus-b">
        <span>拼团规则</span>
        <div class="ali-c" @click="showRule=true">
          <p>好友拼团 人满发货 人不满退款</p>
          <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="">
        </div>
      </div>
      <!-- 拼团规则 -->
      <div class="rules" v-if="showRule">
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
import {switchPath,post,editTime,get_time_diff} from '@/utils'
export default {

  data () {
    return {
      isJump:false,//是否已点击了跳转
      options:{
        GroupId:'',
        GroupRecordId:'',
      },
      data:{},
      showRule:false,//拼团规则
      rule:[
      ],//规则内容
      timeEnd:'',//时间倒计时
      interval:null,//倒计时函数
    }
  },
  onLoad(options){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.options = options;
    this.showRule= false;
    this.timeEnd='';
    this.getData();
	  this.onRule();
  },
  onShow(){
    
  },
  methods: {
    async getData(){
      const res = await post('GroupBuy/GroupMemberInfo',{
        UserId: this.userId,
        Token: this.token,
        GroupId:this.options.GroupId,
        GroupRecordId:this.options.GroupRecordId
      });
      this.data = res.data;
      this.timeEnds();
    },
    timeEnds(){
      const timeend = new Date(editTime(this.data.EndTime,'s')).getTime();
      const diff = timeend - new Date().getTime();
      // 小于0，已过时间
      if(diff<0){ 
        this.timeEnd ='';
        return;
      }
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
      let timeText = '';
      clearInterval(this.interval);
      this.interval = setInterval(()=>{
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
        timeText+=this.formatNumber(s);
        this.timeEnd =timeText;
        timeText = '';
      },1000) 
    },
    // 时间格式化工具
    formatNumber(n) {
      const str = n.toString()
      return str[1] ? str : `0${str}`
    },
    goUrl(url){
      if(this.isJump) return;
      setTimeout(() => {
        wx.navigateTo({
          url:`/pages/${url}/main?id=${this.options.GroupId}&GroupRecordId=${this.options.GroupRecordId}`
        })
        this.isJump = false
      }, 100);
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
  onShareAppMessage: function() {
    return {
      title: this.data.GroupTitle, //转发页面的标题
      imageUrl:this.data.GroupImage,
      path: `/pages/team/teamDetail/main?id=${this.options.GroupId}&GroupRecordId=${this.options.GroupRecordId}`
    }
  }
}
</script>

<style scoped lang='scss'>
.rule{
  width: 690rpx;
	height: 88rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
  margin: 20rpx auto;
  padding: 0 20rpx;
  img{
    width: 14rpx;
	  height: 24rpx;
    margin-left: 10rpx;
  }
  span{
    font-weight: 900
  }
}
.pin-box{
  background-color: #fff;
  width: 690rpx;
  margin: 30rpx;
  padding: 20rpx;
  border-radius: 15rpx;
  .tuan{
    padding: 40rpx 0;
    text-align: center;
    .one{
      font-size: 32rpx;
      color: #202020;
    }
    .two{
      font-size: 24rpx;
      color: #999999;
      margin: 20rpx 0 30rpx;
      span{
        // width: 140rpx;
        padding:0 15rpx;
        height: 41rpx;
        background-color: #ff3333;
        border-radius: 4rpx;
        color: #fff;
        margin: 0 10rpx;
      }
    }
    .thr{
      div{
        margin: 0 10rpx;
      }
      img{
        width: 104rpx;
	      height: 104rpx;
        border-radius: 50%;
      }
    }
    .fou{
      width: 630rpx;
      height: 81rpx;
      background-color: #ff3333;
      border-radius: 8rpx;
      color: #ffffff;
      margin: 40rpx 0 20rpx;
    }
    .fiv{
      font-size: 20rpx;
      color: #999
    }
  }
  .goods{
    height: 261rpx;
    border-bottom: 1rpx solid #ededed;
    img{
      width: 200rpx;
      height: 200rpx;
      border-radius: 10rpx;
      margin-right: 30rpx;
    }
    .status{
      width: 144rpx;
      height: 36rpx;
      background-color: #ff3333;
      border-radius: 4rpx;
      font-size: 24rpx;
      color: #fff;
    }
    .tit{
      font-weight: bold;
      margin: 20rpx 0 50rpx;
    }
    .price span:nth-child(1){
      color: #ff3333;
      font-size: 20rpx;
      font-weight: 900
    }
    .price span:nth-child(2){
      color: #ff3333;
      font-size: 36rpx;
      font-weight: 900
    }
    .price span:nth-child(3){
      color: #999;
      font-size: 24rpx;
      text-decoration: line-through;
      margin-left: 20rpx;
    }
  }
}
// 拼团规则
.rules{
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
