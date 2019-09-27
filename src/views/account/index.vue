<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">账户信息</template>
      </bread-crumb>
      <!-- 表单 -->
      <el-form ref="accountform" :model="formData" :rules="accountRules" style="margin-left:60px" label-width="100px">
          <el-form-item prop="name" label="用户名">
              <el-input v-model="formData.name" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="简介">
              <el-input v-model="formData.intro" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
              <el-input v-model="formData.email" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item  label="手机号">
              <!-- 手机号不能修改 -->
              <el-input v-model="formData.mobile" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item >
              <el-button @click="saveUser" type="primary">保存信息</el-button>
          </el-form-item>

      </el-form>
      <img class="head-img" :src="formData.photo?formData.photo: defaultImg" alt="" srcset="">
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/a.jpg'),
      formData: {

      },
      accountRules: {
        name: [{ required: true, message: '用户名不能为空' }, {
          min: 1, max: 7, message: '用户名不能为空'
        }],
        email: [{ required: true, message: '邮箱不能为空' }, { pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '不能为空' }]
      }

    }
  },
  methods: {
    // 保存用户个人信息
    saveUser () {
      this.$refs.accountform.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            // 成功提示消息
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    },
    // 获取用户个人信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
.head-img{
    height: 200px;
    width: 200px;
    border-radius: 50%;
    position: absolute;
    right:400px;
    top:200px
}
</style>
