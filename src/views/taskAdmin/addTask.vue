<template>
  <div class="app-container">
    <el-steps :active="active" style="margin-bottom: 20px; width:100%" align-center>
      <el-step title="step1" icon="el-icon-edit"></el-step>
      <el-step title="step2" icon="el-icon-edit"></el-step>
      <el-step title="完成" icon="el-icon-check"></el-step>
    </el-steps>
    <!-- element表单组件 -->
    <el-form :model="stepOneData" class="demo-ruleForm" :rules="stepOneRules" ref="stepOneData" label-position="top">
      <div class="step01" v-show="active===1 ? true:false">
        <el-form-item label="任务名称" prop="taskTitle" >
          <el-input v-model="stepOneData.taskTitle" size="large"></el-input>
        </el-form-item>
        <el-form-item label="任务类型" prop="taskTypes">
          <el-select v-model="stepOneData.taskTypes" placeholder="请选择任务类型" size="medium">
            <el-option
              v-for="item in taskTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型一任务描述" prop="task_description">
          <el-input
            type="textarea"
            placeholder="请输入内容"
            :autosize="{minRows: 4, maxRows: 8}"
            v-model="stepOneData.task_description">
          </el-input>
        </el-form-item>
        <el-form-item label="任务时间">
          <el-date-picker
            v-model="stepOneData.startTime"
            type="date"
            format placeholder="开始时间"
            @change="dateChange">
          </el-date-picker>
          <el-date-picker
            v-model="stepOneData.endTime"
            type="date"
            format placeholder="结束时间"
            @change="dateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动量/可被接受次数">
          <el-row>
            <el-col :span="6" style="width: 187px;">
              <el-radio class="radio" v-model="stepOneData.activePersonType" :label=0>无限制</el-radio>
              <el-radio class="radio" v-model="stepOneData.activePersonType" :label=1>限制</el-radio>
            </el-col>
            <el-col :span="6">
              <el-input placeholder="0" :number="true" size="large" v-model="stepOneData.activePersonNum" :disabled=" stepOneData.activePersonType ===0 "><template slot="append">次</template></el-input>
            </el-col>
          </el-row>
        </el-form-item>


      </div>
    </el-form>

    <el-form :model="stepTwoData" class="demo-ruleForm" :rules="stepTwoRules" ref="stepTwoData" label-position="top" v-show="active===2 ? true:false">
      <div class="step02">
        <el-form-item label="任务可接受地区" prop="task_region_id">
          <el-select v-model="stepTwoData.task_region_id" placeholder="请选择任务可接受地区">
            <el-option
              v-for="(item,index) in taskRegion"
              :key="index"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人任务收益有效次数" prop="effectiveTimes">
          <el-row>
            <el-col :span="6">
              <el-input placeholder="0" :number="true" size="large" v-model="stepTwoData.effectiveTimes" ><template slot="append">次</template></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="任务图片">
          <el-upload class="upload-demo" action="" :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture" multiple>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="任务收益">
          <el-row>
            <el-col :span="6" style="width: 187px;">
              <el-radio class="radio" v-model="stepTwoData.taskPriceType" label=0>积分</el-radio>
              <el-radio class="radio" v-model="stepTwoData.taskPriceType" label=1>现金</el-radio>
            </el-col>
            <el-col :span="12">
              <div class="block" >
                <el-slider v-model="stepOneData.taskPriceNum"  :step="50" :max="500" :show-stops="true" show-input></el-slider>
              </div>
            </el-col>
            <el-col :span="2" style="margin-left: 10px">
              {{stepOneData.taskPriceType=="1"? "积分":"元"}}
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="页面地址" prop="pageUrl" >
          <el-input v-model="stepTwoData.pageUrl" size="large"></el-input>
        </el-form-item>
        <el-form-item label="最小停留时间" prop="minDuringTime" style="width: 200px">
          <el-input placeholder="0" :number="true" size="large" v-model="stepTwoData.minDuringTime" ><template slot="append">秒</template></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-form :model="stepThreeData" class="demo-ruleForm" :rules="stepThreeRule" ref="stepThreeData" label-position="top" v-show="active===3 ? true:false">
      <div class="step03" >
        <el-form-item label="公众号ID" prop="wxCode" >
          <el-input v-model="stepThreeData.wxCode" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">添加任务</el-button>
          <el-button @click="handleReset">重置任务</el-button>
        </el-form-item>
      </div>
    </el-form>
    <div class="nextsteps" style="text-align: center;">
      <el-button style="margin: 12px auto;background-color: #0991ff;color:#fff;" @click="preStep" v-show="active > 1 ? true:false">上一步</el-button>
      <el-button style="margin: 12px auto;background-color: #0991ff;color:#fff;" @click="nextStep" v-show="3 > active > 0 ? true:false">下一步</el-button>
    </div>
  </div>
</template>

<script>
 import {createTask} from '../../api/api'
  export default {
    components: {
    },
    data: function () {
      return {
        active: 1,
        taskRegion: this.$store.state.taskInfo.taskRegion,
        taskTypes: this.$store.state.taskInfo.taskTypes,
        stepOneRules: {
          taskTitle: [{required:true,message: '请对任务进行描述',trigger: 'blur'}],
          taskTypes: [
            {required: true, message: '请输入任务类型', trigger: 'change'},
          ],
          startTime: [{required:true,type:'array', message:'请选择任务开始时间',trigger:'blur,change'}],
          endTime: [{required:true,type:'array', message:'请选择任务结束时间',trigger:'blur,change'}],
          task_description: [{required:true,message: '请对任务进行描述',trigger: 'blur'}]
        },
        stepTwoRules: {
          taskPriceNum: [{required:true,message:"请输入任务收益",trigger: 'change'}],
          task_region_id: [{required:true,message: '请输入任务可接受地区',trigger: 'change'}],
          effectiveTimes: [{required:true,message: '请输入任务有效次数',trigger: 'blur'}],
          pageUrl: [{required:true,message: '请输入页面地址',trigger: 'blur'}],
          minDuringTime: [{required:true,message: '请输入最少停留时间',trigger: 'blur'}]
        },
        stepThreeRule: {
          wxCode: [{required:true,message: '请输入公众号',trigger: 'blur'}],
        },
        rules:{},
        fileList2: [],
        stepOneData: {
          task_region_id: 1,
          taskTitle: '',
          taskTypes: '',
          task_description:'',
          startTime: '',
          endTime: '',
          activePersonType:0,
          activePersonNum:12,
        },
        stepTwoData: {
          task_region_id: '',
          effectiveTimes:1,
          taskPriceType:"1",
          taskPriceNum:0,
          pageUrl:"",
          minDuringTime:""
        },
        stepThreeData: {
          wxCode:""
        },
        form1Valid:false,
        form2Valid:false,
        form4Valid:false
      };
    },
    mounted () {
        this.ininTask()
    },
    methods: {
      ininTask (){
        let row = this.$route.params.row
       console.log(row)
        if(row) {
          this.stepOneData = {
            task_region_id: 1,
            taskTitle: row.taskTitle,
            taskTypes: row.taskTypes,
            task_description: row.task_description,
            startTime: row.startTime,
            endTime: row.endTime,
            activePersonType: row.activePersonType,
            activePersonNum: row.activePerson,
          }
          this.stepTwoData = {
              task_region_id: row.task_region_id,
              effectiveTimes: row.effectiveTimes,
              taskPriceType: row.taskPriceType,
              taskPriceNum: row.taskPriceNum,
              pageUrl: row.pageUrl,
              minDuringTime: row.minDuringTime
          }
          this.stepThreeData = {
            wxCode:row.pageUrl
          }
        }
      },
      getTaskType:function () {
      },
      handleReset: function () {
        this.$refs.stepOneData.resetFields();
        this.$refs.stepTwoData.resetFields();
        this.$refs.stepThreeData.resetFields();
      },
      preStep(){
        if (this.active-- < 0) this.active = 1;
      },
      nextStep() {
        let _this = this
        if(_this.active ===1){
          _this.$refs.stepOneData.validate((valid) => {
            if(valid){
              _this.active++;
            }
          })
        }else if(_this.active===2){
          _this.$refs.stepTwoData.validate(function (valid) {
            if(valid){
              _this.active++;
            }
          })
        }else if(_this.active===3){
            console.log(_this.active)
          _this.$refs.stepThreeData.validate(function (valid) {
            if(valid){
              _this.active++;
            }
          })
        }
      },
      handleSubmit: function () {
        this.$confirm('此操作将创建新的任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            stepOneData: this.stepOneData,
            stepTwoData: this.stepTwoData,
            stepThreeData: this.stepThreeData
          }
          createTask(param).then((res)=>{
            if(res.data.code === 200){
              this.$message({
                type: 'success',
                message: '创建成功!'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消创建'
          });
        });
      },
      submitForm1:function () {
      },
      submitDetails:function (taskid){
      },
      handleChange:function(file, fileList) {

      },
      handleRemove: function (file, fileList) {
      },
      handlePreview: function (file) {
      },
      dateChange:function (val) {

      },
      formatDate(time) {

      }
    },
    created: function(){
    }
  }
</script>
<style>
  .addTask{
    padding-top: 40px;
  }
  .addTask .demo-ruleForm .el-form-item{margin-bottom: 25px;margin-right: 50px;}
  .addTask .el-form-item.is-required .el-form-item__label:after {
    content: '*';
    color: #ff4949;
    margin-right: 4px;
  }
  .addTask .el-form-item.is-required .el-form-item__label:before { display: none; }

  /* 时间选择器 */
  .addTask .el-date-editor{width:150px;}
  .addTask .el-form-item .router-link{color:#fff;}
  .el-form-item__error{white-space: nowrap;}
  .el-input-number__decrease, .el-input-number__increase {
    top: 3px;
  }
</style>
