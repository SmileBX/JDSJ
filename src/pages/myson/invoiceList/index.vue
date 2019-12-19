<template>
  <div class="pageContent">
    <div class="headnav">
      <div @click="navIndex=0"><span :class="{'active':navIndex===0}">发票抬头</span></div>
      <div @click="navIndex=1"><span :class="{'active':navIndex===1}">开具发票</span></div>
    </div>
    <div class="invoiceList" v-if="list.length>0&&navIndex===0" style="margin-top:20rpx">
      <div class="item" v-for="(item,index) in list" :key="index" @tap="choseInvoice(index)">
        <div class="item__bd">
          <div class="remarks">
            <text class="name">抬头名称：{{item.HeaderName}}</text>
          </div>
          <div class="type">类型：{{item.InvoiceTitlestr}}</div>
          <div class="type" v-if="item.InvoiceTitle===2">税号：{{item.TaxNumber}}</div>
        </div>
        <div class="item__ft flex">
          <label
            class="flexItem checkedLabel flex gou flexAlignCneter"
            @tap="SetDefaultinvoice(index,item.Id)"
          >
            <radio value :checked="item.IsDefault===1" color="#ff952e"/>
            <span v-if="item.IsDefault===1" style="color:#ff952e">已设为默认</span>
            <span v-else>设为默认</span>
          </label>
          <div class="flexItem flex1 text_r">
            <div class="iconText inline-block" @click="gotoAddInvoice(item.Id)">
              <img src="/static/images/icons/eadit.jpg" class="icon-compose icon" alt>编辑
            </div>
            <div class="iconText inline-block" @click="deleteBtn(index,item.Id)">
              <img src="/static/images/icons/del.jpg" class="icon-del icon" alt>删除
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.length==0&&navIndex===0" class="nodata_log flex flexColumn flexAlignCenter">
         <img src="/static/images/icons/vibg.png" alt="" class="site_log">
          <span class="cg mt2">还没有收货地址哦~</span>
          <span class="add_new" @tap="gotoAddInvoice(-1)">新建地址</span>
    </div>
    <div class="invoiceList" v-if="navIndex===1" style="margin-top:20rpx">
      <div class="item" v-for="(item,index) in invList" :key="index">
        <div class="item__bd .flex-center">
          <input type="checkbox" class="checkbox-cart" style="margin-right:20rpx" 
          :checked="item.hascheck"
          @click="selectInv(index)"
          >
          <div>
            <div class="remarks">
              <text class="name">{{item.Dy.Name}}</text>
            </div>
            <div class="type">交易时间：{{item.Dy.AddTime}}</div>
            <div class="type" >实付金额：<span style="color:#ff6666">￥{{item.Dy.PayAmount}}</span></div>
          </div>
        </div>
      </div>
      <div class="noData center" v-if="invList.length==0&&navIndex===1" style="padding:60rpx 30rpx;">您暂时还没有可开票的订单！</div>
      <div style="height:120rpx;"></div>
      <div class="nextbox" v-if="invList.length>0&&navIndex===1">
        <input type="checkbox" class="checkbox-cart" :checked=allSelect @click="selectAll">
        <p>全选</p>
        <div class="nextBtn" @click="nextBtn()">下一步</div>
      </div>
    </div>
    <div class="noData center" style="padding:60rpx 30rpx;" v-if="hasDataList===false && hasDataList !=='' && page===1&& navIndex===0">暂无数据</div>
    <div class="ftBtn" style="height:100rpx" v-if="navIndex==0&&list.length>0">
      <div class="inner fixed bm0">
        <div class="btns">
          <div class="btn center bg_ff952e" @click="gotoAddInvoice(-1)">
            <img src="/static/images/icons/add3.png" class="icon-add" alt> 新增发票信息
          </div>
        </div>
      </div>
    </div>
    <!--弹层-->
    <div class="mask" v-if="ShowMask" catchtouchmove="true" @click="cancle"></div>
    <div class="maskType boxSize noParActive" v-if="ShowMask">
      <div class="flex">
            <span class="size" @click="cancle">取消</span>
            <span class="title">请选择发票抬头</span>
            <span class="size" @click="subConfirm">确定</span>
      </div>
      <scroll-view :scroll-y="true" style="height:480rpx;" class="showItem" @scrolltolower="loadMore">
        <div v-for="(item,index) in list" :key="index">
            <p :class="{'itemactive':invIndex == index}" @click="chose(index)" style="margin-top:3rpx;">{{item.HeaderName}}
            </p>
        </div>
      </scroll-view>
    </div>
    <div class="fapiaobox" v-if="Showfp">
      <div class="maskfp"  @click.stop="Showfp=false"></div>
      <div class="box">
        <div class="itemfp">
          <span class="fptit">发票格式</span>
          <div class="fptype">
            <span :class="{'active':fptype==0}" @click="fptype=0">电子</span>
            <span :class="{'active':fptype==1}" @click="fptype=1">纸质</span>
          </div>
        </div>
        <div class="itemfp">
          <span class="fptit">发票抬头</span>
          <div class="txtbox" @click="selectfpId">
            <input type="text" v-model="InvoiceTxt" disabled=false>
          </div>
        </div>
        <div class="itemfp">
          <span class="fptit">总金额</span>
          <div class="fpprice">
            <span class="price">{{allprice}}元</span><span>共{{selectlen}}个订单</span>
          </div>
        </div>
        <div class="itemfp">
          <span class="fptit">电子邮箱</span>
          <div class="txtbox">
            <input type="text" placeholder="请输入" v-model="MailBox">
          </div>
        </div>
        <div class="artxt" v-if="fptype==1">
          <span>地址</span>
          <div>
            <textarea placeholder="请输入详细地址" v-model="Address"></textarea>
          </div>
        </div>
        <div class="artxt">
          <span>备注信息</span>
          <div>
            <textarea  placeholder="请输入备注信息" v-model="Remark"></textarea>
          </div>
        </div>
        <div class="fpBtn" @click="submit">提交</div>
      </div>
    </div>
  </div>
</template>
<script>
// import { post, toLogin, getCurrentPageUrlWithArgs, trim } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    // this.userId = wx.getStorageSync("userId");
    // this.token = wx.getStorageSync("token");
    // this.curPage = getCurrentPageUrlWithArgs();
    // this.pramas = ''
    // if(this.$root.$mp.query.invoiceType && this.$root.$mp.query.invoiceType !==""){
    //     this.invoiceType = this.$root.$mp.query.invoiceType
    // }
    // if(this.$root.$mp.query.url && this.$root.$mp.query.url !==""){
    //     this.pramas = this.$root.$mp.query.url
    // }
    
    // this.list = [];
    // this.hasDataList = "";
    // this.getInvoiceList();
    // this.FeesOrderList();
  },
  data() {
    return {
      navIndex:0,
      invIndex:0,//发票index
      fptype:0,//发票格式 0电子 1纸质
      MailBox:"",//发票邮箱
      Remark:"",
      Address:"",
      InvoiceIdF:"",//抬头Id；
      InvoiceTxt:"请选择",//抬头名称
      allprice:0,
      allSelect:false,//全选
      selectlen:0,
      ShowMask:false,
      Showfp:false,
      OrderId:[],
      OrderIdTxt:"",
      userId: "",
      token: "",
      curPage: "",
      list: [],
      invList:[],
      invoiceType:"",
      pramas:"",
      hasDataList: "",
      page: 1
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的发票"
      });
    },
    //选择发票 --必传发票种类 个人/公司    路径
    choseInvoice(i){
      console.log(this.pramas)
      if(this.pramas){
          const InvoiceId = this.list[i].Id
          const InvoiceHeaderName = this.list[i].HeaderName
          let typeId = 0
          if(this.list[i].InvoiceTitlestr=='公司'){
              typeId=0
          }else{
              typeId=1
          }
          if(this.invoiceType != typeId){
            wx.showToast({
              title:"请选择合适类型的发票",
              icon:"none",
              duration:1500
            })
          }else{
              // wx.navigateTo({url:"/pages/"+this.pramas+"/main?InvoiceId="+InvoiceId})
              let InvoiceInfo={
                  InvoiceId:InvoiceId,
                  InvoiceHeaderName:InvoiceHeaderName
              }
              this.$store.commit("update",{InvoiceInfo})
              wx.navigateBack()
          }
        }
    },
    selectfpId(){
      this.Showfp=false;
      this.ShowMask=true;
    },
    //全选
    selectAll(){
      var that=this;
      if(this.allSelect){
        this.allSelect=false;
        this.selectlen=0;
        this.invList.forEach(function(item) {
          that.$set(item,"hascheck",false)
        });
        console.log(this.invList)
      }else{
        this.allSelect=true;
        this.selectlen=this.invList.length;
        this.invList.forEach(function(item) {
          that.$set(item,"hascheck",true)
        });
        console.log(this.invList)
      }
    },
    //单选
    selectInv(index){
      var that=this
      var selectId=!this.invList[index].hascheck;console.log(selectId)
      this.$set(this.invList[index],"hascheck",selectId);console.log(this.invList)
      if(selectId){
        this.selectlen++
      }else{
        this.selectlen--
      }
      var len=this.invList.length;
      if(this.selectlen==len){
        this.allSelect=true
      }else{
        this.allSelect=false
      }
    },
    //下一步
    nextBtn(){
      if(this.selectlen==0){
        wx.showToast({
          icon:"none",
          title:"请选择所需要开发票的订单！"
        })
      }else{
        this.Showfp = true;
        var that=this;
        that.allprice=0;
        that.OrderId=[];
        that.invList.forEach(function(item) {console.log(item)
          if(item.hascheck){
            that.OrderId.push(item.Dy.Id);
            that.allprice+=item.Dy.PayAmount;
          }
        });
        that.allprice=that.allprice.toFixed(2)
        that.OrderIdTxt=that.OrderId.join(",");console.log(that.OrderIdTxt)
      }
    },
    //取消选择
    cancle(){
      this.ShowMask = false;
      this.Showfp = true;
      // this.showDefaultCompany = false
      this.invIndex = 0;
      this.OrderId=[]
    },
    //选择发票抬头
    chose(index){
      this.invIndex=index;
    },
    //确定选择
    subConfirm(){
      var that=this;
      console.log(this.invIndex)
      this.InvoiceIdF=this.list[this.invIndex].Id;
      this.InvoiceTxt=this.list[this.invIndex].HeaderName;
      this.ShowMask = false;
      this.Showfp = true;
      console.log(this.OrderId)
    },
    submit(){
      if(this.Authentication()){console.log("11111111")
        this.BatchApplyInvoice();
      }
    },
    FeesOrderList() {  //获取开票订单列表
      let that = this;
      post(
        "About/FeesOrderList",
        {
          UserId: that.userId,
          Token: that.token,
          Type:0
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          that.invList = res.data;
          that.invList.forEach(function(item) {console.log(item)
            that.$set(item,"hascheck",false)
          });
          console.log(that.invList)
        }
      });
    },
    Authentication(){
      if(this.InvoiceIdF==""){
        wx.showToast({
          icon:"none",
          title:"请选择发票抬头！"
        })
        return false;
      }
      if(this.MailBox==""){
        wx.showToast({
          icon:"none",
          title:"请输入邮箱地址！"
        })
        return false;
      }else{
        let reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!reg.test(this.MailBox)) {
          wx.showToast({
            title: "请输入正确的邮箱地址！",
            icon: "none",
            duration: 2000
          });
          return false;
        }
      }
      if(this.fptype==1){
        if(this.Address==""){
          wx.showToast({
            icon:"none",
            title:"请输入地址！"
          })
          return false;
        }
      }
      return true;
    },
    BatchApplyInvoice() {  //批量开票
      let that = this;
      post(
        "About/BatchApplyInvoice",
        {
          UserId: that.userId,
          Token: that.token,
          OrderId:that.OrderIdTxt,
          InvoiceId:that.InvoiceIdF,
          Remark:that.Remark,
          MailBox:that.MailBox,
          Invoiceformat:that.fptype,
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          that.Showfp=false;
          wx.showToast({
            title:res.msg,
            icon:"none"
          })
        }else{
          wx.showToast({
            title:res.msg,
            icon:"none"
          })
        }
        setTimeout(() => {
          that.FeesOrderList();
        }, 1500);
      });
    },
    getInvoiceList() {  //获取发票列表
      let that = this;
      post(
        "About/invoiceList",
        {
          UserId: that.userId,
          Token: that.token
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          if (res.data.length > 0) {
            that.hasDataList = true;
            that.list = res.data;
          } else {
            that.hasDataList = false;
          }
        }
      });
    },
    SetDefaultinvoice(index, id) {
      //设置为默认
      let that = this;
      if (that.list[index].IsDefault === 1) {
        return false;
      }
      post(
        "About/SetDefaultinvoice",
        {
          UserId: that.userId,
          Token: that.token,
          Id: id
        },
        that.curPage
      ).then(res => {
        if (res.code === 0) {
          that.list.forEach((item, indexOf) => {
            if (indexOf !== index) {
              that.$set(item, "IsDefault", 0);
            } else {
              that.$set(item, "IsDefault", 1);
            }
          });
          wx.showToast({
            title: "设置默认发票成功！",
            icon: "none",
            duration: 1500
            // success:function(){
            //   setTimeout(()=>{
            //     that.list = [];
            //     that.getInvoiceList();
            //   },1500)
            // }
          });
        }
      });
    },
    deleteBtn(index, id){
      let that = this;
      wx.showModal({
        title:'确认删除',
        content:'此操作将永久删除该发票信息！请确认',
          confirmColor:'#ff952e',
          cancelColor:'#999',
        success(res){
          if(res.confirm){
            post("About/Deleteinvoice",{
              UserId: that.userId,
                Token: that.token,
                Id: id
            },that.curPage).then(res => {
              if (res.code === 0) {
                wx.showToast({
                  title: "删除成功",
                  icon: "none",
                  duration: 1500,
                  success: function() {
                    that.list.splice(index, 1);
                    if(that.list.length===0){
                      that.hasDataList = false;
                    }
                  }
                });
              }
            });
          }
        }
      })
    },
    gotoAddInvoice(id) {
      console.log(id);
      let objUrl = "";
      if (id !==-1) {
        objUrl = "/pages/member2/addInvoice/main?id=" + id;
      } else {
        objUrl = "/pages/member2/addInvoice/main";
      }
      wx.navigateTo({
        url: objUrl
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.icon-add {
  width: 40rpx;
  height: 40rpx;
  margin-right: 10rpx;
  vertical-align: middle;
}
.headnav{
  display: flex;
  height: 90rpx;
  background: #fff;
  div{
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    span{
      display: inline-block;
      height: 86rpx;
      border-bottom: 4rpx #fff solid;
      line-height: 86rpx;
    }
    span.active{
      border-bottom: 4rpx #ff952e solid;
      color:#ff952e
    }
  }
}
.nextbox{
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  box-sizing: border-box;
  padding: 0 30rpx;
  height: 100rpx;
  border-top: #ececec 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    flex: 1;
    font-size: 26rpx;
    margin-left: 10rpx;
    color: #666;
  }
  .nextBtn{
    padding: 0 40rpx;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 10rpx;
    background: #ff952e;
    color: #fff;
  }
}
.maskType .itemactive{
  background: #ff952e;
  color: #fff;
}
.maskType{
  background: #fff;
  width: 100%;
  height: 600rpx;
  padding: 30rpx 0;
  bottom: 0 !important;
  position: fixed;
  z-index: 999;
}
.maskType p{
  padding: 15rpx 30rpx;
  text-align: center;
}
.maskType .flex{
  justify-content: space-between;
  border-bottom: 1rpx solid #f2f2f2;
  padding: 20rpx;
  font-weight: 400;
  font-size: 30rpx;
}
.maskType .flex .color{
  color: #ff2925;
}
.maskType .flex .size{
  font-size: 26rpx;
}
.maskType .flex .title{
  font-weight: bold;
}
.fapiaobox{
  position: fixed;
  background: rgba(0, 0, 0, .6);
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .maskfp{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    top: 0;
    left: 0;
  }
  .box{
    width: 80%;
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 16rpx;
    .itemfp{
      display: flex;
      align-items: center;
      height: 80rpx;
      border-bottom: #ececec 1px solid;
      .fptit{
        width: 140rpx;
      }
      .fptype{
        span{
          padding: 6rpx 24rpx;
          display: inline-block;
          margin-right: 30rpx;
          background: #aaa;
          color: #fff;
          border-radius: 6rpx;
          font-size: 22rpx;
        }
        span.active{
          background: #ff952e;
        }
      }
      .fpprice{
        display: flex;
        flex: 1;
        justify-content: space-between;
        color: #999;
        .price{
          color: #ff952e;
        }
      }
      .txtbox{
        flex: 1;
        color:#666;
      }
    }
    .artxt{
      width: 100%;
      span{
        display: block;
        margin: 8rpx 0;
      }
      textarea{
        width: 100%;
        height: 100rpx;
        background: #eee;
        border-radius: 12rpx;
        padding:10rpx 20rpx;
        box-sizing: border-box;
        font-size: 24rpx;
      }
    }
    .fpBtn{
      width: 100%;
      height: 80rpx;
      line-height: 80rpx;
      color: #fff;
      background: #ff952e;
      text-align: center;
      border-radius: 12rpx;
      margin: 60rpx 0 20rpx;
    }
  }
}
.nodata_log{
  padding:200rpx 0;
}
.add_new{
  margin-top:80rpx;
  width:180rpx;
  border:1rpx solid #f00;border-radius:8rpx;
  color:#f00;
  height:50rpx;line-height: 50rpx;
  text-align: center;
}
.site_log{
  width:374rpx;height:288rpx;
}
</style>
