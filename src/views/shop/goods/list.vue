<template>
  <div class="bg-white" style="margin: 20px -20px -20px -20px;padding:20px">
    <!-- 头部众多按钮条 -->
    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane v-for="(item, index) in tabbars" :key="index" :label="item.name">
      
          <button-search placeholder='要搜索的商品名称' @search="searchEvent">
            <!--左边  -->
            <template #left>
 <el-button type="success" size="mini">发布商品</el-button>
          <el-button type="danger" size="mini">批量删除</el-button>
            </template>

            <template #form>
              <el-form inline ref="form" :model="form" label-width="80px">
            <el-form-item label="商品名称" class="mb-0">
              <el-input v-model="form.name" size="mini" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="商品编码" class="mb-0">
              <el-input v-model="form.code" size="mini" placeholder="请输入商品编码型"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" class="mb-0">
              <el-select v-model="form.type" placeholder="请选择商品类型" size="mini">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品分类" class="mb-0">
              <el-input v-model="form.category" size="mini" placeholder="请输入商品分类"></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-button type="info" size="mini" @click="searchEvent">搜索</el-button>
              <el-button type="info" size="mini" @click="clearSearch">清空筛选条件</el-button>
            </el-form-item>
          </el-form>
            </template>
          </button-search>

       


        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import buttonSearch from '@/components/common/button-search.vue';
export default {
  data() {
    return {
      tabIndex: 0,
      tabbars: [
        { name: "审核中" },
        { name: "出售中" },
        { name: "已下架" },
        { name: "库存预警" },
        { name: "回收站" }
      ],
      form: {
        name: "",
        code: "",
        type: "",
        category: ""
      },
    };
  },
  components:{
    buttonSearch
  },
  methods: {
    //tab点击切换 加载数据
    handleClick(tab, event) {
      console.log(tab.index, event);
    },

    //清空筛选条件
    clearSearch() {
      this.form = {
        name: "",
        code: "",
        type: "",
        category: ""
      }
    },
    //搜索事件
    searchEvent(e = false) {
      // console.log()
      //简单搜索
      if(typeof e === 'string'){
        console.log("简单搜索",e);
        return
      }
      //高级搜索
        console.log("高级搜索");
    }
  }
};
</script>

<style scoped>
</style>