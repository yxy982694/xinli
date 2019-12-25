export default {
    state: {
        resourceLeft: '',
        resourceTop: '',
        resourceDisplay: 'none'
    },
    mutations: {
        setResourceLeft(state, val){
            state.resourceLeft = val
        },
        setResourceTop(state, val){
            state.resourceTop = val
        },
        setResourceDisplay(state, val){
            state.resourceDisplay = val
        },
    }
}
