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
      }
    },
    computed: {
        mainTabs: {
          get () { return this.$store.state.tab.mainTabs },
          set (val) { this.$store.commit('updateMainTabs', val) }
        },
        mainTabsActiveName: {
          get () { return this.$store.state.tab.mainTabsActiveName },
          set (val) { this.$store.commit('updateMainTabsActiveName', val) }
        },
        keepAliveList(){
            // 获取缓存的路由列表
            return this.$store.state.keepAliveList;
        },
        // ...mapState({
        //   mainContextMenuFlag: state=>state.contextMenu.mainContextMenuFlag
        // })
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
      }),
        renderTab: function () {
          var _this = this
          this.$nextTick(function () {
            setTimeout(function () {
              Array.prototype.forEach.call(document.querySelectorAll('.main-tabs .el-tabs__item'),function (item) {
                item.oncontextmenu = null
                window.onclick = null
                item.oncontextmenu = function (e) {
                  console.log('ToggleNav.vue')
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
            })
          }
        } else {
          this.$router.push("/")
        }

      },
      // tabs, 关闭当前
      tabsCloseCurrentHandle () {
        this.removeTabHandle(this.mainTabsActiveName)
      },
      // tabs, 关闭其它
      tabsCloseOtherHandle () {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
      },
      // tabs, 关闭全部
      tabsCloseAllHandle () {
        this.mainTabs = []
        this.$router.push("/")
      },
      // tabs, 刷新当前
      tabsRefreshCurrentHandle () {
        let tempTabName = this.mainTabsActiveName
        this.removeTabHandle(tempTabName)
        this.$nextTick(() => {
          this.$router.push({ name: tempTabName })
        })
      }
    },
    watch: {
      mainTabs () {
        this.renderTab()
      }
    }
  }
</script>
