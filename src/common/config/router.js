let routes = [
  {
    path: '/',
    name: 'layout',
    redirect:{name:'index'},
    component: ()=>import('views/layout.vue'),
    children:[
      {
        path: '/index',
        name: 'index',
        meta:{title:'后台首页'},
        component: () => import('views/index/index.vue')
      },
      {
        path: '/shop/goods/list',
        name: 'shop_goods_list',
        meta:{title:'商品列表'},
        component: () => import('views/shop/goods/list.vue'),
        children:[{
          path:'/image/index',
          name:'image',
          meta:{title:'相册管理'}
        }]
      },
      
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta:{title:'登录页面'},
    component: () => import('views/login/login.vue')
  },
  {
    path:'*',
    redirect:{name:'index'}
  }
]




export default routes