import Vue from 'vue'
import './plugins/axios'
//引入elementui库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
//拖拽
import VueDND from 'awe-dnd'
Vue.use(VueDND)

import $conf from '@/common/config/config.js'
Vue.prototype.$conf = $conf

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
