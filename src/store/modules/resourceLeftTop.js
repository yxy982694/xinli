export default {
    state: {
        resourceLeft: '',
        resourceTop: '',
    },
    mutations: {
        setResourceLeft(state, val){
            state.resourceLeft = val
        },
        setResourceTop(state, val){
            state.resourceTop = val
        },
    }
}
