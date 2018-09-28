
<template>
  <el-row>
    <el-col :span="24" class="content">
      <!--反馈内容区-->
        <!--搜索栏-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters" style="">
             <!-- <el-form-item style="float:left">
              <el-input placeholder="请输入查询内容" @change="getContent"></el-input>
            </el-form-item>
            <el-form-item style="float:left">
              <el-button type="primary" @click="searchContent">查询</el-button>
            </el-form-item>  -->
            
            <el-form-item style="float:right">
              <el-button type="danger" >全部删除</el-button>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="success" @click="handleAdd">新增</el-button>
            </el-form-item>
            <el-form-item style="float:right">
              <el-button type="success" @click="dao">导入Excel</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--题目列表-->
        <el-table
          :data="tableData" border style="width: 100%">
          <el-table-column prop="orderNumber" label="序号" width="90"></el-table-column>        
          <el-table-column prop="subject" label="题目"></el-table-column>       
          <el-table-column label="操作" width="190">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页器-->
        <el-col :span="24">
          <el-pagination
              class="fenye"
              @current-change="handleCurrentChange"
              background
              layout="prev, pager, next"
              :total="totalCount"
              :page-size="10">
          </el-pagination>
        </el-col>

        <!--新增界面-->
        <el-dialog title="新增题目" :visible.sync="addFormVisible" :close-on-click-modal="false" :modal-append-to-body="false">
          <el-form :model="addForm" label-width="80px"  ref="addForm">
            <el-form-item label="" prop="subject">
              <el-input v-model="addForm.subject" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="addSubmit" >提交</el-button>
          </div>
        </el-dialog>

         <!-- 上传文件对话框 -->
        <el-dialog title="上传文件" :visible.sync="uploadShow" :modal-append-to-body="false">
            <el-upload :action="uploadUrl" :on-success="uploadSuccess">
                <el-button type="primary" icon="el-icon-upload">上传</el-button>
            </el-upload>
            <span slot="footer">
                <el-button type="danger" icon="el-icon-close" @click="uploadShow=false">关闭</el-button>
            </span>
        </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      totalCount: 0,
      subject:"",
      page: 1,
      uploadShow: false,
      filters: {
        questionTitle: ""
      },
      //新增界面数据
      addForm: {
        questionTitle: ""
      },
      //编辑界面数据
      editForm: {
        questionTitle: "",
        questionA: "",
        questionB: "",
        questionC: "",
        questionD: ""
      },
      //新增界面是否显示
      addFormVisible: false,
      //新增界面是否显示
      editFormVisible: false
    };
  },
  methods: {
    //导入excel
    dao(){
      this.uploadShow = true;
    },
    uploadSuccess(res) {
      console.log(res)
      if(res.code==200){
        this.$notify({
              type: 'success',
              message: '导入成功!'
        })
        this.getDatas()
        this.uploadShow = false
      }else{
         this.$notify({
            type: 'info',
            message: res.message
        })
      }
    },
    //搜索
    //获取查询内容
    getContent(val) {
      this.subject = val;
    },
    // 搜索内容
    // searchContent() {
    //   this.getDatas();
    // },
    //分页点击
    handleCurrentChange(val) {
      this.page = val;
      this.getDatas();
    },
    handleAdd() {
      //显示新增界面
      this.addFormVisible = true;
      this.addForm = {
        subject: ""
      };
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true;
      this.editForm = Object.assign({}, row);
    },
    //获取大冒险列表
    getDatas() {
      let config = {
        header: { "content-type": "application/json" }
      };
      let para = {
        subject:this.subject,
        page: this.page
      };
      this.$axios
        .post("/crm/officialquestion/queryquestionlist", para, config)
        .then(res => {
          console.log(res.data.data);
          this.tableData = res.data.data.officialQuestionList;
          this.totalCount = res.data.data.count;
        });
    },
    //新增题目
    addSubmit() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let config = {
              header: { "content-type": "application/json" }
            };
            let para = {
              subject: this.addForm.subject
            };
            console.log(para);
            this.$axios
              .post("/crm/officialquestion/insertquestion", para, config)
              .then(res => {
                console.log(res.data);
                if (res.data.code == 200) {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.addFormVisible = false;
                  this.getDatas();
                }
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      });
    }
  },
  mounted() {
    this.getDatas();
  },
  computed: {
    uploadUrl() {
        return `http://www.22oclock.com/midnight/crm/officialquestion/importQuestionExcel`
    }
  }
};
</script>

<style>
.fenye {
  text-align: center;
  margin: 40px 0;
}
.el-table th {
  background-color: #1e1439;
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
@import "./problem.less";
</style>
