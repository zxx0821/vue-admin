<template>
    <div class="login-wrap">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <div class="title-container">
          <h3 class="title">{{title}}</h3>
        </div>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号">
            <template slot="prepend"><i class="fa fa-user"></i></template>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码">
            <template slot="prepend"><i class="fa fa-lock"></i></template>
          </el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {requestLogin} from '../api/api';
    export default {

      name: "Login",
      data(){
        return{
          logining: false,
          ruleForm2: {
            account: 'admin',
            checkPass: '123456'
          },
          rules2: {
            account: [
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            checkPass: [
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]
          },
          checked: true,
          title: 'Admin Login'
        }
      },
      mounted () {
      },
      methods:{
        handleSubmit2(ev) {
          let _this = this;
          this.$refs.ruleForm2.validate((valid) => {
            if (valid) {
              _this.logining = true;
              let loginParams = {
                username: _this.ruleForm2.account,
                password: _this.ruleForm2.checkPass
              };
              requestLogin(loginParams).then(data =>{
                console.log(data)
                _this.logining = false;
                let { msg, code, user } = data;
                let _token = user.token;
                sessionStorage.setItem('_token',_token);
                if(code !==200){
                  this.$message({
                    message: msg,
                    type: 'error'
                  })
                }else{
                  sessionStorage.setItem('user', JSON.stringify(user));
                  this.$router.push({path:'/home'});
                  let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                  this.$router.push({
                    path: redirect
                  })
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        }
      }
    }
</script>

<style scoped>
  .login-wrap{
     width:100%;
     height: 100%;
    background: #293c55;
  }
  .login-container{
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-clip: padding-box;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login-container  .title {
    margin:0 auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login-container  .remember{
    margin: 0 0 35px 0;
  }
</style>
