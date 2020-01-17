<template>
  <div class="emptybox center" v-if="isShow">
    <div class="iconimg"><img class="icon-nodata" src="http://jd.wtvxin.com/images/images/nodata.png" alt=""></div>
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
    height: 200rpx; width: 200rpx;
    margin: 0 auto; 
  }
</style>

