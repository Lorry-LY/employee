<template>
  <div class="content">
    <el-row style="margin-top:12%">
      <div class="image">
        <img src="../../assets/index.jpg" alt="头像" class="img">
      </div>
    </el-row>
    <el-row>
      <span class="name">{{ username.name }}</span>
    </el-row>
    <el-row style="margin-top:12%">
      <el-button type="primary" @click="handleClick()">切换账号</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: {
        name: '小熊维尼',
        src: ''
      }
    }
  },
  methods: {
    handleClick() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.image {
  width: 50%;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
}

.img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.name {
  display: inline-block;
  margin: 20px auto;
  font-size: 20px;
  font-weight: bold;
  color: #000;
}
</style>