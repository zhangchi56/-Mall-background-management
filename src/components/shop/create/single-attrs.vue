<template>
  <el-form ref="form" :model="form" label-width="80px" style="width:300px">
    <el-form-item label="市场价格">
      <el-input type="number" :value="oprice" @input="vModel('oprice',$event)">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input type="number" :value="pprice" @input="vModel('pprice',$event)">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="成本价格">
      <el-input type="number" :value="cprice" @input="vModel('cprice',$event)">
        <template slot="append">元</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品重量">
      <el-input type="number" :value="weight" @input="vModel('weight',$event)">
        <template slot="append">公斤</template>
      </el-input>
    </el-form-item>
    <el-form-item label="商品体积">
      <el-input type="number" :value="volume" @input="vModel('volume',$event)">
        <template slot="append">立方米</template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script type="text/javascript">
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {},
      value: []
    };
  },
  computed: {
    ...mapState({
      oprice: state => state.goods_create.oprice,
      pprice: state => state.goods_create.pprice,
      cprice: state => state.goods_create.cprice,
      weight: state => state.goods_create.weight,
      volume: state => state.goods_create.volume
    })
  },
  methods: {
    ...mapMutations(["vModelState"]),
    vModel(key, value) {
      console.log(value);
      this.vModelState({ key, value });
      
      // console.log(value);
    }
  }
};
</script>

<style scoped>
</style>
