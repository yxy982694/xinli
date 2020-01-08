// 判断该模块是否已经加载过,加载过则不再调用接口
export default {
    state: {
        // 资源管理模块
        resourceFlag: false,
        resourceArr: [],
        // 用户管理模块
        userFlag: false,
        usereObj: {},
        userOriganFlag: false,
        userOriganArr: [],
    },
    mutations: {
      // 资源管理模块
      setResourceFlag: function (state,flag) {
        state.resourceFlag = flag
      },
      setResourceArr: function (state,arr) {
        state.resourceArr = arr
      },
      // 用户管理模块
      setUserFlag: function (state,flag) {
        state.userFlag = flag
      },
      setUserObj: function (state,obj) {
        state.userObj = obj
      },
      setUserOriganFlag: function (state,flag) {
        state.userOriganFlag = flag
      },
      setUserOriganArr: function (state,arr) {
        state.userOriganArr = arr
      }
    }
}
