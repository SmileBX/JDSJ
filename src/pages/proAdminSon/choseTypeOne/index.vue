<template>
  <div class="pro_type">
    <div class="slider"></div>
      <scroll-view scroll-y style="padding-bottom:100rpx;"> 
          <div class="list2 bg_fff">
            <div v-for="(item,index) in typeList" :key="index" class="">
              <div class="item2 flex justifyContentBetween flexAlignCenter"  @click="showDetail(item,index)">
                  <div :class="{'active':index==activeIndex}">{{item.ParentClassInfo.ClassName}}</div>
                  <block v-if="item.SubClassInfoList.length>0">
                    <img src="/static/arrow_r.png" alt="" class="img" v-if="!item.isShow">
                    <img src="/static/arrow_d.png" alt="" class="img2" v-else>
                  </block>
                  <div v-else>
                    <radio color="#ffffff" :checked="index==activeIndex" :value="item.Id" ></radio>
                  </div>
              </div>
              <!---切换展示-->
              <div class="list pw3" v-if="item.isShow" style="background:#f5f5f5">
                <radio-group v-if="item.SubClassInfoList.length>0">
                  <label >
                    <div class="item flex justifyContentBetween flexAlignCenter" v-for="(dll,key) in item.SubClassInfoList" :key="key" @tap="choseType(index,dll)">
                        <div>{{dll.ClassName}}</div>
                        <radio color="#ffffff" :checked="dll.isCheck" :value="dll.Id" ></radio>
                    </div>
                  </label>
                </radio-group>
                <!-- <div v-else style="padding:25rpx;text-align:center">暂无分类</div> -->
              </div>
            </div>
          </div>
      </scroll-view>
    <div class="btn_sure" @tap="sureChose">确定</div>
    <noData :isShow="noDataIsShow"></noData>
  </div>
</template>

<script>
import {post,get} from '@/utils'
import noData from "@/components/noData"; //没有数据的通用提示
export default {
  components: {
		noData,
  },
  data () {
    return {
      userId: "",
      token: "",
      typeList:[],
      activeIndex:0,
      TypeId: 0,//一级分类
      ClassId: 0, //二级分类
      oneType:'',//
      twoType:'',
      istwo:false,//当前是否有二级分类
    }
  },
  onShow(){
    this.userId=wx.getStorageSync("userId");
    this.token=wx.getStorageSync("token");
    this.getTypeList()
   
  },
  methods: {
    sureChose(){
      if(this.istwo){
        if(this.ClassId == ''){
          wx.showToast({
            title:'请选择分类！',
            icon:'none'
          })
          return false
        }
      }else{
        if(this.TypeId == ''){
          wx.showToast({
            title:'请选择分类！',
            icon:'none'
          })
          return false
        }
      }
        // 现在是每点击一次一级分类就会重置，这个方法用于解决这个问题
        this.typeList.map(item=>{
          item.SubClassInfoList.map(son=>{
            if(son.Id===this.ClassId){
              this.TypeId = item.ParentClassInfo.Id;
              this.oneType = item.ParentClassInfo.ClassName;
            }
          })
        })
        let str='',cid='';
        this.twoType?(cid=this.ClassId):(cid=this.TypeId);
        this.twoType?(str = this.oneType + ' , ' + this.twoType):(str = this.oneType);
        wx.redirectTo({
          url:'/pages/proAdminSon/upLoadPro/main?TypeId='+this.TypeId+"&ClassId="+cid+"&TypeStr="+str
        })
    },
   
    //展示详情
			showDetail(item,i){
        this.activeIndex = i;
        this.typeList.map((value,index)=>{
          if(index == i){
            if(value.isShow){
              this.$set(value,"isShow",false)
            }else{
              this.$set(value,"isShow",true)
            }
          }else{
            this.$set(value,"isShow",false)
          }
        })
        if(item.SubClassInfoList.length){
          this.istwo=true;
        }else{
          this.istwo=false;
        }
        this.TypeId = item.ParentClassInfo.Id
        this.oneType = item.ParentClassInfo.ClassName
        console.log(this.TypeId,"typeId66666666666")
        // this.getDetail(item)
        
      },
      //选择二级分类
      choseType(i,value){
        // console.log(i,value,"..........")
        let arr = this.typeList[i].SubClassInfoList
        for(let key in arr){
          if(arr[key].Id == value.Id){
            arr[key].isCheck = true
          }else{
            arr[key].isCheck = false
          }
        }
        this.ClassId = value.Id
        this.twoType = value.ClassName
      },
      async getTypeList(){
        const res = await post('Goods/GetAllProductClass',{typeId:0}).then(res=>{
          if(res.code == 0){
            res.data.map(item=>{
              this.$set(item,"isShow",false)
              if(item.SubClassInfoList){
                let arr = item.SubClassInfoList
                arr.map(value=>{
                  this.$set(value,"isCheck",false)
                })
              }
						})
            this.typeList = res.data
            this.TypeId = res.data[0].ParentClassInfo.Id
            this.oneType = res.data[0].ParentClassInfo.ClassName
          }
        })
      }
  },
}
</script>

<style scoped lang='scss'>
  .pro_type{
    height:100vh;
    .list{
      .item{
        padding:25rpx 0;border-bottom:1rpx solid #f5f5f5;
        .img{
          width:12rpx;height:22rpx;
        }
      }
    }
    .list2{
      .item2{
        padding:25rpx 30rpx;border-bottom:1rpx solid #f5f5f5;
        .img{
          width:12rpx;height:22rpx;
        }
      }
    }
  }
  .img2{
    width:40rpx;height:40rpx;
  }
  .btn_sure{
    position: fixed;bottom:0;
    width:100%;
    height:88rpx;line-height: 88rpx;
    background: #ff3333;
    color:#ffffff;text-align: center;
  }
  .active{
    color:#ff3333;
  }
</style>
