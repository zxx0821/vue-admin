import Cookies from 'js-cookie'
const app = {
  state: {
    /* 展开还是close状态 */
    sidebar: {
      opened: ! +Cookies.get('sidebarStatus'),  /*获取数值状态,返回布尔值*/
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en'
  },
  /* 改变state数据的唯一途径是显式地提交mutations,不要处理异步操作 */
  mutations: {
    /* sidebarStatus 状态*/
    toggle_SideBar: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      }else{
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    /* 关闭状态 state*/
    close_SideBar: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    /* device 处理*/
    toggle_Device: (state, device) => {
      state.device = device
    },
    /* language 语言设置*/
    set_Language: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    }
  },
  /* 与mutations类似,可以异步操作*/
  actions: {
    TOOGLE_SIDEBAR({commit}) {
      commit('toggle_SideBar')
    },
    CLOSE_SIDEBAR({commit},{withoutAnimation}){
      commit('close_SideBar', withoutAnimation)
    },
    TOGGLE_DEVICE({commit},device){
      commit('toggle_Device', device)
    },
    SET_LANGUAGE({commit}, language){
      commit('set_Language', language)
    }
  }
}
export default app
