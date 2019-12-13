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
                    {   id: '1',
                        location: '/ConfigManageTab/MenuManage',
                        label: '基础管理'
                    }
                ]
            }
        }
    }
</script>
