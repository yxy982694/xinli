// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import i18n from './i18n'
import store from './store'
import global from '@/utils/global'
import ElementUI from 'element-ui'
import 'babel-polyfill'
import 'element-theme-chalk'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/common/stylus/index.styl'
import $ from 'jquery'

/*Vue.config.productionTip = false*/
Vue.use(ElementUI)
Vue.use(api)

Vue.prototype.global = global
// Vue.prototype.HOSTW = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
