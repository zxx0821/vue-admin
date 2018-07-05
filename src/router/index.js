import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

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
      path: '/Home',
      name: '用户管理',
      component: resolve => require(['../views/Home'],resolve),
      iconCls: 'fa fa-user',
      meta: {requireAuth: true},
      children:[
        {
          path: '/User',
          component: resolve => require(['../views/User/User'],resolve),
          name:'用户列表',
          meta: {requireAuth: true}
        },
        {
          path: '/UserInfo',
          component: resolve => require(['../views/User/UserInfo'],resolve),
          name:'用户信息',
          meta: {requireAuth: true}
        },
        {
          path: '/AdminInfo',
          component: resolve => require(['../views/User/AdminInfo'],resolve),
          name:'管理员信息',
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/Home',
      name: '资源管理',
      component: resolve => require(['../views/Home'],resolve),
      iconCls: 'fa fa-skyatlas',
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
      path: '/Home',
      name: '日志管理',
      component: resolve => require(['../views/Home'],resolve),
      iconCls: 'fa fa-calendar',
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
      path: '/Home',
      name: 'echarts',
      component: resolve => require(['../views/Home'],resolve),
      iconCls: 'fa fa-calendar',
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
        }
      ]
    },
    {
      path: '/Home',
      name: 'D3',
      component: resolve => require(['../views/Home'],resolve),
      iconCls: 'fa fa-calendar',
      meta: {requireAuth: true},
      children:[
        {
          path: '/d3forceGraph',
          component: resolve => require(['../views/D3/forceGraph'],resolve),
          name:'d3forceGraph',
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
