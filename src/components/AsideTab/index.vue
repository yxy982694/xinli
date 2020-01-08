<template>
  <div class="left-right-container">  <!-- :style="{height: conHeight}" -->
    <el-container class="el-con">
      <div class="left-aside-container">
        <div class="aside-scroll">
          <el-aside width="180px">
            <div v-for="v in leftList" :key="v.id" class="text-item" @click="addSubTab(v.label,v.location,v.id)">
              <p class="aside-title">
                <span class="fa fa-file-text"></span>
                <span>{{ v.label }}</span>
              </p>
            </div>
          </el-aside>
        </div>
        <div class="left-right-splitbar"></div>
      </div>
      <el-container class="el-con2">
        <!-- <i class="iconfont icon-tubiao115"></i> -->
        <el-main>
          <sub-tabs ref="subTabs" :leftList="leftList"></sub-tabs>
        </el-main>
      </el-container>
    </el-container>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import FooterBar from "../../views/Home/FooterBar"
    import '@/common/stylus/childrenTab.styl'
    import SubTabs from "./SubAsideTab/SubTabs"
    export default {
        components:{
            SubTabs,
            FooterBar
        },
        data: function () {
          return {
            // conHeight: null
          }
        },
        props: ['leftList'],
        methods: {
            ...mapMutations({
              'setCenterMenuId': 'setCenterMenuId'
            }),
            addSubTab(targetName,name,id){
              // 点击左侧导航时,获取所点击按钮的id
              this.setCenterMenuId(id)
              // 并把id传到对应的中间部分切换tab的导航中
              // 为了后期在点击切换tab导航时，根据id找到对应平铺按钮的数据
              this.$refs.subTabs.addTab(targetName,name,id)
            },
            // getClientHeight(){
            //   var clientHeight=0
            //   if(document.body.clientHeight&&document.documentElement.clientHeight){
            //   var clientHeight = (document.body.clientHeight<document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight
            //   }else{
            //   var clientHeight = (document.body.clientHeight>document.documentElement.clientHeight)?document.body.clientHeight:document.documentElement.clientHeight
            //   }
            //   return clientHeight
            // }
        },
        mounted() {
          // document.querySelector('.left-right-container').style.height = document.body.clientHeight-131 + 'px'
          // document.querySelector('.el-con').style.height = document.body.clientHeight-150 + 'px'
            // var _this = this
            // this.conHeight = this.getClientHeight() -100 + 'px'
            // window.onresize = function () {
            //   _this.conHeight = _this.getClientHeight() -100 + 'px'
            //   console.log(_this.getClientHeight())
            // }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .left-right-container
    // height: 100vh
    // overflow: hidden
    // background:url('../../common/image/contentImg.png') no-repeat
    // background-size: 100% 100%
    // position: relative
  .el-con
    flex: 1
    overflow: hidden
    position: relative
    display: flex
  .left-aside-container
    width: 180px
    margin-left: 8px
    border: 1px solid $color-border
    position: relative
  .aside-scroll
    font-size: 14px
    height: 100%
    // position: fixed
    // top: 125px
    // left: 5px
    // bottom: 48px
    overflow-x: hidden
    overflow-y: auto
    // overflow: auto

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
  .aside-title
    cursor: pointer
    color: #333
    // color: rgb(191, 203, 217)
    border-bottom: 1px solid $color-border
    height: 46px
    line-height: 46px
    text-align: left
    padding-left: 15px
  .el-con .el-main
    // background-color: #fff
    // background: url('../../common/image/contentImg.png') no-repeat
    // background-size: 100% 100%
    background-color: #f9f9f9
    color: #333
    text-align: center
    overflow: hidden
  .left-right-splitbar
    position: absolute
    top: 0
    bottom: 0
    right: -4px
    width: 5px
    // background: url('../../common/image/mainbox.png')
    z-index: 9999
    cursor: col-resize
  .el-con2
    height: 100%
    overflow: hidden
    position: relative
    margin-left: 1px
    margin-right: 8px
    flex: 1
    // .icon-tubiao115
    //   position: absolute
    //   left: 11px
    //   top: 12px
</style>
