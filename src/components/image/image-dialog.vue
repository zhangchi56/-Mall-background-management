<template>
  <div class>
    <el-dialog title="图片管理" :visible.sync="imageModel" width="80%" top="5vh">
      <el-container style="height:70vh;position:relative;margin:-30px -20px">
        <!-- 图片头部搜素区域 -->
        <el-header class="el-header border-bottom" style="line-height:60px">
          <div class="d-flex">
            <div class="el-header-right mr-auto">
              <el-select
                v-model="searchForm.order"
                class="el-select mr-2"
                placeholder="请选择活动区域"
                style="width:150px;"
                size="medium"
              >
                <el-option label="降序" value="desc"></el-option>
                <el-option label="升序" value="asc"></el-option>
              </el-select>
              <el-input
                class="mr-2"
                size="medium"
                style="width:150px;"
                placeholder="输入图片名称"
                v-model="searchForm.keyword"
              ></el-input>
              <el-button type="primary" size="medium">搜索</el-button>
            </div>
          </div>
        </el-header>

        <!-- 主要部分 -->
        <el-container style="overflow:auto;">
          <!-- 侧边栏相册 -->
          <el-aside width="200px" class="main-el-aside">
            <div class="container-el-aside">
              <ul class="list-group">
                <album-item
                  v-for="(item, index) in albums"
                  :key="index"
                  :item="item"
                  :index="index"
                  :active="albumIndex === index"
                  @change="albumChange"
                  :showOptions="false"
                ></album-item>
              </ul>
            </div>
          </el-aside>

          <!-- 主内容 -->
          <el-container style="overflow:auto">
            <el-main class="el-main">
              <el-row :gutter="10">
                <el-col
                  :span="24"
                  :lg="4"
                  :md="6"
                  :sm="8"
                  v-for="(item, index) in imageList"
                  :key="index"
                >
                  <el-card
                    class="box-card mb-3 position-relative"
                    :body-style="{'padding':'0'}"
                    style="cursor:pointer"
                  >
                    <div class="border" :class="{'border-danger':item.ischeck}">
                      <span
                        class="badge badge-danger"
                        style="position:absolute;right:0;top:0;"
                        v-if="item.ischeck"
                      >{{item.checkOrder}}</span>
                      <img
                        :src="item.url"
                        alt
                        class="w-100 text-white"
                        style="height:100px"
                        @click="choose(item)"
                      />
                      <div
                        class="w-100 text-white"
                        style="background:rgba(0,0,0,0.5);margin-top:-25px;position:absolute;"
                      >
                        <span class="small">{{item.name}}</span>
                      </div>
                      <div class="p-2 text-center">
                        <el-button-group>
                          <el-button
                            size="mini"
                            class="p-2"
                            icon="el-icon-view"
                            @click="previewImage(item)"
                          ></el-button>
                          <el-button
                            size="mini"
                            class="p-2"
                            icon="el-icon-edit"
                            @click="imageEdit(item,index)"
                          ></el-button>
                          <el-button
                            size="mini"
                            class="p-2"
                            icon="el-icon-delete"
                            @click="imageDel({index})"
                          ></el-button>
                        </el-button-group>
                      </div>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-container>

        <!-- 底部区域 -->
        <el-footer class="border-top d-flex align-items-center px-0">
          <div
            style="width: 200px; flex-shrink:0"
            class="h-100 d-flex align-items-center justify-content-center border-right"
          >
            <el-button-group>
              <el-button size="mini">上一页</el-button>
              <el-button size="mini">下一页</el-button>
            </el-button-group>
          </div>
          <div class="px-2">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            ></el-pagination>
          </div>
        </el-footer>
      </el-container>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 图片大图查看模态框 -->
    <el-dialog :visible.sync="previewModel" style="width:100%;">
      <div style="margin:-60px -20px -30px -20px">
        <img :src="previewUrl" style="width:100%;" />
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
import albumItem from "@/components/image/album-item.vue";

export default {
  props:{
    max: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      imageModel: false,
      callback: false,

      searchForm: {
        order: "",
        keyword: ""
      },
      albums: [],
      albumIndex: 0,

      imageList: [],
      previewModel: false,
      previewUrl: "",
      //选中的数组
      chooseList: [],
      currentPage: 1
    };
  },
  components: {
    albumItem
  },
  created() {
    //初始化相册目录
    this.__init();
  },
  methods: {
    chooseImage(callback) {
      this.unChoose()
      this.callback = callback;
      this.imageModel = true;
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

    hide() {
      this.imageModel = false;
      this.callback = false;
    },

    //初始化相册目录方法
    __init() {
      for (var i = 0; i < 20; i++) {
        this.albums.push({
          name: "相册" + i,
          order: 0,
          num: Math.floor(Math.random() * 100)
        });
      }

      for (var i = 0; i < 30; i++) {
        this.imageList.push({
          id: i,
          url:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582120046220&di=2cd7ea2d6cca3ada9f5c04d52802bab2&imgtype=0&src=http%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F359329137.jpeg",
          name: "图片" + i,
          ischeck: false,
          checkOrder: 0
        });
      }
    },
    //切换相册
    albumChange(index) {
      this.albumIndex = index;
    },

    //创建表单
    albumAdd() {
      this.albums.unshift({
        name: this.albumForm.name,
        order: this.albumForm.order,
        num: 0
      });
      console.log(this.albums);
    },
    //预览图片
    previewImage(item) {
      this.previewModel = true;
      this.previewUrl = item.url;
    },
    //修改图片
    imageEdit(item, index) {
      this.$prompt("请输入新名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: item.name,
        //用来动态验证
        inputValidator(val) {
          //这里的‘val’（第一个参数）就是输入的类容  element没说明！！！
          if (val === "") {
            return "图片名称不能为空";
          }
        }
      })
        .then(({ value }) => {
          //这里的value就是输入框输入的值
          item.name = value;
          this.$message({
            type: "success",
            message: "修改成功"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //删除图片
    imageDel(obj) {
      // console.log("iiiiiiiiiiiiiiii")
      this.$confirm(obj.all ? "是否删除选中图片" : "是否删除改图片?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log("1231321321312")
          if (obj.all) {
            // console.log("1231321321312")
            let list = this.imageList.filter(img => {
              return !this.chooseList.some(c => {
                return c.id === img.id;
              });
            });
            this.imageList = list;
            this.chooseList = [];
            console.log("删除选中");
          } else {
            console.log("1231321321312");
            this.imageList.splice(obj.index, 1);
          }

          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          console.log(item);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //选中图片
    choose(item) {
      //之前未选中
      if (!item.ischeck) {
        //限制选中数量
        if(this. chooseList.length >= this.max) {
          return this.$message({
            type: "warning",
            message: "最多选择"+this.max+"张图片"
          });
        }
        //加入选中图片
        this.chooseList.push({
          id: item.id,
          url: item.url
        });
        //计算序列号
        item.checkOrder = this.chooseList.length;
        //修改选中状态
        item.ischeck = !item.ischeck;
        return;
      }
      //取消选中
      //找到chooseList中的索引
      let i = this.chooseList.findIndex(v => v.id === item.id);
      console.log(i);
      if (i === -1) return;
      //重新计算序号
      let length = this.chooseList.length;
      //取消选中中间部分
      if (i + 1 < length) {
        //重新计算imageList 选中的序号
        for (var j = i; j < length; j++) {
          let no = this.imageList.findIndex(
            v => v.id === this.chooseList[j].id
          );
          if (no > -1) {
            this.imageList[no].checkOrder--;
          }
        }
      }
      //删除
      this.chooseList.splice(i, 1);
      //修改状态
      item.ischeck = false;
      //重置序号 发现这一步多余了
      // item.checkOrder = 0    //等出了问题在来解开这
    },
    //取消选中图片
    unChoose() {
      //找到选中的所有图片
      this.imageList.forEach(img => {
        let i = this.chooseList.findIndex(item => {
          return item.id === img.id;
        });

        if (i > -1) {
          //取消选中样式，选中排序归零
          img.ischeck = false;
          img.checkOrder = 0;
          //从chooseList中移出
          this.chooseList.splice(i, 1);
        }
      });
    },
    //分页点击
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style scoped>
</style>
