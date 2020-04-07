<template>
    <div>
        <div class="pp3 bor20 bg_fff">
            <div class="flex justifyContentBetween fed_title" @click="showEdit=true">
                <p>问题类型</p>
                <p class="flex flexAlignCenter">
                  <span>{{typeTxt}}</span>
                  <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right ml1">
                </p>
            </div>
            <textarea name="" id="" cols="30" rows="10" class="fed_text" placeholder="请输入您的问题或意见" v-model="Content"></textarea>
        </div>
        <div class="mt2 bg_fff pp3">
            <div>上传凭证（不超过5张）</div>
            <div class="fed_pic flex flexWrap">
              <div v-for="(item,pindex) in PicList" :key="pindex" class="picbox">
                <img :src="item" class="pic_itim">
                <span class="close" @click="delImg(pindex)">×</span>
              </div>
              <div class="picbox upBtnImg"  @click="upLoadImg" v-if="isUploadBtn">
                <img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim">
              </div>
            </div>
        </div>
        <div class="mt2 pw3 bg_fff">
            <div class="flex p2 bor_bott">
              <p>联系人</p>
              <input type="text" placeholder="请输入姓名" class="flex1 text_right" v-model="Name">
            </div>
            <div class="flex p2">
              <p>联系方式</p>
              <input type="number" placeholder="请输入联系方式" class="flex1 text_right" v-model="Mobile">
            </div>
        </div>
        <div class="btn" @click="submit">提交</div>
        <pickers v-if="showEdit" :arr="typelist" :show.sync="showEdit" @success="gettype"></pickers>
    </div>
</template>

<script>
import {post,get} from "@/utils";
import { pathToBase64 } from "@/utils/image-tools";
import pickers from '@/components/pickers';
export default {
  components: {pickers},
  data () {
    return {
      showEdit:false,
      typelist:[],
      type:"",
      typeTxt:"请选择",
      Mobile:"",
      Name:"",
      Content:"",
      PicList:[],
      maxPicLen:5,//最多上传
      isUploadBtn:true,//显示上传图片按钮
    }
  },
  onLoad(){
    this.PicList = [];
    this.Name='';
    this.Mobile='';
    this.Content='';
    this.typeTxt='请选择';
    this.getTypelist();
  },
  methods: {
    gettype(e){
      this.type=e.code;
      this.typeTxt=e.message
    },
    getTypelist(){
      get('User/FeedBackType').then(res=>{
        if(res.code===0){
          this.typelist = res.data
        }
      })
    },
    //提交意见反馈
    async FeedBack(base64Arr){
        const res = await post('User/MemberFeedBack',{
            UserId:wx.getStorageSync('userId'),
            Token:wx.getStorageSync('token'),
            Type:this.type,
            Content:this.Content,
            PicList:base64Arr,
            Mobile:this.Mobile,
            Name:this.Name,
        },this.getData);console.log("3333333")
        if(res.code==0){
            wx.showToast({
                title:"提交成功"
            })
            setTimeout(() => {
                // wx.switchTab({
                //   url:"/pages/my/main"
                // });
                wx.navigateBack();
            }, 1500);
        }
    },
    verify(){
        if(this.typeTxt=="请选择"){
            wx.showToast({
            title: '请选择问题类型！',
            icon: 'none',
            duration: 2000
            })
            return false;
        }
        if(this.Content==""){
            wx.showToast({
            title: '请输入建议内容！',
            icon: 'none',
            duration: 2000
            })
            return false;
        }
        if(this.PicList.length==0){
            wx.showToast({
            title: '请上传至少一张图片！',
            icon: 'none',
            duration: 2000
            })
            return false;
        }
        if(this.Name==""){
            wx.showToast({
            title: '请输入您的姓名！',
            icon: 'none',
            duration: 2000
            })
            return false;
        }
        if(this.Mobile ==""){
            wx.showToast({
            title: '请输入联系方式！',
            icon: 'none',
            duration: 2000
            })
            return false;
        }
        return true;
    },
    async submit(){
        if(this.verify()){
            let base64Arr = [];
            if(this.PicList.length>0){
                base64Arr =  await this.base64Img(this.PicList);
            }
            this.FeedBack(JSON.stringify(base64Arr));
        }
    },
    upLoadImg() {
        //上传图片
        let _this = this;
        let num = _this.maxPicLen - _this.PicList.length;
        if(num>0){
            wx.chooseImage({
            //进入这里面的时候this发生了改变
            count: num,
            sizeType: ["compressed"],
            sourceType: ["album", "camera"],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                _this.PicList = _this.PicList.concat(res.tempFilePaths);
                if(_this.PicList.length >= _this.maxPicLen){
                _this.isUploadBtn = false;
                }
            }
            });
        }else{
            _this.isUploadBtn = false;
        }
    },
    delImg(index) {
        this.PicList.splice(index,1);
        this.isUploadBtn = true;
    },
    async base64Img(arr) {
        let base64Arr = [];
        for (let i = 0; i < arr.length; i += 1) {
            const res = await pathToBase64(arr[i]);
            base64Arr.push({
            PicUrl: res
            });
        }
        return base64Arr;
    },
  },
}
</script>

<style scoped lang='scss'>
  .fed_title{
    padding-bottom:30rpx;border-bottom: 1rpx solid #f5f5f5;
  }
  .fed_text{
    padding-top:30rpx;height:200rpx;width:100%;
  }
  .picbox{
    width:25%;
    box-sizing: border-box;
    display: flex;justify-content: center;
    margin-top:20rpx;
    position: relative;
    .close {
        position: absolute;
        width: 32rpx;
        height: 32rpx;
        right: 0;
        top: -16rpx;
        color: #fff;
        background: #b2b2b2;
        border-radius: 50%;
        text-align: center;
        line-height: 32rpx;
        font-size: 32rpx;
    }
  }
  .pic_itim{
    width:144rpx;height:144rpx;
  }
  .bor_bott{
    border-bottom: 1rpx solid #f5f5f5
  }
  .btn{
    color:#ffffff;background: #f00;
    margin:50rpx auto 0rpx;
  }
  .bor20{
    border-top: 20rpx #f2f2f2 solid
  }
</style>
