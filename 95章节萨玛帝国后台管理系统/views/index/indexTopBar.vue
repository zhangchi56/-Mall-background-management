<template>
  <div id="indexTopBar" class="">
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item, index) in counts" :key="index">
        <el-card shadow="hover">
          <div class="index-el-card">
            <i :class="[item.icon,item.color]"></i>
            <div class="desc" style="overflow:hidden;">
              <h4 style="text-align: center;">{{item.num}}</h4>
              <small style="white-space: nowrap; text-overflow: ellipsis; overflow:hidden;">{{item.desc}}</small>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "IndexTopBar",
  data() {
    return {
      counts: [
        {
          icon: "el-icon-user-solid",
          desc: "关注个数（个）",
          num: "30",
          color: "bg-primary"
        },
        {
          icon: "el-icon-s-finance",
          desc: "订单总数（笔）",
          num: "120",
          color: "bg-success"
        },
        {
          icon: "el-icon-s-order",
          desc: "今日订单总金额（元）",
          num: "4183.80",
          color: "bg-danger"
        },
        {
          icon: "el-icon-s-data",
          desc: "本月销量（笔）",
          num: "132",
          color: "bg-warning"
        }
      ]
    };
  }
};
</script>

<style scope>
#indexTopBar{
  margin: 20px 0;
}
.index-el-card {
  display: flex;
  align-items: center;
}
.index-el-card > i {
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: white;
  font-size: 40px;
}

.index-el-card > .desc {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
}
.index-el-card > .desc > h4 {
  margin-bottom: 0;
}
.index-el-card > .desc > small {
  /* height:40px; */
  line-height: 20px;
  color: #606266;
}
</style>