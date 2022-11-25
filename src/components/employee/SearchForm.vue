<template>
  <div class="content">
    <el-row :gutter="20" style="background-color:rgb(0,171,254);border-bottom: 1px solid;">
      <span class="description">查看产品</span>
    </el-row>

    <el-row style="margin:10px">
      <el-input style="text-align:center" placeholder="搜索" v-model="searchText">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-row>

    <el-row :gutter="20" style="margin: 10px;">
      <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleTableCurrentChange">
        <el-table-column type="index" label="序号" width="50">
        </el-table-column>
        <el-table-column property="date" label="时间" width="100" sortable>
        </el-table-column>
        <el-table-column property="name" label="产品名称" width="120">
        </el-table-column>
        <el-table-column property="code" label="序列号" width="120" sortable>
        </el-table-column>
      </el-table>
    </el-row>

    <el-row>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageCurrentChange"
          :current-page.sync="currentPage" :page-size="100" layout="prev, pager, next, jumper" :total="1" background>
        </el-pagination>
      </div>
    </el-row>

    <el-dialog class="dialog" title="详细信息" :visible.sync="dialogFormVisible">
      <el-descriptions class="margin-top" :column="1" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            名称
          </template>
          {{currentRow.name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            序列号
          </template>
          {{currentRow.code}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            更新时间
          </template>
          {{currentRow.date}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            处理部门
          </template>
          {{currentRow.department}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            处理员工
          </template>
          {{currentRow.employee}}
        </el-descriptions-item>
      </el-descriptions>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1001,
      scanText: '扫描',
      inputData: {},
      formData: {},
      searchText: '',
      tableData: [{
        name: '安慕希',
        code: '10001',
        employee: '张三',
        date: '2016-06-04'
      }, {
        date: '2016-05-04',
        name: '安慕希',
        code: '10002',
        employee: '张三'
      }, {
        date: '2016-05-01',
        name: '安慕希',
        code: '10003',
        employee: '张三'
      }, {
        date: '2016-05-03',
        name: '安慕希',
        code: '10004',
        employee: '张三'
      }],
      currentRow: {
        date: '',
        name: '',
        code: '',
        employee: ''
      },
      currentPage: 1,
      dialogFormVisible: false,
    }
  },
  watch: {

  },
  computed: {
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleTableCurrentChange(val) {
      this.currentRow = val;
      this.dialogFormVisible = true;
    },
    handleSizeChange() {

    },
    handlePageCurrentChange() {

    }
  }
}
</script>

<style scoped>

.dialog {
  width: 100%;
}

.dialog >>> .el-dialog {
  width: 80% !important;
}
.description {
  display: inline-block;
  margin: 20px auto;
  font-size: 20px;
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
</style>