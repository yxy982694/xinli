<template>
  <div class="tab-iframe-container">
    <aside-tab v-if="!showIframe" :leftList="leftList"></aside-tab>
    <iframe class="tab-iframe" v-else :src='"../../../../static/jsp/secframe.html?type="+this.routerLocation' frameborder="1" style="width:100%;" id="iframe"></iframe>
  </div>
</template>

<script>
    // 点击主菜单,都跳转至这个组件
    import AsideTab from '@/components/AsideTab/AsideTab'
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
        mixins: [leftListMixin],
        components:{
            AsideTab
        },
        mounted: function () {
          console.log('MainToTab.vue mounted')
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
