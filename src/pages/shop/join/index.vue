<template>
  <div>
    <div class="bgf220"></div>
    <div class="plr30 bfff">
      <img class="upLogo" v-if="logoUrl" :src="logoUrl" alt="" @click="uplLoadImg(1)">
      <img class="upLogo" v-else src="http://jd.wtvxin.com/images/images/shop/upLogo.png" alt="" @click="uplLoadImg(1)">
      <div class="cell bb1">
        <h4>名称：</h4>
        <div class="right">
          <input type="text" placeholder="请输入店铺名称" v-model="ShopNick">
        </div>
      </div>
      <div class="cell bb1">
        <h4>地址：</h4>
        <div class="right">
          <input type="text" placeholder="请输入店铺地址" v-model="Address">
        </div>
      </div>
      <div class="cell bb1">
        <h4>店铺类型：</h4>
        <div class="right flex flex-center-between" @click="showEdit=true">
          <view :class="['picker',MasterProduct=='请选择店铺类型'?'c-999':'']">
              {{MasterProduct}}
          </view>
          <!-- <picker class="pickerbox" @change="bindPickerChange" :value="typeindex" :range="ThemeArr">
            <view :class="['picker',typeindex<0?'c-999':'']">
              {{MasterProduct}}
            </view>
          </picker> -->
          <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right mr1">
        </div>
      </div>
      <div class="cell bb1">
        <h4>姓名：</h4>
        <div class="right">
          <input type="text" placeholder="请输入您的姓名" v-model="ShopName">
        </div>
      </div>
      <div class="cell bb1">
        <h4>手机号：</h4>
        <div class="right">
          <input type="text" placeholder="请输入您的手机号" v-model="Mobile">
        </div>
      </div>
      <div class="cell bb1">
        <h4>身份证号：</h4>
        <div class="right">
          <input type="text" placeholder="请输入您的身份证号" v-model="Idcard">
        </div>
      </div>
      <div class="cell bb1">
        <h4>推荐码：</h4>
        <div class="right">
          <input type="text" placeholder="非必填" v-model="referralCode">
        </div>
      </div>
    </div>

    <div class="bgf220"></div>
    <div class="bfff plr30 upIDcard">
        <h4>请上传身份证正反面照片</h4>
        <div class="upBox flex-center-between">
          <img :src="IdcardPositiveUrl" v-if="IdcardPositiveUrl" alt="" @click="uplLoadImg(2)">
          <img src="http://jd.wtvxin.com/images/images/shop/upIDcard2.png" v-else alt="" @click="uplLoadImg(2)">
          <img :src="IdcardNegativeUrl" v-if="IdcardNegativeUrl" alt="" @click="uplLoadImg(3)">
          <img src="http://jd.wtvxin.com/images/images/shop/upIDcard1.png" v-else alt="" @click="uplLoadImg(3)">
        </div>
        <p>拍摄时请确保身份证<span>边框完整  字体清晰</span></p>
         <h4>请上传营业执照</h4>
        <div class="upBox flex-center-between">
          <img :src="yyzzUrl" v-if="yyzzUrl" alt="" @click="uplLoadImg(4)">
          <img src="http://jd.wtvxin.com/images/images/shop/upIDcard3.png" v-else alt="" @click="uplLoadImg(4)">
        </div>
        <p>拍摄时请确保营业执照<span>边框完整  字体清晰</span></p>
    </div>
    
    <div class="bgf220"></div>
    <div class="remark bfff plr30">
      <h4>备注</h4>
      <div class="texta">
        <textarea maxlength="150" @input="limitInput" cols="30" rows="10" placeholder="简单描述一下您的行业，商品类型，业务范围等信息" v-model="Remarks"></textarea>
        <span>{{inputTxtLength}}/150</span>
      </div>
    </div>

    <div class="p30">
      <div class="ans-maxBtn" @click="MerchantRegister">立即申请</div>
    </div>
     <pickers v-if="showEdit" :arr="ThemeList" :show.sync="showEdit" @success="bindPickerChange"></pickers>
  </div>
</template>

<script>
import {post,get,valPhone} from '@/utils'
import pickers from '@/components/pickers';
export default {
  components: {pickers},
  data () {
    return {
        userId: "",
        token: "",
        ShopName:"",
        ShopNick:"",
        MasterProduct:"请选择店铺类型",
        Address:"",
        Mobile:"",
        Idcard:"",//身份证号
        logo:"",
        logoUrl:"",
        IdcardPositive:"",
        IdcardPositiveUrl:"",
        IdcardNegative:"",//身份证反面
        IdcardNegativeUrl:"",//身份证反面
        yyzz:"",//营业执照
        yyzzUrl:"",//营业执照
        Remarks:"",
        referralCode:"",//推荐人
        showEdit:false,
        ThemeList:[],//主营产品列表
        //ThemeArr:[],
        typeindex:-1,
        inputTxtLength:0,//当前输入字数
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.GetThemeList();
  },
  methods: {
    //初始化
    init(){
      this.ShopName="";
      this.ShopNick="";
      this.MasterProduct="请选择店铺类型";
      this.Address="";
      this.Mobile="";
      this.Idcard="";
      this.logo="";
      this.logoUrl="";
      this.IdcardPositive="";
      this.IdcardPositiveUrl="";
      this.IdcardNegative="";//身份证反面
      this.IdcardNegativeUrl="";//身份证反面
      this.yyzz="";
      this.yyzzUrl="";
      this.Remarks="";
      this.referralCode="";
    },
    yanzheng(){
      if(this.logo==""){
        wx.showToast({
          title:"请上传店铺图标！",
          icon:"none"
        })
        return false
      }
      if(this.ShopNick==""){
        wx.showToast({
          title:"请输入店铺名称",
          icon:"none"
        })
        return false
      }
      if(this.Address==""){
        wx.showToast({
          title:"请输入店铺地址",
          icon:"none"
        })
        return false
      }
      // if(this.typeindex<0){
      //   wx.showToast({
      //     title:"请选择店铺主营产品！",
      //     icon:"none"
      //   })
      //   return false
      // }
      if(this.ShopName==""){
        wx.showToast({
          title:"请输入您的姓名",
          icon:"none"
        })
        return false
      }
      if(this.Mobile==""){
        wx.showToast({
          title:"请输入手机号码",
          icon:"none"
        })
        return false
      }
      // if(valPhone(this.Mobile)==false){
      //   return false
      // }
      if(this.Idcard==""){
        wx.showToast({
          title:"请输入您的身份证号",
          icon:"none"
        })
        return false
      }
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      // if(reg.test(this.Idcard) === false){
      //   wx.showToast({
      //     title: "请输入正确证件格式",
      //     icon: "none"
      //   });
      //   return false;
      // }
      if(this.IdcardPositive==""){
        wx.showToast({
          title:"请上传身份证正面照！",
          icon:"none"
        })
        return false
      }
      if(this.IdcardNegative==""){
        wx.showToast({
          title:"请上传身份证反面照！",
          icon:"none"
        })
        return false
      }
      if(this.yyzz==""){
        wx.showToast({
          title:"请上传营业执照！",
          icon:"none"
        })
        return false
      }
      return true
    },
    MerchantRegister(){
      if(this.yanzheng()){
        post('Shop/MerchantRegister',{
          "Logo":this.logo,
          "Mobile": this.Mobile,
          "MasterProduct": this.MasterProduct,
          "Address": this.Address,
          "Remarks": this.Remarks,
          "Idcard": this.Idcard,
          "IdcardPositive": this.IdcardPositive,
          "IdcardNegative": this.IdcardNegative,
          "BusinessLicense": this.yyzz,
          "ShopNick": this.ShopNick,
          "ShopName": this.ShopName,
          "CompanyName": "",
          "ReferralCode":this.referralCode
        }).then(res=>{
          if(res.code==0){
            wx.showToast({
              title: "申请成功，请等待审核",
              icon: 'none',
            })
            setTimeout(() => {
              wx.navigateBack()
            }, 1500);
            this.init();
          }else{
            wx.showToast({
              title: res.msg,
              icon: 'none',
            })
          }
        })
      }
    },
    //上传图片
    uplLoadImg(index){
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: (res) =>{
            // tempFilePath可以作为img标签的src属性显示图片
            var imgUrl=''
            var imgData=''
            imgUrl = res.tempFilePaths[0]
            wx.getFileSystemManager().readFile({
                filePath: imgUrl, //选择图片返回的相对路径
                encoding: "base64", //编码格式
                success: res => {
                    //成功的回调
                    imgData = "data:image/png;base64," + res.data.toString();
                    if(index==1){//logo
                      this.logoUrl=imgUrl;
                      this.logo=imgData
                    }else if(index==2){//身份证正面
                      this.IdcardPositiveUrl=imgUrl;
                      this.IdcardPositive=imgData
                    }else if(index==3){//身份证反面
                      this.IdcardNegativeUrl=imgUrl;
                      this.IdcardNegative=imgData
                    }else{
                      this.yyzzUrl=imgUrl;
                      this.yyzz=imgData
                    }
                    console.log(imgData.length,imgUrl)
                }
                });
            }
            
        })
    },
    //获取主营产品
    GetThemeList(){
      post('Shop/GetThemeList',{}).then(res=>{
        if(res.code==0){
          let ThemeArr=[];
          res.data.map(item=>{
            ThemeArr.push({message:item.Theme})
          })
           this.ThemeList=ThemeArr;
        }
      })
    },
    selectTheme(){

    },
    bindPickerChange(e){
     //this.typeindex=e.mp.detail.value;
     this.MasterProduct=e[0].message;
    },
    limitInput() {
      this.inputTxtLength = this.Remarks.length;
    },
  },
}
</script>

<style scoped lang='scss'>
  .upLogo{
    width:172rpx;
    height:172rpx;
    margin:0 auto;
    padding:20rpx;
    border-radius:50%;
    display:block;
  }
  h4{
    font-size:30rpx;
    color:#333;
    line-height:88rpx;
  }
  .cell{
    display:flex;
    align-items:center;
    justify-content:space-between;
    font-size:30rpx;
    &:last-child{
      border-bottom:none;
    }
    h4{
      width:200rpx;
      line-height:109rpx;
    }
    .right{
      width:500rpx;
    }
  }
  .upIDcard{
    .upBox{
      padding:0 30rpx;
      margin-top:10rpx;
      img{
        width:294rpx;
        height:194rpx;
      }
    }
    p{
      text-align:center;
      font-size:28rpx;
      color: #6c6c6c;
      line-height:4;
      span{
        color:#ff3333;
      }
    }
  }
  .remark{
    padding-bottom:30rpx;
    textarea {
      width:100%;
      height:200rpx;
    }
    .texta{
      position:relative;
      span{
        color:#999;
        position:absolute;
        right:20rpx;
        bottom:10rpx;
      }
    }
  }
  .pickerbox{ width: 100%}
</style>
