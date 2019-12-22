<template>
  <div>
    <aside-tab :leftList="leftList"></aside-tab>
  </div>
</template>

<script>
  import AsideTab from '@/components/AsideTab/index'
  import { leftListMixin } from '@/common/js/mixin.js'
  export default {
      mixins: [leftListMixin],
      data: function () {
        return {
          leftList:[
            {   id: '1',
                location: '/Complaint/PersonalTab/Zhangsan',
                label: '个人投诉处理工单'
            },
            {   id: '2',
                location: '/Complaint/PersonalTab/Lisi',
                label: '个人投诉质检'
            },
            {   id: '3',
                location: '/Complaint/PersonalTab/Wangwu',
                label: '督办遗留库'
            }
        ]}
      },
      components:{
          AsideTab
      },
  }
    // import AsideTab from '@/components/AsideTab/index'
    // export default {
    //     components:{
    //         AsideTab
    //     },
        // data() {
        //     return {
        //         leftList:[
        //             {   id: '1',
        //                 location: '/Complaint/PersonalTab/Zhangsan',
        //                 label: '个人投诉处理工单'

        //             },
        //             {   id: '2',
        //                 location: '/Complaint/PersonalTab/Lisi',
        //                 label: '个人投诉质检'

        //             },
        //             {   id: '3',
        //                 location: '/Complaint/PersonalTab/Wangwu',
        //                 label: '督办遗留库'

        //             }
        //         ]
        //     }
        // },
        // mounted: function () {
        //   let id
        //   if (this.$route.meta.index) {
        //     id = this.$route.meta.index
        //   } else {
        //     id = sessionStorage.getItem('id')
        //   }
        //   console.log(id)
        //   this.$api.menu.resourceManage(id).then((res) => {
        //     // this.leftList = res.data
        //   })
        // }
    // }
</script>
