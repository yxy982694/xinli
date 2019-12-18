export default {
    state: {
        centerMenu: {},  // 
        centerMenuId: null
    },
    mutations: {
      setCcenterMenuId(state,id){  // 用户权限标识集合
          state.centerMenuId = id
      },
      setCenterMenu(state,id, obj){  //
          state.centerMenu[id] = obj
      }
    },
}
