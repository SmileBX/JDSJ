<template>
  <div class="ca">
      <div class="bpm-box">
        <div class="list ali-c">
          <span>收货人</span>
          <input type="text" placeholder="请输入收货人姓名" v-model="Consignee">
        </div>
        <div class="list ali-c">
          <span>手机号码</span>
          <input type="text" placeholder="请输入收货人电话" v-model="Mobile">
        </div>
        <div class="list ali-c jus-b" @tap="choseSite">
          <span>所在地区</span>
          <div class="ali-c flex1">
            <input type="text" placeholder="请选择地区" class="flex1" disabled v-model="address">
            <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
          </div>
        </div>
        <div class="list ali-c">
          <span>详细地址</span>
          <input type="text" placeholder="请输入街道门牌等信息" v-model="FullAddress">
        </div>
        <checkbox-group class="ddd" @tap="change">
          <label class="checkbox">
            <checkbox :checked="isDefault == 1" /><text>设为默认收货地址</text>
          </label>
        </checkbox-group>
        <p class="btn" @tap="submit">{{buttonText}}</p>
      </div>
      <van-popup :show="showArea" position="bottom" :overlay="true" @close="showArea = false">
        <van-area :area-list="areaList" @cancel="showArea = false" title="请选择区域" @confirm="confirmArea"/>
      </van-popup>
  </div>
</template>

<script>
import areaList from "@/utils/areaList";
import {post} from '@/utils'
import { formatTime } from '@/utils/index'


export default {
  data () {
    return {
      token: "",
      userId: "",
      buttonText:'保存',
      Consignee:"",//收货人姓名
      Mobile:"",
      isDefault:0,
      ProvinceCode:0,
      ProvinceName:"",
      CityCode:0,
      CityName:"",
      DistrictCode:0,
      DistrictName:"",
      FullAddress:"",
      address:"",
      areaList,
      showArea: false,
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    const Id = this.$mp.query.id
    console.log(Id,"idiiiii")
    this.initData()
    if(this.$mp.query.id){
        this.buttonText= '修改';
        this.getAddress(Id)
      }
    
  },
  methods:{
    initData(){
      this.Consignee = ''
      this.Mobile = ''
      this.isDefault = ''
      this.ProvinceCode = ''
      this.CityCode =''
      this.DistrictCode = ''
      this.FullAddress = ''
      this.ProvinceName = ''
      this.CityName = ''
      this.DistrictName = ''
      this.address = ''
    },
    choseSite(){
      this.showArea = true
    },
    jiaoyan(){
      if(!this.Consignee){
          return '请输入收货人'
      }if(!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.Mobile))){
          return '请输入正确的手机号码'
      }
      if(!this.address){
         return '请选择地区'
      }if(!this.FullAddress){
        return '请输入详细地址'
      }
      // if(!/^[A-Za-z0-9\u4e00-\u9fa5]+$/ .test(this.FullAddress)){
      //    return "请输入详细地址"
      // }
      return false;
    },
    confirmArea(area){
      console.log(area)
        this.showArea = false
        let text = ''
        const areas = area.mp.detail.values
        for(let i=0;i<areas.length;i++){
          text+=areas[i].name
        }
        this.ProvinceCode=areas[0].code||'',
        this.CityCode=areas[1].code||'',
        this.DistrictCode=areas[2].code||'',
        this.ProvinceName=areas[0].name||'',
        this.CityName=areas[1].name||'',
        this.DistrictName=areas[2].name||'',
        this.address = text;

    },
    change(){
      if(this.isDefault==0){
        this.isDefault = 1
      }else{
        this.isDefault = 0
      }
      
      // console.log(this.isDefault)
    },
    //编辑地址获取对应地址信息
     getAddress(id){
      let that = this;
      post('Address/GetInfo',{
          Id:id,
          userId:that.userId,
          Token: that.token
      }
      ).then(res=>{
          that.Consignee=res.data.name;
          that.Mobile=res.data.tel;
          that.isDefault=res.data.is_def?true:false;
          //
          that.ProvinceCode=res.data.province;
          that.CityCode=res.data.city;
          that.DistrictCode =res.data.district;
          that.FullAddress=res.data.addressinfo;
          that.ProvinceName = res.data.ProvinceName
          that.CityName = res.data.CityName
          that.DistrictName = res.data.DistrictName
          // that.address=res.data.ProvinceName + res.data.CityName + res.data.DistrictName;
          that.address=res.data.addressstr;
      })
          
     
    },
    submit(){
        console.log(this.provinceCode,"城市code")
        const toast = this.jiaoyan()
        console.log(toast)
        if(toast){
            wx.showToast({
              title:toast,
              icon: "none",
              duration: 2000
            });
            return false;
        }
        let objUrl = ''
        let params = {}
        if(this.$mp.query.id){ //编辑地址
          objUrl = 'Address/UpdateAddress'  
          params = {
            userId:this.userId,
            Token: this.token,
            Consignee: this.Consignee,
            Mobile: this.Mobile,
            IsDefault: this.isDefault?1:0,
            ProvinceCode: this.ProvinceCode,
            ProvinceName:this.ProvinceName,
            CityCode: this.CityCode,
            CityName:this.CityName,
            DistrictCode : this.DistrictCode,
            DistrictName:this.DistrictName,
            FullAddress:this.FullAddress,
            Id:this.$mp.query.id
          }
        }else{
          objUrl = 'Address/AddAddress'  
          params = {
            userId:this.userId,
            Token: this.token,
            Consignee: this.Consignee,
            Mobile: this.Mobile,
            IsDefault: this.isDefault?1:0,
            ProvinceCode: this.ProvinceCode,
            ProvinceName:this.ProvinceName,
            CityCode: this.CityCode,
            CityName:this.CityName,
            DistrictCode : this.DistrictCode,
            DistrictName:this.DistrictName,
            FullAddress:this.FullAddress,
          }
        }
        post(objUrl,params).then(res=>{
            wx.showToast({
              title: res.msg
            });
            setTimeout(()=> {
                wx.redirectTo({ url: "/pages/myson2/address/main"});
              },1500)
        })
    
      
    },
  },
}
</script>

<style lang='scss' scoped>
.ddd{
  transform: scale(0.6);
  position: relative;
  left: -135rpx;
  top: 20rpx
}
.checkbox{
  font-size: 50rpx;
  text{
  position: relative;
  top: 6rpx;
  left: 10rpx;
  }
}
.btn{
  width: 690rpx;
	height: 88rpx;
	background-color: #f00;
	border-radius: 10rpx;
  position: fixed;
  bottom: 100rpx;
  font-size: 30rpx;
  color: #fff
}
  .bpm-box{
    height:100vh;
  }
  .list{
    height: 88rpx;
    border-bottom: 1rpx solid #ededed;
    font-size: 28rpx;
    span{
      color: #333;
      display:inline-block;
      width:30%; 
    }
    img{
      width: 11rpx;
      height: 20rpx;
    }
  }

</style>
