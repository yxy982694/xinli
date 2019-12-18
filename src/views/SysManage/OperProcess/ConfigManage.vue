<template>
  <div>
    <aside-tab :leftList="leftList"></aside-tab>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import AsideTab from '@/components/AsideTab/index'
    // import
    export default {
        components:{
            AsideTab
        },
        data() {
            return {
                leftList:[
                    {   id: 1,
                        location: '/SysManage/OperProcess/ConfigManageTab/BasicManage',
                        label: '基础管理'
                    },
                    {   id: 2,
                        location: 'http://www.baidu.com/',
                        label: '百度'
                    },
                ]
            }
        },
        mounted: function () {
          this.initData()
        },
        computed: {
          centerMenu: {
            get: function () {
              return this.$store.state.centerMenu.centerMenu
            },
            set: function () {}
          },
        },
        methods: {
          ...mapMutations({
            'setCenterMenu': 'setCenterMenu'
          }),
          initData: function () {
            let id
            if (this.$route.meta.index) {
              id = this.$route.meta.index
            } else {
              id = sessionStorage.getItem('id')
            }
            console.log(id)
            this.$api.menu.resourceManage(id).then((res) => {
              console.log(res.data)
              var obj = null
              for (var i=0;i<res.data.length-1;i++) {
                this.setCenterMenu(res.data[i].id,res.data[i].children)
                obj = {
                  id: res.data[i].id,
                  location: res.data[i].location?res.data[i].location: '/SysManage/OperProcess/ConfigManageTab/BasicManage',
                  label: res.data[i].name
                }
                this.leftList.push(obj)
              }
              console.log(this.centerMenu)
          })
        }
    },
    }
</script>
