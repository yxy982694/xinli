<template>
  <div id="main-container" class="main-container">
    <toggle-nav></toggle-nav>
    <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
       <transition name="fade" mode="out-in">
          <router-view></router-view>
       </transition>
      </keep-alive>
      <p class="foot-info font-smallnum">
        <span>版权所有:中国移动通信集团河南有限公司</span>
        <span class="info-text">技术支持:杭州东方通信软件技术有限公司</span>
        <span class="info-text">服务热线:15936252150</span>
      </p>
    </div>

  </div>
</template>

<script>
  import ToggleNav from "./ToggleNav"
  export default {
    name: 'MainContent',
    components:{
      ToggleNav
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .main-container
    background:url('../../common/image/contentImg.png') no-repeat
    background-size: 100% 100%
  // .main-content
  //     padding: 0 15px
  .foot-info
    padding: 30px 0 20px 0
  .info-text
    margin-left: 60px
</style>
