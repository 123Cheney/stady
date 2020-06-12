<!--  -->
<template>
  <div class='ss'>
    <vue-WaterfallEasy ref="waterfall"
                       :imgsArr="imgsArr"
                       @scrollReachBottom="getData">
      <h1 slot="waterfall-head">waterfall-head</h1>
    </vue-WaterfallEasy>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
import axios from 'axios'
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: { vueWaterfallEasy },
  //props:  {type: Number或[Number, String], default: 0, required: true}
  props: {},
  data () {
    //这里存放数据
    return {
      imgsArr: [],
      group: 0,
      res: require('./data.json')
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getData () {
      console.log(this.res)
      //   axios.get('./data.json?group=' + this.group) // 真实环境中，后端会根据参数group返回新的图片数组，这里我用一个静态json文件模拟
      //     .then(res => {
      this.res.map((item, key) => {
        this.group++
        if (this.group === 10) { // 模拟已经无新数据，显示 slot="waterfall-over"
          // this.$refs.waterfall.waterfallOver()
          return
        }
        this.imgsArr = this.imgsArr.concat(item)
      })

      // })
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.getData()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.ss {
  width: 100%;
  height: 100%;
}
</style>
