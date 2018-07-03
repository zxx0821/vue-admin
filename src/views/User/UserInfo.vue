<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom:0">
      <el-form :inline="true" :model="filterName">
        <el-form-item label="用户名">
          <el-input v-model="filterName.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUsers">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="handleSelectionChange" style="width: 100%;">
      <el-table-column type="selection" width="60"></el-table-column>
      <el-table-column type="index" label="序号" :index="typeIndex" width="60"></el-table-column>
      <el-table-column label="日期" width="180" prop="createDate">
        <!-- <template slot-scope="scope">{{scope.row.date}}</template>-->
      </el-table-column >
      <el-table-column prop="username" label="用户名" width="150">
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="150" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="150">
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="150" sortable>
      </el-table-column>
      <el-table-column prop="departe" label="部门" width="180">
      </el-table-column>
      <el-table-column prop="office" label="岗位" width="180">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.selectedUser.length===0">批量删除</el-button>
    </el-col>
    <el-col>
      <div class="block">
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

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible">
      <el-form :model="editform" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="editform.createDate" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editform.username" auto-complete="off" width="180"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editform.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editform.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editform.birth"  format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="editform.departe" placeholder="请选择部门">
            <el-option
              v-for="item in departe"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="editform.office" placeholder="请选择岗位">
            <el-option
              v-for="item in office"
              :key="item"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '../../util/util'
  import {getUserList, getUserListPage, batchRemoveUser, removeUser, editUser} from '../../api/api'
  export default {
    name: "UserInfo",
    data() {
      return {
        isCollapse: true,
        filterName:{
          username: ''
        },
        users:[],
        listLoading: false,
        selectedUser: [],
        currentPage:1,
        pageSizes: [10],
        pageSize: 10,
        total:0,

        editFormVisible: false,
        editLoading:false,
        editFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        },
        departe: this.$store.state.departe,
        office: this.$store.state.office,
        editform: {
          id: 0,
          createDate: '',
          username: '',
          sex: -1,
          age: 20,
          birth: '',
          departe: '',
          office: ''
        },
      };
    },
    components:{
    },
    methods: {
      /*表格序列号*/
      typeIndex(index){
        return index + (this.currentPage -1)*10 +1;
      },
      /*用户列表*/
      getUsers(){
        let param = {
          page: this.currentPage,
          name: this.filterName.name
        };
        this.listLoading = true;
        getUserListPage(param).then((res)=>{
          this.total = res.data.total;
          this.pageSize = res.data.pageSize;
          this.users =  res.data.users;
          this.listLoading = false;
        })
      },
      /* 添加用户*/
      addUsers(){

      },
      /*选中选项*/
      handleSelectionChange(select){
        this.selectedUser = select;
      },
      /*编辑界面数据*/
      handleEdit(index,row){
        this.editFormVisible = true;
        this.editform = Object.assign({}, row);
      },
      /* 提交编辑数据*/
      editSubmit(){
        this.$refs.editForm.validate((valid) => {
          if(valid){
            this.$confirm('确认提交吗?', '提示', {}).then(()=>{
              this.editLoading = true;
              let param = Object.assign({}, this.editform);
              editUser(param).then((res) =>{
                this.listLoading = false;
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      /*删除一行*/
      handleDel(index, row){
        let _this = this;
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then( ()=>{
          this.listLoading = true;
          let param = {id: row.id};
          removeUser(param).then((res) => {
            _this.listLoading = false;
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
            _this.getUsers();
          });
        }).catch((err)=>{
          console.log(err)
        })
      },
      /*批量删除*/
      batchRemove(){
        let _this = this;
        let ids = this.selectedUser.map(item=>item.id).toString();
        this.$confirm('确认删除选中的记录吗?', '提示', {
          type: 'warning'
        }).then(()=>{
          _this.listLoading = true;
          let param = {ids: ids};
          batchRemoveUser(param).then((res)=>{
            _this.listLoading = false;
            _this.$message({
              message: '删除成功',
              type: 'success'
            });
            _this.getUsers();
          });
        }).catch((err)=>{
          console.log(err);
        })
      },
      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUsers();
        console.log(`当前页: ${val}`);
      },
      formatSex(row,column){
        return util.format.formatSex(row,column);
      },
      formatAdmin(row,column){
        return util.format.formatAdmin(row,column);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      onSubmit(){
        console.log('sub')
      }
    },
    mounted(){
      this.getUsers();
    }
  }
</script>
<style scoped lang="less">
  .el-table {
    .cell{
      text-align: center;
    }
  }
</style>
