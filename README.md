# 电商类后台管理系统

> 本项目以基于 [vue](https://vuejs.org) 和 [Element框架](https://element.eleme.cn/#/zh-CN) 开发的完整中型项目

笔者会将开发过程中遇到的重要知识点进行整理

## 在线预览

在线预览：

预览图：
<img src="/>


## 目录

- [前端页面实现](#前端页面实现)
- [后续补充](#后续补充)
- [前后端交互实现](#前后端交互实现)
- [登录功能](#登录功能)
- [全局响应拦截](#全局响应拦截)
- [全局路由守卫](#全局路由守卫)
- [权限菜单动态生成](#权限菜单动态生成)
- [权限验证](#权限验证)

## 前端页面实现

### 后续补充...

## 前后端交互实现

## 登录功能

思路：提交表单验证，发送axios请求，获取后端返回的token，并用存储到vuex和本地存储sessionStorage

```bash
// 提交表单
this.loading = true
this.axios.post('/admin/login',this.form).then(res=>{
	let data = data
	// 存储到vuex
	// 存储到本地存储
	this.$store.commit('login',data)
	//存储权限规则
	if(data.role && data.role.rules){
		window.sessionStorage.setItem('rules',JSON.stringify(data.role.rules))
	}
	window.sessionStorage.setItem()
	// 生成后台菜单
	this.$store.commit('createNavBar',data.tree)
	// 成功提示
	this.$message('登录成功')
	this.loading = false
	// 跳转后台首页
	this.$router.push({name:'index'})
}).catch(err=>{
	this.loading = false
})
```

vuex
```bash
// 初始化用户信息
initUser(state){
	let user = window.sessionStorage.getItem('user')
	if(user){
		state.user = JSON.parse(user)
		state.token = state.user.token
	}
},
// 登录
login(state,user){
	// 保存登录状态
	state.user = user
	state.token = user.token
	// 存储到本地存储
	window.sessionStorage.setItem('user',JSON.stringify(state.user))
	window.sessionStorage.setItem('token',state.token)
},
// 退出登录
logout(state){
	// 清除状态
	state.user = {}
	state.token = false
	// 清除本地存储
	window.sessionStorage.clear()
}
```

## 全局响应拦截

好处是可以将相同的响应错误做全局处理

在main.js中

请求拦截
```bash
// 添加请求拦截器
axios.interceptors.request.use((config)=>{
	// 添加header头的token
	let token = window.sessionStorage.getItem('token')
	if(config.token === true){
		config.headers['token'] = token
	}
	// 显示loading
	if(config.loading === true){
		showLoading()
	}
	// 在发送请求之前做些什么
	return config;
}, (error)=> {
	// 隐藏loading
	hideLoading()
	// 对请求错误做些什么
	return Promise.reject(error);
});
```


```bash
// 添加响应拦截器
axios.interceptors.response.use((response)=>{
	console.log('响应拦截器 成功');
	// 隐藏loading
	hideLoading()
	// 对响应数据做点什么
	return response;
},(err)=> {
	// 全局错误提示
	if(err.response && err.response.data && err.response.data.errorCode){
		Message.error(err.response.data.msg)
	}
	// 隐藏loading
	hideLoading()
	// 对响应错误做点什么
	return Promise.reject(err);
});
```

## 全局路由守卫
```bash
// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 获取token
  let token = window.sessionStorage.getItem('token')

  if (token) { // 已登录
    // 防止重复登录
    if (to.path === '/login') {
      Vue.prototype.$message.error('请不要重复登录');
      console.log(from)
      return next({
        path: from.path ? from.path : '/index'
      })
    }
    // 其他验证...
    console.log(to)
    next();
  } else {
    // 跳过登录页验证
    if (to.path === '/login') {
      return next();
    }
    // 未登录
    Vue.prototype.$message.error('请先登录');
    next({
      path: '/login'
    })
  }
})
```


## 权限菜单动态生成
思路：根据获取到的数据，进行菜单的动态生成

## 权限验证
思路：
第一：通过路由守卫去判断，要去的页面地址与后端返回的role.rules里面地址对比，看有没有？
第二： 先排除一级菜单的路由地址,再进行路由对比，（此项目路由id为0即为一级菜单）

验证完后做跳转路径处理（出了一点bug，暂时无法解决）


## 权限验证






# vue-el-admin

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
