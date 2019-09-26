<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">发表文章</template>
    </bread-crumb>
    <el-form
      ref="publishForm"
      :model=" formData"
      :rules=" pubshlishRules"
      style="margin-left:100px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formData.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <quill-editor v-model="formData.content" style='height:300px'></quill-editor>
      </el-form-item>
      <el-form-item style="margin-top:120px" prop="cover" label="封面">
        <el-radio-group @change="changeType" v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">多图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- //封面组件 -->
      <cover-image :images="formData.cover.images"></cover-image>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formData.channel_id">
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发布文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      loading: false,
      formData: {
        title: '', // 标题
        content: '', // 内容
        channel_id: null,
        cover: {
          type: 0,
          images: []
        }

      },
      pubshlishRules: {
        title: [{ required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题控住在5到30之间 ' }],
        content: [{ required: true, message: '内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 类型改变事件
    changeType () {
    // 可以获取最新的Type
    // 根据Type进行images的长度变化
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params// 如果有articleId 就是编辑否则是发布
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: { draft },
            data: this.formData
          }).then(() => {
            // 发布成功回到内容列表
            this.$router.push('/home/articles')
          })
          // --原始代码---------------------------------------------------
          //   if (articleId) {
        //     // 修改
        //     this.$axios({
        //       url: `/articles/${articleId}`,
        //       method: 'put',
        //       data: this.formData
        //     }).then(result => {
        //       // 发布成功回到内容列表
        //       this.$router.push('/home/articles')
        //     })
        //   } else {
        //     // 新增
        //     this.$axios({
        //       url: '/articles',
        //       method: 'post',
        //       params: { draft },
        //       data: this.formData
        //     }).then(() => {
        //       this.$router.push('/home/articles')
        //     })
        //   }
        // ----------------------------------------------------
        }
      })
    },
    // 根据文章id获取文章详情
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    }
  },
  created () {
    this.getChannels()// 获取频道
    let { articleId } = this.$route.params//
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>
</style>
