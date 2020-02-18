// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import VueRouter from 'vue-router'
import api from './api/install'

Vue.use(api)
Vue.use(VueRouter)
Vue.use(Vant)
Vue.use(Lazyload)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
