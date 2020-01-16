<template>
  <div class="pageContent">
    <div class="headnav" v-if="false">
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
            @tap.stop="SetDefaultinvoice(index,item.Id)"
          >
            <radio value :checked="item.IsDefault===1" color="#ff952e"/>
            <span v-if="item.IsDefault===1" style="color:#ff952e">已设为默认</span>
            <span v-else>设为默认</span>
          </label>
          <div class="flexItem flex1 flex justifyContentEnd">
            <div class="iconText inline-block" @click.stop="gotoAddInvoice(item.Id)">
              <img src="http://jd.wtvxin.com/images/images/icons/write.png" class="write" alt>编辑
            </div>
            <div class="iconText inline-block" @click.stop="deleteBtn(index,item.Id)">
              <img src="http://jd.wtvxin.com/images/images/icons/delete.png" class="delete" alt>删除
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="list.length==0&&navIndex===0" class="nodata_log flex flexColumn flexAlignCenter">
         <img src="http://jd.wtvxin.com/images/images/icons/vibg.png" alt="" class="site_log">
          <span class="cg mt2">您还没有发票抬头哦~</span>
          <span class="add_new" @tap="gotoAddInvoice(-1)">新建发票抬头</span>
    </div>
    <div class="ftBtn" style="height:100rpx" v-if="navIndex==0&&list.length>0">
      <div class="inner fixed bm0">
        <div class="btns">
          <div class="btn center bg_ff952e" @click="gotoAddInvoice(-1)">
            <img src="http://jd.wtvxin.com/images/images/icons/add3.png" class="icon-add" alt> 新增发票信息
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//引用成成拼租
import { post, trim } from "@/utils";
export default {
  data() {
    return {
      navIndex:0,
      fptype:0,//发票格式 0电子 1纸质
      MailBox:"",//发票邮箱
      Address:"",
      InvoiceIdF:"",//抬头Id；
      InvoiceTxt:"请选择",//抬头名称
      userId: "",
      token: "",
      list: [],
      invoiceType:"",
      //pramas:"",
      hasDataList: "",
      page: 1,
      checkId:"",//已选
      pagetype:"",//页面来源
    }
  },
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.checkId=this.$root.$mp.query.checkId||'';
    console.log("this.checkId"+this.checkId)
    this.pagetype=this.$root.$mp.query.pagetype||'';
    //this.pramas = '';
    // if(this.$root.$mp.query.invoiceType && this.$root.$mp.query.invoiceType !==""){
    //     this.invoiceType = this.$root.$mp.query.invoiceType
    // }
    // if(this.$root.$mp.query.url && this.$root.$mp.query.url !==""){
    //     this.pramas = this.$root.$mp.query.url
    // }
    this.hasDataList = "";
    this.getInvoiceList();
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "我的发票"
      });
    },
    //选择发票 --必传发票种类 个人/公司    路径
    choseInvoice(i){
      //console.log(this.pramas)
      //if(this.pramas){
        if(this.pagetype == 'confirm'){
          wx.setStorageSync("invoiceinfo",this.list[i]);
          wx.navigateBack()

          // const InvoiceId = this.list[i].Id
          // const InvoiceHeaderName = this.list[i].HeaderName
          // let typeId = 0
          // if(this.list[i].InvoiceTitlestr=='公司'){
          //     typeId=0
          // }else{
          //     typeId=1
          // }
          // if(this.invoiceType != typeId){
          //   wx.showToast({
          //     title:"请选择合适类型的发票",
          //     icon:"none",
          //     duration:1500
          //   })
          // }else{
          //     // wx.navigateTo({url:"/pages/"+this.pramas+"/main?InvoiceId="+InvoiceId})
          //     let InvoiceInfo={
          //         InvoiceId:InvoiceId,
          //         InvoiceHeaderName:InvoiceHeaderName
          //     }
          //     this.$store.commit("update",{InvoiceInfo})
          //     wx.navigateBack()
          // }
        }
        //}
    },
    getInvoiceList() {  //获取发票列表
      let that = this;
      post(
        "Invoice/GetAllInvoiceList",
        {
          UserId: that.userId,
          Token: that.token
        }
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
        "Invoice/SetDefaultInvoice",
        {
          UserId: that.userId,
          Token: that.token,
          Id: id
        }
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
            post("Invoice/DeleteInvoice",{
              UserId: that.userId,
              Token: that.token,
              Id: id
            }).then(res => {
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
      let ischecked=false;
      if(id==this.checkId){
        ischecked=true
      }else{
        ischecked=false;
      }
      console.log("ischecked"+ischecked)
      let objUrl = "";
      if (id !==-1) {
        objUrl = "/pages/myson/addInvoice/main?id=" + id+'&ischeck='+ischecked;
      } else {
        objUrl = "/pages/myson/addInvoice/main";
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
      border-bottom: 4rpx #f00 solid;
      color:#f00
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
 .write{
    width: 32rpx;
    height: 31rpx;
    margin-right: 10rpx
  }
  .delete{
    width: 32rpx;
    height: 32rpx;
    margin-right: 10rpx
  }
</style>
