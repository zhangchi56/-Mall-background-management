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
      },
      {
        path: '/shop/goods/create',
        name: 'shop_goods_create',
        meta:{title:'创建商品'},
        component: () => import('views/shop/goods/create.vue'),
      },
      {
        path:'/image/index',
        name:'image',
        meta:{title:'相册管理'},
        component: () => import('views/image/index.vue'),
      },
      {
        path:'/testa',
        name:'testa',
        meta:{title:'相册管理'},
        component: () => import('views/testa/testa.vue'),
      }
      
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