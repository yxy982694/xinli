export default {
    state: {
        resourceFlag: false,
        resourceData: null
    },
    mutations: {
      setResourceFlag(state,flag){
          state.resourceFlag = flag
      },
      setResourceData(state,arr){
          state.resourceData = arr
      }
    },
}
