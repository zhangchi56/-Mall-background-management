# 电商类后台管理系统

> 本项目以基于 [vue](https://vuejs.org) 和 [Element框架](https://element.eleme.cn/#/zh-CN) 开发的完整中型项目

笔者会将开发过程中遇到的重要知识点进行整理

## 在线预览

在线预览：

预览图：
<img src="https://i.loli.net/2020/02/29/oIO5UfnqlGgzmQ8.gif" width=320/>


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

## 全局响应拦截

在main.js中
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
