<template>
  <div class="create">
    <router-link to="/shop/goods/list" style="position: absolute;top: 12px;left: 200px;">
      <el-button size="mini">回到商品列表</el-button>
    </router-link>

    <el-tabs v-model="tabIndex" @tab-click="handleClick">
      <el-tab-pane label="基础设置">
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="form.title" placeholder="请输入商品名称，不能超过60个字符" class="w-50"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader v-model="value" :options="options"></el-cascader>
          </el-form-item>
          <el-form-item label="商品描述">
            <el-input
              type="textarea"
              :rows="5"
              placeholder="请输入内容"
              v-model="form.desc"
              class="w-50"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品单位">
            <el-input v-model="form.unit" placeholder class="w-50"></el-input>
          </el-form-item>
          <el-form-item label="总库存">
            <el-input v-model="form.stock" type="number" placeholder class="w-25"></el-input>
            <template slot="append">件</template>
          </el-form-item>
          <el-form-item label="库存预警">
            <el-input v-model="form.min_stock" type="number" placeholder class="w-25"></el-input>
            <template slot="append">件</template>
          </el-form-item>
          <el-form-item label="库存显示">
            <el-radio-group v-model="form.display_stock">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否上架">
            <el-radio-group v-model="form.status">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="运费模板">
            <el-select v-model="form.express">
              <el-option label="区域一" value="shanghai" placeholder="请选择"></el-option>
              <el-option label="区域二" value="beijing" placeholder="请选择"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品规格">
        <!-- 规格选项 -->
        <el-form ref="form" label-width="80px">
          <el-form-item label="商品规格">
            <el-radio-group :value="skus_type" @input="vModer('skus_type',$event)" size="medium">
              <el-radio-button :label="0" size="medium">统一规格</el-radio-button>
              <el-radio-button :label="1" size="medium">多规格</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-form>

        <!-- 统一规格 -->
        <template v-if="skus_type === 0">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="市场价格" style="width:300px">
              <el-input v-model="form.stock"><template slot="append">件</template></el-input>
              
            </el-form-item>
            <el-form-item label="销售价格">
              <el-input type="number" v-model="form.stock">
                <template slot="append">件</template>
              </el-input>
              
            </el-form-item>
            <el-form-item label="成本价格">
              <el-input type="number" v-model="form.stock"></el-input>
              <template slot="append">件</template>
            </el-form-item>
            <el-form-item label="商品重量">
              <el-input type="number" v-model="form.stock"></el-input>
              <template slot="append">件</template>
            </el-form-item>
            <el-form-item label="商品体积">
              <el-input type="number" v-model="form.stock"></el-input>
              <template slot="append">件</template>
            </el-form-item>
          </el-form>
        </template>

        <!-- 多规格 -->
        <el-form ref="form" label-width="80px" v-else>
          <el-form-item label="总库存">
            <el-input v-model="form.stock" type="number" placeholder class="w-25"></el-input>
            <template slot="append">件</template>
          </el-form-item>
          <el-form-item label="添加规格">
            <div class="card">
              <div class="card-header d-flex align-items-center">
                规格项：
                <el-input size="mini" style="width: 200px">
                  <el-button slot="append" icon="el-icon-more"></el-button>
                </el-input>
                <el-radio-group size="mini" style="margin-bottom:-10px;" class="ml-2">
                  <el-radio label="无"></el-radio>
                  <el-radio label="颜色"></el-radio>
                  <el-radio label="图片"></el-radio>
                </el-radio-group>
                <el-button size="mini" class="ml-auto" icon="el-icon-top"></el-button>
                <el-button size="mini" icon="el-icon-bottom"></el-button>
                <el-button size="mini">删除</el-button>
              </div>
              <div class="card-body">
                <div>
                  <el-button type="text" size="mini" icon="el-icon-plus">增加规格值</el-button>
                </div>
              </div>
            </div>
            <el-button type="success" size="mini">添加规格</el-button>
          </el-form-item>
          <el-form-item label="批量设置">
            <el-button type="text">销售价</el-button>
            <el-button type="text">市场价</el-button>
            <el-button type="text">成本价</el-button>
            <el-button type="text">库存</el-button>
            <el-button type="text">体积</el-button>
            <el-button type="text">重量</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="媒体设置">媒体设置</el-tab-pane>
      <el-tab-pane label="商品详情">商品详情</el-tab-pane>
      <el-tab-pane label="折扣设置">折扣设置</el-tab-pane>
    </el-tabs>
  </div>
</template>


<script type="text/javascript">
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tabIndex: 0,
      skus_type: 0,
      form: {},
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
      title: state => state.goods_create.skus_type,
      category: state => state.goods_create.category,
      dess: state => state.goods_create.dess,
      unit: state => state.goods_create.unit,
      stock: state => state.goods_create.stock,
      min_stock: state => state.goods_create.min_stock,
      display_stock: state => state.goods_create.display_stock,
      status: state => state.goods_create.status,
      express: state => state.goods_create.express
    })
  },
  components: {},
  methods: {
    ...mapMutations(["vModelState"]),
    vModel(key,value){
      this.vModelState[key] = value
    },
    //加载数据
    handleClick(tab, event) {
      console.log(tab.index);
    }
  },
  mounted() {
    console.log(this.test);
  }
};
</script>

<style scoped>
.create .el-form-item {
  margin-bottom: 10px;
}
</style>
