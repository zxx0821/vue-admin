const comment = {
  state: {
    count:0,
    token: (sessionStorage.getItem('_token')) || '',
    user: JSON.parse(sessionStorage.getItem('user')),
    departe: ['海康研究院',"海康人工智能",'海康安防','海康金融'],
    office: ['前端开发工程师','后端开发工程师','算法开发工程师','人工智能'],
    language: (sessionStorage.getItem('language')) || 'en',
  },
  mutations: {},
  actions: {}
}
export default comment
