<template>
  <div>
      <div class="bgf220"></div>
      <div class="addImg p30" @click="uplLoadImg()">
          <img class="proImg" v-if="Pic" :src="Pic" alt="">
          <div class="flex-column-center-center" v-else>
            <img class="icon" src="http://jd.wtvxin.com/images/images/service/addImg.png" alt="">
            <p>点击上传商品图片</p>
          </div>
      </div>
      <div class="bgf220"></div>
      <div class="inputItem bb1">
          <input type="text" placeholder="请输入商品标题(必填)" v-model="title" v-if="!showPopwinStatus">
          <div v-else>{{title}}</div>
      </div>
      <div class="inputItem">
          <input type="text" placeholder="请输入商品价格(必填)" v-model="price" v-if="!showPopwinStatus">
          <div v-else>{{price}}</div>
      </div>
      <div class="p30">
        <div class="ans-maxBtn" @click="ShopServiceLink">生成链接</div>
      </div>
    <!-- 弹窗 -->
      <div class="ans-popwin" v-if="showPopwinStatus">
            <div class="ans-mask" @click="showPopwinStatus = false"></div>
            <div class="ans-main p30">
                <p>{{Url}}</p>
                <div class="btn">复制链接</div>
            </div>
      </div>
  </div>
</template>

<script>
import { post, trim } from "@/utils";
export default {
  data () {
    return {
        userId: "",
		token: "",
        shopid:"",
        showPopwinStatus:false,
        title:'',
        price:'',  
        Pic:'',
        pic64:"",
        Url:'/pages/goodsSon/goodsDetail/main?id='
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
  },
  onShow(){
      this.shopid =wx.getStorageSync("shopid");
  },
  methods: {
      async ShopServiceLink(){
          if(this.verify()){
              let res=await post("WebSocket/ShopServiceLink",{
                UserId: this.userId,
                Token: this.token,
                ShopId:this.shopid,
                ProtuctName:this.title,
                ProtuctPrice:this.price,
                Pic:this.pic64
            })
            if(res.code==0){
                this.showPopwinStatus=true;
                this.Url=this.Url+res.data;
            }else{
                wx.showToast({
                    title: res.msg,
                    icon: "none",
                    duration: 1000
                });
            }
          }
      },
      //验证
      verify(){
        if (trim(this.title) == "") {
            wx.showToast({
            title: "请输入商品标题！",
            icon: "none",
            duration: 1500
            });
            return false;
        }
        if (trim(this.price) == "") {
            wx.showToast({
            title: "请输入商品价格！",
            icon: "none",
            duration: 1500
            });
            return false;
        }
        return true;
      },
    //上传图片
    uplLoadImg(){
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
                    this.Pic=imgUrl;
                    this.pic64=imgData
                    console.log(imgData.length,imgUrl)
                }
                });
            }
            
        })
    },

  }
}
</script>

<style scoped lang='scss'>
    .addImg {
        background:#fff;
        div{
            width:100%;
            height:340rpx;
            border:dashed #999 1rpx;
            border-radius:10rpx;
            background:#fbfbfb;
            img{
                width:130rpx;
                height:115rpx;
            }
            p{
                color:#999;
                font-size:26rpx;
                text-align:center;
                line-height:3;
            }
        }
    }
    .inputItem{
        background:#fff;
        padding:0 30rpx;
        input,div{
            height:90rpx;
            line-height:90rpx;
        }
        div{
            color:#999;
        }
    }
    .ans-maxBtn{
        margin-top:50rpx;
    }
    .ans-main{
        width:500rpx;
        border-radius:20rpx;
        p{
        width:500rpx;
        word-wrap:break-word;
        }
        .btn{
            color:#ff3333;
            width:200rpx;
            margin:30rpx auto 10rpx;
            border:1rpx solid #ff3333;
            padding:0 20rpx;
            line-height:70rpx;
            height:70rpx;
            border-radius:50rpx;
        }
    }
</style>
