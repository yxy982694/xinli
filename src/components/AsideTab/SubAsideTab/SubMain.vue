<template>
  <!--页面导航-->
  <div class="submain-container">
    <iframe v-if="!who" src="/static/tabIframe.html" frameborder="0" style="width:100%;" id="iframe"></iframe>
    <component v-else :is="who"></component>
  </div>
</template>
<script>
    import axios from "axios"
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
        computed: {
          currentTabId: { // 当前显示tab的id
            get: function () {
              return this.$store.state.showTab.currentTabId
            },
            set: function () {}
          },
        },
        watch: {
          currentTabId: function () {
            console.log('9090--------------')
            console.log(this.iframeUrl)
            this.getIframeData()
          }
        },
        mounted: function () {
          console.log('SubMain.vue mounted -------------')
          console.log(this.iframeUrl)
          this.getIframeData()
        },
        methods: {
          getIframeData: function () {
            var _this = this
            this.$nextTick(function () {
              let iframe = document.getElementById('iframe')
              // console.log(iframe)
              if (iframe) {
                iframe.onload = function () {
                  axios({
                    // url: '../../../../static/xinjiangongdan.html',
                    url: _this.iframeUrl,
                    method: 'get',
                    responseType: 'text'
                  }).then(function (data) {
                    let iframe = document.getElementById('iframe')
                    let _iframe = iframe.contentWindow
                    let _iframeContent = _iframe.document.getElementById('qiantao')
                    _iframeContent.innerHTML = data.data
                    _iframe.loadJavaScript()
                  }).catch(function (data) {
                    console.log('catch data')
                  })
                }
              }
            })
          }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .submain-container
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    overflow: hidden
	#iframe
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
