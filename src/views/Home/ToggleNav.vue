<template>
  <!-- 标签页 -->
  <div class="tab-container">
    <el-tabs class="tabs main-tabs" v-model="mainTabsActiveName" :closable="true" type="card"
             @tab-click="selectedTabHandle" @tab-remove="removeTabHandle">
       <div class="tab-down-menu">
         <p @click="tabsCloseCurrentHandle">关闭</p>
         <p @click="tabsCloseOtherHandle">关闭其它</p>
         <p @click="tabsCloseAllHandle">关闭全部</p>
         <p @click="tabsRefreshCurrentHandle">刷新</p>
       </div>
      <el-tab-pane v-for="item in mainTabs"
                   :key="item.name" :label="item.title" :name="item.name" class="main-tab">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data () {
      return {
        tempActive: null
      }
    },
    computed: {
        mainTabs: {
          get () { return this.$store.state.tab.mainTabs },
          set (val) { this.$store.commit('updateMainTabs', val) }
        },
        mainTabsActiveName: {
          get () { return this.$store.state.tab.mainTabsActiveName },
          set (val) { this.$store.commit('updateMainTabsActiveName', val)
        },
        routerLocation: {
          get: function () {
            return this.$store.state.routerIdData.routerLocation
          },
          set: function () {}
        },
        showIframe: {
          get: function () {
            return this.$store.state.showIframe.showIframe
          },
          set: function () {}
        }
        },
        keepAliveList(){
            // 获取缓存的路由列表
            return this.$store.state.keepAliveList;
        },
    },
    mounted: function () {
      var _this = this
      window.addEventListener('click',function () {
        if (document.querySelector('.main-tabs .el-tabs__content')) {
          document.querySelector('.main-tabs .el-tabs__content').style.display = 'none'
        }
      })
      this.renderTab()
    },
    methods: {
      ...mapMutations({
        'setContextMenuFlag': 'setContextMenuFlag',
        'setRouterId': 'setRouterId',
        'setRouterObj': 'setRouterObj',
        'setRouterLocation': 'setRouterLocation',
        'setShowIframe': 'setShowIframe'
      }),
      renderTab: function () {
        var _this = this
        this.$nextTick(function () {
          setTimeout(function () {
            document.querySelector('.el-tabs__nav-scroll .el-tabs__item .el-icon-close').style.display = 'none'
            Array.prototype.forEach.call(document.querySelectorAll('.main-tabs .el-tabs__item'),function (item) {
              item.oncontextmenu = null
              window.onclick = null
              item.oncontextmenu = function (e) {
                _this.tempActive =item.id.substr(4)
                _this.setContextMenuFlag(false)
                e.preventDefault()
                if (document.querySelector('.main-tabs .el-tabs__content')) {
                  document.querySelector('.main-tabs .el-tabs__content').style.display = 'block'
                  document.querySelector('.main-tabs .el-tabs__content').style.left = e.clientX - 20 + 'px'
                }
                window.onclick = function () {
                  if (document.querySelector('.main-tabs .el-tabs__content')) {
                    document.querySelector('.main-tabs .el-tabs__content').style.display = 'none'
                  }
                }
              }
            })
          },500)
        })
      },
      // tabs, 选中tab
      selectedTabHandle (tab) {
        tab = this.mainTabs.filter(item => item.name === tab.name)
        sessionStorage.setItem('id', tab[0].id)
        // sessionStorage.setItem('arr', this.setRouterObj[tab[0].id].data)
        this.setRouterId(tab[0].id)
        this.setRouterLocation(tab[0].location)
        console.log('>>>>>>>>')
        console.log(tab[0].location)
        if (parseInt(tab[0].location)) {
          this.setShowIframe(true)
        } else {
          this.setShowIframe(false)
        }
        if (tab.length >= 1) {
          this.$router.push({ name: tab[0].name })
        }
      },
      // tabs, 删除tab
      removeTabHandle (tabName) {
          //清除当前缓存
          /*if(this.$route.meta.keepAlive){
              this.$route.meta.keepAlive = false
          }*/
        this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
        if (this.mainTabs.length >= 1) {
          // 当前选中tab被删除
          if (tabName === this.mainTabsActiveName) {
            this.$router.push({ name: this.mainTabs[this.mainTabs.length - 1].name }, () => {
              this.mainTabsActiveName = this.$route.name
              this.tempActive = this.$route.name
              if (parseInt(this.mainTabs[this.mainTabs.length - 1].location)) {
                this.setShowIframe(true)
              } else {
                this.setShowIframe(false)
              }
            })
            sessionStorage.setItem('id', this.$route.meta.index)
            this.setRouterId(this.$route.meta.index)

            // sessionStorage.setItem('arr', this.setRouterObj[this.$route.meta.index].data)
          }
        } else {
          this.mainTabs = [{
            name: '首页',
            title: '首页',
            icon: 'fa fa-home fa-lg',
            id: 0,
            location: '0'
          }]
          this.$router.push("/")
          this.mainTabsActiveName = '首页'
        }

      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle () {
        this.removeTabHandle(this.tempActive)
      },
      // tabs, 关闭其它
      tabsCloseOtherHandle () {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.tempActive || item.name==="首页")
        sessionStorage.setItem('id', this.mainTabs[1].id)
        this.setRouterId(this.mainTabs[1].id)
        if (parseInt(this.mainTabs[1].location)) {
          this.setShowIframe(true)
        } else {
          this.setShowIframe(false)
        }
        // sessionStorage.setItem('arr', this.setRouterObj[this.mainTabs[1].id].data)
        this.$router.push({ name: this.tempActive})
      },
      // tabs, 关闭全部
      tabsCloseAllHandle () {
        this.mainTabs = [{
          name: '首页',
          title: '首页',
          icon: 'fa fa-home fa-lg',
          id: 0,
          location: '0'
        }]
        this.$router.push("/")
        this.mainTabsActiveName = '首页'
      },
      // tabs, 刷新当前
      tabsRefreshCurrentHandle () {
        console.log(sessionStorage.getItem('id'))
        this.$api.menu.resourceManage(sessionStorage.getItem('id')).then((res) => {
          this.setRouterObj({
            id: sessionStorage.getItem('id'),
            arr: res
          })
          this.setRouterId(sessionStorage.getItem('id'))
        })
        // let tempTabName = this.mainTabsActiveName
        // this.removeTabHandle(tempTabName)
        // this.$nextTick(() => {
        //   this.$router.push({ name: tempTabName})
        // })
      }
    },
    watch: {
      mainTabs () {
        this.renderTab()
      }
    }
  }
</script>
