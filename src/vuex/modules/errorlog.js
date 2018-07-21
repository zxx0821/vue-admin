const errorlog = {
  state: {
    logs: []
  },
  mutations: {
    add_error_log: (state, log) => {
      state.logs.push(log)
    }
  },
  actions: {
    ADD_Error_Log ({commit}, log) {
      commit('add_error_log', log)
    }
  }
}
export default errorlog
