<template>
  <div>
    <aside-tab :cchList="cchList"></aside-tab>
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
                cchList:[
                    {   id: '1',
                        location: '/PersonalTab/Zhangsan',
                        label: '个人投诉处理工单'

                    },
                    {   id: '2',
                        location: '/PersonalTab/Lisi',
                        label: '个人投诉质检'

                    },
                    {   id: '3',
                        location: '/PersonalTab/Wangwu',
                        label: '督办遗留库'

                    }
                ]
            }
        }
    }
</script>
