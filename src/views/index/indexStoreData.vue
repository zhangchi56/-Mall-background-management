<template>
  <div id="indexStoreData">
    <!-- 店铺及商品提示 -->
    <el-row :gutter="20" class="d-flex">
      <el-col :span="12" class="index-store">
        <el-card
          v-for="(item, index) in tips"
          :key="index"
          class="box-card index-store-tip"
          shadow="never"
        >
          <div slot="header" class="clearfix" style="line-height:20px">
            <div style="float:left">{{item.title}}</div>
            <el-button style="float: right; padding: 3px 0" type="text">{{item.desc}}</el-button>
          </div>
          <el-row :gutter="10">
            <el-col
              :span="item.list.length|listNum"
              v-for="(listItem, index) in item.list"
              :key="index"
            >
              <el-card
                shadow="never"
                class="box-card index-box-card"
                style="line-height:10px;background;"
              >
                <h5>{{listItem.value}}</h5>
                <div style="font-size:small;color:#606266">{{listItem.name}}</div>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
        <!-- 交易提示 -->
      </el-col>
      
      <!-- 统计图 -->
      <el-col :span="12">
        <el-card class="box-card" style="height:370px" shadow="never">
          <div slot="header" class="clearfix" style="line-height:20px">
            <div style="float:left"></div>
            <el-button style="float: right; padding: 3px 0" type="text"></el-button>

            <!-- 统计图表 -->
            <div ref="myChart" style="width:100%;height:270px;"></div>
            
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'    
// import mpvueEcharts from 'mpvue-echarts'     

export default {
  data() {
    return {
      tips: [
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" }
          ]
        },
        {
          title: "店铺及商品提示",
          desc: "需要关注的店铺信息及待处理事项",
          list: [
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" },
            { name: "出售中", value: "64" }
          ]
        }
      ],
      option: {
        tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
      }
    };
  },
  mounted() {
    //画统计图
    this.drawLine();
  },
  methods: {
    //统计图方法
    drawLine() {
      var myChart = echarts.init(this.$refs.myChart);
      myChart.setOption(this.option);
    }
  },
  filters: {
    listNum(val) {
      return 24 / val;
    }
  }
};
</script>

<style scope>
/* 样式穿透无效？？？？ */
/* #indexStoreData >>> .el-card__body{ */
/* padding:0 !important; */
/* } */
#indexStoreData{
  padding-bottom:20px;
}
.index-store {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.index-deal-tip-item:hover {
  background-color: #cccccc;
}
</style>

<style>
#indexStoreData .index-box-card .el-card__body {
  padding: 10px;
}
#indexStoreData .index-deal-tip-item .el-card__body {
  padding: 10px;
}
</style>