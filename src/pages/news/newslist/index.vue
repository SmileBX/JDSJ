<template>
  <div class="p30">
      <div class="list">
        <block v-for="(item,index) in ShopList" :key="index">
          <div class="item flex-center-start" @click="goUrl(item.id)">
            <div class="item_r">
              <div class="item-top flex-center-between">
                <div class="tit ellipsis">{{item.title}}</div>
              </div>
              <p class="ellipsis">{{item.PubTime}}</p>
            </div>
          </div>
        </block>
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
      ShopList:{}
    }
  },
  onLoad(){
   
  },
  onShow(){
    this.userId = wx.getStorageSync("userId");
    this.token = wx.getStorageSync("token");
    this.GetNoticeList();
  },
  methods: {
      // go详情
      goUrl(id){
        wx.navigateTo({
          url:'/pages/news/newsdetail/main?type=0&id='+id
        })
      },
      // 公告列表
      async GetNoticeList(){
        let res=await post("News/NoticeList",{
          userId: this.userId,
          token: this.token,
          page:1,
          pagesize:999
        })
        if(res.code==0){
          this.ShopList=res.data
        }
      }
  },
  onPullDownRefresh() {
    //监听下拉刷新动作的执行方法，每次手动下拉刷新都会执行一次
    let _this=this;
    this.ShopList={};
    setTimeout(function () {
      _this.GetVisitShopList();
      wx.stopPullDownRefresh();  //停止下拉刷新动画
    }, 1000);
  }
}
</script>

<style scoped lang='scss'>
    .list{
      .item{
        font-size:26rpx;
        background:#fff;
        margin-bottom:20rpx;
        padding:20rpx;
        &>img{
          width:120rpx;
          height:120rpx;
        }
        .item_r{
          margin-left:30rpx;
          width:500rpx;
          .item-top{
            .tit{
              font-size:32rpx;
              line-height:2;
              width:400rpx;
            }
            .inShop{
              border:1rpx solid #ff3333;
              color:#ff3333;
              padding:0 20rpx;
              line-height:2;
              border-radius:30rpx;
            }
          }
          p{
            color:#999;
            line-height:2;
              width:500rpx;
          }
        }
      }
    }
</style>
