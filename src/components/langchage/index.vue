<template>
    <div id="langchange">
      <!--Dropdown 下拉菜单 trigger激活方式   command 点击菜单项触发的事件回调-->
      <el-dropdown trigger="click" class="interlangechange" @command="selectLangeuage">
        <div>
          <i class="fa fa-language"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh" :disabled="langeuage==='zh'">中文</el-dropdown-item>
          <el-dropdown-item command="en" :disabled="langeuage==='zh'">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return {

          }
      },
      computed: {
        langeuage(){
          return this.$store.getters.language
        }
      },
      methods: {
        selectLangeuage(lang){
          this.$store.dispatch('setLanguage', lang)
          this.$message({
            message: 'switch language success',
            type: 'success'
          })
        }
      }
    }
</script>

<style scoped>

</style>
