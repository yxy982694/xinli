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
          if (document.querySelector('.left-right-container')) {
            document.querySelector('.left-right-container').style.height = document.body.clientHeight-131 + 'px'
          }
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
  .container
     height: 100%
     display: flex
     flex-direction: column
  .main-footer
    flex: 1
    background-color: #f0f2f5
    // background:url('../../common/image/contentImg.png') no-repeat
    // background-size: 100% 100%
    // height: calc(100% - 60px)
    /* IE 浏览器 */
    /*三角箭头的颜色*/
    scrollbar-arrow-color: #fff
    /*滚动条滑块按钮的颜色*/
    scrollbar-face-color: #0099dd
    /*滚动条整体颜色*/
    scrollbar-highlight-color: #0099dd
    /*滚动条阴影*/
    scrollbar-shadow-color: #0099dd
    /*滚动条轨道颜色*/
    scrollbar-track-color: #0066ff
    /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
    scrollbar-3dlight-color:#0099dd
    /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
    scrollbar-darkshadow-color: #0099dd
    /*滚动条基准颜色*/
    scrollbar-base-color: #0099dd
    /* chrome & safari 浏览器 */
    &::-webkit-scrollbar
      width: 6px
      height: 6px
      background: transparent
    &::-webkit-scrollbar-thumb
      background: transparent
      border-radius: 4px
    &:hover::-webkit-scrollbar-thumb
      background: hsla(0, 0%, 53%, 0.4)
    &:hover::-webkit-scrollbar-track
      background: hsla(0, 0%, 53%, 0.1)
    overflow: auto
</style>
