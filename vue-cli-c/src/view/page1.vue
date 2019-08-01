<template>
  <div class="page">
    {{page1}}
    {{page1s}}
    <div class="wa">this is the best wish for you</div>
    <div>{{ templateStr }}</div>
    <pre v-highlight><code class="html">{{ templateStr }}</code></pre>
  </div>
</template>

<script>

import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {},
  data() {
    return {
      page1: this.$store.state.page1,
      templateStr: `<bar :bar="barData" :series="barDataSeries"></bar>`
    }
  },
  mounted() {
    // this.$store.dispatch('changeInfo','改变后的a')
    // this.changeA('mapActions')
    this.changeInfo('changeInfo');
    // hljs.registerLanguage('javascript', javascript);
  },
  methods: {
    // action的一个辅助函数，将组件的 methods 映射为 store.dispatch 调用
    //下面两种写法
    // ...mapActions({ changeA: 'changeInfo' }),//将 `this.changeA()` 映射为 `this.$store.dispatch('changeInfo')`
    ...mapActions([ 'changeInfo' ])  // 将 `this.changeInfo()` 映射为 `this.$store.dispatch('changeInfo')`
  },
  watch: {},
  computed: {
  //当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。
  //为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性
    ...mapState({
      // page1: state=>state.page1,  //等同于下面的写法
      page1s: 'page1',
    }),
  },
}
</script>

<style scoped lang='scss'>
.page{
  height: 100%;
  overflow: auto;
  font-family: 'zhanghaishan';
}
.wa{
  font-family: 'ziti';
  font-size: 36px;
  }
</style>
