<template>
  <div class="indexSellData">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card indexSellData-card" shadow='never'>
          <div slot="header" class="clearfix">

            <div class="yesterday-sell">
              <div>
                昨日订单
              </div>
              <div>
                <p>订单量（件）12</p>
                <p>订单金额（元）120</p>
              </div>
            </div>
            
          </div>
          <div class="text item"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card" shadow='never'>
          <div slot="header" class="clearfix">
            <span>卡片名称</span>
          </div>
          <div class="text item"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
.indexSellData>>>.el-card__header{
  border: 0;
  padding: 0;
}
.indexSellData>>>.el-card__body{
  padding: 0;
}

.yesterday-sell{
  display: flex;
  align-items: center;
  height: 100%;
  
}
.yesterday-sell>:first-child{
  background-color: green;
}
.yesterday-sell>:last-child>p{
  text-align: left;
}
.yesterday-sell p{
  /* background-color: green; */
  margin-bottom: 0;
}
.indexSellData-card{
  height:50px;
}

/* .yesterday-sell-2{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
} */
</style>

<style>
  /* .indexSellData .el-card__header{
  border: 0;
  padding:0;
} */
</style>
