// 实现整体组件的统一注册
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import coverImg from './publish/cover-image'
import selectImg from './publish/select-image'
export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑
    Vue.component('cover-image', coverImg)// 封面组件
    Vue.component('select-image', selectImg)// 注册选择图片
  }
}
