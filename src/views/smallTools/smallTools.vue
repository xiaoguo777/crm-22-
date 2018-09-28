<template>
  <el-row>
    <p class="chang-text">
      更改背景图
    </p>
    <el-form ref="sizeForm"  :model="sizeForm" label-width="130px" size="mini" method="post" enctype="multipart/form-data" style="margin:40px 0;">
      <el-form-item label="上传图片" props="imgPush">
        <input type="file" id="file" ref="imgPush">
      </el-form-item>
      <el-form-item size="large" style="margin-top:40px;">
          <el-button type="primary" @click.native="addSubmit">上传</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<style>
.chang-text{
  line-height: 53px;
  color:#271e3d !important;
  font-size:18px;
  width:96%;
  margin-left:2%;
  border-bottom:2px solid #bbb0d0;
}
</style>

<script>
export default {
  data() {
    return {
      sizeForm: {
        file: ""
      }
    };
  },
  methods: {
    addSubmit() {
      this.$refs.sizeForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            let config = {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            };
            let formdata = new FormData();
            formdata.append("file", this.$refs.imgPush.files[0]);
            console.log(this.$refs.imgPush.files[0]);
            this.$axios
              .post("/crm/officialquestion/insertPicture", formdata, config)
              .then(res => {
                console.log(res.data);
                if (res.data.code == 200) {
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: res.data.message,
                    type: "info"
                  });
                }
              })
              .catch(error => {
                console.log(error);
              });
          });
        }
      });
    }
  }
};
</script>

