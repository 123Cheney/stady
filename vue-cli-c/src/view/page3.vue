<template>
  <div>
    <TopNav icon='md-analytics' firstTier='资产登记' secondTier='单位信息登记'/>
    <MyButton type='main' icon='md-add' text='新建'/>
    <MyButton type='secondary' text='查询' @clickBtn='searchList'/>
    <MyButton type='commonly' text='重置'/>
    <MyButton type='commonly' text='查询结果导出'/>
    <MyButton type='commonly' icon='ios-trash-outline' text='批量删除'/>
  </div>
</template>

<script>
import TopNav from '../components/TopNav'
import MyButton from '../components/MyButton'
export default {
  components: {TopNav,MyButton},
  data() {
    return {

    }
  },
  props: [],
  methods: {
    searchList(){
      console.log('ddd')
    }
  },
  watch: {},
  computed: {}
}
</script>

<style scoped>
</style>
