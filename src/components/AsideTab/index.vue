<template>
  <el-container class="el-con">
    <el-aside width="180px">
      <div v-for="v in leftList" :key="v.location" class="text-item" @click="addSubTab(v.label,v.location,v.id)">
        <p class="aside-title">
          <span class="el-icon-thumb"></span>
          <span>{{ v.label }}</span>
        </p>
      </div>
    </el-aside>
    <el-container class="el-con2">
      <el-main>
        <sub-tabs ref="subTabs" :leftList="leftList"></sub-tabs>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import { mapMutations } from 'vuex'
    import '@/common/stylus/childrenTab.styl'
    import SubTabs from "./SubAsideTab/SubTabs"
    export default {
        components:{
            SubTabs
        },
        props: ['leftList'],
        methods: {
            ...mapMutations({
              'setCcenterMenuId': 'setCcenterMenuId'
            }),
            addSubTab(targetName,name,id){
              this.setCcenterMenuId(id)
              this.$refs.subTabs.addTab(targetName,name)
            }
        },
        mounted() {

        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .el-aside
    font-size: 14px
    background-color: rgb(205,244,253)
    // background-color: rgb(48, 65, 86)
    position: fixed
    top: 100px
    left: 0
    bottom: 62px
    overflow-x: hidden
    overflow-y: auto
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
  .aside-title
    cursor: pointer
    color: #333
    // color: rgb(191, 203, 217)
    border-bottom: 1px solid $color-lightgray
    height: 56px
    line-height: 56px
    text-align: left
    padding-left: 15px
  .el-main
    // background-color: #fff
    background: url('../../common/image/contentImg.png') no-repeat
    background-size: 100% 100%
    color: #333
    text-align: center
</style>
