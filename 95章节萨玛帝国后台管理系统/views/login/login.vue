<template>
  <div id="login">
    <div class="row">
      <div class="col-12 col-sm-8 col-md-6 col-lg-4 border m-auto">
        <div class="login-card card row">
          <div class="card-header">
            <div class="text-center">
              <h3>{{$conf.login}}</h3>
            </div>
          </div>
          <div class="card-body">
            <el-form :rules="rules" ref="form" :model="form">
              <el-form-item prop="username">
                <el-input v-model="form.username" type="text" placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="login-submit"
                  type="primary"
                  @click="submitForm('form')"
                  size="small"
                >提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.axios
            .post("/admin/login", this.form)
            .then(res => {
              console.log(res);
              //储存到vuex
              this.$store.commit("login",res.data.data);
              //储存到本地储存
              //成功提示
                this.$message("登录成功");
              //跳转到首页
              this.$router.push("/index");
            })
            .catch(err => {
              if (err.response.data && err.response.data.errorCode) {
                this.$message.error(err.response.data.msg);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scope>
#login {
  /* display:flex; */
  /* justify-content: center; */
  /* align-items: center; */
  margin: auto;
}

#login .login-title {
  border-bottom: 1px #dee2e6 solid;
  padding: 10px 0;
}
#login .login-submit {
  /* width: 500px; */
  width: 100%;
}
#login .login-card {
  border: 0;
}
</style>