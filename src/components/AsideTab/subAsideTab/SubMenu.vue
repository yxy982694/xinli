<template>
  <div class='children-tab'>
    <p class="children-tab-p" v-for="item in centerList" :key="item.id" @click="addTab(item.label,item.location,item.id)">
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
              'setCurrentTitle': 'setCurrentTitle',
              'setMainIdStoreTabObj': 'setMainIdStoreTabObj'
            }),
           addTab(targetLabel,name,id) {
                this.setCurrentTabLabel(name)
                this.setCurrentTitle(targetLabel)
                if(!this.existTabs.includes(name)){
                    this.addEditableTabs({
                        label: targetLabel,
                        name: name,
                        id: id
                    })
                    this.addExistTabs(name)
                    this.setMainIdStoreTabObj({
                      id: sessionStorage.getItem('id'),
                      editableTabs: this.editableTabs,
                      existTabs: this.existTabs,
                      currentTabLabel: this.currentTabLabel
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
    padding: 0 20px 15px 10px
    display: flex
    flex-wrap: wrap
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    border: 1px solid #EBEEF5
    background-color: #FFF
    color: #303133
    height: 100%
    overflow: auto
    box-sizing: border-box
    .children-tab-p
      width: 120px
      height: 80px
      text-align: center
      box-shadow: 0 0 1px 1px $color-lightgray
      border-radius: 5px
      cursor: pointer
      margin-left: 10px
      margin-top: 15px
      position: relative
  .children-tab-image
    display: block
    position:absolute
    left: 0
    top: 0
    width: 120px
    height: 40px
    border-radius: 5px 5px 0 0
  .children-tab-text
    display: block
    position:absolute
    left: 0
    bottom: 10px
    width: 100%
    text-align: center
</style>
