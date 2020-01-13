<template>
  <div>
    <div class="bgf220"></div>
    <div class="plr30 bfff">
      <img class="upLogo" v-if="logoUrl" :src="logoUrl" alt="" @click="uplLoadImg(1)">
      <img class="upLogo" v-else src="/static/images/shop/upLogo.png" alt="" @click="uplLoadImg(1)">
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
        <h4>主营产品：</h4>
        <div class="right">
          <input type="text" placeholder="比如美妆" v-model="MasterProduct">
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
    </div>

    <div class="bgf220"></div>
    <div class="bfff plr30 upIDcard">
        <h4>请上传身份证正反面照片</h4>
        <div class="upBox flex-center-between">
          <img :src="IdcardPositiveUrl" v-if="IdcardPositiveUrl" alt="" @click="uplLoadImg(2)">
          <img src="/static/images/shop/upIDcard2.png" v-else alt="" @click="uplLoadImg(2)">
          <img :src="IdcardNegativeUrl" v-if="IdcardNegativeUrl" alt="" @click="uplLoadImg(3)">
          <img src="/static/images/shop/upIDcard1.png" v-else alt="" @click="uplLoadImg(3)">
        </div>
        <p>拍摄时请确保身份证<span>边框完整  字体清晰</span></p>
    </div>
    
    <div class="bgf220"></div>
    <div class="remark bfff plr30">
      <h4>备注</h4>
      <div class="texta">
        <textarea name="" id="" cols="30" rows="10" placeholder="简单描述一下您的行业，商品类型，业务范围等信息" v-model="Remarks"></textarea>
        <span>0/150</span>
      </div>
    </div>

    <div class="p30">
      <div class="ans-maxBtn" @click="MerchantRegister">立即申请</div>
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
        ShopName:"",
        ShopNick:"",
        MasterProduct:"",
        Address:"",
        Mobile:"",
        logo:"",
        logoUrl:"",
        IdcardPositive:"",
        IdcardPositiveUrl:"",
        IdcardNegative:"",//身份证反面
        IdcardNegativeUrl:"",//身份证反面
        Remarks:"",
        Address:"",
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
  },
  methods: {
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
      if(this.MasterProduct==""){
        wx.showToast({
          title:"请输入店铺主营产品！",
          icon:"none"
        })
        return false
      }
      if(this.ShopName==""){
        wx.showToast({
          title:"请输入您的姓名",
          icon:"none"
        })
        return false
      }
      if(this.Mobile==""){
        wx.showToast({
          title:"请输入您的手机号",
          icon:"none"
        })
        return false
      }
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
          "Idcard": "",
          "IdcardPositive": this.IdcardPositive,
          "IdcardNegative": this.IdcardNegative,
          "BusinessLicense": "",
          "ShopNick": this.ShopNick,
          "ShopName": this.ShopName,
          "CompanyName": ""
        }).then(res=>{
          wx.showToast({
            title: res.msg,
            icon: 'none',
          })
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
                    }else{//身份证反面
                      this.IdcardNegativeUrl=imgUrl;
                      this.IdcardNegative=imgData
                    }
                    console.log(imgData.length,imgUrl)
                }
                });
            }
            
        })
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
</style>
