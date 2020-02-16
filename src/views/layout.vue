<template>
  <div id="layout">
    <!-- 主布局 -->
    <el-container style="position: absolute;left: 0;top: 0;bottom: 0;right: 0; overflow: hidden;">
      <!-- 头部布局 -->
      <el-header class="layout-el-header">
        <a href>
          <h5>{{$conf.login}}</h5>
        </a>
        <el-menu
          :default-active="navBar.active"
          class="layout-el-menu"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            :index="index | numToString"
            v-for="(item, index) in navBar.list"
            :key="index"
          >{{item.name}}</el-menu-item>
          <el-submenu index="5">
            <template slot="title">
              个人中心
              <el-avatar :size="30" :src="circleUrl"></el-avatar>
            </template>
            <el-menu-item index="2-1">选项1</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>

      <el-container style="height: 100%;padding-bottom:20px;">
        <!-- 侧边栏布局 -->
        <el-aside width="200px">
          
          <el-menu
            :default-active="slideMenuActive"
            class="el-menu-vertical-demo"
            @select="slideSelect"
          >
            <el-menu-item
              v-for="(item, index) in slideMenus"
              :key="index"
              :index="index | numToString"
            >
              <i :class="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主布局 -->
        <el-main class="bg-light" style="padding-bottom: 60px;position: relative;">
          <ul></ul>

          <!-- 面包屑导航 -->
          <div v-if="bran.length>0">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="layout-el-breadcrumb">
              <el-breadcrumb-item
                v-for="(item, index) in this.bran"
                :key="index"
                :to="{path:item.path}"
              >{{item.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!-- 回到顶部按钮 -->
          <el-backtop target=".el-main" :bottom="100">
            <div
              style="{
                height: 100%;
                width: 100%;
                background-color: #f2f5f6;
                box-shadow: 0 0 6px rgba(0,0,0, .12);
                text-align: center;
                line-height: 40px;
                color: #1989fa;
              }"
            >UP</div>
          </el-backtop>

          <!-- 主内容 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import common from "@/common/mixins/common.js";

export default {
  mixins: [common],
  name: "Index",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      navBar: {}, //主要导航栏
      bran: [] //面包屑导航栏
    };
  },
  created() {
    //初始化菜单
    this.navBar = this.$conf.navBar;

    //初始化面包屑导航
    this.getRouterBran();
    //初始化选中菜单
    this.__initNavBar();
  },
  computed: {
    slideMenuActive: {
      get() {
        return this.navBar.list[this.navBar.active].subActive || "0";
      },
      set(val) {
        this.navBar.list[this.navBar.active].subActive = val;
      }
    },
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || [];
    }
  },
  methods: {
    //初始化选中菜单
    __initNavBar() {
      let r = localStorage.getItem("navActive");
      if (r) {
        r = JSON.parse(r);
        console.log(r);
        this.navBar.active = r.top;
        this.slideMenuActive = r.left;
      }
    },
    //获取面包屑导航
    getRouterBran() {
      let b = this.$route.matched.filter(v => v.name);
      let arr = [];
      b.forEach((v, k) => {
        if (v.name === "layout" || v.name === "index") return;
        arr.push({
          name: v.name,
          path: v.path,
          title: v.meta.title
        });
      });
      if (arr.length > 0) {
        arr.unshift({
          name: "index",
          path: "/index",
          title: "后台首页"
        });
      }
      this.bran = arr;
      // console.log(arr);
    },
    //导航栏点击事件
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.navBar.active = key;

      //顶部导航栏点击
      // this.slideMenuActive = "0";
      // console.log(this.$route);
      if (this.slideMenus.length > 0) {
        this.$router.push({
          path: this.slideMenus[this.slideMenuActive].pathName
        });
      }
    },
    //侧边栏点击事件
    slideSelect(key, keyPath) {
      this.slideMenuActive = key;
      //替换到指定路径
      this.$router.push(this.slideMenus[key].pathName);
    }
  },
  watch: {
    $route(to, from) {
      //记录导航的活跃状态，进行本地存储,先
      if (localStorage.getItem("navActive")) {
        localStorage.removeItem("navActive");
        localStorage.setItem(
          "navActive",
          JSON.stringify({
            top: this.navBar.active,
            left: this.slideMenuActive
          })
        );
      }

      //实时监听面包屑导航路由
      this.getRouterBran();
    }
  },
  updated() {
    console.log(localStorage.getItem("navActive"));
  }
};
</script>

<style scope>
/* #layout {
  height: 100%;
} */
.el-header,
.el-footer {
  background-color: rgb(84, 92, 100);
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.layout-el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layout-el-header > a {
  text-decoration: none;
}
.layout-el-header > a > h5 {
  /* line-height: 60px; */
  color: white;
  margin-bottom: 0;
}
.layout-el-breadcrumb {
  line-height: 55px;
  margin: -20px;
  border-bottom: 1px #b1b1b1 solid;
  box-sizing: border-box;
  padding-left: 20px;
}
</style>