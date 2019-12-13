<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <!-- <nav-bar></nav-bar> -->
    <!-- 头部区域 -->
    <head-bar></head-bar>
    <!-- 主内容区域 -->
    <div class="main-footer">
      <main-content></main-content>
      <!-- 底部区域 -->
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
  import HeadBar from "./HeadBar"
  import MainContent from "./MainContent"
  import FooterBar from "./FooterBar"
  export default {
    components:{
      HeadBar,
      MainContent,
      FooterBar,
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .main-footer
    background:url('../../common/image/contentImg.png') no-repeat
    background-size: 100% 100%
    // min-height: calc(100vh-100px)
</style>
