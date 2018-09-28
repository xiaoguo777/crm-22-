<template>
  <el-row>
    <!-- 表格区 -->
    <el-col :span="24" class="search">
      <el-col :span="24" class="search-box">
        <!--搜索框-->
        <div class="search-btn">
          <el-input class="ser-content" placeholder="请输入内容"></el-input>
          <el-button class="ser-btn">搜索</el-button>
        </div>
        <!--日期选择-->
        <template class="search-time">
          <div class="block">
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </template>
     </el-col>
      <!--表格具体内容-->
      <el-col :span="24">
        <template>
          <el-table
            :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="发布时间" width="180"></el-table-column>
            <el-table-column prop="name" label="用户名" width="130"></el-table-column>
            <el-table-column prop="report" label="内容"></el-table-column>
            <el-table-column prop="essentials" label="图片"></el-table-column>
            <el-table-column prop="content" label="点赞数"></el-table-column>
            <el-table-column prop="img" label="回复数"></el-table-column>
            <el-table-column label="操作" width="190">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="articleDetails">查看</el-button>
              <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
        </template>
      </el-col>
      <!--分页器-->
      <el-col :span="24">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data(){
    return {
      users: '845',
      newuser: '656',
      activeuser: '400',
      show: "true",
      pickerOptions2: {
      shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value6: '',
      value7: '',
      tableData: [{
        date: '2018-05-02 22:09',
        name: 'mike',
        reportedUser: 'tom',
        report: '用户',
        essentials: 'other',
        content: 'not good',
        img: '查看',
        userStatus: '正常',
        dynamicState: '已删除'
      }]
    }
  },
  methods:{
    articleDetails(){
      this.$router.push('/articleDetails')
    }
  }
}
</script>
<style>
.el-range-editor.el-input__inner{
  height:30px;
}
.el-date-editor .el-range__icon{
  line-height: 22px;
}
.el-date-editor .el-range-separator{
  line-height: 22px;
  width:10%;
}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
  width:300px;
}
.el-input__inner{
  height:30px;
}
.el-table .warning-row {
  background: oldlace;
}
.el-table th{
  text-align: center;
}
tr{
  text-align: center;
}

.el-table .success-row {
  background: #f0f9eb;
}
.el-pagination{
  margin-top:25px;
  text-align: center;
}
.content-container{
  background-color: #f9fafc;
}
</style>

<style lang="less" scoped>
.user{
  padding:34px;
  overflow: hidden;

}
 .search{
    padding:22px 34px 0 34px;
    height:100%;
  .search-box{
    height:56px;
    background-color: #316283;
    border-radius: 6px 6px 0px 0px;
    overflow: hidden;
    .search-btn{
      float: right;
    }
    .block{
      width:300px;
      float: right;
      height: 30px;
      margin-top:12px;
      margin-right: 100px;
    }
    .search-btn{
      .ser-content{
        width:216px;
        margin-top:12px;
      }
      .ser-btn{
        margin-right: 14px;
        width:46px;
        padding:0;
        height:30px;
      }
    }
  }
}
</style>
