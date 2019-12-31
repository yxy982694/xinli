<template>
  <!--页面导航-->
  <div class="submain-container">
    <iframe v-if="!who" :src="iframeUrl" frameborder="0" style="width:100%;height:100%;"></iframe>
    <component v-else :is="who"></component>
  </div>
</template>
<script>
    // import { mapMutations } from 'vuex'
    export default {
        components: {
          PersonalTabProcessSheet: resolve => require(['@/views/Complaint/PersonalTab/ProcessSheet'], resolve),
          PersonalTabQualityTest: resolve => require(['@/views/Complaint/PersonalTab/QualityTest'], resolve),
          PersonalTabSuperviseWarehouse: resolve => require(['@/views/Complaint/PersonalTab/SuperviseWarehouse'], resolve),
          DutyMngTabDutySearch: resolve => require(['@/views/DutyManager/DutyMngTab/DutySearch'], resolve),
          ConfigManageTabOrganizateManage: resolve => require(['@/views/SysManage/OperProcess/ConfigManageTab/OrganizateManage'], resolve),
		      SubAsideTabLeftMenu: resolve => require(['@/components/AsideTab/SubAsideTab/LeftMenu'], resolve),
          ConfigManageTabPositionManage: resolve => require(['@/views/SysManage/OperProcess/ConfigManageTab/PositionManage'], resolve),
          ConfigManageTabRoleManage: resolve => require(['@/views/SysManage/OperProcess/ConfigManageTab/RoleManage'], resolve),
          ConfigManageTabResourceManage: resolve => require(['@/views/SysManage/OperProcess/ConfigManageTab/ResourceManage'], resolve),
          ConfigManageTabUserManage: resolve => require(['@/views/SysManage/OperProcess/ConfigManageTab/UserManage'], resolve),
          SubAsideTabMainPage: resolve => require(['@/components/AsideTab/SubAsideTab/MainPage'], resolve),
        },
        props: ['who','iframeUrl'],
        // computed: {
        //   contextMenuFlag: {
        //     get: function () {
        //       return this.$store.state.contextMenu.contextMenuFlag
        //     },
        //     set: function () {}
        //   }
        // },
        mounted: function () {
          // if (document.querySelector('.el-con .el-tabs__content')) {
          //   document.querySelector('.el-con .el-tabs__content').style.height = document.body.clientHeight-190 + 'px'
          // }
          console.log('subMainmounted')
          // this.bindShortcut()
        },
        methods: {
          // ...mapMutations({
          //   'setContextMenuFlag': 'setContextMenuFlag',
          //   'setSwitch': 'setSwitch',
          //   'setSwitchLabel': 'setSwitchLabel',
          //   'setChildContextLeft': 'setChildContextLeft'
          // }),
          // bindShortcut: function () {
          //   let _this = this
          //   this.$nextTick(function () {
          //     setTimeout(function () {
          //       let domTabs = document.querySelectorAll('.el-container .el-tabs__item')
          //       document.querySelector('.el-container .el-tabs__item .el-icon-close').style.display = 'none'
          //       let domCloses = document.querySelectorAll('.el-icon-close')
          //       Array.prototype.forEach.call(domCloses,function (item) {
          //         item.onclick = null
          //         item.onclick = function () {
          //           _this.setContextMenuFlag(false)
          //         }
          //       })
          //       Array.prototype.forEach.call(domTabs,function(item,index){
          //         item.oncontextmenu = null
          //         item.oncontextmenu = function (e) {
          //           e.stopPropagation()
          //           e.preventDefault()
          //           _this.setContextMenuFlag(true)
          //           let array = item.id.split('/')
          //           let x = e.clientX - 180
          //           _this.setSwitch('/'+array[1]+'/'+array[2])
          //           _this.setSwitchLabel(item.childNodes[0].data)
          //           _this.setChildContextLeft(x+'px')
          //           if (document.querySelector('.main-tabs .el-tabs__content')) {
          //             document.querySelector('.main-tabs .el-tabs__content').style.display = 'none'
          //           }
          //         }
          //       })
          //     },500)
          //   })
          // }
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  // .iframe-container
  //   width: 100%
  //   height: 420px
  .submain-container
    height: 100%
    overflow: hidden
  .el-collapse
    border: 1px solid #EBEEF5 !important
    border-bottom-width: 10px!important
  .board-item
    cursor: pointer
    margin: 6px 0px 10px 2px
    display: block
  .board-item li
    float: left
    width: 20%
    border: 1px solid #e9e9e9
    margin: -1px 0 0 -2px
    position: relative
    background: #fff
    list-style-type:none
    height: 70px
    text-align: center
    line-height: 70px
  a
    color: #1296db

</style>
