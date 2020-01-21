<template>
  <div class="header-container">
    <div class="headbar">
      <!-- 导航收缩 -->
        <div class="header-left">
          <h1><img src="../../common/image/ChinaMobile.png" ></h1>
          <h3>河南移动集中运维管理系统</h3>
          <div class="header-center">
            <p class="header-center-bg1"></p>
            <p class="header-center-bg2"></p>
            <p class="header-center-bg3"></p>
          </div>
        </div>
        <div class="header-right">
          <div class="header-business">
            <p class="header-business-item user-name" :title="userName+' 欢迎您'">{{userName}} 欢迎您</p>
            <p class="header-business-item">
              <i class="iconfont icon-xiaoxi"></i>
              <span>消息</span>
            </p>
            <p class="header-business-item">
              <i class="iconfont icon-tuichu"></i>
              <span>退出</span>
            </p>
            <p class="header-business-item">
              <i class="iconfont icon-icon_rukou"></i>
              <span>旧版入口</span>
            </p>
            <p class="header-business-item">
              <i class="iconfont icon-shouji"></i>
              <span>掌上运维客户端</span>
            </p>
            <p class="header-business-item">
              <i class="iconfont icon-yewu"></i>
              <span>业务开通</span>
            </p>
          </div>
          <div class="navbar">
            <el-menu ref="navmenu" mode="horizontal" default-active="1" :class="collapse?'menu-bar-collapse-width':'menu-bar-width'" class="el-menu-demo" background-color="transparent"
                       :collapse="collapse" :collapse-transition="true" :unique-opened="true" text-color="#fff" active-text-color="#fff"
                       @open="handleopen" @close="handleclose" @select="handleselect">
              <menu-tree v-for="item in navTree" :key="item.id" :menu="item"></menu-tree>
            </el-menu>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import "@/common/stylus/header.styl"
  import { mapState, mapMutations } from 'vuex'
  import mock from "@/mock/index"
  import Hamburger from "@/components/Hamburger"
  import ThemePicker from "@/components/ThemePicker"
  import NoticePanel from "@/views/Core/NoticePanel"
  import MessagePanel from "@/views/Core/MessagePanel"
  import PersonalPanel from "@/views/Core/PersonalPanel"
  import MenuTree from "@/components/MenuTree"
  import Home from '@/views/Home/Home'
  import Intro from '@/views/Intro/Intro'
  export default {
    components:{
      Hamburger,
      ThemePicker,
      NoticePanel,
      MessagePanel,
      PersonalPanel,
      MenuTree
    },
    data() {
      return {
        user: {
        },
        activeIndex: '1',
        userName: ''
      }
    },
    methods: {
      // 折叠导航栏
      // onCollapse: function() {
      //   this.$store.commit('onCollapse')
      // },
      ...mapMutations({
        'setTabChildId': 'setTabChildId'
      }),
      // 切换主题
      onThemeChange: function(themeColor) {
        this.$store.commit('setThemeColor', themeColor)
      },
      //cuipf 修改
      handleopen() {
        console.log('handleopen')
      },
      handleclose() {
        console.log('handleclose')
      },
      handleselect(a, b) {
        console.log('handleselect')
      },
      // 路由操作处理
      handleRoute (route) {
        // console.log(route.query.id)
        // tab标签页选中, 如果不存在则先添加
        let tab = this.mainTabs.filter(item => item.name === route.name)[0]
        // console.log(tab)
        // console.log(route)
        if (!tab) {
          tab = {
            name: route.name,
            title: route.name,
            icon: route.meta.icon,
            id: route.meta.index,
			      location: route.meta.location
          }
          if(this.mainTabs.length === 0 && tab.name !== '首页'){
              let homeTab = [
                  {
                      name: '首页',
                      title: '首页',
                      icon: 'fa fa-home fa-lg',
                      id: 0,
                      location: '0'
                  }
              ]
              this.mainTabs = this.mainTabs.concat(homeTab)
              this.mainTabs = this.mainTabs.concat(tab)
          }else{
              this.mainTabs = this.mainTabs.concat(tab)
          }
        }
        sessionStorage.setItem('id', route.meta.index)
        this.mainTabsActiveName = tab.name
        // 切换标签页时同步更新高亮菜单
        if(this.$refs.navmenu != null) {
          this.$refs.navmenu.activeIndex = '' + route.meta.index
          this.$refs.navmenu.initOpenedMenu()
        }
      }
    },
    computed:{
      ...mapState({
        themeColor: state=>state.app.themeColor,
        appName: state=>state.app.appName,
        themeColor: state=>state.app.themeColor,
        collapse: state=>state.app.collapse,
        navTree: state=>state.menu.navTree
      }),
       mainTabs: {
        get () { return this.$store.state.tab.mainTabs },
        set (val) { this.$store.commit('updateMainTabs', val) }
      },
      mainTabsActiveName: {
        get () { return this.$store.state.tab.mainTabsActiveName },
        set (val) { this.$store.commit('updateMainTabsActiveName', val) }
      }
    },
    mounted() {
      // console.log(this.navTree)
      let user = sessionStorage.getItem("user")
      this.userName = sessionStorage.getItem("user")
      if (user) {
        let params = {name:user}
        this.$api.user.findByName(params).then((res) => {
          if(res.code == 200) {
            this.user = res.data
            this.user.avatar = require("@/common/image/user.png")
          }
        })
      }
      // this.$api.menu.resourceManage(200000).then((res) => {
      //   console.log(res)
      // })
    },
    watch: {
      $route: 'handleRoute'
    },
    created () {
      this.handleRoute(this.$route)
    },
  }
</script>
