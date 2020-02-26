<template>
  <div class="card mb-3">
    <div class="card-header d-flex align-items-center">
      规格项：
      <el-input
        size="mini"
        style="width: 200px"
        :value="item.name"
        @input="vModel('name',index,$event)"
      >
        <el-button slot="append" icon="el-icon-more"></el-button>
      </el-input>
      <el-radio-group
        size="mini"
        style="margin-bottom:-10px;"
        class="ml-2"
        :value="item.type"
        @input="vModel('type',index,$event)"
      >
        <el-radio :label="0">无</el-radio>
        <el-radio :label="1">颜色</el-radio>
        <el-radio :label="2">图片</el-radio>
      </el-radio-group>
      <!-- 上移卡片 -->
      <el-button
        size="mini"
        class="ml-auto"
        icon="el-icon-top"
        @click="sortCard('moveUp',index)"
        :disabled="index === 0"
      ></el-button>
      <!-- 下移卡片 -->
      <el-button
        size="mini"
        icon="el-icon-bottom"
        @click="sortCard('moveDown',index)"
        :disabled="(index+1) === total"
      ></el-button>
      <!-- 删除卡片 -->
      <el-button size="mini" @click="delSkuCard(index)">删除</el-button>
    </div>
    <div class="card-body">
      <!-- 规格属性列表 -->
      <div class="d-flex align-items-center flex-wrap">
        <sku-card-children :type="item.type" v-for="(item, index) in item.list" :key="index" :valueIndex="index" :cardIndex="cardIndex" :item="item"></sku-card-children>
      </div>
      <!-- 增加规格 -->
      <div class="mt-2">
        <el-button type="text" size="mini" icon="el-icon-plus" @click="addSkuValue(index)">增加规格值</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapState, mapMutations } from "vuex";

import skuCardChildren from "./sku-card-children.vue";

export default {
  props:{
    item: Object,
    index: Number,
    total: Number,
    cardIndex: Number
  },
  data() {
    return {
      form: {}
    };
  },
  components: {
    skuCardChildren
  },
  methods: {
    ...mapMutations([
      "delSkuCard",
      "vModelSkuCard",
      "sortSkuCard",
      "addSkuValue"
    ]),
    vModel(key, index, value) {
      this.vModelSkuCard({ key, index, value });
    },
    //上移卡片
    sortCard(action, index) {
      this.sortSkuCard({ action, index });
    }
  },
  mounted() {
    // console.log(this.cardIndex)
    
  },
};
</script>

<style scoped>
</style>

<style>
.el-form-item__content {
  line-height: 1;
}
</style>
