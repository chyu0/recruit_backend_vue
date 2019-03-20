<style lang="less">
  @import 'register.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎注册" :bordered="false">
        <div class="form-con">
          <register-form @on-success-valid="handleSubmit"></register-form>
          <p class="login-tip"><a href="/login">已有账号，立即登录</a></p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/register/register_form'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    RegisterForm
  },
  methods: {
    ...mapActions([
      'handleRegister'
    ]),
    handleSubmit ({ userName, password, resetPassword, authCode }, fail) {
      let that = this;
      this.handleRegister({
        userName,
        password,
        resetPassword,
        authCode
      }).then(function () {
        //注册成功直接跳转至首页
        that.$router.push({
          name:"home"
        });
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
