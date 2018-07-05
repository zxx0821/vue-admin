import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';
import {json} from "./echarts/data/echartlesmiserable";
import {forceGraph,schoolData,radialTree} from "./echarts/data/forceGraph";
import {dataMap} from "./echarts/data/dataMap"
import {d3relation} from "./D3/relation";

let data_json = json;
let force_Graph = forceGraph;
let school_Data = schoolData;
let radial_Tree = radialTree;
let data_Map = dataMap;
let d3_relation = d3relation;
let _Users = Users;

export default {
  bootstrap(){
    let mock = new MockAdapter(axios);

    /*success*/
    mock.onGet('/success').reply(200,{
      msg: 'success'
    });

   /* failure*/
    mock.onGet('/error').reply(500, {
      mes: 'failure'
    });

    /*登录*/
    mock.onPost('/login').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let user = null;
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u));
              user.password = undefined;
              return true;
            }
          });

          if (hasUser) {
            resolve([200, { code: 200, msg: '请求成功', user }]);
          } else {
            resolve([200, { code: 500, msg: '账号或密码错误' }]);
          }
        }, 1000);
      });
    });

    /*获取用户列表*/
    mock.onGet('/user/list').reply(config => {
      let {name} = config.params;
      let mockUsers = _Users.filter(user=>{
        if (name && user.name.indexOf(name) == -1) return false;
        return true;
      });
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            users:mockUsers
          }]);
        },1000);
      });
    });

    /*获取用户列表 (分页)*/
    mock.onGet('/user/listPage').reply(config => {
      let {page,name,isAdmin} = config.params;
      let mockUsers = _Users.filter(user => {
        if (name && user.name.indexOf(name) < 0 ) {return false}
        if (isAdmin && user.isAdmin !== isAdmin) {return false}
        return true;
      });
      let total = mockUsers.length;
      let pageSize = 10;
      mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            total: total,
            pageSize:pageSize,
            users:mockUsers
          }]);
        },1000);
      });
    });

    /*批量删除用户*/
    mock.onGet('/user/batchremove').reply(config => {
      let {ids} = config.params;
      ids = ids.split(',');
      _Users =_Users.filter(u=>!ids.includes(u.id));
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            code:200,
            msg: '删除成功'
          }])
        },500);
      });
    });

    /*删除用户*/
    mock.onGet('/user/remove').reply(config => {
      let {id} = config.params;
      _Users =_Users.filter(u=> u.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            code:200,
            msg: '删除成功'
          }])
        },500);
      });
    });
    /*编辑用户*/
    mock.onGet('/user/edit').reply(config => {
      let {id, createDate, username, sex, age, birth, departe, office, isAdmin} = config.params;
      _Users.some(u => {
        if(u.id === id){
          u.createDate = createDate;
          u.username = username;
          u.sex = sex;
          u.age = age;
          u.birth = birth;
          u.departe = departe;
          u.office = office;
          u.isAdmin = isAdmin;
          return true;
        }
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '编辑成功'
          }]);
        }, 500);
      });
    });

    /*新增用户*/
    mock.onGet('/user/add').reply(config => {
      let {createDate, username, sex, age, birth, departe, office, isAdmin} = config.params;
      _Users.push({
        createDate: createDate,
        username: username,
        sex: sex,
        age: age,
        birth: birth,
        departe: departe,
        office: office,
        isAdmin: isAdmin
      });
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '新增成功'
          }]);
        }, 500);
      });
    });

    /*不布局的graph*/
    mock.onGet('/echarts/lesmisterable').reply(config => {
      let dataEcharts = data_json;
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            dataEchart:dataEcharts
          }]);
        },1000);
      });
    });
/*力布局*/
    mock.onGet('/echarts/forceGraph').reply(config => {
      let dataEcharts = force_Graph;
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            dataEchart:dataEcharts
          }]);
        },1000);
      });
    });

    /*力布局*/
    mock.onGet('/echarts/forceGraphall').reply(config => {
      let dataEcharts = school_Data;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dataEchart: dataEcharts
          }]);
        }, 1000);
      });
    });

    /*力布局*/
    mock.onGet('/echarts/visiual').reply(config => {
      let dataEcharts = data_Map;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dataEchart: dataEcharts
          }]);
        }, 1000);
      });
    })

    /*力布局*/
    mock.onGet('/echarts/radialTree').reply(config => {
      let dataEcharts = radial_Tree;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            dataEchart: dataEcharts
          }]);
        }, 1000);
      });
    })
      /*d3力布局*/
    mock.onGet('/d3/forceGraph').reply(config => {
      let dataEcharts = d3_relation;
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            datad3:dataEcharts
          }]);
        },1000);
      });
    });
  }
}
