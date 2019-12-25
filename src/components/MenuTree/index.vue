<template>
  <div class="menuRoot">
    <el-submenu v-if="menu.children && menu.children.length >= 1" :index="'' + menu.id">
      <template slot="title">
        <span slot="title" class="root-title">{{menu.name}}</span>
      </template>
      <MenuTree v-for="item in menu.children" :key="item.id" :menu="item"></MenuTree>
    </el-submenu>
    <el-menu-item v-else :index="'' + menu.id" @click="handleRoute(menu)">
      <span slot="title" class="root-maintitle">{{menu.name}}</span>
    </el-menu-item>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { getIFrameUrl, getIFramePath } from '@/utils/iframe'
  export default {
    name: 'MenuTree',
    props: {
      menu: {
        type: Object,
        required: true
      }
    },
    computed: {
      routerObj: {
        get: function () {
          return this.$store.state.routerIdData.routerObj
        },
        set: function () {}
      },
    },
    methods: {
      ...mapMutations({
        'setRouterObj': 'setRouterObj',
        'setRouterId': 'setRouterId'
      }),
      handleRoute (menu) {
        this.setRouterId(menu.id)
        console.log(menu.id)
        this.$api.menu.resourceManage(menu.id).then((res) => {
          console.log(res)
          // sessionStorage.setItem('arr', res.data)
          this.setRouterObj({
            id: menu.id,
            arr: res
          })
        })
        console.log(this.routerObj)
        // 如果是嵌套页面，转换成iframe的path
        let path = getIFramePath(menu.location)
        sessionStorage.setItem('id', menu.id)
        if(!path) {
          path = menu.location
        }
        // 通过菜单URL跳转至指定路由

        // this.$router.push({
        //   name: menu.name,
        //   params: {
        //     id: menu.id
        //   }
        // })
        this.$router.push({
          path: "/" + path
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .root-title
    width: 100%
    display: inline-block
  .root-maintitle
    min-width: 85px
    display: inline-block
</style>
