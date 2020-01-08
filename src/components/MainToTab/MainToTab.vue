<template>
  <div class="tab-iframe-container">
    <aside-tab v-if="!showIframe" :leftList="leftList"></aside-tab>
    <iframe class="tab-iframe" v-else :src='"../../../../static/jsp/secframe.html?type="+this.routerLocation' frameborder="1" style="width:100%;" id="iframe"></iframe>
  </div>
</template>

<script>
    import AsideTab from '@/components/AsideTab/index'
    import { leftListMixin } from '@/common/js/mixin.js'
    export default {
        data: function () {
          return {
            id: ''
          }
        },
        computed: {
          routerId: {
            get: function () {
              return this.$store.state.routerIdData.routerId
            },
            set: function () {}
          },
          routerLocation: {
            get: function () {
              return this.$store.state.routerIdData.routerLocation
            },
            set: function () {}
          },
          showIframe: {
            get: function () {
              return this.$store.state.showIframe.showIframe
            },
            set: function () {}
          }
        },
        // watch: {
          // routerId: function () {
            // console.log('>>>>>>----------')
            // if (document.querySelector('.tab-iframe')) {
            //   document.querySelector('.tab-iframe').style.height = document.body.clientHeight-133 + 'px'
            // }
          // }
        // },
        mixins: [leftListMixin],
        components:{
            AsideTab
        },
        mounted: function () {
          // console.log('--------------')
          // console.log(document.body.clientHeight-133)
          // if (document.querySelector('.tab-iframe')) {
          //   document.querySelector('.tab-iframe').style.height = document.body.clientHeight-133 + 'px'
          // }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
   .tab-iframe-container
     height: 100%
     overflow: hidden
   .tab-iframe
     padding-top: 10px
     height: 100%
     box-sizing: border-box
</style>
