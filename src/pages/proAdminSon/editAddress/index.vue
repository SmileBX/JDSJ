<template>
  <div class="ca">
      <div class="bpm-box">
        <div class="list ali-c">
          <span>收货人</span>
          <input type="text" placeholder="请输入收货人姓名" v-model="detail.contactName">
        </div>
        <div class="list ali-c">
          <span>手机号码</span>
          <input type="text" placeholder="请输入收货人电话" v-model="detail.tel">
        </div>
        <div class="list ali-c jus-b" @tap="showArea = true">
          <span>所在地区</span>
          <div class="ali-c flex1">
            <input type="text" placeholder="请选择地区" class="flex1" disabled v-model="address">
            <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
          </div>
        </div>
        <div class="list ali-c">
          <span>详细地址</span>
          <input type="text" placeholder="请输入街道门牌等信息" v-model="detail.addr">
        </div>
        <!-- <checkbox-group class="ddd" @tap="change">
          <label class="checkbox">
            <checkbox :checked="isDefault == 1" /><text>设为默认收货地址</text>
          </label>
        </checkbox-group> -->
        <p class="btn" @tap="submit">提交</p>
      </div>
      <van-popup :show="showArea" position="bottom" :overlay="true" @close="showArea = false">
        <van-area :area-list="areaList" @cancel="showArea = false" :value="defaultArea" title="请选择区域" @confirm="confirmArea"/>
      </van-popup>
  </div>
</template>

<script>
import areaList from "@/utils/areaList";
import {post} from '@/utils';
import { formatTime } from '@/utils/index';


export default {
  data () {
    return {
      token: "",
      userId: "",
      ProvinceCode:0,
      ProvinceName:"",
      CityCode:0,
      CityName:"",
      DistrictCode:0,
      DistrictName:"",
      address:"",//地区展示
      areaList,
      showArea: false,
      OrderId:'',//订单号
      detail:'',//订单详情
      defaultArea:'',//默认地区
    }
  },
  onLoad(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.OrderId=this.$mp.query.OrderId||'';
    
    this.initData()
    this.getData();
    wx.setNavigationBarTitle({
      title: "编辑收货地址"
    });
  },
  methods:{
    initData(){
      this.ProvinceCode = ''
      this.ProvinceName = ''
      this.CityCode =''
      this.CityName = ''
      this.DistrictCode = ''
      this.DistrictName = ''
      this.address = ''
    },
    getData(){
      post('Shop/GetOrderDetail',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        OrderId:this.OrderId
      }).then(res=>{
        const data= res.data.OrderInfo;
        this.detail = data;
        this.defaultArea = data.area;
        // 省
        const province_list = this.areaList.province_list;
        Object.keys(province_list).map(item=>{
           if(item==data.province){
             this.ProvinceCode = item;
             this.ProvinceName = province_list[item];
             this.address+=province_list[item];
           }
        })
        // 市
        const city_list = this.areaList.city_list;
        Object.keys(city_list).map(item=>{
           if(item==data.city){
             this.CityCode = item;
             this.CityName = city_list[item];
             this.address+=city_list[item];
           }
        })
        // 区
        const county_list = this.areaList.county_list;
        Object.keys(county_list).map(item=>{
           if(item==data.area){
             this.DistrictCode = item;
             this.DistrictName = county_list[item];
             this.address+=county_list[item];
           }
        })
      })
    },
    confirmArea(area){
        this.showArea = false
        let text = ''
        const areas = area.mp.detail.values
        for(let i=0;i<areas.length;i++){
          text+=areas[i].name
        }
        if(areas[2]){
          this.defaultArea = areas[2].code;
        }else{
          this.defaultArea = areas[1].code;
        }
        this.ProvinceCode=areas[0].code||'',
        this.CityCode=areas[1].code||'',
        this.DistrictCode=areas[2].code||'',
        this.ProvinceName=areas[0].name||'',
        this.CityName=areas[1].name||'',
        this.DistrictName=areas[2].name||'',
        this.address = text;

    },
    submit(){
        const toast = this.jiaoyan();
        if(toast){
            wx.showToast({
              title:toast,
              icon: "none",
              duration: 2000
            });
            return false;
        }
        const detail = this.detail;
        post('Shop/UpdateShippingAddress',{
            userId:this.userId,
            Token: this.token,
            OrderId:this.OrderId,
            ContactName:detail.contactName,
            Tel: detail.tel,
            Addr: detail.addr,
            "Province": this.ProvinceCode,
            "City": this.CityCode,
            "Area": this.DistrictCode
          }).then(res=>{
            wx.showToast({
              title: res.msg
            });
            setTimeout(()=> {
              wx.navigateBack()
              },1500)
        })
            
    },
    jiaoyan(){
      const detail =this.detail;
      if(!detail.contactName){
          return '请输入收货人'
      }
      if(!(/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(detail.tel))){
          return '请输入正确的手机号码'
      }
      if(!this.address){
         return '请选择地区'
      }
      if(!detail.addr){
        return '请输入详细地址'
      }
      return false;
    },
  },
}
</script>

<style lang='scss' scoped>
.ddd{
  margin-top: 20rpx
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
