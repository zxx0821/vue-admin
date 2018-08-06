<template>
    <div class="fiexdHeader">
      <!-- 表格目录 start-->
      <el-popover
        placement="bottom-end"
        width="100"
        trigger="click"
      >
        <el-checkbox-group v-model="checkedCaptaion" @change="checkedCaptaionChange" :min="1" class="checkGroup">
          <el-checkbox v-for="(tab, index) in tabCaptaion" :label="tab.label" :key="index">{{tab.label}}</el-checkbox>
        </el-checkbox-group>
        <el-button slot="reference"  class="tabNav"><i class="fa fa-list-ul rotate"></i><i class="fa fa-caret-down"></i></el-button>
      </el-popover>
      <!-- 表格目录 end-->
      <!--表格-->
      <el-table
        :data="tableData"
        stripe
        border
        max-height="620"
        style="width: 100%"
      >
        <el-table-column
          prop="time"
          label="时间"
          v-if="columnShowHide.time"
        >
        </el-table-column>
        <el-table-column
          prop="project"
          label="项目名称"
          v-if="columnShowHide.project"
        >
        </el-table-column>
        <el-table-column
          prop="workerName"
          label="姓名"
          v-if="columnShowHide.workerName"
        >
        </el-table-column>
        <el-table-column
          prop="workerType"
          label="人员类别"
          v-if="columnShowHide.workerType"
        >
        </el-table-column>
        <el-table-column
          prop="salaryType"
          label="工资结算"
          v-if="columnShowHide.salaryType"
        >
        </el-table-column>
        <el-table-column
          prop="workAddress"
          label="办公地点"
          v-if="columnShowHide.workAddress"
        >
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  import {staffinfo} from "../../api/api";
export default {
  name: "fiixedHeader",
  data() {
    return {
      tableData: [],
      /*el-popover*/
      checkedCaptaion: ['时间', '项目名称', '姓名', '人员类别', '工资结算', '办公地点'],
      tabCaptaion: [
        {prop: 'time', label: '时间'},
        {prop: 'project', label: '项目名称'},
        {prop: 'workerName', label: '姓名'},
        {prop: 'workerType', label: '人员类别'},
        {prop: 'salaryType', label: '工资结算'},
        {prop: 'workAddress', label: '办公地点'}
      ],
      columnShowHide: {
        time: true,
        project: true,
        workerName: true,
        workerType: true,
        salaryType: true,
        workAddress: true
      },
      currentPage:1,
      pageSize:10
    }
  },
  mounted () {
    this.initStaffInfo()
  },
  methods: {
    initStaffInfo(){
      let params = {
        currentPage:this.currentPage,
        username: '',
        pageSize: this.pageSize
      }
      staffinfo(params).then((res)=> {
        console.log(res)
        this.tableData = res.data.staffInfo
      })
    },
    /**
     * @param value 属性值, 实现列的显示隐藏功能
     */
    checkedCaptaionChange (value) {
      let _this = this
      let arr = []
      let checkedArr = []
      for (let i = 0; i < this.tabCaptaion.length; i++) {
        if (value.indexOf(this.tabCaptaion[i].label) < 0) {
          arr.push(this.tabCaptaion[i])
        } else {
          checkedArr.push(this.tabCaptaion[i])
        }
      }
      for (let item in _this.columnShowHide) {
        arr.map(function (temp) {
          if (item === temp.prop) {
            _this.columnShowHide[item] = false
          }
        })
      }
      for (let item in _this.columnShowHide) {
        checkedArr.map(function (temp) {
          if (item === temp.prop) {
            _this.columnShowHide[item] = true
          }
        })
      }
    }

  }
}
</script>

<style scoped lang="less">
  .el-popover {
    background: red;
    .el-checkbox-group{
      .el-checkbox{
        margin-left:10px;
        .el-checkbox__label{
          min-height: 30px;
        }
      }
    }
  }
  .checkGroup{
    width:150px;
  }
</style>
