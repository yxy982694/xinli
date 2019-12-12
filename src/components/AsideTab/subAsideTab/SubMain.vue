<template>
  <!--页面导航-->
  <div>
    <component :is="who"></component>
  </div>
</template>
<script>
    import { mapMutations } from 'vuex'
    export default {
        components: {
          Zhangsan: resolve => require(['@/views/Complaint/PersonalTab/Zhangsan'], resolve),
          Lisi: resolve => require(['@/views/Complaint/PersonalTab/Lisi'], resolve),
          Wangwu: resolve => require(['@/views/Complaint/PersonalTab/Wangwu'], resolve),
          Maliu: resolve => require(['@/views/Sys/WorkFlow/ConfigManageTab/Maliu'], resolve),
          MenuManage: resolve => require(['@/views/Sys/WorkFlow/ConfigManageTab/MenuManage'], resolve),
          Xiaoqi: resolve => require(['@/views/Sys/WorkFlow/ConfigManageTab/Xiaoqi'], resolve),
          Heiba: resolve => require(['@/views/Sys/WorkFlow/ConfigManageTab/Heiba'], resolve),
          ResourceManage: resolve => require(['@/views/Sys/WorkFlow/ConfigManageTab/ResourceManage'], resolve),
        },
        props: ['targetLocation'],
        data() {
            return {
                who: null
            }
        },
        computed: {
          contextMenuFlag: {
            get: function () {
              return this.$store.state.contextMenu.contextMenuFlag
            },
            set: function () {}
          }
        },
        mounted: function () {
          console.log('mounted')
          let array = this.targetLocation.split('/')
          this.who = array[array.length-1]
          this.bindShortcut()
        },
        methods: {
          ...mapMutations({
            'setContextMenuFlag': 'setContextMenuFlag',
            'setSwitch': 'setSwitch',
            'setSwitchLabel': 'setSwitchLabel',
            'setChildContextLeft': 'setChildContextLeft'
          }),
          bindShortcut: function () {
            let _this = this
            this.$nextTick(function () {
              setTimeout(function () {
                let domTabs = document.querySelectorAll('.el-container .el-tabs__item')
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
          }
        },
    }
</script>

<style scoped lang="scss">
  .el-collapse{
    border: 1px solid #EBEEF5 !important;
    border-bottom-width: 10px!important;
  }
  .board-item {
    cursor: pointer;
    margin: 6px 0px 10px 2px;
    display: block;
  }
  .board-item li {
    float: left;
    width: 20%;
    border: 1px solid #e9e9e9;
    margin: -1px 0 0 -2px;
    position: relative;
    background: #fff;
    list-style-type:none;
    height: 70px;
    text-align: center;
    line-height: 70px;
  }

  a {
    color: #1296db;
  }

</style>
