import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: require('@/pages/Dashboard').default
    },
    {
      path: '/stats',
      name: 'stats',
      component: require('@/pages/Stats').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
