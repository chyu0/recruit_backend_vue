<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip"><a href="javascript:;">忘记密码</a>|<a href="/register">立即注册</a></p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login/login_form'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit ({ userName, password, authCode }, fail) {
      let that = this;
      this.handleLogin({
        userName,
        password,
        authCode
      }).then(function () {
        var query = that.$route.query
        if(query && query.returnUrl && query.returnUrl!=""){
          window.location.href = query.returnUrl
        }else{
          that.$router.push({
            name:"home"
          });
        }
      }, function (err) {
        if(err && err.code && typeof fail == 'function'){
          fail(err);
        }
      })
    }
  },
  computed: {
    ...mapState({
      token : state => state.user.token
    })
  }
}
</script>

<style>

</style>
