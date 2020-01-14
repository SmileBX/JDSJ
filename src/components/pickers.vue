<template>
  <div class="picker" v-if="show">
    <div class="mask" @click="cancel"></div>
    <div class="pickerBox">
      <div class="head">
        <div class="cancel" @click="cancel">取消</div>
        <div class="confirm" @click="success">确认</div>
      </div>
      <picker-view
        indicator-style="height: 50px;"
        style="height:480rpx;"
        @change="onChange"
      >
        <picker-view-column>
          <div
            v-for="(item,index) in arr"
            :key="index"
            style="line-height: 100rpx;width:100%;text-align:center;"
          >{{item.message}}</div>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>
<script>
export default {
  name: "pickers组件封装,单层级选择",
  props: {
    // 展示状态
    show: {
      type: Boolean,
      default: false
    },
    // 可选的数组
    arr: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      //临时改变的值
      value: ""
    };
  },
  onLoad() {
    console.log(this.arr,'arr')
    this.value = this.arr[0];
    // this.arr.map((item, index) => {
    //   if (this.default === item) {
    //     this.arrIndex[0] = index;
    //   }
    // });
  },
  methods: {
    // 点击确认，返回当前选中的值
    success(e) {
      this.$emit("success", this.value);
      this.$emit("update:show", false);
    },
    cancel() {
      this.$emit("update:show", false);
    },
    // 改变选择的值时
    onChange(e) {console.log(e)
      this.value = this.arr[e.mp.detail.value[0]];
    }
  }
};
</script>
<style  scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}
.pickerBox {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 101;
  background: #fff;
}
.head {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 20rpx;
  color: #999;
  line-height: 80rpx;
  font-size: 30rpx;
  /* border-bottom:1rpx #eee solid; */
}
.head div {
  padding: 0 15rpx;
}
.confirm {
  color: #3172f5;
}
</style>