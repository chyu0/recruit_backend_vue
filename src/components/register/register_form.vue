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

    <FormItem :error="resetPasswordError" :show-message="resetPasswordError!=null && resetPasswordError!=''">
      <Input type="password" v-model="form.resetPassword" placeholder="请输入确认密码" @on-blur="checkResetPwd">
      <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>

    <FormItem :error="authCodeError" :show-message="authCodeError!=null && authCodeError!=''" class="auth-code">
      <Input v-model="form.authCode" placeholder="请输入验证码" @on-blur="checkAuthCode">
      <div class="append" slot="append">
        <span :style="{backgroundImage: 'url('+ authCodeImg +')'}" class="auth-img"/>
      </div>
      </Input>
      <a href="javascript:;" class="auth-tip" @click="changeVerifyCode">看不清，换一张？</a>
    </FormItem>

    <FormItem>
      <Button @click="handleSubmit" type="primary" long :loading="loading">立即注册</Button>
    </FormItem>
  </Form>
</template>
<script>
  export default {
    name: 'RegisterForm',
    data () {
      return {
        form: {
          userName: '',
          password: '',
          resetPassword: '',
          authCode: ''
        },
        accountError:'',
        passwordError:'',
        resetPasswordError:'',
        authCodeError:'',
        loading:false,
        authCodeImg: process.env.API_ROOT + "authcode/verification.do?t=" + new Date().getTime()
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
      checkResetPwd(){
        if(this.form.password == ''){
          this.resetPasswordError="确认密码不能为空"
          return false;
        }else if(this.form.password != this.form.resetPassword){
          this.resetPasswordError="密码和确认密码不一致"
          return false;
        }else{
          this.resetPasswordError=""
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
      checkAuthCode(){
        if(this.form.authCode == ''){
          this.authCodeError="验证码不能为空"
          return false;
        }else{
          this.authCodeError=""
          return true;
        }
      },
      changeVerifyCode(){
        this.authCodeImg = process.env.API_ROOT + "authcode/verification.do?t=" + new Date().getTime()
      },
      handleSubmit () {
        if(this.checkEmail() && this.checkPwd() && this.checkResetPwd() && this.checkAuthCode()){
          this.loading = true;
          let that = this;
          console.log(this.form.authCode)
          this.$emit('on-success-valid', {
            userName: that.form.userName,
            password: that.form.password,
            resetPassword: that.form.resetPassword,
            authCode: that.form.authCode
          }, function (err) {
            if(err.code == 10003 || err.code == 10007){//验证码错误
              that.authCodeError = err.message;
            }else if(err.code == 10001 || err.code == 10006){//密码错误
              that.passwordError = err.message;
            }else if(err.code == 10004){
              that.resetPassword = err.message;
            }else{
              that.accountError = err.message;
            }
            //失败刷新验证码图片
            that.authCodeImg = process.env.API_ROOT + "authcode/verification.do?t=" + new Date().getTime()
            that.loading = false;
          })
        }
      }
    }
  }
</script>
