<template>
  <el-row type="flex" class="layout-header" justify="space-between">
    <el-col :span="8">
      <i class="el-icon-s-unfold "></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" >
      <img class="header-img" :src="userInof.photo?userInof.photo:defaultImg" alt />
      <el-dropdown @command="commonClick" trigger="click">
        <span class="el-dropdown-link ">
          {{userInof.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account" icon="el-icon-plus">账户信息</el-dropdown-item>
          <el-dropdown-item command="git" icon="el-icon-circle-plus">狮子头</el-dropdown-item>
          <el-dropdown-item command="lgout" icon="el-icon-circle-plus-outline">退出</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInof: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { 'Authorization': `Bearer ${token}` }
      }).then(result => {
        this.userInof = result.data.data
      })
    },
    commonClick (key) {
      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com/1297109045/83heimatoutiao.git'
      } else {
        window.localStorage.clear() // 只能清除本项目的所有前端缓存
        this.$router.push('/login') // 跳转到登录页
      }
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style lang="less" scoped>
.layout-header{
    height: 50px;
    width:1600px;
    .header-img{
        height:40px;
        border-radius:50%;
        vertical-align:bottom;

    }
}
</style>
