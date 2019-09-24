<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            素材管理
        </template>
      </bread-crumb>
      <el-tabs v-model="activeName" @tab-click=" changeType ">
    <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
            <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="">
            <div class="operate">
                <i :style='{color:item.is_collected?"red":"#000"}' class="el-icon-star-on"></i>
                <i class="el-icon-delete-solid"></i>
            </div>

        </el-card>
        </div>
      <el-row type="flex" justify="center" style="margin:20px">
      <el-pagination @current-change="changePage" :page-size="page.pageSize" :current-page="page.currentPage" background layout="prev, pager, next" :total="page.total"></el-pagination>

      </el-row>
    </el-tab-pane>
    <el-tab-pane  label="收藏素材" name="collect">
         <div class="img-list">
            <el-card class="img-item" v-for="item in list" :key="item.id">
            <img :src="item.url" alt="">
        </el-card>
        </div>
        <el-row type="flex" justify="center" style="margin:20px">
      <el-pagination @current-change="changePage" :page-size="page.pageSize" :current-page="page.currentPage" background layout="prev, pager, next" :total="page.total"></el-pagination>

      </el-row>
    </el-tab-pane>

  </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
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
      this.getMaterial()
    },
    changeType () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      // this.activeName === 'collect'找收藏否则找全部
      this.$axios({
        url: 'user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }

  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img-list{
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    .img-item{
    width: 180px;
    height: 180px;
    border-radius:6px;
    margin: 30px;
    position: relative;
    img{
        width: 100%;
        height:100%;
    }
    .operate{
        background-color: #f4f5f6;
        position:absolute;
        left:0;
        bottom:0;
        width:100%;
        display:flex;
        justify-content:space-around;
        align-items: center;
        i{
            font-size: 18px
        }
    }

    }

}
</style>
