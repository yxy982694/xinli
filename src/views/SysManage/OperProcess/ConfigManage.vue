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
                    {   id: 1,
                        location: '/SysManage/OperProcess/ConfigManageTab/BasicManage',
                        label: '基础管理1'
                    },
                    {   id: 2,
                        location: 'http://www.baidu.com/',
                        label: '百度'
                    },
                ]
            }
        }
    }
</script>
