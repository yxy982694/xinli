<template>
  <div class='children-tab'>
    <p class="children-tab-p" v-for="(item,index) in centerList" :key="item.id+index" @click="addTab(item.label,item.location,item.id)">
     <img src="../../../common/image/contentImg22.png" class="children-tab-image" />
     <span class="children-tab-text">{{item.label}}</span>
    </p>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        props: ['centerList'],
        computed: {
          existTabs: {
            get: function () {
              return this.$store.state.showTab.existTabs
            },
            set: function () {}
          },
          editableTabs: { // 保存的是tab中出现标签的整个对象（id,）
            get: function () {
              return this.$store.state.showTab.editableTabs
            },
            set: function () {}
          },
          currentTabLabel: {
            get: function () {
              return this.$store.state.showTab.currentTabLabel
            },
            set: function () {}
          },
          currentTabId: {
            get: function () {
              return this.$store.state.showTab.currentTabId
            },
            set: function () {}
          },
          currentTitle: {
            get: function () {
              return this.$store.state.showTab.currentTitle
            },
            set: function () {}
          },
          mainIdStoreTabObj: {
            get: function () {
              return this.$store.state.mainIdStoreTab.mainIdStoreTabObj
            },
            set: function () {}
          },
        },
        methods: {
           ...mapMutations({
              'addEditableTabs': 'addEditableTabs',
              'addExistTabs': 'addExistTabs',
              'setCurrentTabLabel': 'setCurrentTabLabel',
              'setCurrentTabId': 'setCurrentTabId',
              'setCurrentTitle': 'setCurrentTitle',
              'setMainIdStoreTabObj': 'setMainIdStoreTabObj'
            }),
           addTab(targetLabel,name,id) {
             console.log(targetLabel+'+'+name+'+'+id)
                this.setCurrentTabLabel(name)
                this.setCurrentTitle(targetLabel)
                this.setCurrentTabId(id)
                if(!this.existTabs.includes(id)){
                    this.addEditableTabs({
                        label: targetLabel,
                        name: name,
                        id: id
                    })
                    this.addExistTabs(id)
                    this.setMainIdStoreTabObj({
                      id: sessionStorage.getItem('id'),
                      editableTabs: this.editableTabs,
                      existTabs: this.existTabs,
                      currentTabLabel: this.currentTabLabel,
                      currentTabId: this.currentTabId
                    })
                    console.log(this.mainIdStoreTabObj)
                }
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"
  .children-tab
    padding: 0 0px 15px 0px
    display: flex
    flex-wrap: wrap
    align-content: flex-start
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    // border: 1px solid $color-border
    background-color: #FFF
    color: #303133
    height: 100%
    overflow: auto
    box-sizing: border-box
    .children-tab-p
      width: 12%
      min-width: 100px
      height: 80px
      text-align: center
      border: 1px solid $color-lightgray
      // box-shadow: 0 0 1px 1px $color-lightgray
      border-radius: 5px
      cursor: pointer
      // margin-left: 10px
      box-sizing: border-box
      margin-left: 2%
      margin-top: 15px
      position: relative
  .children-tab-image
    display: block
    position:absolute
    left: 0
    top: 0
    width: 100%
    height: 50%
    // width: 100px
    // height: 30px
    border-radius: 5px 5px 0 0
  .children-tab-text
    display: block
    position:absolute
    left: 0
    bottom: 10px
    width: 100%
    text-align: center
</style>
