<template>
  <div class>
    我是测试页面
    <el-form inline ref="form" :model="form" label-width="80px">
      <el-form-item label="商品名称" class="mb-0">
        <el-input v-model="form.name" size="mini" placeholder="请输入商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      form: {}
    };
  },
  components: {},
  methods: {
    searchEvent(e = false) {
      // console.log()
      //简单搜索
      if (typeof e === "string") {
        console.log("简单搜索", e);
        return;
      }
      //高级搜索
      console.log("高级搜索",e);
    }
  }
};
</script>

<style scoped>
</style>
