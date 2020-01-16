<template>
  <div class="pageContent">
    <div class="weui-cells addInvoice__weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">发票类型</label>
        </div>
        <div class="weui-cell__bd">
          <div class="tag" :class="{'active':invoiceType===1}" @click="shiftInvoiceType(1)">个人</div>
          <div class="tag" :class="{'active':invoiceType===2}" @click="shiftInvoiceType(2)">公司</div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">发票抬头</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="headerName" placeholder="个人姓名或公司名称">
        </div>
      </div>
      <!-- 这个是公司的 -->
      <div class="weui-cell" v-if="invoiceType===2">
        <div class="weui-cell__hd">
          <label class="weui-label">公司税号</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="taxNumber" placeholder="请输入公司纳税人识别号">
        </div>
      </div>
    </div>
    <div class="weui-cells addInvoice__weui-cells">
      <!-- 这个是个人的 -->
      <div class="weui-cell" v-if="invoiceType===1">
        <div class="weui-cell__hd">
          <label class="weui-label">电话号码</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="regCall" placeholder="选填">
        </div>
      </div>
      <div class="weui-cell" v-if="invoiceType===1">
        <div class="weui-cell__hd">
          <label class="weui-label">邮箱</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="email"  placeholder="选填">
        </div>
      </div>
      <!-- 以下是公司的 -->
      <!-- <div class="weui-cell" v-if="invoiceType===2">
        <div class="weui-cell__bd">
          <div class="title">需要增值税专用发票</div>
          <div class="msg">请先与公司财务确认需要开具的是专用发票</div>
        </div>
        <div class="weui-cell__ft">
          <switch :checked="isOpen" @change="switchStatus" color="#ff952e"/>
        </div>
      </div> -->
      <!-- 以下是公司的开具增值税专用发票的时候 -->
      <div class="weui-cell" v-if="invoiceType===2">
        <div class="weui-cell__hd flex1">
          <p class="wd_wdd">需要增值税专用发票</p>
          <p class="font24 cg">请先与公司财务确认需要开具的是专用发票</p>
        </div>
        <div class="">
          <switch :checked="isOpen" color="#f00000" @change="switchStatus"/>
        </div>
      </div>
      <div class="weui-cell" v-if="invoiceType===2">
        <div class="weui-cell__hd">
          <label class="weui-label">注册地址</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="regAddress" placeholder="选填" >
        </div>
      </div>
      <div class="weui-cell" v-if="invoiceType===2">
        <div class="weui-cell__hd">
          <label class="weui-label">公司电话</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="regCall" placeholder="选填" >
        </div>
      </div>
      <div class="weui-cell" v-if="invoiceType===2">
        <div class="weui-cell__hd">
          <label class="weui-label">开户银行</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="bankName" placeholder="选填">
        </div>
      </div>
      <div class="weui-cell" v-if="invoiceType===2">
        <div class="weui-cell__hd">
          <label class="weui-label">银行账号</label>
        </div>
        <div class="weui-cell__bd">
          <input type="text" class="weui-input" v-model="bankAccount" placeholder="选填">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">设为默认发票</div>
        <div class="weui-cell__ft text_r">
          <switch :checked="checked" color="#f00000" @change="tab"/>
        </div>
      </div>
    </div>
    <div class="ftBtn">
      <div class="inner" style="padding:60rpx 30rpx;background:none;">
        <div class="btns">
          <div class="btn center bg_ff952e color_fff" style="border-radius:10rpx; width:690rpx" @click="btnSure">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { post, trim } from "@/utils";
export default {
  onLoad() {
    this.setBarTitle();
  },
  onShow() {
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.ischeck=this.$mp.query.ischeck||false;
    this.initData();
    if (this.$root.$mp.query.id !== "" && this.$root.$mp.query.id) {
      this.invoiceId = this.$root.$mp.query.id;
      this.getInvoiceInfo(this.invoiceId);
    }
  },
  data() {
    return {
      invoiceId: "", //编辑的时候传进来的id
      checked: true,
      isDefault: 1,
      invoiceType: 2, //1:个人；2：公司
      isOpen: false, //是否打开需要增值税专用发票
      isVATExclusive: 1, //0:不需要专用发票；1：需要
      userId: "",
      token: "",
      headerName: "", //抬头名称
      phone: "", //电话
      email: "", //邮箱
      taxNumber: "", //税号
      bankName: "", //开户银行
      regCall: "", //注册电话
      bankAccount: "", //银行账号
      regAddress: "",//注册地址
      ischeck:false,//是否是已选发票
    };
  },
  methods: {
    setBarTitle() {
      wx.setNavigationBarTitle({
        title: "新增常用发票"
      });
    },
    initData(){
      this.invoiceId = "";
      this.isDefault = 1;
      this.checked = true;
      this.invoiceType =1;
      this.isVATExclusive = 0;
      this.isOpen = false;
      this.headerName = ""; //抬头名称
      this.phone=""; //电话
      this.email=""; //邮箱
      this.taxNumber=""; //税号
      this.bankName=""; //开户银行
      this.regCall=""; //注册电话
      this.bankAccount=""; //银行账号
      this.regAddress="";//注册地址
    },
    shiftInvoiceType(index) {
      this.invoiceType = index;
    },
    switchStatus() {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.isVATExclusive = 1;
      } else {
        this.isVATExclusive = 0;
      }
    },
    tab() {
      console.log(this.checked);
      //var isDefault = "";
      if (this.isDefault === 1) {
        this.isDefault = 0;
        this.checked = false;
      } else {
        this.isDefault = 1;
        this.checked = true;
      }
    },
    Authentication() {
      if (trim(this.headerName) == "") {
        wx.showToast({
          title: "请输入抬头名称！",
          icon: "none",
          duration: 1500
        });
        return false;
      }
      if (this.invoiceType === 1) {
        if (trim(this.phone) !== "") {
          if (!/^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.phone)) {
            wx.showToast({
              title: "请输入正确的电话格式！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
        }
        if (trim(this.email) !== "") {
          if (
            !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.email)
          ) {
            wx.showToast({
              title: "请输入正确的邮箱地址！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
        }
      }
      if (this.invoiceType === 2) {
        if (trim(this.taxNumber) == "") {
          wx.showToast({
            title: "请输入税号！",
            icon: "none",
            duration: 1500
          });
          return false;
        }
        if (this.isOpen) {
          if (trim(this.regAddress) == "") {
            wx.showToast({
              title: "请输入注册地址！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
          if (trim(this.regCall) == "") {
            wx.showToast({
              title: "请输入公司电话！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
          if (trim(this.regCall) !== "") {
            if (
              !(
                /^0\d{2,3}-\d{7,8}$/.test(this.regCall) ||
                /^[1][3,4,5,6,7,8][0-9]{9}$/.test(this.regCall)
              )
            ) {
              wx.showToast({
                title: "请输入正确的电话格式！",
                icon: "none",
                duration: 1500
              });
              return false;
            }
          }
          if (trim(this.bankName) == "") {
            wx.showToast({
              title: "请输入开户银行！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
          if (trim(this.bankAccount) == "") {
            wx.showToast({
              title: "请输入银行账号！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
          //少了一个当银行卡号填写的时候，没有判断银行的卡号，需要拿到最新的h5代码
          if (
            trim(this.bankAccount) !== "" &&
            !/^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20})$/.test(this.bankAccount)
          ) {
            wx.showToast({
              title: "银行卡号格式错误！",
              icon: "none",
              duration: 1500
            });
            return false;
          }
        }
      }
      console.log("999999999")
      return true;
    },
    btnSure() {
      //点击保存按钮
      if (trim(this.invoiceId) == "") {
        console.log("999")
        if (this.Authentication()) {
          this.addInvoice();
        }
      } else {
        console.log("888")
        if (this.Authentication()) {
          this.updateInvoice();
        }
      }
    },
    getInvoiceInfo(id) {
      //获取发票信息
      post(
        "Invoice/GetInvoiceInfo",
        {
          Id: id,
          UserId: this.userId,
          Token: this.token
        },
        this.curPage
      ).then(res => {
        if (res.code === 0) {
          this.headerName = res.data.HeaderName;
          if(res.data.InvoiceTitle===2){  //公司的时候
            this.taxNumber = res.data.TaxNumber;
            this.bankName = res.data.BankName;
            this.regCall = res.data.RegCall;
            this.bankAccount = res.data.BankAccount;
            this.bankName = res.data.BankName;
            this.regAddress = res.data.RegAddress;
            this.isVATExclusive = res.data.IsVATExclusive;
          }
          if(res.data.InvoiceTitle===1){  //个人的时候
            this.regCall = res.data.RegCall;
            this.email = res.data.QQEmail;
          }
          if (this.isVATExclusive === 1) {
            this.isOpen = true;
          }
          this.invoiceType = res.data.InvoiceTitle;
          this.isDefault = res.data.IsDefault;
          if (this.isDefault === 1) {
            this.checked = true;
          }
          if(this.ischeck){
            wx.setStorageSync("invoiceinfo",res.data);
          }
        }
      });
    },
    addInvoice() {
      let that = this;
      //新增发票信息
      post(
        "Invoice/AddInvoice",
        {
          UserId: that.userId,
          Token: that.token,
          InvoiceTitle: that.invoiceType, //1:个人；2：单位公司+
          HeaderName: that.headerName, //发票抬头+
          // Phone: that.phone, //个人的电话  选填
          QQEmail: that.email, //个人的邮箱  选填
          RegCall: that.regCall, //公司电话+个人的电话
          IsDefault: that.isDefault, //是否默认；0：否，1：是+
          TaxNumber: that.taxNumber, //发票税号+
          BankName: that.bankName, //开户银行+
          BankAccount: that.bankAccount, //银行账号+
          RegAddress: that.regAddress, //注册地址+
          IsVATExclusive: that.isVATExclusive
        }
      ).then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: "新增成功！",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                if(that.ischeck){
                  that.getInvoiceInfo(that.$mp.query.id)
                }
                wx.navigateBack()
                // wx.redirectTo({
                //   url: "/pages/myson/invoiceList/main"
                // });
              }, 1500);
            }
          });
        }
      });
    },
    updateInvoice() {
      let that = this;
      //编辑
      post(
        "Invoice/UpdateInvoice",
        {
          Id: this.invoiceId,
          UserId: this.userId,
          Token: this.token,
          InvoiceTitle: this.invoiceType,
          HeaderName: this.headerName,
          // Phone: this.phone, //个人的电话  选填
          QQEmail: this.email, //个人的邮箱  选填
          RegCall: this.regCall,
          IsDefault: this.isDefault,
          TaxNumber: this.taxNumber,
          BankName: this.bankName,
          BankAccount: this.bankAccount,
          RegAddress: this.regAddress,
          IsVATExclusive: this.isVATExclusive
        },
        this.curPage
      ).then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: "保存成功！",
            icon: "none",
            duration: 1500,
            success: function() {
              setTimeout(function() {
                console.log("保存"+that.ischeck)
                if(that.ischeck){
                  that.getInvoiceInfo(that.$mp.query.id)
                }
                wx.navigateBack()
                // wx.redirectTo({
                //   url: "/pages/myson/invoiceList/main"
                // });
              }, 1500);
            }
          }); 
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
