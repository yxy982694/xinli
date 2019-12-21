import { mapMutations } from 'vuex'
export const leftListMixin = {
      data() {
          return {
              leftList:[
                  {   id: 1,
                      location: '/SysManage/OperProcess/ConfigManageTab/BasicManage',
                      label: '基础管理'
                  },
                  {   id: 2,
                      location: 'http://www.baidu.com/',
                      label: '百度'
                  },
                  {   id: 3,
                      location: 'http://10.217.1.31:9082/eoms/frame/frame.jsp#demo_page1',
                      label: 'emos'
                  },
              ]
          }
      },
      mounted: function () {
        this.initData()
      },
      computed: {
        centerMenu: {
          get: function () {
            return this.$store.state.centerMenu.centerMenu
          },
          set: function () {}
        },
        routerId: {
          get: function () {
            return this.$store.state.routerIdData.routerId
          },
          set: function () {}
        },
        routerObj: {
          get: function () {
            return this.$store.state.routerIdData.routerObj
          },
          set: function () {}
        },
      },
      methods: {
        ...mapMutations({
          'setCenterMenu': 'setCenterMenu',
          'setRouterId': 'setRouterId',
          'setRouterObj': 'setRouterObj',
        }),
        initData: function () {
          // 调取左侧导航接口数据
          // 也可以把调用接口放在MenuTree.vue组件的handleRoute方法中
          // 并传入点击时对应的id就行
          // 还要在点击ToggleNav.vue组件中写调用数据的接口传入对应的id就行了
          // 在这4个事件函数都要调用接口
          // 可以把id和id对应的数据保存在store中，在每个页面中放入都调用store存入的数据就行了
          // <p @click="tabsCloseCurrentHandle">关闭</p>
          // <p @click="tabsCloseOtherHandle">关闭其它</p>
          // <p @click="tabsCloseAllHandle">关闭全部</p>
          // <p @click="tabsRefreshCurrentHandle">刷新</p>
          // 在刷新页面时，重新调用接口
          let obj = null
          let id = this.routerId
          if (id) { // 如果store中有id，则直接使用保存的值
            let res = this.routerObj[id]
            console.log(res)
            for (var i=0;i<res.data.length;i++) {
              console.log(res.data[i].children)
              // 让左侧导航的id和children分别作为一个对象的属性和属性值
              // 方便在知道id的情况下找到id对应的数据
              // 主要为了在中间部分导航平铺的数组数据
              this.setCenterMenu({
                id: res.data[i].id,
                arr: res.data[i].children
              })
              obj = {
                id: res.data[i].id,
                location: res.data[i].location?res.data[i].location: '/SysManage/OperProcess/ConfigManageTab/BasicManage',
                label: res.data[i].name
              }
              this.leftList.unshift(obj)
            }
          } else { // 如果store中不存在id的值，则重新调用一次接口，刷新页面时
            this.$api.menu.resourceManage(sessionStorage.getItem('id')).then((res) => {
              this.setRouterObj({
                id: sessionStorage.getItem('id'),
                arr: res
              })
              this.setRouterId(sessionStorage.getItem('id'))
              for (var i=0;i<res.data.length;i++) {
                this.setCenterMenu({
                  id: res.data[i].id,
                  arr: res.data[i].children
                })
                obj = {
                  id: res.data[i].id,
                  location: res.data[i].location?res.data[i].location: '/SysManage/OperProcess/ConfigManageTab/BasicManage',
                  label: res.data[i].name
                }
                this.leftList.unshift(obj)
              }
            })
          }
      }
  },
}
