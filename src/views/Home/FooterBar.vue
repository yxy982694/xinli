<template>
  <div class="footer-container">
    <p class="foot-info">
      <span>版权所有:中国移动通信集团河南有限公司</span>
      <span class="info-text">技术支持:杭州东方通信软件技术有限公司</span>
      <span class="info-text">服务热线:15936252150</span>
    </p>
  </div>
</template>
<script>
  export default {
    mounted: function () {
      console.log('FooterBar.vue mounted')
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .footer-container
    background-color: #d5dee6
    margin-top: 15px
  .foot-info
    font-size: $font-size-small
    padding: 10px 0
    color: #6c7382
  .info-text
    margin-left: 60px
</style>
