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

## 权限菜单动态生成

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
