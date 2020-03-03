import Vue from "vue"
import Router from "vue-router"

import routes from "./common/config/router.js"

Vue.use(Router)

let router = new Router({ routes })

// 全局前置守卫
router.beforeEach((to, from, next) => {
	// 获取token
	let token = window.sessionStorage.getItem('token')
	
	if(token){ // 已登录
		// 防止重复登录
		if(to.path === '/login'){
			Vue.prototype.$message.error('请不要重复登录');
			return next({name:from.name ? from.name : 'index'})
		}
		// 其他验证...
		
		next();
	} else {
		// 跳过登录页验证
		if(to.path === '/login'){
			return next();
		}
		// 未登录
		Vue.prototype.$message.error('请先登录');
		next({ path:'/login' })
	}
})

export default router