<template>
  <div class>
    <el-dialog title="商品规格选择" :visible.sync="createModel" width="80%" top="5vh">
      <el-container style="height:70vh;position:relative;margin:-30px -20px">
        <!-- 主要部分 -->
        <el-container style="overflow:auto;">
          <!-- 侧边栏相册 -->
          <el-aside width="200px" class="main-el-aside">
            <ul class="list-group">
              <li
                class="list-group-item list-group-item-action"
                v-for="(item, index) in skusList"
                :class="skusIndex === index ? 'sum-active' : ''"
                :key="index"
                @click="changeSku(index)"
              >{{item.name}}</li>
            </ul>
          </el-aside>

          <!-- 主内容 -->
          <el-container style="overflow:auto">
            <el-header
              style="height:60px;background:white;text-align:left"
              class="border-top border-bottom"
            >
              <el-button type="primary" size="mini">全选</el-button>
            </el-header>
            <!-- 主内容 -->
            <el-main class="el-main">
              <span
                class="border rounded py-1 px-2 m-1"
                style="cursor: pointer"
                v-for="(item, index) in skuItems"
                :key="index"
                :class="item.ischeck ? 'sum-active' : ''"
                @click="choose(item)"
              >{{item.name}}</span>
            </el-main>
          </el-container>
        </el-container>

        <!-- 底部区域 -->
      </el-container>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      createModel: false,
      callback: false,

      //选中的数组
      chooseList: [],
      currentPage: 1,

      //数据
      skusIndex: 0,
      skusList: [
        {
          name: "颜色",
          type: 0, //规格类型 0无 1颜色 2图片
          list: [
            {
              id: 1,
              name: "黄色",
              image: "",
              color: "",
              ischeck: false
            },
            {
              id: 2,
              name: "红色",
              image: "",
              color: "",
              ischeck: false
            },
            {
              id: 3,
              name: "绿色",
              image: "",
              color: "",
              ischeck: false
            }
          ]
        },
        {
          name: "规格",
          type: 0, //规格类型 0无 1颜色 2图片
          list: [
            {
              id: 4,
              name: "xl",
              image: "",
              color: "",
              ischeck: false
            },
            {
              id: 5,
              name: "xxl",
              image: "",
              color: "",
              ischeck: false
            },
            {
              id: 6,
              name: "xxxl",
              image: "",
              color: "",
              ischeck: false
            }
          ]
        }
      ]
    };
  },
  components: {},
  computed: {
    skuItems() {
      return this.skusList[this.skusIndex].list;
    }
  },
  created() {},
  methods: {
    //打开弹出层
    chooseSkus(callback) {
      this.callback = callback;
      this.createModel = true;
    },
    //确定
    confirm() {
      // 选中的图片url
      if (typeof this.callback === "function") {
        this.callback(this.chooseList);
      }

      //隐藏
      this.hide();
    },
    //关闭弹出层
    hide() {
      this.createModel = false;
      this.callback = false;
    },
    //切换规格卡片
    changeSku(index) {
      this.skusIndex = index;
    },
    //选择规格属性
    choose(item) {
      //之前没有选中
      if(!item.ischeck){
        //加入选中列表
        this.chooseList.push(item)
        //修改选中的状态
        return item.ischeck = true
      }
      //之前选中
      let index = this.chooseList.findIndex(v => {
        return v.id === item.id
      })
      //找不到
      if(index < 0) return;
      //从选中列表中移出
      this.chooseList.splice(index,1)
      //修改选中状态
      item.ischeck = false
    }
  }
};
</script>

<style scope>
.sum-active {
  background-color: #409eff;
  color: #ffffff;
}
</style>
