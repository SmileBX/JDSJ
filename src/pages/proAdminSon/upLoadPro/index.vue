<template>
  <div class="upPro">
    <div class="slider"></div>
    <div class="item flex justifyContentBetween flexAlignCenter bg_fff">
        <div>商品名称</div>
       <input type="text" placeholder="请输入商品名称" class="text_right">
    </div>
    <div class="slider"></div>
    <div class="pw3 img_list bg_fff">
      <div class="title boxSize">商品图片</div>
      <div class="list">
          <div class="img">
             <img src="/static/upImg.png" alt="">
          </div>
      </div>
    </div>
    <div class="slider"></div>
    <div class="pro_price pw3 bg_fff">
        <div class="title boxSize">商品售价</div>
        <div class="flex flexAlignCenter mt2">
          <div class="item_left">价格</div>
          <div class="flex flex1 item_rr flexAlignCenter">
              <input type="text" placeholder="请输入金额" class="flex1">
              <span>元</span>
          </div>
        </div>
        <div class="flex flexAlignCenter mt2">
          <div class="item_left">库存</div>
          <div class="flex flex1 item_rr flexAlignCenter">
              <input type="text" placeholder="请填写个数" class="flex1">
          </div>
        </div>
    </div>
    <div class="slider"></div>
    <div class="other_item bg_fff">
        <div class="item flex justifyContentBetween flexAlignCenter">
          <div>重量</div>
          <input type="text" placeholder="请输入公斤数" class="text_right">
        </div>
        <div class="item flex justifyContentBetween flexAlignCenter bt">
          <div>上架</div>
          <switch checked color="#ff3333" bindchange="switch1Change"/>
        </div>
        <div class="item flex justifyContentBetween flexAlignCenter bt">
          <div>商品标签</div>
          <div class="flex tags">
              <span class="tag_item">推荐</span>
              <span class="tag_item">热门</span>
              <span class="tag_item">新品</span>
              <span class="tag_item active">爆款</span>
          </div>
        </div>
    </div>
    <div class="slider"></div>
    <div class="other_item pw3 bg_fff">
        <div class="item flex justifyContentBetween flexAlignCenter">
          <div>商品分类</div>
          <div class="flex flexAlignCenter">
             <input type="text" placeholder="请选择商品分类" class="text_right">
             <img src="/static/arrow_r.png" alt="" class="arrow_r mr2">
          </div>
        </div>
        <div class="item flex justifyContentBetween flexAlignCenter bt">
          <div>重量</div>
          <input type="text" disabled placeholder="非必填" class="text_right">
        </div>
        <div class="img_list bt">
            <div class="title boxSize">商品图片</div>
            <div class="list">
                <div class="img">
                  <img src="/static/upImg.png" alt="">
                </div>
            </div>
        </div>
    </div>

    <div class="btn_up">立即上传</div>
    
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
      noDataIsShow:false,
     
    }
  },
  onShow(){
    this.userId=wx.getStorageSync("userId");
    this.token=wx.getStorageSync("token");
   
  },
  methods: {
   
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
        border-bottom: 1rpx solid #f5f5f5;
    }
    .img_list{
       box-sizing: border-box;
      .list{
        padding:20rpx 0;
        .img{
          width:152rpx;height:152rpx;
          img{
            width:100%;height:100%;
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
  }
</style>
