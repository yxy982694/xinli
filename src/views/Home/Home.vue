<template>
  <div class="container">
    <!-- 导航菜单栏 -->
    <!-- <nav-bar></nav-bar> -->
    <!-- 头部区域 -->
    <head-bar></head-bar>
    <toggle-nav></toggle-nav>
    <!-- 主内容区域 -->
    <div class="main-footer">
      <main-content></main-content>
      <!-- 底部区域 -->
      <!-- <footer-bar></footer-bar> -->
    </div>
  </div>
</template>

<script>
  import ToggleNav from "./ToggleNav"
  import HeadBar from "./HeadBar"
  import MainContent from "./MainContent"
  import FooterBar from "./FooterBar"
  export default {
    components:{
      HeadBar,
      MainContent,
      FooterBar,
      ToggleNav
    },
    computed: {
      routerId: {
        get: function () {
          return this.$store.state.routerIdData.routerId
        },
        set: function () {}
      },
    },
    mounted: function () {
      let _this = this
      // document.querySelector('.main-footer').style.height = document.body.clientHeight-100 + 'px'
      window.addEventListener('resize',function () {
        setTimeout(function () {
          // document.querySelector('.main-footer').style.height = document.body.clientHeight-100 + 'px'
          // if (document.querySelector('.el-con')) {
          //   document.querySelector('.el-con').style.height = document.body.clientHeight-150 + 'px'
          // }
          // if (document.querySelector('.left-right-container')) {
          //   document.querySelector('.left-right-container').style.height = document.body.clientHeight-131 + 'px'
          // }
          // if (document.querySelector('.tab-iframe')) {
          //   document.querySelector('.tab-iframe').style.height = document.body.clientHeight-133 + 'px'
          // }
          // if (document.querySelector('.el-con .el-tabs__content')) {
          //   document.querySelector('.el-con .el-tabs__content').style.height = document.body.clientHeight-190 + 'px'
          // }
        },300)

      })
    },
    methods: {

    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .container
     height: 100%
     display: flex
     flex-direction: column
  .main-footer
    flex: 1
    background-color: $color-home
    // background:url('../../common/image/contentImg.png') no-repeat
    // background-size: 100% 100%
    // height: calc(100% - 60px)
    overflow: hidden
</style>
