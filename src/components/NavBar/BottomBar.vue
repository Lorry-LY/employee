<template>
  <div class="content">
    <el-row :gutter="20" type="flex">
      <el-col :span="8">
        <el-button type="text" @click="handleClick('/employee/add')" class="btn">
          <i class="el-icon-upload"></i><br>
          <span style="font-size:small">上传信息</span>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="text" @click="handleClick('/employee/search')" class="btn">
          <i class="el-icon-s-claim"></i><br>
          <span style="font-size:small">查看</span>
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button type="text" @click="handleClick('/employee/index')" class="btn">
          <i class="el-icon-s-custom"></i><br>
          <span style="font-size:small">我的</span>
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: '1'
    }
  },
  methods: {
    handleClick(value) {
      this.$router.push({
        path: value,
      }, () => {});
    }
  }

}
</script>

<style scoped>
.btn {
  padding:8px;
}
</style>