<template>
  <div class="create">
    <router-link to="/shop/goods/list" style="position: absolute;top: 12px;left: 200px;">
      <el-button size="mini">回到商品列表</el-button>
    </router-link>

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <!-- 基础设置 -->
      <el-tab-pane label="基础设置">
        <base-create></base-create>
      </el-tab-pane>

      <!-- 商品规格 -->
      <el-tab-pane label="商品规格">
        <!-- 规格选项 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品规格">
            <el-radio-group :value="skus_type" @input="vModel('skus_type',$event)" size="medium">
              <el-radio-button :label="0" size="medium">单规格</el-radio-button>
              <el-radio-button :label="1" size="medium">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <!-- 单规格 -->
        <template v-if="skus_type === 0">
          <single-attrs></single-attrs>
        </template>

        <!-- 多规格 -->
        <template v-else>
          <!-- 规格卡片 -->
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="添加规格">
              <sku-card
                v-for="(item, index) in sku_card"
                :key="index"
                :item="item"
                :index="index"
                :cardIndex="index"
                :totle="skuCardTotal"
              ></sku-card>
              <el-button type="success" size="mini" @click="addSkuCard">添加规格</el-button>
            </el-form-item>
          </el-form>

          <el-form ref="form" label-width="80px">
            <el-form-item label="批量设置">
              <el-button type="text">销售价</el-button>
              <el-button type="text">市场价</el-button>
              <el-button type="text">成本价</el-button>
              <el-button type="text">库存</el-button>
              <el-button type="text">体积</el-button>
              <el-button type="text">重量</el-button>
            </el-form-item>

            <!-- 规格设置 -->
            <sku-table></sku-table>
          </el-form>
        </template>
      </el-tab-pane>

      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
      <!-- 商品详情 -->
      <el-tab-pane label="商品详情">
        <!-- 富文本编辑器 -->
        <tinymce ref="editor" v-model="msg" @onClick="onClick"></tinymce>
      </el-tab-pane>
      <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
    </el-tabs>

  </div>
</template>


<script type="text/javascript">
import { mapState, mapMutations } from "vuex";
import baseCreate from "@/components/shop/create/base-create.vue";
import singleAttrs from "@/components/shop/create/single-attrs.vue";
import skuCard from "@/components/shop/create/sku/sku-card.vue";
import skuTable from "@/components/shop/create/sku/sku-table.vue";

import tinymce from "@/components/common/tinymce.vue";
export default {
  data() {
    return {
      tabIndex: 0,
      form: {},
      value: [],
      msg: "Welcome to Use Tinymce Editor"
    };
  },
  computed: {
    ...mapState({
      skus_type: state => state.goods_create.skus_type,
      sku_card: state => state.goods_create.sku_card,

      oprice: state => state.goods_create.oprice,
      pprice: state => state.goods_create.pprice,
      cprice: state => state.goods_create.cprice,
      weight: state => state.goods_create.weight,
      volume: state => state.goods_create.volume
    }),
    //卡片总数
    skuCardTotal() {
      return this.sku_card.length;
    }
  },
  components: {
    baseCreate,
    singleAttrs,
    skuCard,
    skuTable,
    tinymce
  },
  methods: {
    ...mapMutations(["vModelState", "addSkuCard"]),
    vModel(key, value) {
      this.vModelState({ key, value });
      // console.log(key);
    },

    //加载数据
    handleClick(tab, event) {
      // console.log(tab.index);
    },
    //鼠标单击事件
    onClick(e, editor) {
      console.log("Element clicked");
      console.log(e);
      console.log(editor);
    }
  }
};
</script>

<style scoped>
.create .el-form-item {
  margin-bottom: 10px;
}
</style>
