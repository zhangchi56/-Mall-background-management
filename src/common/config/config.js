export default {
  login:"zhangchi",
  navBar:{
    active: "0",
    list: [
      {
        name: "首页",
        subActive: "0",
        submenu: [
          {
            icon: "el-icon-s-home",
            name: "后台首页",
            pathName: "/index"
          },
          {
						icon: "el-icon-picture",
						name: "相册管理",
						pathName:"/image/index"
					},
          {
            icon: "el-icon-s-claim",
            name: "商品列表",
            pathName: "/shop/goods/list"
          }
        ]
      },
      {
        name: "商品",
        subActive: "0",
        submenu: [
          {
            icon: "el-icon-s-home",
            name: "商品列表",
            pathName: "/shop/goods/list"
          },
          // {
          //   icon: "el-icon-s-claim",
          //   name: "商品列表"
          // }
        ]
      },
      { name: "订单" },
      { name: "会员" },
      { name: "设置" }
    ]
  }
};
