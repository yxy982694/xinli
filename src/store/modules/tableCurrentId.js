export default {
    state: {
        currentId: [],  // 获取当前行id
    },
    getters: {
   
    },
    mutations: {
        setCurrentId(state, id){  // 设置当前行id
            state.currentId = id;
        }
    },
    actions: {
    }
}