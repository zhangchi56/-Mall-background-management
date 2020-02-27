<template>
  <div class="border px-2 py-1 rounded mr-2 mb-2 position-relative d-flex align-items-center">
    <div class="d-flex align-items-center" v-if="type !== 0">
      <!-- 颜色选择器 -->
      <el-color-picker size="mini" v-if="type === 1"></el-color-picker>
      <!-- 图片选择器 -->
      <span class="btn btn-ligth border mr-2" v-else @click="chooseImage">
        <i class="el-icon-plus"></i>
      </span>
    </div>

    <input
      type="text"
      :value="item.name"
      class="form-control text-center border-0"
      style="width: 80px;font-size: 15px"
      @input="inputChange"
    />
          <!-- @input="updateSkuValue({cardIndex,valueIndex,test,$event})" -->
    <span class="btn btn-light p-0 position-absolute" style="line-height:1;right: -5px;top: -5px" @click="delSkuValue({cardIndex,valueIndex})">
      <i class="el-icon-circle-close"></i>
    </span>
  </div>
</template>

<script type="text/javascript">
import { mapMutations } from "vuex";
export default {
  inject: ['app'],
  props: {
    type: {
      type: Number,
      default: 0
    },
    valueIndex: Number,
    cardIndex:Number,
    item: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      test:"name"
    };
    
  },
  computed: {

  },
  methods: {
    ...mapMutations(["delSkuValue","updateSkuValue"]),
    inputChange(e){
      console.log(e.target.value)
    },
    vModel(key,value){
      this.updateSkuValue({
        cardIndex: this.cardIndex,
        valueIndex:this.index,
        key,
        value
      })
    },
    //选择图片
    chooseImage(){
      this.app.shooseImage((res)=>{
        console.log(res)
      })
    }
  },
  mounted() {
    // console.log(this.item.name)
  },
  updated() {
    // console.log(this.item.name)
  },
  components: {}
};
</script>

<style scoped>
</style>
