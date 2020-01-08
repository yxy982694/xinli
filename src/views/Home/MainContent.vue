<template>
    <!-- <toggle-nav></toggle-nav> -->
    <!-- 主内容区域 -->
    <div id="main-container" class="main-content">
      <keep-alive>
       <transition name="fade" mode="out-in">
          <router-view></router-view>
       </transition>
      </keep-alive>
    </div>
</template>

<script>
  // import ToggleNav from "./ToggleNav"
  // import Intro from "../Intro/Intro"
  // export default {
  //   name: 'MainContent',
  //   components:{
  //     ToggleNav,
  //     Intro
  //   },
  // }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .main-content
    height: 100% !important
    overflow: hidden
</style>
