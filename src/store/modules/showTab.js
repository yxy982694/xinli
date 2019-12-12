export default {
    state: {
        editableTabs: [],
        existTabs: [],
        currentTabLabel: '',
        currentTitle: '',
    },
    getters: {
        
    },
    mutations: {
        setEditableTabs: function (state,arr) {
            state.editableTabs = arr
        },
        setExistTabs: function (state,arr) {
            state.existTabs = arr
        },
        addEditableTabs: function (state,val) {
            state.editableTabs.push(val)
        },
        addExistTabs: function (state,val) {
            state.existTabs.push(val)
        },
        setCurrentTabLabel: function (state,val) {
            state.currentTabLabel = val
        },
        setCurrentTitle: function (state,val) {
            state.currentTitle = val
        }
    },
    actions: {
    }
}
