import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);
import layout from '../views/layout/layout'
let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['../views/Login'],resolve),
      hidden: true,
      meta: {requireAuth: false}
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => require(['../views/Login'],resolve),
      hidden: true,
      meta: {requireAuth: false}
    },
    {
      path: '/',
      name: '首页',
      component:layout,
      iconCls: 'fa fa-user el-menu-icon',
      leaf: true,
      meta: {requireAuth: true},
      children: [
        {
          path: 'Home',
          component: resolve => require(['../views/Home/home'],resolve),
          name:'首页',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/layout',
      name: '用户管理',
      component:layout,
      iconCls: 'fa fa-user el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/UserInfo',
          component: resolve => require(['../views/User/UserInfo'],resolve),
          name:'用户信息',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/layout',
      name: '资源管理',
      component: layout,
      iconCls: 'fa fa-skyatlas el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/Resource',
          component: resolve => require(['../views/Resource/NumResource'],resolve),
          name:'数据资源',
          meta: {requireAuth: true}
        },
        {
          path: '/Active',
          component: resolve => require(['../views/Resource/Active'],resolve),
          name:'活动资源',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/layout',
      name: '日志管理',
      component: layout,
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/Log',
          component: resolve => require(['../views/Log/Log'],resolve),
          name:'日志列表',
          meta: {requireAuth: true}
        },
        {
          path: '/LogChart',
          component: resolve => require(['../views/Log/LogChart'],resolve),
          name:'日志图表',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/layout',
      name: 'echarts',
      component:layout,
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/lesMister',
          component: resolve => require(['../views/echarts/lesMiserables'],resolve),
          name:'lesMister',
          meta: {requireAuth: true}
        },
        {
          path: '/lineChart',
          component: resolve => require(['../views/echarts/lineChart'],resolve),
          name:'lineChart',
          meta: {requireAuth: true}
        },
        {
          path: '/forceGraphexpand',
          component: resolve => require(['../views/echarts/forceGraphexpand'],resolve),
          name:'forceGraphexpand',
          meta: {requireAuth: true}
        },
        {
          path: '/forceGraph',
          component: resolve => require(['../views/echarts/forceGraph'],resolve),
          name:'forceGraph',
          meta: {requireAuth: true}
        },
        {
          path: '/forcetocircle',
          component: resolve => require(['../views/echarts/forcetocircle'],resolve),
          name:'forcetocircle',
          meta: {requireAuth: true}
        },
        {
          path: '/forcealldata',
          component: resolve => require(['../views/echarts/forcealldata'],resolve),
          name:'forcealldata',
          meta: {requireAuth: true}
        },
        {
          path: '/closetoexpand',
          component: resolve => require(['../views/echarts/closetoexpand'],resolve),
          name:'closetoexpand',
          meta: {requireAuth: true}
        },
        {
          path: '/radialTree',
          component: resolve => require(['../views/echarts/radialTree'],resolve),
          name:'radialTree',
          meta: {requireAuth: true}
        },
        {
          path: '/Tree',
          component: resolve => require(['../views/echarts/Tree'],resolve),
          name:'Tree',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/Home',
      name: 'D3',
      component: resolve => require(['../views/Home'],resolve),
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      children:[
        {
          path: '/d3forceGraph',
          component: resolve => require(['../views/D3/forceGraph'],resolve),
          name:'d3forceGraph',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/layout',
      name: 'form',
      component: layout,
      iconCls: 'fa fa-calendar el-menu-icon',
      meta: {requireAuth: true},
      leaf: true,
      children:[
        {
          path: '/form',
          component: resolve => require(['../views/form/activityList'],resolve),
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
