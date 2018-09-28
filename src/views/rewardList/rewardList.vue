<template>
  <el-row>
    <el-col :span="24" class="content">
      <!--反馈内容区-->
        <!--搜索栏-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true">
            <el-form-item>
              <el-button type="success" @click="handleAdd">新增</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--题目列表-->
        <el-table
          :data="tableData" border style="width: 100%"
          id="rebateSetTable"
          >   
          <el-table-column prop="rewardRemaining" label="电影票数量"></el-table-column>
          <el-table-column prop="typeName" label="类型名称"></el-table-column>
            <el-table-column label="领取形式">
              <template  slot-scope="scope">
                  <div v-if="scope.row.receiveType === 0">
                    编码
                  </div>
                  <div v-if="scope.row.receiveType === 1">
                    图片
                  </div>
              </template>
            </el-table-column>
          <!-- <el-table-column label="图片上传" width="290">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看背景图</el-button>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="190">
            <template slot-scope="scope">
              <router-link :to="{name:'toview',params:{img:scope.row.backgroundPicture,receiveType:scope.row.receiveType}}">
                <el-button type="danger" size="small">预览</el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>

         <!--分页器-->
        <el-col :span="24" class="page-box">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </el-col>

        <!--新增界面-->
        <el-dialog title="新增电影活动类型" :visible.sync="addFormVisible" :close-on-click-modal="false" :modal-append-to-body="false" append-to-body>
          <el-form :model="addForm" label-width="120px"  ref="addForm">
            <el-form-item label="电影票数量" prop="rewardRemaining">
              <el-input v-model="addForm.rewardRemaining" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="电影活动名称">
              {{activityName}}
            </el-form-item>           
            <el-form-item label="领取形式" prop="receiveType">
              <!-- <el-input v-model="addForm.phone" auto-complete="off"></el-input> -->
               <el-select v-model="addForm.receiveType"  placeholder="请选择领取形式" @change="getValue">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item" > </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="上传背景图">
              <input type="file" id="file" ref="imgPush">
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" >提交</el-button>
          </div>
        </el-dialog>
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
          label: "编码"
        },
        {
          value: 1,
          label: "图片"
        }
      ],
      value: "",
      page: 1,
      total: 0,
      tableData: [],
      receiveType: "",
      addFormVisible: false,
      id: "",
      activityName: "",
      //新增界面数据
      addForm: {
        activityId: "",
        receiveType: "",
        rewardRemaining: "",
        file: ""
      }
    };
  },
  methods: {
    //改变领取方式
    getValue(value) {
      console.log(value);
      this.receiveType = value.value;
      console.log("领取形式" + value.value);
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return this.$moment(date).format("YYYY-MM-DD hh:mm:ss");
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //分页点击
    handleCurrentChange(val, value) {
      value = this.value;
      this.page = val;
      this.getValue(value);
    },
    //获取列表
    getList() {
      let config = {
        header: { "content-type": "application/json" }
      };
      let para = {
        // activityId: "38d7d573947011e894590242ac130002"
        activityId: this.$route.query.id
      };
      this.$axios.post("/film/queryTicketType", para, config).then(res => {
        console.log(res.data.data);
        this.tableData = res.data.data;
      });
    },
    //显示新增界面
    handleAdd() {
      this.addFormVisible = true;
      this.addForm = {
        activityId: "",
        receiveType: "",
        rewardRemaining: "",
        file: ""
      };
    },
    //新增背景图
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let config = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            let formdata = new FormData();
            let para = Object.assign({}, this.addForm);
            formdata.append("activityId", this.id);
            formdata.append("receiveType", this.receiveType);
            formdata.append("rewardRemaining", para.rewardRemaining);
            formdata.append("file", this.$refs.imgPush.files[0]);
            console.log(this.id);
            console.log(this.receiveType);
            console.log(para.rewardRemaining);
            console.log(this.$refs.imgPush.files[0]);
            this.$axios
              .post("/film/insertTicketType", formdata, config)
              .then(res => {
                console.log(res.data);
                if (res.data.code == 200) {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.addFormVisible = false;
                  this.getList();
                } else {
                  this.$message({
                    message: "一期活动类型不能超过4个",
                    type: "info"
                  });
                }

                // this.$refs['addForm'].resetFields();
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      });
    }
    //预览
    // gopreview: function(index, row) {
    //   console.log(row);
    //   this.$router.push({
    //     path:"/toview",
    //     query:"{bg:row.backgroundPicture,receiveType:row.receiveType}"
    //   })
    // }
  },
  mounted() {
    // console.log(row.backgroundPicture)
    this.id = this.$route.query.id;
    this.activityName = this.$route.query.activityName;
    this.getList();
  }
};
</script>

<style>
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
@import "./rewardList.less";
</style>
