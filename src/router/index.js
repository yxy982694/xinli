import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/404'
import Home from '@/views/Home/Home'
import Intro from '@/views/Intro/Intro'
import api from '@/http/api'
import store from '@/store'
import { getIFramePath, getIFrameUrl } from '@/utils/iframe'
import ar from "element-ui/src/locale/lang/ar"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      meta: {
        keepAlive: false // 不需要被缓存
      },
      children: [
        {
          path: '',
          name: '首页',
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg',
            index: 0,
            keepAlive: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/404',
      name: 'notFound',
      component: NotFound
    }
  ]
})
// url只要改变就会执行这个router.beforeEach
// 不管是通过点击按钮跳转的,还是通过浏览器前进和后退进行跳转的
router.beforeEach((to, from, next) => {
  // 是否显示iframe
  if (to.path.length>1&&parseInt(to.path.toString().substr(1))) {
    store.commit('setShowIframe', true)
  } else {
    store.commit('setShowIframe', false)
  }
  // 改变路由id 当刷新页面时,from.name为null
  if (from.name) {
    store.commit('setRouterId', to.meta.index)
  }
  console.log('909090------')
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if(userName) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: '/login' })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      if(from.path === to.path && from.name === null && from.path != "/" && router.options.routes.length === 0 ){
        next({ path: '/' })
      }else{
        next()
      }

    }
  }
})

/**
 * 加载动态菜单和路由  可以放到api目录中,用于调用接口
 */
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面
  handleIFrameUrl(to.path)
  // 当动态菜单和路由已经加载,则不用再次加载菜单和路由信息
  if(store.state.app.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }
  api.menu.findNavTree({'userName':userName})
    .then(res => {
      // 添加动态路由
      console.log(res.data)
      let dynamicRoutes = addDynamicRoutes(res.data)
      // 处理静态组件绑定路由 把res.data中的路由信息全部放在根目录的children中
      router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
      router.addRoutes(router.options.routes)
      // 保存加载状态
      store.commit('menuRouteLoaded', true)
      // 保存菜单树
      store.commit('setNavTree', res.data)
    }).then(res => {
    api.user.findPermissions({'name':userName}).then(res => {
      // 保存用户权限标识集合
      store.commit('setPerms', res.data)
    })
  })
    .catch(function(res) {
    })
}

/**
 * 处理IFrame嵌套页面 目前并没有用到嵌套页面
 */
if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1
   }
}
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  // console.log(store.state.iframe.iframeUrls)
  for(let i=0; i<length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    if(path != null && path.endsWith(iframe.path)) { // 如果要跳转的路由满足一定条件
      // 则把嵌套路由数组中的某个路径,设置成当前路径
      // 说明嵌套路由数组中的某个路径,在要跳转的路由
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes (menuList = [], routes = []) {
  let temp = []
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].location && /\S/.test(menuList[i].location)) {
      // console.log("==========================" + menuList[i].location)
      menuList[i].location = menuList[i].location.replace(/^\//, '')
      // 创建路由配置
      let route = {
        path: menuList[i].location,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id,
          keepAlive: true,
          location: menuList[i].location
        }
      }
      let path = getIFramePath(menuList[i].location)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].location)
        let iFrameUrl = {'path':path, 'url':url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].location.split('/')
          let url = ''
          for(let i=0; i<array.length; i++) {
            url += array[i].substring(0,1).toUpperCase() + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          route['component'] = resolve => require(['@/components/MainToTab/MainToTab'], resolve)
          // route['component'] = resolve => require([`@/views/${url}`], resolve)
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router
