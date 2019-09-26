<template>
  <el-tabs>
    <!-- 页签组件 -->
    <el-tab-pane label="素材">
      <!-- 全部素材数据v-for循环 -->
      <div class="imgs-list">
        <el-card class="imgs-item" v-for="item in list" :key="item.id">
          <img :src="item.url" alt />
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
        </el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片"></el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getAllImg () {
      this.$axios({
        url: 'user/images',
        params: { collect: false }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.imgs-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .imgs-item {
    width: 120px;
    height: 80px;
    margin: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
