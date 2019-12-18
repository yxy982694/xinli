<template>
  <sub-menu :centerList="centerList"></sub-menu>
</template>

<script>
    import SubMenu from '@/components/AsideTab/SubAsideTab/SubMenu'
    export default {
        data() {
            return {
                centerList:[
                    {   location: '/SysManage/OperProcess/ConfigManageTab/ResourceManage',
                        label: '资源管理',
                        id: 1
                    },
                    {   location: '/Complaint/PersonalTab/Lisi',
                        label: '职位管理',
                        id: 2
                    },
                    {   location: '/Complaint/PersonalTab/Wangwu',
                        label: '角色管理',
                        id: 3
                    },
                    {   location: '/SysManage/OperProcess/ConfigManageTab/Maliu',
                        label: '机构管理',
                        id: 4
                    },
                    {   location: '/SysManage/OperProcess/ConfigManageTab/UserManage',
                        label: '用户管理',
                        id: 5
                    },
                ]
            }
        },
        components:{
          SubMenu
        },
        computed: {
          centerMenu: {
            get: function () {
              return this.$store.state.centerMenu.centerMenu
            },
            set: function () {}
          },
          centerMenuId: {
            get: function () {
              return this.$store.state.centerMenu.centerMenuId
            },
            set: function () {}
          },
        },
        mounted: function () {
          console.log(this.centerMenu[this.centerMenuId])
        }
    }
</script>
