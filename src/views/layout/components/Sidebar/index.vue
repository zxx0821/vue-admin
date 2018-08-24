<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      router
      :collapse="collapsed"
      background-color="#293c55"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template
        v-for="(item,index) in $router.options.routes"
        v-if="!item.hidden &&item.children">
        <el-menu-item  v-if="item.leaf" :index="item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
          <i :class="item.iconCls"></i><span slot="title">{{item.children[0].title}}</span>
        </el-menu-item>
        <el-submenu v-else :index="index+''">
          <template slot="title"><i :class="item.iconCls"></i><span>{{item.title}}</span></template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"><i :class="child.iconCls"></i>{{child.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      isNest: false
    }
  },
  methods: {
    handleOpen(){},
    handleClose(){},
    handleSelect(){}
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    collapsed () {
      return !this.sidebar.opened
    }
  },
  components: {
  }
}
</script>

<style scoped>

</style>
