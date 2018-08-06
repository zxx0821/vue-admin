import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {LoginUsers, Users} from './data/user';
import {json} from "./echarts/data/echartlesmiserable";
import {forceGraph,schoolData,radialTree} from "./echarts/data/forceGraph";
import {dataMap} from "./echarts/data/dataMap"
import {d3relation} from "./D3/relation";
import {taskList} from './data/task'
import {staffInfo} from "./data/table";

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
      let {name} = config.params;  /* get 方式传递的参数 param */
      let mockUsers = _Users.filter(user=>{    /* 筛选遍历用户信息 */
        if (name && user.name.indexOf(name) == -1) return false;  /* name参数存在,但数据库中查找不到返回false */
        return true;  /* 返回数据 */
      });
      return new Promise((resolve, reject) => {
        setTimeout(()=>{    /* resolve 获取成功返回200,状态码,及数据user */
          resolve([200, {
            users:mockUsers
          }]);
        },1000);
      });
    });

    /*获取用户列表 (分页)*/
    mock.onGet('/user/listPage').reply(config => {
      let {currentPage,username, pageSize} = config.params;
      let mockUsers = _Users.filter(user => {
        if (username && user.username.indexOf(username) < 0 ) {return false}
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1));
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
      ids = ids.split(',');  /* 按 , 分割成数组 */
      _Users =_Users.filter(u=>!ids.includes(u.id)); /* filter筛选 ids 需要删除的数据包含在_Users里的过滤掉*/
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
    /*some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。
           some() 方法会依次执行数组的每个元素：
          如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。  如果没有满足条件的元素，则返回false。*/
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
    mock.onGet('/user/addUser').reply(config => {
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

    mock.onGet('/task/taskList').reply(config => {
      let {currentPage,taskTitle, pageSize} = config.params;
      let mockTask = taskList.filter(task => {
        if (taskTitle && task.taskTitle.indexOf(taskTitle) < 0 ) {return false}
        return true;
      });
      let total = mockTask.length;
      mockTask = mockTask.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1));
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            total: total,
            pageSize:pageSize,
            taskList:mockTask
          }]);
        },1000);
      });
    })

    /*编辑任务*/
    mock.onGet('/task/edit').reply(config => {
      let { task_id, taskTitle, taskTypes, task_description, createTime, startTime, endTime, activePersonNum,
        activePersonType, task_region_id, effectiveTimes, imgage, taskPriceType, taskStatus, joinNum, taskPriceNum, pageUrl,
        wxCode, minDuringTime} = config.params;
      taskList.some(u => {
        if(u.task_id === task_id){
          u.taskTitle = taskTitle;
          u.taskTypes = taskTypes;
          u.task_description = task_description;
          u.createTime = createTime;
          u.startTime = startTime;
          u.endTime = endTime;
          u.activePersonNum = activePersonNum;
          u.activePersonType = activePersonType;
          u.task_region_id = task_region_id;
          u.effectiveTimes = effectiveTimes;
          u.imgage = imgage;
          u.taskPriceType = taskPriceType;
          u.taskStatus = taskStatus;
          u.joinNum = joinNum;
          u.taskPriceNum = taskPriceNum;
          u.pageUrl = pageUrl;
          u.wxCode = wxCode;
          u.minDuringTime = minDuringTime;
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

    /*创建任务*/
    mock.onGet('/task/createTask').reply(config => {
      console.log(config.params)
      let {stepOneData,stepTwoData,stepThreeData} = config.params;
      taskList.push({
        taskTitle:stepOneData.taskTitle,
        taskTypes :stepOneData.taskTypes,
        task_description :stepOneData.task_description,
        createTime : new Date(),
        startTime : stepOneData.startTime,
        endTime : stepOneData.endTime,
        activePersonNum : stepOneData.activePersonNum,
        activePersonType : stepOneData.activePersonType,
        task_region_id : stepTwoData.task_region_id,
        effectiveTimes : stepTwoData.effectiveTimes,
        taskPriceType: stepTwoData.taskPriceType,
        taskStatus : '进行中',
        joinNum : 0,
        taskPriceNum :stepTwoData.taskPriceNum,
        pageUrl : stepTwoData.pageUrl,
        wxCode : stepThreeData.wxCode,
        minDuringTime :stepTwoData.minDuringTime
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


    /*员工信息*/
    mock.onGet('/staff/listPage').reply(config => {
      let {currentPage,username, pageSize} = config.params;
      let mockUsers = staffInfo.filter(user => {
        if (username && user.username.indexOf(username) < 0 ) {return false}
        return true;
      });
      let total = mockUsers.length;
      mockUsers = mockUsers.filter((u, index) => index < pageSize * currentPage && index >= pageSize * (currentPage - 1));
      return new Promise((resolve, reject) => {
        setTimeout(()=>{
          resolve([200, {
            total: total,
            pageSize:pageSize,
            staffInfo:mockUsers
          }]);
        },1000);
      });
    });


  }
}
