<template>
  <el-form-item label="规格设置">
    <table class="table table-md table-bordered">
      <thead>
        <tr>
          <th
            scope="col"
            class="text-center"
            style="vertical-align:middle"
            v-for="(th, thi) in tableThs"
            :key="thi"
            :rowspan="th.rowspan"
            :colspan="th.colspan"
          >{{th.name}}</th>
        </tr>
        <tr>
          <th
            scope="col"
            class="text-center"
            style="vertical-align:middle"
            v-for="(th, thi) in skuLabels"
            :key="thi"
            rowspan="1"
            colspan="1"
          >{{th.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <!-- 商品规格 -->
          <th scope="row" v-for="(sku, skuI) in item.skus" :key="skuI">{{sku.name}}</th>
          <td>{{item.image}}</td>
          <td>{{item.pprice}}</td>
          <td>{{item.oprice}}</td>
          <td>{{item.cprice}}</td>
          <td>{{item.stock}}</td>
          <td>{{item.volume}}</td>
          <td>{{item.weight}}</td>
          <td>{{item.code}}</td>
        </tr>
      </tbody>
    </table>
  </el-form-item>
</template>

<script type="text/javascript">
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["tableThs", "tableData", "skuLabels"]),
    ...mapState({
      sku_card: state => state.goods_create.sku_card
    })
  },
  mounted() {
    // console.log(this.tableData);
  },
  components: {}
};
</script>

<style scoped>
</style>
