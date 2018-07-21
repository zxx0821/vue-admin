/*
 * 对state数据进行处理,不改变state,返回处理后的数据 */
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  errorLogs: state => state.errorLog.logs
}
export default getters
