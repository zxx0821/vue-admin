<template>
  <div class="app-container">
    <!-- element表单组件 -->
    <el-form :model="taskDteail" class="demo-ruleForm" ref="taskDteail" label-width="100px">
      <div class="step01">
        <el-form-item label="任务名称" class="formItem">
          <el-input v-model="taskDteail.taskTitle"></el-input>
        </el-form-item>
        <el-form-item label="任务类型">
          <el-input v-model="taskDteail.taskTypes"></el-input>
        </el-form-item>
        <el-form-item label="任务描述" prop="task_description">
          <el-input type="textarea" placeholder="请输入内容" v-model="taskDteail.task_description"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="taskDteail.createTime"
            type="date"
            format placeholder="创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="taskDteail.startTime"
            type="date"
            format placeholder="开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="taskDteail.endTime"
            type="date"
            format placeholder="结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="可被接受次数">
          <el-row>
            <el-col :span="6" style="width: 187px;">
              <el-radio class="radio" v-model="taskDteail.activePersonType" :label=0>无限制</el-radio>
              <el-radio class="radio" v-model="taskDteail.activePersonType" :label=1>限制</el-radio>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="0" :number="true" v-model="taskDteail.activePersonNum" :disabled=" taskDteail.activePersonType ===0 "><template slot="append">次</template></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="可接受地区" prop="task_region_id">
          <el-input v-model="taskDteail.joinNum"></el-input>
        </el-form-item>
        <el-form-item label="可接受地区" prop="task_region_id">
          <el-input v-model="taskDteail.task_region_id"></el-input>
        </el-form-item>
        <el-form-item label="收益有效次数" prop="effectiveTimes">
          <el-row>
            <el-col :span="6">
              <el-input placeholder="0" :number="true" v-model="taskDteail.effectiveTimes" ><template slot="append">次</template></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="任务图片">
          <img :src="taskDteail.pageUrl" alt="">
        </el-form-item>
        <el-form-item label="任务收益">
          <el-row>
            <el-col :span="6" style="width: 187px;">
              <el-radio class="radio" v-model="taskDteail.taskPriceType" :label= 0>积分</el-radio>
              <el-radio class="radio" v-model="taskDteail.taskPriceType" :label= 1>现金</el-radio>
            </el-col>
            <el-col :span="12">
              <div class="block" >
                <el-slider v-model="taskDteail.taskPriceNum"  :step="50" :max="500" :show-stops="true" show-input></el-slider>
              </div>
            </el-col>
            <el-col :span="2" style="margin-left: 10px">
              {{taskDteail.taskPriceType===0? "积分":"元"}}
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="页面地址" prop="pageUrl" >
          <el-input v-model="taskDteail.pageUrl"></el-input>
        </el-form-item>
        <el-form-item label="最小停留时间" prop="minDuringTime" style="width: 200px">
          <el-input placeholder="0" :number="true" v-model="taskDteail.minDuringTime" ><template slot="append">秒</template></el-input>
        </el-form-item>
        <el-form-item label="公众号ID" prop="wxCode" >
          <el-input v-model="taskDteail.wxCode" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="任务状态" prop="wxCode" >
          <el-input v-model="taskDteail.taskStatus" style="width: 300px"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <el-col>
      <el-button @click.native="repairTask" type="primary">提交</el-button>
    </el-col>
  </div>
</template>

<script>
  import {editTask} from '../../api/api'
  export default {
    data: function () {
      return {
        taskDteail: {
          activePersonNum: 0,
          activePersonType: 0,
          createTime: '',
          effectiveTimes: '',
          endTime: '',
          imgage: '',
          minDuringTime: 0,
          pageUrl: '',
          startTime: '',
          taskPriceNum: 0,
          taskPriceType: 0,
          taskTitle: '',
          taskTypes: 0,
          task_description: '',
          task_id: 0,
          task_region_id: 0,
          taskStatus: '',
          joinNum: 0
        }
      }
    },
    mounted () {
      this.ininTask()
    },
    methods: {
      ininTask (){
        let row = this.$route.params.row
        if(row) {
          this.taskDteail = row
          if(row.taskTypes === 0){
            this.taskDteail.taskTypes = '分享'
          }
          if(row.taskTypes === 1){
            this.taskDteail.taskTypes = '转发'
          }
          if(row.taskTypes === 2){
            this.taskDteail.taskTypes = '收藏'
          }
          if(row.taskStatus ===0){
            this.taskDteail.taskStatus = '进行中'
          }
          if(row.taskStatus ===1){
            this.taskDteail.taskStatus = '已完成'
          }
        }
      },
      repairTask () {
        this.$confirm('此操作将修改原有的信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = Object.assign({}, this.taskDteail);
          editTask(param).then((res)=>{
           if(res.data.code === 200){
              this.$message({
                type: 'success',
                message: '修改成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });
        });
      }
    },
  }
</script>
<style>

</style>
