<template>
  <el-row>
    <el-col :span="24" class="content">
      <!--数据反馈区-->
        <el-col  :span="4">
            <p>总量：{{sum}}</p>
            <p>已领取：{{received}}</p>
            <p>待领取：{{receivable}}</p>
            <p>未领取：{{notReceived}}</p>
        </el-col>
        <el-col  :span="20">
          <ul v-for="(item,index) in ticketTypeVoList" :key="index" style="float:left;margin-right:60px;">
            <li >
              类型名称: {{item.typeName}}
            </li>
            <li>
              总量: {{item.sum}}
            </li>
            <li>
              剩余: {{item.remaining}}
            </li>
          </ul>
        </el-col>
        <!--搜索栏-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item>
              <el-input v-model="filters.name" placeholder="请输入查询内容"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" >查询</el-button>
            </el-form-item>           
            <el-form-item>
             <el-select v-model="value"  placeholder="未领取" @change="getValue" value-key="label">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item>
             <el-select v-model="value1"  placeholder="请选择电影票类型" @change="getType" value-key="label"> 
                <el-option v-for="(item,index) in collectOptions" :key="index" :label="item.label" :value="item"></el-option>
            </el-select>
            <el-button type="success" @click="goMoviecard">导入电影券</el-button>
            </el-form-item>
            <el-form-item>
            </el-form-item>
          </el-form>
        </el-col>

          <!--题目列表-->
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              border
              style="width:100%"
              id="rebateSetTable"
              @selection-change="handleSelectionChange">
            <el-table-column prop="createTime" label="导入时间" :formatter="dateFormat"></el-table-column>
            <el-table-column prop="receiveTime" label="领取时间"></el-table-column>
            <el-table-column prop="id" label="卡券ID"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="receiveUser" label="用户"></el-table-column>
            <el-table-column label="状态" width="90">
              <template slot-scope="scope">
                <div v-if="scope.row.state === 0">
                  未领取
                </div>
                <div v-if="scope.row.state === 1">
                  已领取
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 导入 -->
          <el-dialog title="导入" :visible.sync="dialogImportVisible" :modal-append-to-body="false" :close-on-click-modal="false" class="dialog-import">
              <div :class="{'import-content': importFlag === 1, 'hide-dialog': importFlag !== 1}">
                <el-upload class="upload-demo"
                :action="importUrl"
                :name ="name"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-upload="beforeUpload"
                :on-error="uploadFail"
                :on-success="uploadSuccess"
                :file-list="fileList"
                :with-credentials="withCredentials">
                <!-- 是否支持发送cookie信息 -->
                  <el-button size="small" type="primary" :disabled="processing">{{uploadTip}}</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                </el-upload>
              </div>
              <div :class="{'import-failure': importFlag === 2, 'hide-dialog': importFlag !== 2}" >
                <div class="failure-tips">
                  <i class="el-icon-warning"></i>导入失败</div>
                <div class="failure-reason">
                  <h4>失败原因</h4>
                  <ul>
                    <li v-for="(error,index) in errorResults" :key="index">第{{error.rowIdx + 1}}行，错误：{{error.column}},{{error.value}},{{error.errorInfo}}</li>
                  </ul>
                </div>
              </div>
            </el-dialog>

        <!--分页器-->
        <el-col :span="24" class="page-box">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </el-col>

    </el-col>
  </el-row>
</template>

<script>
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  data() {
    return {
      options: [
        {
          value: 0,
          label: "未领取"
        },
        {
          value: 1,
          label: "已领取"
        }
      ],
      uploadShow: false,
      collectOptions: [],
      sum: "",
      received: "",
      receivable: "",
      notReceived: "",
      value: "",
      value1: "",
      ticketTypeVoList: [],
      tableData: [],
      total: 0,
      page: 1,
      state: 0,
      typed: "",
      filters: {
        questionTitle: ""
      },
      //问题数据
      //导出excel
      multipleSelection: [],
      importUrl: "http://dev.becomebff.cn/bff/crm/film/importTicketInfo", //后台接口config.admin_url+'rest/schedule/import/'
      importHeaders: {
        enctype: "multipart/form-data",
        ticket_name: ""
      },
      name: "import",
      fileList: [],
      withCredentials: true,
      processing: false,
      uploadTip: "点击上传",
      importFlag: 1,
      dialogImportVisible: false,
      errorResults: []
    };
  },
  methods: {
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
    //批量导入
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      //复选框选择回填函数,val返回一整行的数据
      this.multipleSelection = val;
    },
    importData() {
      this.importFlag = 1;
      this.fileList = [];
      this.uploadTip = "点击上传";
      this.processing = false;
      this.dialogImportVisible = true;
    },
    handlePreview(file) {
      //可以通过 file.response 拿到服务端返回数据
    },
    handleRemove(file, fileList) {
      //文件移除
    },
    beforeUpload(file) {
      //上传前配置
      //this.importHeaders.ticket_name = "电影券名称"; //可以配置请求头
      let excelfileExtend = ".xls,.xlsx"; //设置文件格式
      let fileExtend = file.name
        .substring(file.name.lastIndexOf("."))
        .toLowerCase();
      if (excelfileExtend.indexOf(fileExtend) <= -1) {
        this.$message.error("文件格式错误");
        return false;
      }
      this.uploadTip = "正在处理中...";
      this.processing = true;
    },
    //上传错误
    uploadFail(err, file, fileList) {
      this.uploadTip = "点击上传";
      this.processing = false;
      this.$message.error(err);
    },
    //下载模板
    download() {
      //调用后台模板方法,和导出类似
      scheduleApi.downloadTemplate();
    },
    //获取总量
    getNum() {
      let config = {
        header: { "content-type": "application/json" }
      };
      let para = {
        activityId: this.$route.query.id
      };
      this.$axios.post("/film/queryTicketStatus", para, config).then(res => {
        console.log(res.data.data);
        this.sum = res.data.data.sum;
        this.received = res.data.data.received;
        this.receivable = res.data.data.receivable;
        this.notReceived = res.data.data.notReceived;
        this.ticketTypeVoList = res.data.data.ticketTypeVoList;
        var arr = [];
        res.data.data.ticketTypeVoList.map(item => {
          let obj = {};
          obj.value = item.typeId;
          obj.label = item.typeName;
          arr.push(obj);
        });
        this.collectOptions = arr;
      });
    },
    //分页点击
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    //获取奖励管理列表
    getList() {
      let config = {
        header: { "content-type": "application/json" }
      };
      let para = {
        activityId: this.$route.query.id,
        tickeType: this.typed,
        state: this.state,
        pageNum: this.page
      };
      console.log(para);
      this.$axios.post("/film/queryTicketInfo", para, config).then(res => {
        console.log(res.data.data);
        console.log("-----");
        this.tableData = res.data.data.items;
        this.total = res.data.data.totalCount;
      });
    },
    //更改已领取未领取
    getValue(value) {
      // this.typed = this.value1.label;
      this.state = value.value;
      let config = {
        header: { "content-type": "application/json" }
      };
      let para = {
        activityId: this.$route.query.id,
        tickeType: this.typed,
        state: value.value,
        pageNum: this.page
      };
      console.log(para);
      this.$axios.post("/film/queryTicketInfo", para, config).then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data.items;
        this.total = res.data.data.totalCount;
      });
    },
    //获取活动类型
    getType(value) {
      this.typed = value.label;
      let config = {
        header: { "content-type": "application/json" }
      };
      let para = {
        activityId: this.$route.query.id,
        tickeType: this.typed,
        state: this.state,
        pageNum: this.page
      };
      console.log(para);
      console.log("更改活动类型的参数");
      this.$axios.post("/film/queryTicketInfo", para, config).then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data.items;
        this.total = res.data.data.totalCount;
      });
    },
    //导入文件
    dao() {
      this.uploadShow = true;
    },
    uploadSuccess(res) {
        console.log(res)
    },
    //跳转至电影券导入
    goMoviecard(){
      this.$router.push({
        path:"/importCard",
        query: { id: this.$route.query.id }
      });
    }
  },
  mounted() {
    this.getList();
    this.getNum();
  },
  computed:{
    uploadUrl() {
        return `http://dev.becomebff.cn/bff/crm/film/importTicketInfo`
    }
  }
};
</script>

<style>
ul,
li {
  list-style: none;
}
.el-table th {
  background-color: #316283;
  color: white;
  text-align: center;
}
.el-table tr {
  text-align: center;
}
.el-button--small,
.el-button--small.is-round {
  padding: 12px 20px;
  background-color: #00a0ea;
  border: none;
  color: white;
}
.el-button:focus,
.el-button:hover:hover {
  background-color: #018ccc;
  color: white;
}
</style>

<style scoped type="less">
@import "./rewardManagement.less";
.hide-dialog {
  display: none;
}
</style>
