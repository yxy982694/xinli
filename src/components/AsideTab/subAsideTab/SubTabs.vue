<template>
  <!--字标签-->
  <el-tabs :closable="true" class="el-tabs-container" v-model="currentTabLabel" type="card" @tab-remove="removeTab" @tab-click="tabClick">
    <div v-show="contextMenuFlag" class="tab-down-menu" :style="{position: 'absolute',top: '0px',left: childContextLeft}">
      <p @click="closeCurrentHandle">关闭</p>
      <p @click="closeOtherHandle">关闭其它</p>
      <p @click="closeAllHandle">关闭全部</p>
      <p @click="refreshCurrentHandle">刷新</p>
    </div>
    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.label" :name="item.name">
      <sub-main :who="who"></sub-main>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import SubMain from "./SubMain"
    import { mapMutations } from 'vuex'
    export default {
        data: function () {
          return {
            who: null
          }
        },
        components: { SubMain },
        props: ['leftList'],
        computed: {
          contextMenuFlag: {
            get: function () {
              return this.$store.state.contextMenu.contextMenuFlag
            },
            set: function () {}
          },
          clickedSwitch: {
            get: function () {
              return this.$store.state.contextMenu.clickedSwitch
            },
            set: function () {}
          },
          clickedLabel: {
            get: function () {
              return this.$store.state.contextMenu.clickedLabel
            },
            set: function () {}
          },
          childContextLeft: {
            get: function () {
              return this.$store.state.contextMenu.childContextLeft
            },
            set: function () {}
          },
          editableTabs: {
            get: function () {
              return this.$store.state.showTab.editableTabs
            },
            set: function () {}
          },
          existTabs: {
            get: function () {
              return this.$store.state.showTab.existTabs
            },
            set: function () {}
          },
          currentTabLabel: {
            get: function () {
              return this.$store.state.showTab.currentTabLabel
            },
            set: function () {}
          },
          currentTitle: {
            get: function () {
              return this.$store.state.showTab.currentTitle
            },
            set: function () {}
          }
        },
        mounted: function () {
          this.initData()
          var _this = this
          window.addEventListener('click',function () {
            _this.setContextMenuFlag(false)
          })
        },
        watch: {
          currentTabLabel: {
            handler: function () {
              let array = this.currentTabLabel.split('/')
              this.who = array[array.length-1]
              this.bindShortcut()
            },
            immediate: true
          }
        },
        methods: {
            bindShortcut: function () {
              let _this = this
              this.$nextTick(function () {
                setTimeout(function () {
                  let domTabs = document.querySelectorAll('.el-container .el-tabs__item')
                  document.querySelector('.el-container .el-tabs__item .el-icon-close').style.display = 'none'
                  let domCloses = document.querySelectorAll('.el-icon-close')
                  Array.prototype.forEach.call(domCloses,function (item) {
                    item.onclick = null
                    item.onclick = function () {
                      _this.setContextMenuFlag(false)
                    }
                  })
                  Array.prototype.forEach.call(domTabs,function(item,index){
                    item.oncontextmenu = null
                    item.oncontextmenu = function (e) {
                      e.stopPropagation()
                      e.preventDefault()
                      _this.setContextMenuFlag(true)
                      let array = item.id.split('/')
                      let x = e.clientX - 180
                      _this.setSwitch('/'+array[1]+'/'+array[2])
                      _this.setSwitchLabel(item.childNodes[0].data)
                      _this.setChildContextLeft(x+'px')
                      if (document.querySelector('.main-tabs .el-tabs__content')) {
                        document.querySelector('.main-tabs .el-tabs__content').style.display = 'none'
                      }
                    }
                  })
                },500)
              })
            },
            ...mapMutations({
              'setContextMenuFlag': 'setContextMenuFlag',
              'setEditableTabs': 'setEditableTabs',
              'setExistTabs': 'setExistTabs',
              'addEditableTabs': 'addEditableTabs',
              'addExistTabs': 'addExistTabs',
              'setCurrentTabLabel': 'setCurrentTabLabel',
              'setCurrentTitle': 'setCurrentTitle',
              'setSwitch': 'setSwitch',
              'setSwitchLabel': 'setSwitchLabel',
              'setChildContextLeft': 'setChildContextLeft'
            }),
            closeCurrentHandle: function () {
              this.removeTab(this.clickedSwitch)
            },
            closeOtherHandle: function () {
              this.setEditableTabs([{
                label: '主页',
                name: '/SubAsideTab/MainPage'
              },{
                  label: this.clickedLabel,
                  name: this.clickedSwitch
              }])
              this.setExistTabs(['/SubAsideTab/MainPage',this.clickedSwitch])
              // this.existTabs = ['/SubAsideTab/MainPage',this.clickedSwitch]
              this.setCurrentTabLabel(this.clickedSwitch)
              this.setCurrentTitle(this.clickedLabel)
            },
            closeAllHandle: function () {
              this.initData()
               // this.setEditableTabs([])
               // this.setExistTabs([])
               // this.setCurrentTabLabel(null)
               // this.setCurrentTitle(null)
            },
            refreshCurrentHandle: function () {
              window.location.reload()
            },
            initData: function () {
              this.setCurrentTabLabel('/SubAsideTab/MainPage')
              this.setEditableTabs([{
                  label: '主页',
                  name: '/SubAsideTab/MainPage'
              }])
              console.log(this.currentTabLabel)
              this.setExistTabs(['/SubAsideTab/MainPage'])
              this.setCurrentTitle('主页')
              // this.setCurrentTabLabel(this.leftList[0].location)
              // this.setEditableTabs([{
              //     label: this.leftList[0].label,
              //     name: this.leftList[0].location
              // }])
              // this.setExistTabs([this.leftList[0].location])
              // this.hasDownMenu = this.contextMenuFlag
            },
            addTab(targetLabel,name) {
              this.setCurrentTabLabel(name)
              this.setCurrentTitle(targetLabel)
              if(!this.existTabs.includes(name)){
                  this.addEditableTabs({
                      label: targetLabel,
                      name: name
                  })
                  this.addExistTabs(name)
              }
            },
            removeTab(targetName) {
                if (targetName == '/SubAsideTab/MainPage') {
                  this.$alert('主页不可关闭')
                  return
                }
                let tabs = this.editableTabs
                let existabs = this.existTabs
                let activeName = this.currentTabLabel
                if (activeName === targetName) {
                    tabs.forEach((tab, index) => {
                        if (tab.name === targetName) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name
                                this.setCurrentTitle(nextTab.label)
                            }
                        }
                    })
                }
                existabs.splice(existabs.indexOf(targetName),1)
                this.setExistTabs(existabs)
                this.setCurrentTabLabel(activeName)
                let remainTabs = tabs.filter(tab => tab.name !== targetName)
                this.setEditableTabs(remainTabs)
            },
            tabClick(objectTab) {
                // this.currentTabLabel = objectTab.name
                this.setCurrentTabLabel(objectTab.name)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  @import "../../../common/stylus/mixin"
  .el-tabs
    height: 100%
  .drop-down-container
    border: 1px solid $color-lightgra
    top: 175px !important
  .shortcut-container
    position: relative
    width: 50px
    height: 50px
    border: 1px solid purple
  .tab-shortcut
    height: 50px
    text-align:center
    line-height:50px
    border: 1px solid red
  .shoutcut-text
    display:none
    border: 1px solid green
    width: 100px
    line-height:30px
    position:absolute
    z-index: 9999
</style>
