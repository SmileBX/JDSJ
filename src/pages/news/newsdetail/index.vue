<template>
  <div class="p30">
      <h3>{{title}}</h3>
      <p>{{addtime}}</p>
      <div class="list">
        <div v-html="info"></div>
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
      newsid:"",
      type:0,//0:公告 1:购物须知 2:服务条款
      title:"",
      addtime:"",
      info:""
    }
  },
  onLoad(){
   
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.newsid=this.$mp.query.id;
    this.type=this.$mp.query.type
    if(this.type==0){
      this.GetNoticeInfot();
      wx.setNavigationBarTitle({
        title: '公告详情'
      })
    }else if(this.type==1){
      this.GetShoppingNotice()
      wx.setNavigationBarTitle({
        title: '购物须知'
      })
    }else{
      this.GetServiceContract()
      wx.setNavigationBarTitle({
        title: '服务条款'
      })
    }
    
  },
  methods: {
      // 公告详情
      async GetNoticeInfot(){
        let res=await post("News/NoticeInfo",{
          userId: this.userId,
          token: this.token,
          newsid:this.newsid
        })
        if(res.code==0){
          let newsInfo=res.data[0];
          this.title=newsInfo.title;
          this.addtime=newsInfo.PubTime;
          this.info=newsInfo.Memo.replace(/<img/, "<img style='width:100%;height:auto;margin:8px 0;'")
        }
      },
      // 购物须知
      async GetShoppingNotice(){
        let res=await get("Help/GetShoppingNotice")
        if(res.code==0){
          this.title=res.data.title;
          this.addtime=res.data.addtime.replace(/T/, " ");
          this.info=res.data.contents
        }
      },
      // 服务条款
      async GetServiceContract(){
        let res=await get("Help/GetServiceContract")
        if(res.code==0){
          this.title=res.data.title;
          this.addtime=res.data.addtime.replace(/T/, " ");
          this.info=res.data.contents
        }
      }
  }
}
</script>

<style scoped lang='scss'>
    h3{
      font-size:30rpx;
      line-height:80rpx;
    }
    p{
      text-align: right;
    }
    .list{
      margin-top: 20rpx;
      line-height: 1.6;
    }
</style>
