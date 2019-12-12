export default {
  state: {
    // 主入口标签页
    mainTabs: [],
    // 当前标签页名
    mainTabsActiveName: '',
    //保存缓存的列表
    keepAliveList: ''
  },
  mutations: {
    updateMainTabs (state, tabs) {
      state.mainTabs = tabs
    },
    updateMainTabsActiveName (state, name) {
      state.mainTabsActiveName = name
    },
    setKeepAliveLists(state,arrListString){
      state.keepAliveList = arrListString;
    }
  }
}
