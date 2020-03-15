<template>
  <div class="index">
    <el-container class="main-el-container">
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

          <div class="el-header-left">
            <el-button type="warning" size="medium" @click="unChoose" v-if="chooseList.length">取消选中</el-button>
            <el-button
              type="danger"
              size="medium"
              @click="imageDel({all:true})"
              v-if="chooseList.length"
            >批量删除</el-button>
            <el-button type="primary" size="medium" @click="openAlbumModel()">创建相册</el-button>
            <el-button type="primary" size="medium" @click="uploadModel = true">上传图片</el-button>
          </div>
        </div>
      </el-header>

      <!-- 主要部分 -->
      <el-container>
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
                @edit="openAlbumModel"
                @del="albumDel"
              ></album-item>
            </ul>
          </div>
        </el-aside>

        <!-- 主内容 -->
        <el-container>
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

    <!-- 修改|创建相册模态框 -->
    <el-dialog :title="albumModelTitle" :visible.sync="albumModel">
      <el-form ref="form" :model="albumForm" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="albumForm.name" size="medium" placeholder="请输入相册名称"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number v-model="albumForm.order" size="medium" :min="0"></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="padding:0">
        <el-button @click="albumModel = false">取 消</el-button>
        <el-button type="primary" @click="confirmAlbumModel">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 上传图片模态框 -->
    <el-dialog title="上传图片" :visible.sync="uploadModel">
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>

      <div slot="footer" class="dialog-footer">
        <el-button @click="createModel = false">取 消</el-button>
        <el-button type="primary" @click="createModel = false">确 定</el-button>
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
  data() {
    return {
      searchForm: {
        order: "",
        keyword: ""
      },
      albums: [],
      albumIndex: 0,
      albumModel: false,
      albumEditIndex: -1,
      albumForm: {
        name: "",
        order: 0,
        index: Number
      },
      uploadModel: false,
      previewModel: false,
      previewUrl: "",
      imageList: [],
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
  computed: {
    albumModelTitle() {
      console.log(this.albumEditIndex);
      return this.albumEditIndex > -1 ? "修改相册" : "创建相册";
    }
  },
  methods: {
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
    //打开相册修改或者创建框
    openAlbumModel(obj) {
      //修改表单
      if (obj) {
        let { item, index } = obj;
        this.albumForm.name = item.name;
        this.albumForm.order = item.order;
        this.albumEditIndex = index;

        //打开模态框
        return (this.albumModel = true);
      }

      //创建表单
      this.albumForm = {
        name: "",
        order: 0
      };
      this.albumEditIndex = -1;
      this.albumModel = true;
    },

    // 点击确定修改或者创建相册
    confirmAlbumModel() {
      //判断是否是修改表单    >1创建表单
      if (this.albumEditIndex > -1) {
        this.albumEdit();
        return (this.albumModel = false);
      }
      this.albumAdd();
      return (this.albumModel = false);
    },
    //修改相册
    albumEdit() {
      this.albums[this.albumEditIndex].name = this.albumForm.name;
      this.albums[this.albumEditIndex].order = this.albumForm.order;
      // console.log(this.albums[this.albumEditIndex].name);

      // this.$set(this.albums[this.albumEditIndex],'name',this.albumForm.name)
      // this.$set(this.albums[this.albumEditIndex].'order',this.albumForm.order)
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

    //删除相册
    albumDel(index) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.albums.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
.el-header,
.el-footer {
  background-color: #b3c0d1;
  /* color: #333; */
  text-align: center;
  line-height: 0px;
}
.main-el-container {
  position: absolute;
  top: 56px;
  bottom: 0;
  left: 0;
  right: 0;
}
.main-el-aside {
  position: absolute;
  top: 60px;
  bottom: 60px;
  left: 0;
  right: 200px;
  line-height: 20px;
}
.el-main {
  position: absolute;
  top: 60px;
  bottom: 60px;
  left: 200px;
  right: 0;
  display: flex;
}
.el-header {
  background-color: #f8f9fa;
  /* display: flex; */
  /* justify-content: space-between; */
}

.container-el-aside .list-group-item:first-child {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
}
/* .activeAlbums { */
/* color: #409eff !important;
  background-color: white !important;
  border-color: #c2e7b0 !important; */
/* } */
</style>
