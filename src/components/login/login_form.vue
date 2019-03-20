<template>
  <Form ref="loginForm" :model="form" @keydown.enter.native="handleSubmit">
    <FormItem :error="accountError" :show-message="accountError!=null && accountError!=''">
      <Input v-model="form.userName" placeholder="请输入用户名" @on-blur="checkEmail">
      <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem :error="passwordError" :show-message="passwordError!=null && passwordError!=''">
      <Input type="password" v-model="form.password" placeholder="请输入密码" @on-blur="checkPwd">
      <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>

    <FormItem v-show="showAuthCode" :error="authCodeError" :show-message="authCodeError!=null && authCodeError!=''" class="auth-code">
      <Input v-model="form.authCode" placeholder="请输入验证码">
        <div class="append" slot="append">
          <span :style="{backgroundImage: 'url('+ authCodeImg +')'}" class="auth-img"/>
        </div>
      </Input>
      <a href="javascript:;" class="auth-tip" @click="changeVerifyCode">看不清，换一张？</a>
    </FormItem>

    <FormItem>
      <Button @click="handleSubmit" type="primary" long :loading="loading">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    name: 'LoginForm',
    data () {
      return {
        form: {
          userName: '',
          password: '',
          authCode: ''
        },
        showAuthCode:false,
        accountError:'',
        passwordError:'',
        authCodeError:'',
        loading:false,
        authCodeImg:''
      }
    },
    methods: {
      checkPwd(){
        if(this.form.password == ''){
          this.passwordError="密码不能为空"
          return false;
        }else{
          this.passwordError=""
          return true;
        }
      },
      checkEmail(){
        if(this.form.userName == ''){
          this.accountError="邮箱不能为空"
          return false;
        }else{
          this.accountError=""
          return true;
        }
      },
      clearErrorMessage(){
        this.accountError = ""
        this.passwordError = ""
        this.authCodeError = ""
      },
      changeVerifyCode(){
        if(this.showAuthCode){
          this.authCodeImg = process.env.API_ROOT + "authcode/verification.do?t=" + new Date().getTime()
        }
      },
      handleSubmit () {
        if(this.checkPwd() && this.checkEmail()){
          this.loading = true;
          let that = this;
          console.log(this.form.authCode)
          this.$emit('on-success-valid', {
            userName: that.form.userName,
            password: that.form.password,
            authCode: that.form.authCode
          }, function (err) {
            that.clearErrorMessage();
            that.showAuthCode = err.data.showAuthCode
            if(that.showAuthCode){
              that.authCodeImg = process.env.API_ROOT + "authcode/verification.do?t=" + new Date().getTime()
            }
            if(err.code == 10005 || err.code == 10008){//验证码错误
              that.authCodeError = err.message;
            }else if(err.code == 10003 || err.code == 10001 || err.code == 10004){//密码错误
              that.passwordError = err.message;
            }else{
              that.accountError = err.message;
            }
            that.loading = false;
          })
        }
      }
    }
  }
</script>
