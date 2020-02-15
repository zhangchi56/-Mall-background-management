<template>
  <div id="index">
    <!-- 后台首页 -->
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="index-el-card">

            <i class="el-icon-user-solid"></i>

            <div class="desc">
              <h4 style="text-align: center;">30</h4>
              <small>关注人数（个）</small>
            </div>

          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">鼠标悬浮时显示</el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">鼠标悬浮时显示</el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">鼠标悬浮时显示</el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {};
  }
};
</script>

<style scope>
.index-el-card {
  display: flex;
  background-color: pink;
  justify-content: center;
  align-items: center;
  /* text-align: left; */
  
}
.index-el-card>i{
  width: 40px;
  height: 40px;
  line-height: 40px;
  color: blue;
  font-size: 24px;
}

.index-el-card>.desc{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* flex-wrap: wrap; */
  /* width: 40px; */
  /* height:40px; */
  /* line-height: 40px; */
}
.index-el-card>.desc>h4{
  /* height:40px; */
  /* line-height: 40px; */
  margin-bottom: 0;
}
.index-el-card>.desc>small{
  height:40px;
  line-height: 40px;
}


</style>