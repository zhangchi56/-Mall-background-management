<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="商品名称">
      <el-input
        :value="title"
        @input="vModel('title',$event)"
        placeholder="请输入商品名称，不能超过60个字符"
        class="w-50"
      ></el-input>
    </el-form-item>
    <el-form-item label="商品分类">
      <el-cascader v-model="value" :options="options"></el-cascader>
    </el-form-item>
    <el-form-item label="商品描述">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        class="w-50"
        :value="desc"
        @input="vModel('desc',$event)"
      ></el-input>
    </el-form-item>
    <el-form-item label="商品单位">
      <el-input :value="unit" @input="vModel('unit',$event)" class="w-50"></el-input>
    </el-form-item>
    <el-form-item label="总库存">
      <el-input type="number" :value="stock" @input="vModel('stock',$event)" class="w-25"></el-input>
      <template slot="append">件</template>
    </el-form-item>
    <el-form-item label="库存预警">
      <el-input type="number" :value="min_stock" @input="vModel('min_stock',$event)" class="w-25"></el-input>
      <template slot="append">件</template>
    </el-form-item>
    <el-form-item label="库存显示">
      <el-radio-group :value="stock_display" @input="vModel('stock_display',$event)">
        <el-radio :label="0">是</el-radio>
        <el-radio :label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否上架">
      <el-radio-group :value="status" @input="vModel('status',$event)">
        <el-radio :label="0">是</el-radio>
        <el-radio :label="1">否</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item label="运费模板">
      <el-select :value="express" @input="vModel('express',$event)">
        <el-option label="区域一" value="shanghai" placeholder="请选择"></el-option>
        <el-option label="区域二" value="beijing" placeholder="请选择"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script type="text/javascript">
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState({
      title: state => state.goods_create.title,
      category: state => state.goods_create.category,
      desc: state => state.goods_create.desc,
      unit: state => state.goods_create.unit,
      stock: state => state.goods_create.stock,
      min_stock: state => state.goods_create.min_stock,
      stock_display: state => state.goods_create.stock_display,
      status: state => state.goods_create.status,
      express: state => state.goods_create.express
    })
  },
  components: {},
  methods: {
    ...mapMutations(["vModelState"]),
    vModel(key, value) {
      console.log(value)
      this.vModelState({ key, value });
      // console.log(key);
      // console.log(value);
    }
  }
};
</script>

<style scoped>
</style>
