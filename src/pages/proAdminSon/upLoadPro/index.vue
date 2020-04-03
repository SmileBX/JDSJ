<template>
  <div class="upPro">
    <div class="slider"></div>
    <div class="item flex justifyContentBetween flexAlignCenter bg_fff">
        <div>商品名称</div>
       <input type="text" placeholder="请输入商品名称" class="text_right" v-model="query.Name">
    </div>
    <div class="slider"></div>
    <div class="pw3 img_list bg_fff">
      <div class="title boxSize solid_b">商品图片</div>
      <div class="list flex flexWrap">
        <div class="img" v-for="(item,pindex) in PicList" :key="pindex">
             <img :src="item" alt="">
             <span class="close" @click="delImg(pindex)">×</span>
          </div>
          <div class="img" @click="upLoadImg(2)" v-if="isUploadBtn">
             <img src="/static/upImg.png" alt="">
          </div>
      </div>
    </div>
    <div class="slider"></div>
    <div class="pro_price pw3 bg_fff">
        <div class="title boxSize solid_b">商品售价</div>
        <div class="flex flexAlignCenter mt2">
          <div class="item_left">价格</div>
          <div class="flex flex1 item_rr flexAlignCenter">
              <input type="text" placeholder="请输入金额" class="flex1" v-model="query.Price">
              <span>元</span>
          </div>
        </div>
        <div class="flex flexAlignCenter mt2">
          <div class="item_left">库存</div>
          <div class="flex flex1 item_rr flexAlignCenter">
              <input type="text" placeholder="请填写个数" class="flex1" v-model="query.Stock">
          </div>
        </div>
    </div>
    <div class="slider"></div>
    <div class="other_item bg_fff">
        <div class="item flex justifyContentBetween flexAlignCenter">
          <div>重量</div>
          <input type="text" placeholder="请输入公斤数" class="text_right" v-model="query.Unit">
        </div>
        <div class="item flex justifyContentBetween flexAlignCenter bt">
          <div>上架</div>
          <switch :checked="query.SalesStatus" color="#ff3333" @change="switch1Change"/>
        </div>
        <div class="item flex justifyContentBetween flexAlignCenter bt">
          <div>商品标签</div>
          <div class="flex tags">
              <span class="tag_item" v-for="(item,index) in tagList" :key="index" :class="{'active':activeIndex==index}" @tap="chose(index)">{{item.name}}</span>
          </div>
        </div>
    </div>
    <div class="slider"></div>
    <div class="other_item bg_fff">
        <div class="flex justifyContentBetween flexAlignCenter item" @tap="switchPath('/pages/proAdminSon/choseTypeOne/main')">
          <div>商品分类</div>
          <div class="flex flexAlignCenter">
             <input type="text" disabled placeholder="请选择商品分类" class="text_right" v-model="TypeStr">
             <img src="/static/arrow_r.png" alt="" class="arrow_r mr2">
          </div>
        </div>
        <!--品牌功能暂时不做-->
        <!-- <div class="flex item justifyContentBetween flexAlignCenter">
          <div>商品品牌</div>
          <div class="flex flexAlignCenter">
             <input type="text" placeholder="请选择商品品牌" class="text_right">
             <img src="/static/arrow_r.png" alt="" class="arrow_r mr2">
          </div>
        </div> -->
        <div class="item flex justifyContentBetween flexAlignCenter bt">
          <div>商品描述</div>
          <input type="text" placeholder="非必填" class="text_right" v-model="query.Synopsis">
        </div>
        <div class="img_list bt pw3">
            <div class="title boxSize">商品详情</div>
            <div class="list">
                <div class="img">
                   <img :src="detailPic" alt="" v-if="detailPic">
                  <img src="/static/upImg.png" alt="" v-else @click="upLoadImg(1)">
                </div>
            </div>
        </div>
    </div>

    <div class="btn_up" @click="upPro">立即上传</div>
  </div>
</template>

<script>
import {post,get,wxToast} from '@/utils';
import { pathToBase64 } from "@/utils/image-tools";
import noData from "@/components/noData"; //没有数据的通用提示
export default {
  components: {
		noData,
  },
  data () {
    return {
      tagList:[{id:1,name:'推荐'},{id:2,name:'热门'},{id:3,name:'新品'},{id:4,name:'爆款'}],
      activeIndex:0,//0-推荐 1- 2- 3-
      detailPic:'',//商品详情图片
      PicList:[],
      maxPicLen:6,//最多上传
      isUploadBtn:true,//显示上传图片按钮
      TypeStr:'',//商品分类
      query:{
        UserId: "",
        Token: "",
        ShopId: "",
        Name: "",
        Pictures: "",
        Price: '',
        Stock: '',
        Unit: "",
        SalesStatus: true,
        IsRecommend: 1,
        IsHot: 0,
        IsNewProduct: 0,
        IsExplosive: 0,
        TypeId: 0,//商品类型 都为0
        ClassId: 0, //二级分类id
        ProductBrandId: 0,
        Synopsis:"",
        ContentDetail: ""
      },
      
    }
  },
  onShow(){
    this.query.UserId=wx.getStorageSync("userId");
    this.query.Token=wx.getStorageSync("token");
    this.query.ShopId = wx.getStorageSync("shopid");
    // console.log(this.$mp.query.TypeId,"this.$mp.TypeId")
    // if(this.$mp.query.TypeId){
    //   this.query.TypeId = this.$mp.query.TypeId
    // }
    if(this.$mp.query.ClassId){
       this.query.ClassId = this.$mp.query.ClassId
    }
    if(this.$mp.query.TypeStr){
       this.TypeStr = this.$mp.query.TypeStr
    }
   
  },
  methods: {
      async submit(imglist){
         const res = await post('Shop/AddProduct',this.query)
         if(res.code == 0){
           wx.showToast({title:'上传成功！'})
           this.initData()
         }
      }, 
      async upPro(){
        if(this.valOther()){
          let baseArr = await this.base64Img(this.PicList);
          let baseDetailPic = await this.base64Img(this.detailPic)
          this.query.Pictures = JSON.stringify(baseArr)
          this.query.ContentDetail = baseDetailPic[0].PicUrl
          this.submit()

        }
      },
      async base64Img(arr) {
        let afterArr = [];
        for (let i = 0; i < arr.length; i += 1) {
            const res = await pathToBase64(arr[i]);
            afterArr.push({
              PicUrl: res
            });
        }
        return afterArr;
      },
      valOther(){
        if(this.query.Name == ''){
            wxToast('请输入商品名称！')
            return false
        }
        if(this.PicList.length<=0){
            wxToast('请上传商品图片！')
            return false
        }
        if(this.Price==''){
            wxToast('请输入商品价格！')
            return false
        }
        if(this.Stock==''){
            wxToast('请输入商品库存！')
            return false
        }
        if(this.Unit==''){
            wxToast('请输入商品重量！')
            return false
        }
        if(this.query.TypeId == 0){
            wxToast('请选择商品分类！')
            return false
        }
        if(this.detailPic==''){
            wxToast('请上传商品详情图！')
            return false
        }
        return true
      },
      //商品标签
      chose(i){
        this.activeIndex = i
        switch(i){
          case 0:
            this.query.IsRecommend = 1
            this.query.IsHot = 0
            this.query.IsNewProduct = 0
            this.query.IsExplosive = 0
            break;
          case 1:
            this.query.IsRecommend = 0
            this.query.IsHot = 1
            this.query.IsNewProduct = 0
            this.query.IsExplosive = 0
            break;
          case 2:
            this.query.IsRecommend = 0
            this.query.IsHot = 0
            this.query.IsNewProduct = 1
            this.query.IsExplosive = 0
            break;
          case 3:
            this.query.IsRecommend = 0
            this.query.IsHot = 0
            this.query.IsNewProduct = 0
            this.query.IsExplosive = 1
            break;
          
        }
      },
      //更改是否上架
      switch1Change(e){
        // console.log(e)
        this.query.SalesStatus = e.mp.detail.value
      },
      //上传图片
      upLoadImg(type) {
          //type=1 上传1张 2-上传多张 
          //上传图片
          let _this = this;
          let num = 0
          if(type == 1){
            num = 1
          }else{
            num = _this.maxPicLen - _this.PicList.length;
          }
          if(num>0){
              wx.chooseImage({
              count: num,
              sizeType: ["compressed"],
              sourceType: ["album", "camera"],
              success(res) {
                  // tempFilePath可以作为img标签的src属性显示图片
                  if(type == 2){
                    _this.PicList = _this.PicList.concat(res.tempFilePaths);
                    if(_this.PicList.length >= _this.maxPicLen){
                      _this.isUploadBtn = false;
                    }
                  }else{
                    _this.detailPic = res.tempFilePaths
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
      switchPath(path){
        console.log(path,"path");
        
        wx.navigateTo({
          url:path
        })
      },
      initData(){
        this.PicList = []
        this.detailPic = ''
        this.activeIndex = 0
        this.TypeStr = ''
        this.query = {
          UserId: "",
          Token: "",
          ShopId: "",
          Name: "",
          Pictures: "",
          Price: '',
          Stock: '',
          Unit: "",
          SalesStatus: true,
          IsRecommend: 1,
          IsHot: 0,
          IsNewProduct: 0,
          IsExplosive: 0,
          TypeId: 0,//一级分类
          ClassId: 0, //二级分类
          ProductBrandId: 0,
          Synopsis:"",
          ContentDetail: ""
        }
      }
  },
}
</script>

<style scoped lang='scss'>
  .upPro{
    .item{
      padding:25rpx 30rpx;
    }
    .title{
        padding:25rpx 0;
        
    }
    .solid_b{
      border-bottom: 1rpx solid #f5f5f5;
    }
    .img_list{
       box-sizing: border-box;
      .list{
        padding-bottom:20rpx;
        .img{
          width:152rpx;height:152rpx;
          position: relative;
          margin-right:26rpx;
          margin-top:20rpx;
          &:nth-child(4n){
            margin-right:0
          }
          img{
            width:100%;height:100%;
          }
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
      }
    }
    .pro_price{
      padding-bottom:20rpx;
      .item_left{
        width:10%;
      }
      .item_rr{
        border:1rpx solid #f5f5f5;
        padding:10rpx 20rpx;
        input{
          height:60rpx;
        }
      }
    }
    .other_item{
      .tags{
        .tag_item{
          border:1rpx solid #999999;
          padding:8rpx 25rpx;border-radius:10rpx;
          margin-right:20rpx;
          &:last-child{
            margin-right:0;
          }
          &.active{
            background: #ff3333;color:#ffffff;
            border:none;
          }
        }
      }
      .arrow_r{
        width:12rpx;height:22rpx;
      }
    }
    .btn_up{
      height:88rpx;line-height:88rpx;
      background: #ff3333;color:#ffff;
      width:690rpx;margin:50rpx auto;text-align: center;
      border-radius:25rpx;
    }
    .p25{
      padding:25upx 0;
    }
  }
</style>
