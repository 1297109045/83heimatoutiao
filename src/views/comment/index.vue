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
            <!-- 作用域插槽接收el-table-cloumn row/... -->
            <template slot-scope="obj">
            <el-button  size="small" type="text">修改</el-button>
            <el-button :style="{color:obj.row.comment_status?'#E6A23C':'#409EFF'} " @click="closeOpen(obj.row)" size="small" type="text">
              {{
                obj.row.comment_status?'关闭评论':'打开评论'
              }}
              </el-button>
               </template>
          </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" style="margin:20px">
      <el-pagination @current-change="changePage" :page-size="page.pageSize" :current-page="page.currentPage" background layout="prev, pager, next" :total="page.total"></el-pagination>

      </el-row>

  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0, // 总页数
        pageSize: 10, // 一页多少条
        currentPage: 1// 默认第一页

      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage// 更新最新页码给currentpage
      this.getComment()
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment', page: this.page.currentPage, per_page: this.page.pageSize }// params是路径参数也是query
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    closeOpen (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你确定要${mess}评论`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        })
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
