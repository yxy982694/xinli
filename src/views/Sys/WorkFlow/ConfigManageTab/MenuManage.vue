<template>
  <div class='children-tab'>
    <p class="children-tab-p" v-for="item in cchList" :key="item.id" @click="addTab(item.label,item.location)">
     <i class="el-icon-thumb"></i>
     <span>{{item.label}}</span>
    </p>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    export default {
        data() {
            return {
                cchList:[
                    {   location: '/sys/ResourceManage',
                        label: '资源管理',
                        id: 1
                    },
                    {   location: '/sys/Lisi',
                        label: '职位管理',
                        id: 2
                    },
                    {   location: '/sys/Wangwu',
                        label: '角色管理',
                        id: 3
                    },
                    {   location: '/sys/Maliu',
                        label: '机构管理',
                        id: 4
                    },
                ]
            }
        },
        computed: {
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
        methods: {
           ...mapMutations({
              'addEditableTabs': 'addEditableTabs',
              'addExistTabs': 'addExistTabs',
              'setCurrentTabLabel': 'setCurrentTabLabel',
              'setCurrentTitle': 'setCurrentTitle',
            }),
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
        },
        mounted() {

        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/variable"
  .children-tab
    padding: 0 20px 15px 10px
    display: flex
    flex-wrap: wrap
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)
    border: 1px solid #EBEEF5
    background-color: #FFF
    color: #303133
    min-height: 418px
    box-sizing: border-box
    .children-tab-p
      height: 25px
      line-height: 25px
      text-align: center
      box-shadow: 0 0 1px 1px $color-lightgray
      padding:3px 8px
      cursor: pointer
      margin-left: 10px
      margin-top: 15px

</style>
