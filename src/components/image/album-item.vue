<template>
  <div class>
    <li
      :class="{'active activeAlbums' :active}"
      class="list-group-item list-group-item-action d-flex align-items-center"
      style="cursor:pointer;"
      @click.stop="$emit('change',index)"
    >
      <span class="mr-auto">{{item.name}}</span>
      <span>
        <el-dropdown>
          <el-button size="mini" type="primary" class="album-el-button">
            {{item.num}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <!-- 修改删除功能 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.stop.native="$emit('edit',{item,index})">修改</el-dropdown-item>
            <el-dropdown-item @click.stop.native="$emit('del',index)">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </li>
  </div>
</template>

<script type="text/javascript">
export default {
  props:{
    active:{
      type:Boolean,
      default:false
    },
    item:Object,
    index:Number
  },
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>

</style>
