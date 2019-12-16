<template>
  <div>
    <aside-tab :leftList="leftList"></aside-tab>
  </div>
</template>

<script>
    import AsideTab from '@/components/AsideTab/index'
    export default {
        components:{
            AsideTab
        },
        data() {
            return {
                leftList:[
                    {   id: 2,
                        location: '/ConfigManageTab/BasicManage',
                        label: '基础管理1'
                    },
                    {   id: 3,
                        location: '/ConfigManageTab/BasicManagee',
                        label: '基础管理2'
                    },
                ]
            }
        }
    }
</script>
