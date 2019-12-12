import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex);

// 引入子模块
import app from './modules/app'
import tab from './modules/tab'
import iframe from './modules/iframe'
import user from './modules/user'
import menu from './modules/menu'
import tagsView from "./modules/tagsView"
import contextMenu from "./modules/showContextmenu"
import showTab from "./modules/showTab"
import tableCurrentId from "./modules/tableCurrentId"

const store = new vuex.Store({
  modules: {
    app: app,
    tab: tab,
    iframe: iframe,
    user: user,
    menu: menu,
    tagsView: tagsView,
    contextMenu: contextMenu,
    showTab: showTab,
    tableCurrentId: tableCurrentId
  }
})

export default store
