<template>
  <el-card>
    <!-- 面包屑 -->
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态:">
        <!-- v-model来源于 el-radio属性-->
        <el-radio-group @change="changeCondition" v-model="formData.status">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select @change="changeCondition" v-model="formData.channel_id" placeholder="请选择">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件选择:">
        <el-date-picker
          @change="changeCondition"
          v-model="formData.date"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <div class="total">共找到{{page.total}}条符合条件的内容</div>
    <div v-for="(item,index) in list" :key="index" class="article-item">
      <!-- 布局 -->
      <div class="left">
        <img :src="item.cover.images.length?item.cover.images[0]: defaultImg" alt />
        <div class="info">
          <span class="title">{{item.title}}</span>
          <el-tag :type="item.status | statusType" class="status">{{item.status | satausText}}</el-tag>
          <span class="data">{{item.pubdate}}</span>
        </div>
      </div>
      <div class="right">
        <span>
          <i class="el-icon-edit"></i>修改
        </span>
        <span>
          <i class="el-icon-delete"></i>删除
        </span>
      </div>
    </div>
    <el-row type="flex" justify="center" style="margin:10px">
      <el-pagination
        background
        @current-change="changePage"
        layout="prev, pager, next"
        :current-page="page.currentpage"
        :total="page.total"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        status: 5,
        channel_id: null,
        date: []
      },
      list: [],
      defaultImg: require('../../assets/img/a.jpg'),
      channels: [],
      page: {
        totla: 0,
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage
      this.queryArticles()
    },
    queryArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status, // 状态为5
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.date.length ? this.formData.date[0] : null, // 开始时间
        end_pubdate:
          this.formData.date.length > 1 ? this.formData.date[1] : null, // 结束时间
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      this.getArticles(params)
    },
    changeCondition () {
      this.page.currentpage = 1
      // 只改变是formdata已经是最新的值
      //   组装请求参数
      this.queryArticles()
    },
    //   获取频道列表
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },

    getArticles (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results // 获取文章列表
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  },
  //   过滤器
  filters: {
    satausText (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        case 4:
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'dange'
        case 4:
          return 'danger'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.total {
  border-bottom: 1px dashed #ccc;
  height: 50px;
  line-height: 50px;
}
.article-item {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  border-bottom: 1px solid #f2f3f5;
  .left {
    display: flex;
    img {
      width: 180px;
      height: 100px;
      border-radius: 4px;
    }
    .info {
      display: flex;
      height: 100px;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 10px;
      .title {
        font-size: 14px;
      }
      .status {
        width: 60px;
        text-align: convert;
      }
      .data {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .right {
    font-size: 12px;
    span {
      margin-right: 8px;
    }
  }
}
</style>
