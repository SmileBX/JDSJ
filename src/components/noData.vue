<template>
  <div class="emptybox center" v-if="isShow">
    <div class="iconimg"><span class="iconfont icon-nodata"></span></div>
    <p class="tips">{{tisTxt}}</p>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
			default: false
    },
    tisTxt: {
      type: String,
      default: "暂无数据"
    }
  },
  onShow() {
    
  },
  created() {},
  mounted() {},
  data() {
    return {};
  },
  components: {},
  methods: {},
  computed: {}
};
</script>
<style lang='scss' scoped>
  .emptybox{
    padding-bottom: 80rpx;
    padding-top:180rpx;
    margin-top:0 !important;
  }
  .emptybox .tips{
    margin-top: 30rpx; color: #999;
  }
  .icon-nodata{
    font-size: 160rpx; line-height: 1;color: #999; 
  }
</style>

