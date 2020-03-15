<template>
  <div id="index">
    <!-- 后台首页 -->
    <!-- 顶部导航 -->
    <index-top-bar></index-top-bar>
    <!-- 店铺、订单提示 | 统计图 -->
    <index-store-data></index-store-data>
    <!-- 销售情况统计和单排销售排名 -->
    <index-sell-data></index-sell-data>
  </div>
</template>

<script>
import indexTopBar from "views/index/indexTopBar";
import indexStoreData from "views/index/indexStoreData";
import indexSellData from "views/index/indexSellData";
export default {
  name: "Index",

  components: {
    indexTopBar,
    indexStoreData,
    indexSellData
  }
};
</script>

<style scope>

</style>