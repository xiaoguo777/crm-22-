import moment from 'moment'
export default{
    //获取官方消息列表
    gettableData(state,json){
        state.tableData = json.data;
        console.log(json.data); 
    }
}
