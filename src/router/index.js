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
      meta: {requireAuth: false, title: '登录',}
    },
    {
      path: '/Login',
      title: '登录',
      name: 'Login',
      component: resolve => require(['../views/Login'],resolve),
      hidden: true,
      meta: {requireAuth: false, title: '登录',}
    },
    {
      path: '/home',
      name: 'home',
      title: '首页',
      component:layout,
      iconCls: 'fa fa-university fa-fw el-menu-icon',
      hidden: true,
      meta: {requireAuth: true,title: '首页',},
      children: [
        {
          path: '',
          component: resolve => require(['../views/Home/home'],resolve),
          name: 'index',
          title: '首页',
          meta: {requireAuth: true, title: '首页',}
        }
      ]
    },
    {
      path: 'UserAdmin',
      title: '用户管理',
      name:'UserAdmin',
      component:layout,
      iconCls: 'fa fa-user fa-fw el-menu-icon',
      meta: {requireAuth: true, title: '用户管理',},
      children:[
       {
          path: '/UserInfo',
          component: resolve => require(['../views/User/UserInfo'],resolve),
          title:'用户信息',
          name: 'userInfo',
         iconCls: 'fa fa-user-o fa-fw',
          meta: {requireAuth: true,title:'用户信息',}
        }
      ]
    },
    {
      path: 'TaskAdmin',
      title: '任务管理',
      name: 'TaskAdmin',
      component:layout,
      iconCls: 'fa fa-tasks fa-fw el-menu-icon',
      meta: {requireAuth: true,title: '任务管理',},
      children:[
        {
          path: '/taskInfo',
          component: resolve => require(['../views/taskAdmin/taskList'],resolve),
          title:'任务列表',
          name: 'taskList',
          meta: {requireAuth: true,title:'任务列表',}
        },
        {
          path: '/addTask',
          component: resolve => require(['../views/taskAdmin/addTask'],resolve),
          title:'添加任务',
          name:'addTask',
          meta: {requireAuth: true, title:'添加任务',}
        },
        {
          path: '/taskDetail',
          component: resolve => require(['../views/taskAdmin/taskDetail'],resolve),
          title:'任务详情',
          name: 'taskDetail',
          hidden: true,
          meta: {requireAuth: true, title:'任务详情',}
        },
        {
          path: '/repaireTask',
          component: resolve => require(['../views/taskAdmin/repaireTask'],resolve),
          title:'修改任务',
          name: 'repaireTask',
          hidden: true,
          meta: {requireAuth: true, title:'修改任务',}
        },
      ]
    },
    {
      path: 'ResourceAdmin',
      title: '资源管理',
      name: 'ResourceAdmin',
      component: layout,
      iconCls: 'fa fa-cubes fa-fw el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/Resource',
          component: resolve => require(['../views/Resource/NumResource'],resolve),
          title:'数据资源',
          name: 'NumResource',
          meta: {requireAuth: true, title: '资源管理',}
        },
        {
          path: '/ActiveResource',
          component: resolve => require(['../views/Resource/ActiveResource'],resolve),
          title:'活动资源',
          name: 'ActiveResource',
          meta: {requireAuth: true, title:'活动资源',}
        }
      ]
    },
    {
      path: 'LogAdmin',
      title: '日志管理',
      name: 'LogAdmin',
      component: layout,
      iconCls: 'fa fa-bookmark fa-fw el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/Log',
          component: resolve => require(['../views/Log/Log'],resolve),
          title:'日志列表',
          name:'LogList',
          meta: {requireAuth: true, title: '日志管理',}
        },
        {
          path: '/LogChart',
          component: resolve => require(['../views/Log/LogChart'],resolve),
          title:'日志图表',
          name:'LogChart',
          meta: {requireAuth: true, title:'日志图表',}
        }
      ]
    },
    {
      path: 'echarts',
      name: 'echarts',
      title: 'echarts图表',
      component:layout,
      iconCls: 'fa fa-bar-chart fa-fw el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/lesMister',
          component: resolve => require(['../views/echarts/lesMiserables'],resolve),
          title:'lesMister',
          name:'lesMister',
          meta: {requireAuth: true, title: 'echarts图表',}
        },
        {
          path: '/lineChart',
          component: resolve => require(['../views/echarts/lineChart'],resolve),
          title:'lineChart',
          name:'lineChart',
          meta: {requireAuth: true, title:'lineChart',}
        },
        {
          path: '/forceGraphexpand',
          component: resolve => require(['../views/echarts/forceGraphexpand'],resolve),
          title:'forceGraphexpand',
          name:'forceGraphexpand',
          meta: {requireAuth: true, title:'forceGraphexpand',}
        },
        {
          path: '/forceGraph',
          component: resolve => require(['../views/echarts/forceGraph'],resolve),
          title:'forceGraph',
          name:'forceGraph',
          meta: {requireAuth: true, title:'forceGraph',}
        },
        {
          path: '/forcetocircle',
          component: resolve => require(['../views/echarts/forcetocircle'],resolve),
          title:'forcetocircle',
          name:'forcetocircle',
          meta: {requireAuth: true, title:'forcetocircle',}
        },
        {
          path: '/forcealldata',
          component: resolve => require(['../views/echarts/forcealldata'],resolve),
          title:'forcealldata',
          name:'forcealldata',
          meta: {requireAuth: true,title:'forcealldata',}
        },
        {
          path: '/closetoexpand',
          component: resolve => require(['../views/echarts/closetoexpand'],resolve),
          title:'closetoexpand',
          name:'closetoexpand',
          meta: {requireAuth: true,title:'closetoexpand',}
        },
        {
          path: '/radialTree',
          component: resolve => require(['../views/echarts/radialTree'],resolve),
          title:'radialTree',
          name:'radialTree',
          meta: {requireAuth: true,title:'radialTree',}
        },
        {
          path: '/Tree',
          component: resolve => require(['../views/echarts/Tree'],resolve),
          title: 'Tree',
          name:'Tree',
          meta: {requireAuth: true, title: 'Tree',}
        }
      ]
    },
    {
      path: 'D3',
      name: 'D3',
      title: 'D3图表',
      component:layout,
      iconCls: 'fa fa-pie-chart fa-fw el-menu-icon',
      meta: {requireAuth: true,title: 'D3图表',},
      children:[
        {
          path: '/d3forceGraph',
          component: resolve => require(['../views/D3/forceGraph'],resolve),
          title:'d3forceGraph',
          name:'d3forceGraph',
          meta: {requireAuth: true,title:'d3forceGraph',}
        },
        {
          path: '/collapseTree',
          component: resolve => require(['../views/D3/CollapsibleTree'],resolve),
          name:'collapseTree',
          title:'collapseTree',
          meta: {requireAuth: true, title:'collapseTree',}
        },
        {
          path: '/test',
          component: resolve => require(['../views/D3/test'],resolve),
          name:'test',
          title:'test',
          meta: {requireAuth: true, title:'test'}
        }
      ]
    },
    {
      path: 'component',
      title: '组件',
      name: 'component',
      component: layout,
      iconCls: 'fa fa-wpforms fa-fw el-menu-icon',
      meta: {requireAuth: true, title: '组件',},
      children:[
        {
          path: '/backToTop',
          component: resolve => require(['../views/components/backToTop'],resolve),
          title:'返回顶部',
          name:'backToTop',
          iconCls: 'fa fa-arrow-up',
          meta: {requireAuth: true,  title:'返回顶部',}
        },
        {
          path: '/uploader',
          component: resolve => require(['../views/components/uploader'],resolve),
          title:'上传',
          name:'uploader',
          iconCls: 'fa fa-cloud-upload',
          meta: {requireAuth: true,  title:'上传',}
        }
      ]
    },
    {
      path: 'table',
      title: '操作表格',
      name: 'table',
      component: layout,
      iconCls: 'fa fa-wpforms fa-fw el-menu-icon',
      meta: {requireAuth: true, title: '组件',},
      children:[
        {
          path: '/addTabHeader',
          component: resolve => require(['../views/table/index'],resolve),
          title:'动态表格',
          name:'addTabHeader',
          iconCls: 'fa fa-arrow-up',
          meta: {requireAuth: true,  title:'动态表格',}
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
