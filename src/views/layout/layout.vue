<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickshow"></div>
    <asideBar class="sidebar-container"></asideBar>
    <div class="main-container">
      <Navbar></Navbar>
      <tagsView></tagsView>
      <mainWrapper></mainWrapper>
    </div>
  </div>
</template>

<script>
import asideBar from './components/Sidebar/index'
import Navbar from './components/navBar'
import tagsView from './components/tagsView'
import mainWrapper from './components/mainWrapper'
import PcMobileRest from './mixin/PcMobileRest'
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  mixins: [PcMobileRest],
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    device () {
      return this.$store.state.app.device
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickshow (){
      this.$store.dispatch('CLOSE_SIDEBAR', {withoutAnimation: false})
    }
  },
  components: {
    asideBar,
    Navbar,
    tagsView,
    mainWrapper
  }
}
</script>

<style scoped lang="less">
  .app-wrapper{
    position: relative;
    height: 100%;
    width: 100%
  }
  .drawer-bg {
    position: absolute;
    top:0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
  }
</style>
