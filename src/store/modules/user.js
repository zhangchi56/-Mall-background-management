export default {
  state: {
    user:{

    },
    token:false
  },
  mutations: {
    //登录
    login(state,user){
      //保存登录状态
      state.user = user
      state.token = user.token
      //储存到本地储存
      window.sessionStorage.setItem('user',JSON.stringify(state.user))
      window.sessionStorage.setItem('token',JSON.stringify(state.token))
    }
  },
  actions: {
  }
}