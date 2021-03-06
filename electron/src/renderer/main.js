import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

//  Apex Charts
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

//  Tooltip
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
