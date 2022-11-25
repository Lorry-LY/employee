<template>
  <div class="content">
    <el-row :gutter="20" style="background-color:rgb(0,171,254);border-bottom: 1px solid;">
      <el-select class="on_border_select" v-model="value" placeholder="选择格式">
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select><br>
      <span class="description" v-text="formData.description"></span>
    </el-row>

    <el-row :gutter="20" style="margin-top:50px;">
      <el-form :model="inputData" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
        <el-form-item v-for="(domain) in formData.column" :label="domain.value" :key="domain.key"
          :prop="domain.key.toString()" :rules="{
            required: true, message: domain.value + '不能为空', trigger: 'blur'
          }">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input v-model="inputData[domain.key]"></el-input>
            </el-col>
            <el-col :span="4" v-show="domain.value === '序列号'">
              <el-button @click.prevent="scanning()">
              <i class="el-icon-camera-solid"></i></el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="btn_item">
          <template slot-scope="">
              <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
              <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
          </template>
        </el-form-item>
      </el-form>
    </el-row>

    <el-dialog class="dialog" title="扫描数据" :visible.sync="dialogFormVisible" @close="handleClose()">
      <video id="videoCamera" class="canvas" :width="videoWidth" :height="videoHeight" autoPlay></video>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        id: 1001,
        name: '安慕希',
        description: '第一批安慕希',
        date: '2021-06-10 15:30',
        column: [{
          value: '名称',
          key: 0
        }, {
          value: '序列号',
          key: 1
        }, {
          value: '处理人',
          key: 2
        }]
      }, {
        id: 1002,
        name: '伊利',
        description: '第一批伊利',
        date: '2021-07-10 10:30',
        column: [{
          value: '名称',
          key: 0
        }, {
          value: '序列号',
          key: 1
        }, {
          value: '处理人',
          key: 2
        }, {
          value: '处理时间',
          key: 3
        }]
      }],
      value: 1001,
      scanText: '扫描',
      inputData: {},
      formData: {},
      dialogFormVisible: false,
      thisVideo: null,
      videoWidth: 200,
      videoHeight: 200,
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        for (let j = 0; j < this.options.length; j++) {
          if (this.options[j].id == value) {
            // this.inputData = {}
            // for (let i = 0; i < this.options[j].column.length; i++) {
            //   var key = 'key_' + this.options[j].column[i].key
            //   console.log(key)
            //   this.inputData[key] = '';
            // }
            this.formData = this.options[j];
          }
        }
      }
    }
  },
  computed: {
  },
  methods: {
    scanning() {
      this.dialogFormVisible = true;
      this.getCompetence()
    },
    handleClose() {
      this.dialogFormVisible = false
      this.stopNavigator()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let temp = Object.assign({}, this.inputData);
          let date = new Date();
          temp.date = date.getFullYear() + '-' 
                    +date.getMonth() + '-'
                    +date.getDay() + ' '
                    +date.getHours() + ':'
                    +date.getMinutes() 
                    this.resetForm('dynamicValidateForm')
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 调用摄像头权限
    getCompetence() {
        //必须在model中render后才可获取到dom节点,直接获取无法获取到model中的dom节点
        this.$nextTick(() => {
          const _this = this;
          this.os = false;//切换成关闭摄像头
          // this.thisCancas = document.getElementById('canvasCamera');
          // this.thisContext = this.thisCancas.getContext('2d');
          this.thisVideo = document.getElementById('videoCamera');
          // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
          if (navigator.mediaDevices === undefined) {
            navigator.menavigatordiaDevices = {}
          }
          // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
          // 使用getUserMedia，因为它会覆盖现有的属性。
          // 这里，如果缺少getUserMedia属性，就添加它。
          if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = function (constraints) {
              // 首先获取现存的getUserMedia(如果存在)
              let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia;
              // 有些浏览器不支持，会返回错误信息
              // 保持接口一致
              if (!getUserMedia) {
                return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
              }
              // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
              return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject)
              })
            }
          }
          const constraints = {
            audio: false,
            video: {width: _this.videoWidth, height: _this.videoHeight, transform: 'scaleX(-1)'}
          };
          navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ('srcObject' in _this.thisVideo) {
              _this.thisVideo.srcObject = stream
            } else {
              // 避免在新的浏览器中使用它，因为它正在被弃用。
              _this.thisVideo.src = window.URL.createObjectURL(stream)
            }
            _this.thisVideo.onloadedmetadata = function (e) {
              _this.thisVideo.play()
            }
          }).catch(err => {
            this.$notify({
              title: '警告',
              message: '没有开启摄像头权限或浏览器版本不兼容.',
              type: 'warning'
            });
          });
        });
      },
      //关闭摄像头
      stopNavigator() {
        if (this.thisVideo && this.thisVideo !== null) {
          this.thisVideo.srcObject.getTracks()[0].stop();
          this.os = true;//切换成打开摄像头
        }
      }
  }
}
</script>

<style scoped>
.canvas {
  background-color: #000;
}
.description {
  display: inline-block;
  margin-bottom: 5px;
  font-size: small;
  color: #fff;
}

.on_border_select {
  margin-top: 10px;
  background-color: transparent;
  color: #fff;
}

.on_border_select>>>.el-input {
  border: none;
  background-color: transparent;
  color: #fff;
}

.on_border_select>>>.el-input__inner {
  border: none;
  background-color: transparent;
  color: #fff;
}

.btn_item>>>.el-form-item__content {
  margin-left: 0px !important;
}

.dialog >>> .el-dialog {
  width: 80% !important;
}
</style>