import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index'
import Login from '@/components/login/index'
import priceManage from '@/components/index/priceManage/index'
import businessManage from '@/components/index/businessManage/index'
import dataQuery from '@/components/index/dataQuery/index'
import salesData from '@/components/index/salesData/index'
import userManage from '@/components/index/userManage/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/priceManage',
          component: priceManage
        },{
          path: '/businessManage',
          component: businessManage
        },{
          path: '/dataQuery',
          component: dataQuery
        },{
          path: '/salesData',
          component: salesData
        },{
          path: '/userManage',
          component: userManage
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
