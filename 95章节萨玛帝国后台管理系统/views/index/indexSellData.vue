<template>
  <div class="indexSellData">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card indexSellData-card" shadow="never">
          <div slot="header" class="clearfix" style="line-height:20px">
            <div style="float:left">销售情况统计</div>

            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <div class="text item">
            <div slot="header" class="clearfix">
              <div v-for="(item, index) in 2" :key="index" class="yesterday-sell">
                <div class="yesterday-sell1">昨日订单</div>
                <div class="yesterday-sell2">
                  <p>订单量（件）12</p>
                  <p>订单金额（元）120</p>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix" style="line-height:20px">
            <div style="float:left">单日销售排名</div>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <div class="text item">
            <el-table :data="tableData" height="200" border style="width: 100%">
              <el-table-column type="index" label="#" width="50"></el-table-column>
              <el-table-column prop="info" label="商品信息"></el-table-column>
              <el-table-column prop="sell" label="销量" width="50"></el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      tableData: [
        {
          info: "美的空调",
          sell: "10"
        },
        {
          info: "美的空调",
          sell: "10"
        },
        {
          info: "美的空调",
          sell: "10"
        },
        {
          info: "美的空调",
          sell: "10"
        },
        {
          info: "美的空调",
          sell: "10"
        },
        {
          info: "美的空调",
          sell: "10"
        },
        {
          info: "美的空调",
          sell: "10"
        }
      ]
    };
  },
  components: {}
};
</script>

<style scoped>
.indexSellData >>> .el-card__header {
  /* border: 0; */
  /* padding: 0; */
}
.indexSellData >>> .el-card__body {
  /* padding: 0; */
}

.yesterday-sell {
  display: flex;
  align-items: center;
  border: 1px solid #dee2e6;
  margin-bottom: 20px;
}

.yesterday-sell1 {
  /* background-color: green; */
  padding: 24px;
  border-right: 1px solid #dee2e6;
  /* height: auto; */
  /* line-height: 40px; */
}
.yesterday-sell2 {
  text-align: left;
  flex: 1;
}
.yesterday-sell2 > p {
  padding-left: 10px;
  line-height: 30px;
}
.yesterday-sell2 > :first-child {
  border-bottom: 1px #dee2e6 solid;
}
.yesterday-sell p {
  /* background-color: green; */
  margin-bottom: 0;
  /* width: 100%; */
}
.indexSellData-card {
  /* height:50px; */
}

/* .yesterday-sell-2{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
} */
</style>

