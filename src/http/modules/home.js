import axios from '../axios'
/*
 *首页
 */

// 获取最新公告
export const getLatestNews = (params) => {
  return axios({
    url: '/home/getLatestNews',
    method: 'post',
    params
  })
}

// 获取待办列表
export const getUpComList = () => {
  return axios({
    url: '/home/getUpComList',
    method: 'post'
  })
}

//获取专家值班列表
export const getExpertDutyList = () => {
  return axios({
    url: '/home/getExpertDutyList',
    method: 'post'
  })
}
//首页数据初始化
export const getMessageData = () => {
  return axios({
    url: '/home/getMessageData',
    method: 'post'
  })
}//首页我的待办
export const getDbList = () => {
  return axios({
    url: '/home/getDbList',
    method: 'post'
  })
}
