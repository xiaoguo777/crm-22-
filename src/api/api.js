import axios from "axios";


let base = "http://www.22oclock.com/midnight/";
// let base = "http://app.becomebff.net/bff/crm"
// let base = "http://192.168.199.209:8080/crm"

//登录
export const login = params => {
  return axios.post(`${base}/bff/sys/user/login`, { params: params });
};
//官方消息列表
export const getNewsList = params => {
  return axios.post(`${base}/notice/queryNoticeList`, { params: params });
};
//删除官方消息列表
export const removeNews = params => {
  return axios.delete(`${base}/news/` + params);
};
//编辑官方消息列表
export const editNews = parama => {
  return axios.post(`${base}/news`, { parama });
};
//获取题目列表
export const getQuestionList = params => {
  return axios.get(`${base}/news`, { params: params });
};
//获取用户数
export const getcustomerCount = () => {
  return axios.post(`${base}/customerCount`);
};
//获取用户列表
// export const getCustomerList = params => { return axios.post(`${base}/bff-crm/crm/customerQuery`,{header: {'content-type': 'application/json' }}, { params: params }); };
