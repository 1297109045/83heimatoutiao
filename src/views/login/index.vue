<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!-- 表单 -->
  <el-form :model="loginForm" :rules="loginRules" stylt="margin-top:20px">
    <el-form-item prop="mobile">
      <!-- 手机号 -->
      <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
    </el-form-item>
     <el-form-item prop="code">
       <!-- 验证码 -->
      <el-input v-model="loginForm.code" style="width:65%" placeholder="请输入验证码"></el-input>
       <!-- 发送验证码 -->
      <el-button  style="float:right">发送验证码</el-button>
    </el-form-item>
    <el-form-item prop="agree">
       <!-- 同意选项 -->
      <el-checkbox v-model="loginForm.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
    </el-form-item>
    <el-form-item>
       <!-- 发送验证码 -->
      <el-button type="primary" style="width:100%">登录</el-button>
    </el-form-item>
  </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      value ? callback() : callback(new Error('您需要同意协议'))
    }
    return {
      loginForm: {
        moblie: '',
        code: '',
        agree: 'false'
      },
      loginRules: {
        mobile: [{ required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{ required: true, message: '请输入您的验证码' },
          { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        agree: [{ validator }]
      }
    }
  }

}
</script>

<style lang='less' scoped >
.login {
  background-image:url('../../assets/img/login_bg.jpg');
  height:100vh;
  background-size:cover;
  display:flex;
  justify-content:center ;
  align-items:center;
  .login-card{
    height:330px;
    width:440px;
    .title{
      text-align:center;
      img{
        height:45px
      }
    }
  }

}
</style>
