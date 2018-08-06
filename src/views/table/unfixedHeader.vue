<template>
  <div style="margin-top: 20px;">
    <div style="margin-bottom: 20px;">
      <el-checkbox-group v-model="formThead">
        <el-checkbox :label="val" :key="key" v-for="(val,key) in checkBox">{{val}}</el-checkbox>
      </el-checkbox-group>
    </div>
    <el-table :data="tableData" border fit highlight-current-row style="width: 100%">
      <el-table-column :key='key' v-for='(val,key) in formThead' :label="val">
        <template slot-scope="scope">
          {{scope.row[val]}}
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  const defaultFormThead = ['time','project','workerName', 'workerType','salaryType','workAddress',]
  import {staffinfo} from "../../api/api";
  export default {
    data() {
      return {
        tableData: [],
        checkBox:defaultFormThead,
        formThead: defaultFormThead
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
      }

    }
  }
</script>
