<template>
  <div class="foot_list">
      <scroll-view class="filterContent bg_fff mt10" scroll-y="true">  
        <div class="or_list">
          <block v-for="(item,index) in list" :key="index">
          <van-swipe-cell
            :right-width="65"
            async-close
            @close="ReCollections($event,item.Id,index)"
            class="swipe-cell"
          >
            <van-cell-group>
              <van-cell class="item" @click="goDetail(item)">
                <div class="or_item bg_fff flex justifyContentBetween flexAlignCenter pw3">
                    <div class="flex or_main">
                        <img :src="item.PicFrist" alt="" class="shop">
                        <div class="flex1 flex flexAlignCenter mr2 text_left">
                            <div class="or_left flex flexColumn justifyContentBetween">
                              <p>{{item.AssociationName}}111111111111111111111</p>
                              <p class="cr font30 jus-b"><span>￥{{item.Price}} </span><span class="font22 cg">{{item.AddTime}}</span> </p>
                            </div>
                        </div>
                    </div>
                </div>
              </van-cell>
            </van-cell-group>
              <span
                slot="right"
                class="van-swipe-cell__right flex flexAlignCenter justifyContentCenter"
              >删除</span>
            </van-swipe-cell>
          </block>
        </div>
      </scroll-view>
  </div>
</template>

<script>
import {post} from '@/utils'
export default {

  data () {
    return {
      list:[],
      page:1,
      pagesize:12
    }
  },

  onShow(){
    this.list = []
    this.getList()
  },
  methods: {
    getList(){
      post('User/MemberCollectionsList',{
        UserId:wx.getStorageSync("userId"),
        Token:wx.getStorageSync("token"),
        Page:this.page,
        PageSize:this.pagesize,
        Type:0
      }).then(res=>{
        if(res.code===0){
          this.list.push(...res.data)

        }
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
    .or_left{
      height:100%;
      width: 500rpx;
    }
    .line_through{
      text-decoration: line-through;
    }
    .or_main{
      padding:20rpx 0;
    }
  }
}
.van-swipe-cell__right {
  width: 130rpx;
  height: 100%;
  font-size: 28rpx;
  color: #fff;
  text-align: center;
  background-color: #f44;
}
.item /deep/ .van-cell {
  padding: 0 !important;
}
.item /deep/ .van-cell::after,
.swipe-cell::after,
.weui-cell::before,
.swipe-cell /deep/ .van-swipe-cell::before,
.swipe-cell /deep/ .van-swipe-cell::after,
.readList /deep/ .swipe-cell::before,
.readList /deep/ .swipe-cell::after {
  display: none !important;
}
.or_list .or_item {
  position: relative;
}
.or_list .or_item::before,
.or_list .item::before {
  display: none;
}

</style>
