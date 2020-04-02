<template>
  <div class="index-list">
    <scroll-view
      scroll-y="true"
      class="moreHeight"
      :scroll-into-view="scrollTopId"
      scroll-with-animation
      @scroll="onListWrapScroll"
      ref="indexWrap"
      id="scroll"
    >
      <!-- <ul class="index-list-wrap" ref="indexWrap" @scroll="onListWrapScroll"> -->

      <ul class="index-list-wrap">
        <li
          v-for="(group,nindex) in data"
          :key="nindex"
          class="index-group"
          ref="indexGroup"
          :data-title="group.title"
          :id="'itemClient'+(nindex*1)"
        >
          <h3 class="index-group-title">{{group.title}}</h3>
          <ul>
            <li @click="clickItem(item)" v-for="(item,sindex) in group.items" :key="sindex" class="index-group-item">
                <img v-if="useLazyLoad"  :src="item.avatar" class="avatar" alt="">
                <!-- <img v-else :src="item.avatar" class="avatar" alt=""> -->
                <span class="name">{{item.NickName}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </scroll-view>
    <!--字母-->
    <div class="index-nav">
      <ul>
        <li
          v-for="(item,index) in indexList"
          :key="index"
          @touchstart.prevent="_onTouchStartIndex(index)"
          :data-index="index"
          class="nav-item"
          :class="{'active':currentIndex===index}"
        >{{item}}</li>
      </ul>
    </div>
    <!-- <transition name="fade">
      <div class="index-indicator" v-show="moving">{{currentIndicator}}</div>
    </transition>-->
  </div>
</template>
<script type="text/javascript">
const INDICATOR_INDURATION = 200;
const TITLE_HEIGHT = 30;

export default {
  // name: 'index-list',
  // props: {
  //   data: {
  //     type: Array,
  //     default: function() {
  //       return [];
  //     }
  //   },
  //   hasSetStar: {
  //     type: Boolean,
  //     default: false
  //   },
  //   useLazyLoad: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  // props:["playerList"],
  data() {
    return {
      data:[
        {title:'A',items:[
          {
            Headimgurl:'',NickName:'哈哈'
          },
          {
            Headimgurl:'',NickName:'洗洗'
          }
        ]},
        {title:'B',items:[
          {
            Headimgurl:'',NickName:'哈哈'
          },
          {
            Headimgurl:'',NickName:'洗洗'
          },
          {
            Headimgurl:'',NickName:'hehe'
          }
        ]}
        
      ],
      scrollTopId: "", //置顶id----没用上
      scrollTop: "",
      currentIndex: 0,
      moving: false,
      currentIndicator: "",
      listHeight:[],
    };
  },
  watch: {
    currentIndex(newVal) {
      clearTimeout(this.timer);
      this.currentIndicator = this.indexList[this.currentIndex];
      this.moving = true;
      this.timer = setTimeout(() => {
        this.moving = false;
      }, INDICATOR_INDURATION);
    }
  },
  computed: {
    //右侧字母组合
    indexList() {
      //console.log(this.data,"this.data")
      return this.data.map(group => {
        return group.title.substring(0, 1);
      });
    }
  },
  onLoad() {
    console.log('执行了onLoad')
    this.data
    this.listHeight = [];
    this.timer = null;
    this.scrollTimer = null;
      this.time100();
  },
  methods: {
    time100(){
      setTimeout(() => {
        if(this.data&&this.data.length>0){
          this._calculateHeight();
          console.log('完成',this.data)
        }else{
          this.time100();
        }
      }, 100);
    },
    _calculateHeight() {
      this.listHeight = [];
      const list = this.data;
      let height = 0;
      this.listHeight.push(height);
      const that = this;
      for (let i = 0; i < list.length; i++) {
        var query = wx.createSelectorQuery();
        query
          .select("#itemClient" + i)
          .boundingClientRect(rect => {
            if (rect) {
              height += rect.height;
              that.listHeight.push(height);
            }
          })
          .exec();
      }
    },
    _onTouchStartIndex(index) {
      this.scrollTopId='itemClient'+index
      this.currentIndex = index;
      // this.scrollTop = this.listHeight[index];
      // console.log(index,this.listHeight,this.listHeight[index],"this.listHeight[index]")
      // this.currentIndex = index;
      // var query = wx.createSelectorQuery();
      // query
      //   .select("#scroll")
      //   .boundingClientRect(rect => {
      //     this.scrollTop = this.listHeight[index];
      //   })
      //   .exec();
    },
    //选择
    clickItem(e, item) {
      console.log(e);
      //console.log(666666666)
      this.$emit("choose", item);
    },
    // 点击列表事件
    onClick(item) {
      this.$emit("onClick", item);
    },
    resetStar(id, isStar, pIndex, index) {
      this.$emit("setStar", id, isStar, pIndex, index);
    },
    Delete(id, pIndex, index) {
      this.$emit("btnDel", id, pIndex, index);
    },
    onListWrapScroll(e) {
      // console.log(e,"+++++++++++++++++++++++")
      // clearTimeout(this.scrollTimer);
      // this.scrollTimer = setTimeout(() => {
        // let scrollTop = this.$refs.indexWrap.scrollTop
        let scrollTop = e.mp.detail.scrollTop;
        // let scrollTop = this.scrollTopId
        const listHeight = this.listHeight;
        for (let i = 0; i < listHeight.length; i++) {
          if (
            scrollTop <= (listHeight[i + 1] - TITLE_HEIGHT) &&
            scrollTop >= listHeight[i]
          ) {
            // this.scrollTopId = 'itemClient'+i;
            this.currentIndex = i;
            // console.log(this.currentIndex,"i+++++++++")
            return;
          }
        }
      // }, 10);
    }
  }
  // destroyed() {
  //   clearTimeout(this.timer)
  //   clearTimeout(this.scrollTimer)
  // }
};
</script>

<style lang="scss" scoped>
// .moreHeight {
//   height: calc(100vh - 350rpx);
// }
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  .index-list-wrap {
    // height: 100%;
    // overflow: auto;
    -webkit-overflow-scrolling: touch; //#issue-368550974
  }

  .index-group {
    padding-bottom: 20rpx;
  }

  .index-group-title {
    height: 60rpx;
    line-height: 60rpx;
    padding-left: 40rpx;
    font-size: 28rpx;
    color: #333;
    background: #f2f2f2;
  }

  .index-group-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0 ;
    border-bottom: 1rpx solid #f5f5f5;
    list-style: none;
    // .avatar {
    //   width: 80rpx;
    //   height: 80rpx;
    //   border-radius: 50%;
    // }

    .name {
      margin-left: 30rpx;
      color: #333;
      font-size: 28rpx;
    }
  }
  .index-group-item:after {
    position: absolute;
    content: "";
    height: 1px;
    width: 100%;
    background: #ececec;
    bottom: 0;
  }
  .index-nav {
    position: absolute;
    right: 15rpx;
    top: 42%;
    z-index: 100;
    width: 40rpx;
    padding: 30rpx 0;
    text-align: center;
    border-radius: 10;
    background: transparent;
    transform: translateY(-50%);

    .nav-item {
      padding: 5rpx;
      font-size: 22rpx;
      color: #333;
      list-style: none;
      width:30rpx;height:30rpx;
      line-height: 30rpx;

      &.active {
        color: #fff;
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        line-height: 28rpx;
        background: #ff3333;
      }
    }
  }

  .index-indicator {
    position: absolute;
    width: 100rpx;
    height: 100rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 100rpx;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 35rpx;
    border-radius: 10rpx;
    pointer-events: none;
  }
}

.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.van-swipe-cell__left,
.van-swipe-cell__right {
  display: inline-block;
  // height: 100%;
  width: 130rpx;
  height: 120rpx;
  font-size: 28rpx;
  line-height: 120rpx;
  color: #fff;
  text-align: center;
  background-color: #f44;
  position: relative;
  vertical-align: top;
  .icon-star {
    width: 40rpx;
    height: 40rpx;
    position: absolute;
    top: 50%;

    left: 0;
    right: 0;
    margin: 0 auto;
    margin-top: -20rpx;
  }
}
.van-swipe-cell__right1 {
  background-color: #ff952e;
}
.index-group {
  padding-bottom: 0 !important;
}
.swipe-cell .index-group-item {
  padding: 0;
}
</style>
