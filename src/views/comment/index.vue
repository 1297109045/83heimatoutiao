<template>
  <el-card>
      <!-- 面包屑组件 -->
      <bread-crumb slot="header">
        <template slot="title">评论列表</template>
      </bread-crumb>
      <!-- 表格data属性是一个对象数组 -->
      <el-table :data="list">
          <!-- 列 属性prop键名 -->
          <el-table-column width="600px" label="标题" prop="title"></el-table-column>
          <el-table-column :formatter="stateFormatter" align="center" label="评论状态" prop="comment_status"></el-table-column>
          <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
          <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
          <el-table-column align="center" label="操作" >
            <el-button size="small" type="text">修改</el-button>
            <el-button size="small" type="text">关闭</el-button>
          </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }// params是路径参数也是query
      }).then(result => {
        this.list = result.data.results
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常 ' : '关闭'
    }

  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
