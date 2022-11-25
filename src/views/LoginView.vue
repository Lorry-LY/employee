<template>
  <div class="login_content">
    <div style="margin:0px 10%;">
      <el-row :gutter="20" type="flex">
        <el-col :span="4"></el-col>
        <el-col :span="10">
          <img class="image" placeholder="图片正在加载" src="../assets/logo.png" />
        </el-col>
        <el-col :span="7"></el-col>
      </el-row>
      <el-row style="text-align:center;margin-bottom: 50px;">
        <span class="demonstration">区块链产品信息管理系统</span>
      </el-row>
      <el-form :label-position="labelPosition" label-width="100px" :model="department" :rules="rules" ref="department">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="department.name" placeholder="请输入您所属的部门名称"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="department.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="department.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox v-model="text_checked" class="text_checked">同意协议</el-checkbox> <br>
      <el-button class="login_btn" type="primary" style="min-width:100px;" @click="login" :disabled="!text_checked">登录
      </el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      text_checked: false,
      labelPosition: 'right',
      department: {
        name: '',
        username: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    login() {
      this.$refs['department'].validate((valid) => {
        if (valid) {
          this.$router.push('employee')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login_content {
  text-align: left;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  padding: 20px;
  width: 90%;
  margin: auto;
  margin-top: 5%;
}

.image{
  width: 200px;
  height: 200px;
}

.el-form-item {
  margin: 20px auto;
}

.text_checked {
  margin: 20px auto;
}

.vetify_btn {
  width: 100%;
  margin-bottom: 20px;
}

.phone_vetify_btn {
  margin: 20px auto;
}

.login_btn {
  margin-left: 37.5%;
}

.demonstration {
  color: rgb(0, 0, 0);
  font-size: 30px;
  font-weight: bold;
  font-family: "微软雅黑";
  /* margin-bottom: 20px; */
}
.el-tabs {
  position: relative;
}
</style>
