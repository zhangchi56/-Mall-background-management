<template>
  <div id="layout">
    <el-container style="  position:absolute;left: 0;right: 0;top: 0;bottom: 0;overflow:hidden">
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
      <el-container style="height:100%;">
        <el-aside width="200px">
          <el-menu default-active="0" class="el-menu-vertical-demo" @select="slideSelect">
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
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="layout-el-breadcrumb">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
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
      activeIndex: "1",
      activeIndex2: "1",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      navBar: {}
    };
  },
  created() {
    this.navBar = this.$conf.navBar;
    console.log(this.$route.matched)
  },
  computed: {
    slideMenus() {
      return this.navBar.list[this.navBar.active].submenu || [];
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.navBar.active = key;
    },
    slideSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scope>
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
  line-height: 160px;
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
.layout-el-breadcrumb{
  line-height: 55px;
  margin: -20px;
  border-bottom:1px #606266 solid;
  box-sizing:border-box;
}
</style>