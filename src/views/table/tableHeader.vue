<template>
        <!-- 表格目录 start-->
  <div style="margin-top: 20px;">
    <div style="margin-bottom: 20px;">
      <el-checkbox-group v-model="checkboxVal" :min="1" class="checkGroups">
        <el-checkbox v-for="(tab, index) in formTheadOptions" :label="tab.label" :key="index">{{tab.label}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-table :data="tableData" :key='key' border fit highlight-current-row style="width: 100%">
          <el-table-column :key='key' v-for='(val,key) in formThead' :label="val.label">
            <template slot-scope="scope">
              {{scope.row[val.prop]}}
            </template>
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
  const defaultFormThead = [{prop: 'time', label: '时间'},
    {prop: 'project', label: '项目名称'},
    {prop: 'workerName', label: '姓名'},
    {prop: 'workerType', label: '人员类别'},
    {prop: 'salaryType', label: '工资结算'},
    {prop: 'workAddress', label: '办公地点'}]
  import {staffinfo} from "../../api/api";
    export default {
      name: "tableHeader",
      data () {
          return {


            /*el-popover*/
            checkedCaptaion: ['时间', '项目名称', '姓名', '人员类别', '工资结算', '办公地点'],
            /*fiex checkbox*/
            tableData: [],
            key: 1, // table key
            formTheadOptions: defaultFormThead,
            checkboxVal: ['时间', '项目名称', '姓名', '人员类别', '工资结算', '办公地点'], // checkboxVal
            formThead: defaultFormThead ,// 默认表头 Default header

            /*page*/
            currentPage:1,
            pageSize:10
          }
      },
      watch: {
        checkboxVal(valArr) {
          console.log(valArr)
          this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i.label) >= 0)
          this.key = this.key + 1
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
        },

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
    height:300px;
    overflow-y: scroll;
  }
</style>
