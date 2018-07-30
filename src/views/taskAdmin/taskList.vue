<template>
  <div class="app-container">
    <!--工具条 start-->
    <el-col :span="24" class="toolbar" style="padding-bottom:0">
      <el-form :inline="true" :model="form">
        <el-form-item label="任务名称">
          <el-input placeholder="请输入任务名称" v-model="form.taskTitle"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" >查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--工具条 end-->
    <el-table :data="taskTableData" border  max-height="450" style="width: 100%" @cell-click="handleSelect" @selection-change="selectionchange">
      <el-table-column fixed type="selection"></el-table-column>
      <el-table-column fixed property="taskTitle" label="任务名称" width="120"></el-table-column>
      <el-table-column property="startTime" label="开始时间"></el-table-column>
      <el-table-column property="taskTypes" label="任务类型"></el-table-column>
      <el-table-column property="effectiveTimes" label="可参与次数"></el-table-column>
      <el-table-column property="activePersonNum" label="可参与人数"></el-table-column>
      <el-table-column property="minDuringTime" label="停留时间"></el-table-column>
      <el-table-column property="task_region_id" label="任务受限区域"></el-table-column>
      <el-table-column property="taskPriceNum" label="任务收益"></el-table-column>
      <el-table-column property="taskPriceType" label="任务收益类型"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button @click.native="taskDetail(scope.$index, scope.row)" type="info" size="mini">详情</el-button>
          <el-button @click.native="repairTask(scope.$index, scope.row)" type="primary" size="mini">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 start -->
    <el-col>
      <div class="block pagination"  >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          background
          style="float:right">
        </el-pagination>
      </div>
    </el-col>
    <!-- 分页 end -->
  </div>
</template>
<script>
  import {taskList} from '../../api/api'
export default {
  name: 'taskList',
  data () {
    return{
      form: {
          taskTitle: ''
      },
      taskTableData: [],
      currentPage: 1,
      pageSizes: [10,20],
      pageSize: 10,
      total: 0,

    }
  },
  mounted (){
    this.taskList ()
  },
  methods: {
      /*获取任务信息*/
    taskList () {
      let _this = this
      let params = {
        currentPage: this.currentPage,
        taskTitle: this.form.taskTitle,
        pageSize: this.pageSize
      }
      taskList(params).then(res => {
          console.log(res.data)
        this.taskTableData = res.data.taskList
        this.total = res.data.total
      })
    },
    handleSelect (row, column, cell, event) {

    },
    selectionchange () {},
    handleSizeChange (val) {
      this.pageSize = val
      this.taskList()
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.taskList();
    },
    /*任务详情*/
    taskDetail (index,row) {
      this.$router.push({name:'taskDetail', params:{row: row}})
    },
    repairTask (index,row) {
        this.$router.push({name:'repaireTask', params:{row: row}})
    }
  }
}
</script>
<style>
</style>
