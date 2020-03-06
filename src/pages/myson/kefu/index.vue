<template>
    <div>
        <div class="bg_fff bor20">
            <div class="font30 fb k_item k_bor">常见问题</div>
            <div class=" " v-for="(item,index) in list" :key="index" @click="showmore(item.showAll,index)">
              <div class="flex justifyContentBetween k_item flexAlignCenter">
                  <p class="text_space">{{item.Title}}</p>
                  <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right" :class="{'active':item.showAll}">
              </div>
              <div class="neiyong" v-if="item.showAll"><div v-html="item.Contents"></div></div>
            </div>
        </div>
        <div class="bg_fff pp3 flex justifyContentBetween mt2 flexAlignCenter" @click="goUrl">
          <div class="flex flexAlignCenter">
            <img src="http://jd.wtvxin.com/images/images/icons/k_f.png" alt="" class="sign">
            <span class="ml1">意见反馈</span>
          </div>
          <img src="http://jd.wtvxin.com/images/images/icons/right.png" alt="" class="icon_right">
        </div>
        <div class="kf_bottom bg_fff flex justifyContentAround">
            <div class="cell_kf cell_left"  @click="gophone(Mobile)">
                <p class="flex flexAlignCenter">
                    <img src="http://jd.wtvxin.com/images/images/icons/call.png" alt="" class="call">
                    <span class="font24 ml1">{{Mobile}}</span>
                </p>
                <p class="font20 cg">09:00-22:00</p>
            </div>
            <div class="cell_kf cell_right" @click="gokefu">
                <p class="flex flexAlignCenter">
                    <img src="http://jd.wtvxin.com/images/images/icons/mess.png" alt="" class="call">
                    <span class="font24 ml1">在线客服</span>
                </p>
                <p class="font20">09:00-22:00</p>
            </div>
        </div>
    </div>
</template>

<script>
import {post,get} from "@/utils";
export default {

  data () {
    return {
      showEdit:false,
      page: 1,
      pageSize: 99,
      list:[],
      Mobile:""
    }
  },

  onShow(){
    this.getHelpList()
    this.getMobile()
  },
  methods: {
    getHelpList(){
      post('Help/HelpList',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        page:this.page,
        pagesize:this.pageSize,
      }).then(res=>{
        if(res.code===0){
          res.data.map(item=>{
            this.$set(item,'showAll',false)
          })
          this.list = res.data
        }
      })
    },
    getMobile(){
      get('system/GetWebConfiguration',{}).then(res=>{
        if(res.code===0){
          this.Mobile = res.data.Tel
        }
      })
    },
    showmore(show,index){
      show=!show;
      this.$set(this.list[index],'showAll',show)
    },
    goUrl(){
      wx.navigateTo({
        url:'/pages/myson/feedback/main'
      })
    },
    gokefu(){
      wx.switchTab({
        url:"/pages/service/chatRoom/main"
      });
    },
    gophone(phone){
      wx.makePhoneCall({
        phoneNumber: phone //仅为示例，并非真实的电话号码
      })
    }
  },
}
</script>

<style scoped lang='scss'>
page{
  min-height: auto!important
}
  .k_item{
    padding:20rpx 30rpx;
  }
  .k_bor{
    border-bottom: 1rpx solid #f5f5f5;
  }
  .sign{
    width:32rpx;height:30rpx;
  }
  .call{
    width:30rpx;height:30rpx;
  }
  .kf_bottom{
    position: fixed;bottom:0;padding:30rpx;width:100%;
    box-sizing: border-box;
  }
  .cell_kf{
    width:275rpx;height:80rpx;text-align: center;
    border-radius: 40rpx;
    display: flex;
    flex-direction: column;align-items: center;justify-content: center;
  }
  .cell_left{
    border:1rpx solid #ededed;
  }
  .cell_right{
    background: #f00;color:#ffffff;
  }
  .neiyong{
    background: #f5f5f5;
    padding: 20rpx 30rpx;
    line-height: 1.6;
    color: #666
  }
  .active{
    transform:rotate(90deg);
  }
  .bor20{
    border-top: 20rpx #f2f2f2 solid
  }
</style>
