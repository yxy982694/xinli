<template>
  <sub-menu :centerList="centerList"></sub-menu>
</template>

<script>
    import SubMenu from '@/components/AsideTab/SubAsideTab/SubMenu'
    export default {
        data() {
            return {
                centerList:[
                    {   location: '/SysManage/OperProcess/ConfigManage/ResourceManage',
                        label: '资源管理1',
                        id: 1
                    },
                    {   location: '/Complaint/PersonalTab/Lisi',
                        label: '职位管理1',
                        id: 2
                    },
                    {   location: '/Complaint/PersonalTab/Wangwu',
                        label: '角色管理1',
                        id: 3
                    },
                    {   location: '/SysManage/OperProcess/ConfigManageTab/Maliu',
                        label: '机构管理1',
                        id: 4
                    },
                    {   location: '/SysManage/OperProcess/ConfigManageTab/UserManage',
                        label: '用户管理1',
                        id: 5
                    },
                ]
            }
        },
        components:{
          SubMenu
        }
    }
</script>
