import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import layout from '../views/layout/layout'
let router = new Router({
  routes: [
    {
      path: '/',
      title: '登录',
      name: 'Login',
      component: resolve => require(['../views/Login'],resolve),
      hidden: true,
      meta: {requireAuth: false}
    },
    {
      path: '/Login',
      title: '登录',
      name: 'Login',
      component: resolve => require(['../views/Login'],resolve),
      hidden: true,
      meta: {requireAuth: false}
    },
    {
      path: '/home',
      name: 'home',
      title: '首页',
      component:layout,
      iconCls: 'fa fa-user el-menu-icon',
      leaf: true,
      meta: {requireAuth: true},
      children: [
        {
          path: '',
          component: resolve => require(['../views/Home/home'],resolve),
          name: 'index',
          title: '首页',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: 'UserAdmin',
      title: '用户管理',
      name:'UserAdmin',
      component:layout,
      iconCls: 'fa fa-user el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/UserInfo',
          component: resolve => require(['../views/User/UserInfo'],resolve),
          title:'用户信息',
          name: 'userInfo',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: 'TaskAdmin',
      title: '任务管理',
      name: 'TaskAdmin',
      component:layout,
      iconCls: 'fa fa-user el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/taskInfo',
          component: resolve => require(['../views/taskAdmin/taskList'],resolve),
          title:'任务列表',
          name: 'taskList',
          meta: {requireAuth: true}
        },
        {
          path: '/addTask',
          component: resolve => require(['../views/taskAdmin/addTask'],resolve),
          title:'添加任务',
          name:'addTask',
          meta: {requireAuth: true}
        },
        {
          path: '/taskDetail',
          component: resolve => require(['../views/taskAdmin/taskDetail'],resolve),
          title:'任务详情',
          name: 'taskDetail',
          hidden: true,
          meta: {requireAuth: true}
        },
        {
          path: '/repaireTask',
          component: resolve => require(['../views/taskAdmin/repaireTask'],resolve),
          title:'修改任务',
          name: 'repaireTask',
          hidden: true,
          meta: {requireAuth: true}
        },
      ]
    },
    {
      path: 'ResourceAdmin',
      title: '资源管理',
      name: 'ResourceAdmin',
      component: layout,
      iconCls: 'fa fa-skyatlas el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/Resource',
          component: resolve => require(['../views/Resource/NumResource'],resolve),
          title:'数据资源',
          name: 'NumResource',
          meta: {requireAuth: true}
        },
        {
          path: '/ActiveResource',
          component: resolve => require(['../views/Resource/ActiveResource'],resolve),
          title:'活动资源',
          name: 'ActiveResource',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: 'LogAdmin',
      title: '日志管理',
      name: 'LogAdmin',
      component: layout,
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/Log',
          component: resolve => require(['../views/Log/Log'],resolve),
          title:'日志列表',
          name:'LogList',
          meta: {requireAuth: true}
        },
        {
          path: '/LogChart',
          component: resolve => require(['../views/Log/LogChart'],resolve),
          title:'日志图表',
          name:'LogChart',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: 'echarts',
      name: 'echarts',
      title: 'echarts图表',
      component:layout,
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/lesMister',
          component: resolve => require(['../views/echarts/lesMiserables'],resolve),
          title:'lesMister',
          name:'lesMister',
          meta: {requireAuth: true}
        },
        {
          path: '/lineChart',
          component: resolve => require(['../views/echarts/lineChart'],resolve),
          title:'lineChart',
          name:'lineChart',
          meta: {requireAuth: true}
        },
        {
          path: '/forceGraphexpand',
          component: resolve => require(['../views/echarts/forceGraphexpand'],resolve),
          title:'forceGraphexpand',
          name:'forceGraphexpand',
          meta: {requireAuth: true}
        },
        {
          path: '/forceGraph',
          component: resolve => require(['../views/echarts/forceGraph'],resolve),
          title:'forceGraph',
          name:'forceGraph',
          meta: {requireAuth: true}
        },
        {
          path: '/forcetocircle',
          component: resolve => require(['../views/echarts/forcetocircle'],resolve),
          title:'forcetocircle',
          name:'forcetocircle',
          meta: {requireAuth: true}
        },
        {
          path: '/forcealldata',
          component: resolve => require(['../views/echarts/forcealldata'],resolve),
          title:'forcealldata',
          name:'forcealldata',
          meta: {requireAuth: true}
        },
        {
          path: '/closetoexpand',
          component: resolve => require(['../views/echarts/closetoexpand'],resolve),
          title:'closetoexpand',
          name:'closetoexpand',
          meta: {requireAuth: true}
        },
        {
          path: '/radialTree',
          component: resolve => require(['../views/echarts/radialTree'],resolve),
          title:'radialTree',
          name:'radialTree',
          meta: {requireAuth: true}
        },
        {
          path: '/Tree',
          component: resolve => require(['../views/echarts/Tree'],resolve),
          title: 'Tree',
          name:'Tree',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: 'D3',
      name: 'D3',
      title: 'D3图表',
      component: resolve => require(['../views/Home'],resolve),
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/d3forceGraph',
          component: resolve => require(['../views/D3/forceGraph'],resolve),
          title:'d3forceGraph',
          name:'d3forceGraph',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: 'form',
      title: '表单',
      name: 'form',
      component: layout,
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      leaf: true,
      children:[
        {
          path: '/form',
          component: resolve => require(['../views/form/activityList'],resolve),
          title:'活动表单',
          name:'activityList',
          meta: {requireAuth: true}
        }
      ]
    }

  ]
});

router.beforeEach((to, from, next) =>{
  if(to.meta.requireAuth){
    if(sessionStorage.getItem('_token')){
      next()
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }else{
    next();
  }
});
export default router;
