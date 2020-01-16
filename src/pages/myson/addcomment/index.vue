<template>
  <div class="foot_list">
      <div class="or_list mt2">
        <div class="or_item bg_fff mt2 pw3">
            <div class="flex or_main">
                <img :src="shopInfo.ProductImg" alt="" class="shop">
                <div class="flex1 flex flexAlignCenter mr2">
                    <div class="or_left flex flexColumn justifyContentBetween">
                      <div>
                        <p>{{shopInfo.ProductName}}</p>
                        <p class="cg font24 mt1">规格：{{shopInfo.ProductSkuName}}</p>
                      </div>
                    </div>
                </div>
            </div>
            <!--评分-->
            <div class="flex flexAlignCenter mt2">
              <span class="mb1">评分</span>
              <span class="ml1 flex">
                  <div v-for="(item, index) in 5" :key="index" @click="cliScore(index)">
                    <img src="http://jd.wtvxin.com/images/images/icons/xh.png" alt="" v-if="score>index" class="xing">
                    <img src="http://jd.wtvxin.com/images/images/icons/xg.png" alt="" v-else class="xing">
                  </div>
              </span>
              <span class="mb1">{{score==5?'非常满意':score==4?'满意':score==3?'一般':score==2?'差':'很差'}}</span>
            </div>
            <!--遇到的问题-->
            <!-- <div class="mt2">
                <p class="cg font24">请选择您遇到的问题</p>
                <div class="mt2 flex flexWrap">
                    <p v-for="(item,oll) in plist" :key="oll" class="pp_item" :class="{'active':oll==1}">{{item.name}}</p>
                </div>
            </div> -->
            <textarea name="" id="" cols="30" rows="10" class="com_text mt1" placeholder="填写您对商品的评价~" v-model="text"></textarea>
            <div class="p3" style="border-bottom:1rpx solid #ededed">
            <!-- <div>上传图片（不超过5张）</div> -->
                <div class="fed_pic flex flexWrap">
                  <div v-for="(item,index) in imgList" :key="index" class="picbox">
                    <span class="flexc" @click="deleteImg(index)">+</span>
                    <img :src="item.PicUrl" alt="" class="pic_itim">
                  </div>
                  <div class="picbox upBtnImg" @click="changeImg()" v-if="imgList.length<5">
                    <img src="http://jd.wtvxin.com/images/images/icons/add2.png" alt="" class="pic_itim">
                  </div>
                </div>
            </div>
            <div class="porela" @click="pub()">
                <p>提交</p>
            </div>
        </div>
      </div>
      
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      // plist:[{id:1,name:'商品问题'},{id:1,name:'客服问题'},{id:1,name:'包装问题'},{id:1,name:'物流问题'},{id:1,name:'其他'}],
      score:5,
      shopInfo:{},
      text:'',
      imgList:[]
    }
  },
  onLoad(){
    this.imgList = []
  },
  onShow(){
    console.log(this.$mp.query) 
    this.getDetail()
  },
  watch: {
    imgList(e){
      console.log(e)
    }
  },
  methods: {
    pub(){
      if(this.text){
        post('Order/CommentProduct',{
          UserId:wx.getStorageSync("userId"),
          Token:wx.getStorageSync("token"),
          OrderNo:this.$mp.query.id,
          OrderDetailId:this.$mp.query.goodsId,
          ProductStarNum:this.score,
          LogisticsStarNum:this.score,
          ServiceStarNum:this.score,
          Content:this.text,
          PicList:JSON.stringify(this.imgList)
        }).then(res=>{
          if(res.code===0){
            wx.showToast({
              icon:'none',
              title:res.msg
            })
            setTimeout(() => {
              wx.switchTab({
                url: '/pages/my/main'
              })
            }, 300);
          }
        })
      }else{
        wx.showToast({
          icon:'none',
          title:'您还没输入评论内容呢~'
        })
      }
    },
    deleteImg(index){
      this.imgList.splice(index,1)
    },
    changeImg(){
      let _this = this
      wx.chooseImage({
        count: 5-this.imgList.length,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          res.tempFilePaths.map(item=>{
            _this.imgList.push({PicUrl:"data:image/png;base64,"+wx.getFileSystemManager().readFileSync(item,"base64")})
          })
        }
      })
    },
    cliScore(index){//评分
      this.score = index+1
    },
    getDetail(){
      post('Order/OrderDetails',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderNo:this.$mp.query.id,
      }).then(res=>{
        // this.shopInfo = res.data
        res.data.orderDetails.forEach(item=>{
          if(item.Id==this.$mp.query.goodsId){
            this.shopInfo = item
          }
        })
      })
    },
    goUrl(url,param){
      wx.navigateTo({
        url:url+'?id='+param
      })
    },

    
  },
}
</script>

<style scoped lang='scss'>
.or_list{
  .shop{
    width:161rpx;height:161rpx;
  }
  .or_item{
    margin-top:20rpx;
    .or_left{
      height:100%;
    }
    .or_main{
      padding:20rpx 0;
    }
  }
  .xing{
    width:42rpx;height:40rpx;
    margin-right:10rpx;
  }
  .mb1{
    margin-bottom: 10rpx;
  }
  
}
.pp_item{
  font-size:24rpx;
  padding:8rpx 20rpx;
  border:1rpx solid #ededed;border-radius: 10rpx;
  margin-right:25rpx;
  margin-top:10rpx;
  &:nth-child(4n){
    margin-right: 0;
  }
  &.active{
    border:1rpx solid #f00;color:#f00;
  }
}
.com_text{
  padding:20rpx;height:200rpx;
}
.picbox{
    width:25%;
    box-sizing: border-box;
    display: flex;justify-content: center;
    margin-top:20rpx;
    position: relative;
    span{
      position: absolute;
      width: 30rpx;
      height: 30rpx;
      background-color: #ff3333;
      color: #fff;
      border-radius: 50%;
      top: 0rpx;
      right: 0rpx;
      transform: rotate(45deg);
      font-weight: 900;
      font-size: 34rpx;
    }
  }
  .pic_itim{
    width:144rpx;height:144rpx;
  }
  .porela{
    padding:20rpx 0;position: relative;height:104rpx;
    p{
      width:184rpx;height:64rpx;color:#444444;border:1rpx solid #444444;
      border-radius: 10rpx;text-align: center;line-height: 64rpx;
      position: absolute;right:0;
    }
  }

</style>
