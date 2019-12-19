export default {
    state: {
        routerId: '', // 点击导航时对应的id
        routerData: null,
        routerObj: {}
    },
    getters: {

    },
    mutations: {
        setRouterId(state, id){  // 保存导航按钮对应的id
            state.routerId = id
        },
        setRouterData(state, data){  // 保存导航按钮对应的id
            state.routerData = data
        },
        setRouterObj(state, obj){  // 保存导航按钮对应的id
            state.routerObj[obj.id] = obj.arr
        },
    },
    actions: {
    }
}
