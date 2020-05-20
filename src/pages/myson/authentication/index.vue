<template>
  <div class="ca mt_5">
    <div class="list ali-c">
      <span>姓名</span>
      <input type="text" placeholder="请输入真实姓名" v-model="Consignee">
    </div>
    <div class="list ali-c">
      <span>身份证号</span>
      <input type="text" placeholder="请输入身份证号" v-model="IdCard">
    </div>
    
    <p class="btn" @tap="submit">确定</p>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {
  data () {
    return {
      token: "",
      userId: "",
      Consignee:"",//姓名
      IdCard:"",
    }
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    wx.setNavigationBarTitle({
      title: "实名认证"
    });
  },
  methods:{
    initData(){
      this.Consignee = ''
      this.IdCard = ''
    },
    jiaoyan(){
      if(!this.Consignee){
          return '请输入真实姓名'
      }
      if(!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.IdCard))){
          return '请输入正确的身份证格式'
      }
      return false;
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
        post('User/EditUserIDCardAndtUserRName',{
          userId:this.userId,
          Token: this.token,
          IdCard: this.IdCard,
          UserRName: this.Consignee
        }).then(res=>{
            wx.showToast({
              title: res.msg
            });
            setTimeout(()=> {
              this.initData();
              wx.navigateBack() 
            },1500)
        })
    },
  },
}
</script>

<style lang='scss' scoped>
.btn{
  width: 690rpx;
	height: 88rpx;
	background-color: #f00;
	border-radius: 10rpx;
  margin: 50rpx auto;
  font-size: 30rpx;
  color: #fff
}
  .list{
    height: 88rpx;
    border-bottom: 1rpx solid #ededed;
    font-size: 28rpx;
    background: #fff;
    padding: 0 20rpx;
    span{
      color: #333;
      display:inline-block;
      width:25%; 
    }
    img{
      width: 11rpx;
      height: 20rpx;
    }
    input{
      height: 100%;
      width: 75%;
    }
  }

</style>
