<template>
  <div class="cover-image">
      <!-- v-for生成封面图片 -->
      <div @click="openLayer" class="cover-item" v-for="(item,index) in images" :key="index">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <!-- 弹层组件 -->
        <el-dialog @close="dialogVisible=false" :visible="dialogVisible">
            <select-image></select-image>
        </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false
    }
  },
  methods: {
    openLayer () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
   .cover-image{
       display:flex;
       margin:10px 0;
        margin-left:100px;
        .cover-item{
            border:1px solid #999;
            padding:10px;
            width: 220px;
            height: 220px;
            img{
                width:100%;
                height:100%
            }
        }
   }
</style>
