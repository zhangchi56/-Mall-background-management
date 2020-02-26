import $Util from '@/common/util.js'
export default {
  state: {
    skus_type:0, //sku类型 0单一 1多规格
    title: "",
    category: [],
    desc: "",
    unit: "", //单位
    stock: 0,  //总库存
    min_stock: 0, //库存预警
    stock_display: 0,  //库存显示 0单一 1多规格
    status: 0,  //是否上架  0仓库 1上架
    express: "", //运费模板

    oprice:0, //市场价格
    pprice:0, //销售价格
    cprice:0, //成本价格
    weight:0, //重量
    volume:0,  //体重

    sku_card:[
      {
        name:"颜色",
        type:0,   //规格类型 0无 1颜色 2图片
        list: [{
          name:"黄色",
          image: "",
          color: ""
        },{
          name:"红色",
          image: "",
          color: ""
        },{
          name:"绿色",
          image: "",
          color: ""
        },]
      },
      {
        name:"颜色",
        type:0,   //规格类型 0无 1颜色 2图片
        list: [{
          name:"黄色",
          image: "",
          color: ""
        },{
          name:"红色",
          image: "",
          color: ""
        },{
          name:"绿色",
          image: "",
          color: ""
        },]
      }
    ],
  },
  getters: {

  },
  mutations: {
    // 修改state
    vModelState(state,{key,value}){
      state[key] = value
    },
    //增加规格卡片
    addSkuCard(state){
      state.sku_card.push({
        name:"规格名称",
        type:0,
        list:[]
      })
    },
    //删除规格卡片
    delSkuCard(state,index){
      state.sku_card.splice(index,1)
    },
    //修改卡片
    vModelSkuCard(state,{key,index,value}){
      state.sku_card[index][key] = value
    },
    //规格卡片排序
    sortSkuCard(state,{action,index}){
      //上下移卡片
      $Util[action](state.sku_card,index)
    },
    //增加指定规格卡片的规格属性
    addSkuValue(state,index){
      console.log(index)
      state.sku_card[index].list.push({
        name:"规格名称",
        image: "",
        color: ""
      })
    },
    //删除指定规格卡片的规格属性
    delSkuValue(state,{cardIndex,valueIndex}){
      state.sku_card[cardIndex].list.splice(valueIndex,1)
    },
    //修改指定规格卡片的规格属性
    updateSkuValue(state,{cardIndex,valueIndex,key,value}){
      state.sku_card[cardIndex].list[valueIndex][key] = value
    }
  },
  actions: {

  }
};
