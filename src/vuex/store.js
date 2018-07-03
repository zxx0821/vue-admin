import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    count:0,
    token: (sessionStorage.getItem('_token')) || '',
    user: JSON.parse(sessionStorage.getItem('user')),
    departe: ['海康研究院',"海康人工智能",'海康安防','海康金融'],
    office: ['前端开发工程师','后端开发工程师','算法开发工程师','人工智能'],
    language: (sessionStorage.getItem('language')) || 'en',
  },
  getters: {
    filterList: state=>{
      return state.list.filter(item => item<10);
    },
    language: state => state.language,
  },
  mutations: {
    increment (state, n=1){
      state.count += n;
    },
    decrease(state, n=1){
      state.count -= n;
    }
  },
  actions: {
    increment (context) {
      context.commit('increment');
    },
    setLanguage(){
      
    }
  }
});
export default store;
