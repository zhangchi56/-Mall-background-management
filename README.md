# 电商类后台管理系统

> 本项目以基于 [vue](https://vuejs.org) 和 [Element框架](https://element.eleme.cn/#/zh-CN) 开发的完整中型项目

笔者会将开发过程中遇到的不熟的知识点进行整理

## 在线预览

在线预览：

预览图：
<img src="https://i.loli.net/2020/02/29/oIO5UfnqlGgzmQ8.gif" width=320/>


## 目录

- [前端页面实现](#前端页面实现)
- [页面实现](#分层架构)
- [页面实现](#分层架构)
- [页面实现](#分层架构)
- [页面实现](#分层架构)
- [前后交互实现](#前后交互实现)
- [部署](#部署)
- [常见问题](#常见问题)

## 前端页面实现


- 过于依赖前端框架，导致如果重构进行框架切换时，需要重写所有业务逻辑并进行回归测试。

针对上面所遇到的问题，笔者学习了一些关于 DDD（领域驱动设计）、Clean Architecture 等知识，并收集了类似思想在前端方面的实践资料，形成了下面这种前端分层架构：

<img src="https://i.loli.net/2020/02/29/5RhfH3BYMb9wIOs.png" width=600/>

其中 View 层想必大家都很了解，就不在这里介绍了，重点介绍下下面三个层的含义：

## 前后交互实现

Services 层是用来对底层技术进行操作的，例如封装 AJAX 请求,操作浏览器 cookie、locaStorage、indexDB，操作 native 提供的能力（如调用摄像头等），以及建立 Websocket 与后端进行交互等。

其中 Services 层又可细分出 request 层和 translator 层， request 层主要是实现 Services 的大部分功能。而 translator 层主要用于清洗从服务端或客户端接口返回的数据：删除部分数据、修改属性名、转化部分数据等，一般可定义成纯函数形式。下面以本项目实际代码为例进行讲解。

从后端获取 quote 数据:



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
