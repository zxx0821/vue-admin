<template>
  <el-menu class="navbar" mode="horizontal">
    <iconToggle class="iconToggle" :toggleClick="toggleSideBar" :isActive="sidebar.opened" :IconclassName="IconclassName"></iconToggle>
    <el-breadcrumb class="app-breadcrumb breadcrumb-inner" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in routerList" :key="item.path">
          <span v-if="index==routerList.length-2" class="no-redirect">{{ item.name }}</span>
          <router-link v-else :to="item.path">{{ item.name }}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <div class="nav-right">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="../../../assets/avarga.gif" alt=""><i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided >
            <span @click.native="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import iconToggle from'../../../components/iconToggle/index'
export default {
  name: "navBar",
  data () {
    return {
      routerList: null,
      IconclassName: 'fa-bars'
    }
  },
  created (){
    this.getBreadcrumb()
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  components: {
    iconToggle
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    /* 侧边栏的展开,收缩*/
    toggleSideBar () {
      this.$store.dispatch('TOOGLE_SIDEBAR')
    },
    /* 面包屑的展示*/
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== '首页') {
        matched = [{ path: '/Home', name: '首页' }].concat(matched)
      }
      if(first && first.name == '首页') {
        matched = [{ path: '/Home', name: '首页' }]
      }
      this.routerList = matched
    },
    /*退出登录*/
    logout () {
    }
  }
}
</script>

<style scoped lang="less">
</style>
