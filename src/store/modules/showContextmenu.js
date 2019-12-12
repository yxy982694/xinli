export default {
    state: {
        contextMenuFlag: false,  // 是否显示右键菜单
        clickedSwitch: '', // 右键选中菜单的name属性值
        clickedLabel: '' ,// 右键选中菜单的label属性值
        childContextLeft: '20px',
        editableTabs: []
    },
    getters: {

    },
    mutations: {
        setContextMenuFlag(state, flag){  // 设置右键菜单
            state.contextMenuFlag = flag
        },
        setSwitch (state,value) {
          state.clickedSwitch = value
        },
        setSwitchLabel (state,value) {
          state.clickedLabel = value
        },
        setChildContextLeft (state,value) {
          state.childContextLeft = value
        },
        setLabelArr (state,value) {
          state.labelArr.push(val)
        }
    },
    actions: {

    }
}
