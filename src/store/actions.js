import axios from "axios";
import router from "../router"
import index from "./index";

axios.defaults.baseURL = "http://192.168.199.141:3333/"  

export default {
    //获取官方消息列表
    gettableData({ commit }, url) {
        axios.get(url)   // baseURL+url
            .then(res => res.data)
            .then(json => {
                commit('gettableData', json)
            })
        }
}