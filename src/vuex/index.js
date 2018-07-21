import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorlog from './modules/errorlog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import comment from './modules/comment'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    app,
    errorlog,
    permission,
    tagsView,
    user,
    comment
  },
  getters
})
export default store
