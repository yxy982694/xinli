import axios from '../axios'

/*
 * 菜单管理模块
 */

 // 保存
export const save = (data) => {
    return axios({
        url: '/menu/save',
        method: 'post',
        data
    })
}
// 批量删除
export const batchDelete = (data) => {
    return axios({
        url: '/menu/delete',
        method: 'post',
        data
    })
}
// 查找导航菜单树
export const findNavTree = (params) => {
    return axios({
        url: '/menu/findNavTree',
        method: 'get',
        params
    })
}
// 查找导航菜单树
export const findMenuTree = () => {
    return axios({
        url: '/menu/findMenuTree',
        method: 'get'
    })
}
/*
 * 资源管理模块
 */
// 初始查询
export const loadData = () => {
  return axios({
    url: '/menu/resourceManageList',
    method: 'get'
  })
}
// 新增
export const addResource = (res) => {
  return axios({
    url: '/menu/addResource',
    method: 'post',
    data: res
  })
}
// 编辑资源
export const editResource = (res) => {
  return axios({
    url: '/menu/editResource',
    method: 'post',
    data: res
  })
}
// 查询资源实体对象  /menu/findResources/{menuId}
export const searchResource = (id) => {
  return axios({
    url: '/menu/findResources/'+id,
    method: 'get'
  })
}
// 删除当前行以及子节点  /menu/delResources/{id}
export const deleteResource = (id) => {
  return axios({
    url: '/menu/delResources/'+id,
    method: 'get'
  })
}
