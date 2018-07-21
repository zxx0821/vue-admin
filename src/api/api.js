import axios from 'axios';
let base = '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, {params:params});};

export const getUserListPage = params => { return axios.get(`${base}/user/listPage`, {params:params});};

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, {params:params});};

export const removeUser = params => { return axios.get(`${base}/user/remove`, {params:params});};

export const editUser = params => { return axios.get(`${base}/user/edit`, {params:params});};

export const addUser = params => { return axios.get(`${base}/user/addUser`, {params:params});};

export const getEchartsData = params => { return axios.get(`${base}/echarts/lesmisterable`, {params:params});};

export const getforceGraph = params => { return axios.get(`${base}/echarts/forceGraph`, {params:params});};

export const getforceGraphall = params => { return axios.get(`${base}/echarts/forceGraphall`, {params:params});};

export const getvisiual = params => { return axios.get(`${base}/echarts/visiual`, {params:params});};

export const radialTree = params => { return axios.get(`${base}/echarts/radialTree`, {params:params});};

export const d3forceGraph = params => { return axios.get(`${base}/d3/forceGraph`, {params:params});};

