<template>
  <el-form :model="loginForm" :rules="fieldRules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <span class="tool-bar"></span>
    <h2 class="title" style="padding-left:22px;">系统登录</h2>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <!-- <el-form-item> -->
      <!-- <el-col :span="12"> -->
        <!-- <el-form-item prop="captcha"> -->
          <!-- <el-input type="test" v-model="loginForm.captcha" auto-complete="off" placeholder="验证码, 单击图片刷新" style="width: 100%;"> -->
          <!-- </el-input> -->
        <!-- </el-form-item> -->
      <!-- </el-col> -->
      <!-- <el-col class="line" :span="1">&nbsp;</el-col> -->
      <!-- <el-col :span="11"> -->
        <!-- <el-form-item> -->
          <!-- <img style="width: 100%;" class="pointer" :src="loginForm.src" @click="refreshCaptcha"> -->
        <!-- </el-form-item> -->
      <!-- </el-col> -->
    <!-- </el-form-item> -->
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:48%;" @click.native.prevent="reset">重 置</el-button>
      <el-button type="primary" style="width:48%;" @click.native.prevent="login" :loading="loading">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Cookies from "js-cookie"
  import qs from "qs"
  import axios from "axios"
  // import mock from "@/mock/index"
  export default {
    name: 'Login',
    data() {
      return {
        loading: false,
        loginForm: {
          username: 'zhaodanping',
          password: '123',
          captcha: '',
          src: ''
        },
        fieldRules: {
          username: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        checked: true
      }
    },
    methods: {
      login() {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            let _this = this
               this.loading = true
               let userInfo = {
                 username: this.loginForm.username,
                 password: this.loginForm.password
                 // captcha: this.loginForm.captcha
               }
               let userValue = qs.stringify(userInfo)
                console.log(userValue)
                // http://10.89.138.133:9091/ http://192.168.139.10:9011
                // axios.post('http://10.89.138.145:9091/login',
                // axios.post('http://192.168.139.10:9011/login',  
               // axios.post('http://10.217.1.31:8080/login',
               // axios.post('http://10.89.138.133:9011/login',
               axios.post('http://192.168.139.17:9091/login',
               // axios.post('/login',
                 userValue,
                 // {
                 //   headers: {'Content-Type':'application/json;charset=UTF-8'}
                 // }
               ).then((res) => {
                 console.log(res)
                 if (res.data.code == '00') { // 添加1
                   Cookies.set('token', res.data.responseBody.token) // 放置token到Cookie // 添加2
                   sessionStorage.setItem('user', userInfo.username) // 保存用户到本地会话
                   this.$store.commit('menuRouteLoaded', false) //要求重新加载导航菜单
                   this.$router.push('/') // 登录成功，跳转到主页
                 } else {
                   this.$message({
                     message: res.data.message,
                     type: 'error'
                   })
                 }
                 this.loading = false
               }).catch(function(error) {
                 console.log('catch')
                 this.$message({ message: res.data.message, type: 'error' })
               })
          }
        })

      },
      refreshCaptcha: function() {
        this.loginForm.src = this.global.baseUrl + "captcha.jpg?t=" + new Date().getTime();
      },
      reset() {
        this.$refs.loginForm.resetFields()
      }
    },
    mounted() {
      // this.refreshCaptcha()
    }
  }
</script>

<style lang="scss" scoped>
  .login-container {
    position:absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    height: 100%;
    max-height: 240px;
    overflow-y: auto;
    overflow-x: hidden;
    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: #505458;
    }
  }
</style>
