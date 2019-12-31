export default {
    state: {
        mainIdStoreTabObj: {}
    },
    mutations: {
        setMainIdStoreTabObj(state, obj){
            state.mainIdStoreTabObj[obj.id] = {
                editableTabs: obj.editableTabs,
                existTabs: obj.existTabs,
                currentTabLabel: obj.currentTabLabel,
                currentTitle: obj.currentTitle,
                currentTabId: obj.currentTabId
            }
        }
    }
}
