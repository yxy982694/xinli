<template>
  <sub-menu :centerList="centerList"></sub-menu>
</template>

<script>
    import SubMenu from '@/components/AsideTab/SubAsideTab/SubMenu'
    export default {
        data() {
            return {
                centerList:[
                    {   location: '/sys/ResourceManage',
                        label: '资源管理2',
                        id: 1
                    },
                    {   location: '/sys/Lisi',
                        label: '职位管理2',
                        id: 2
                    },
                    {   location: '/sys/Wangwu',
                        label: '角色管理2',
                        id: 3
                    },
                    {   location: '/sys/Maliu',
                        label: '机构管理2',
                        id: 4
                    },
                    {   location: '/sys/UserManage',
                        label: '用户管理2',
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
