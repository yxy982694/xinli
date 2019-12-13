<template>
  <!--字标签-->
  <el-tabs class="el-tabs-container" v-model="currentTabLabel" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
    <div v-show="contextMenuFlag" class="tab-down-menu" :style="{position: 'absolute',top: '0px',left: childContextLeft}">
      <p @click="closeCurrentHandle">关闭</p>
      <p @click="closeOtherHandle">关闭其它</p>
      <p @click="closeAllHandle">关闭全部</p>
      <p @click="refreshCurrentHandle">刷新</p>
    </div>
    <el-tab-pane v-for="(item, index) in editableTabs" :key="item.name" :label="item.label" :name="item.name">
      <sub-main :targetLocation="currentTabLabel"></sub-main>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import SubMain from "./SubMain"
    import { mapMutations } from 'vuex'
    export default {
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
        methods: {
            ...mapMutations({
              'setContextMenuFlag': 'setContextMenuFlag',
              'setEditableTabs': 'setEditableTabs',
              'setExistTabs': 'setExistTabs',
              'addEditableTabs': 'addEditableTabs',
              'addExistTabs': 'addExistTabs',
              'setCurrentTabLabel': 'setCurrentTabLabel',
              'setCurrentTitle': 'setCurrentTitle',
            }),
            closeCurrentHandle: function () {
              this.removeTab(this.clickedSwitch)
            },
            closeOtherHandle: function () {
              this.setEditableTabs([{
                  label: this.clickedLabel,
                  name: this.clickedSwitch
              }])
              this.setExistTabs([this.clickedSwitch])
              this.existTabs = [this.clickedSwitch]
              this.setCurrentTabLabel(this.clickedSwitch)
            },
            closeAllHandle: function () {
               this.setEditableTabs([])
               this.setExistTabs([])
               this.setCurrentTabLabel(null)
               this.setCurrentTitle(null)
            },
            refreshCurrentHandle: function () {
              window.location.reload()
            },
            initData: function () {
              this.setCurrentTabLabel(this.leftList[0].location)
              this.setEditableTabs([{
                  label: this.leftList[0].label,
                  name: this.leftList[0].location
              }])
              this.setExistTabs([this.leftList[0].location])
              this.hasDownMenu = this.contextMenuFlag
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
