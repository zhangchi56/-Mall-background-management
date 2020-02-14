import Vue from 'vue'
import './plugins/axios'
//引入elementui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'

import $conf from '@/common/config/config.js'
Vue.prototype.$conf = $conf




Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
