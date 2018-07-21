const tagsView = {
  state: {
    visiteViews: [],
    cachedViews: []
  },
  mutations: {
    add_visited_views: (state, view) => {
      if(state.visiteViews.some(v => v.path === view.path)) return
      state.visiteViews.push(Object.assign({}, view, {
        title: view.name || 'no-name'
      }))
      if(!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    del_visited_views: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },
    del_other_views: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },
    del_all_views: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    }
  },
  actions: {}
}
export default tagsView
