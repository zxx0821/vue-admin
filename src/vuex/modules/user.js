import {requestLogin} from "../../api/api";

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    tooken: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatForm: []
    }
  },
  mutations: {
    set_code: (state, code) => {
      state.code = code
    },
    set_token: (state, token) => {
      state.token = token
    },
    set_introduction: (state, introduction) => {
      state.introduction = introduction
    },
    set_setting: (state, setting) => {
      state.setting = setting
    },
    set_status: (state, status) => {
      state.status = status
    },
    set_name: (state, name) => {
      state.name = name
    },
    set_avatar: (state, avatar) => {
      state.avatar = avatar
    },
    set_roles: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    /*用户登录*/
    LoginByUserName({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
      })
    }
  }
}
export default user
