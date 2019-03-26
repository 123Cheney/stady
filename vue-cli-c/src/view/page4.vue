<template>
  <div class="page">
    <TopNav/>
    <TopNav icon='md-analytics' firstTier='资产登记' secondTier='单位信息登记'/>
    <MyButton type='main' icon='md-add' text='新建'/>
    <MyButton type='secondary' text='查询' @clickBtn='searchList'/>
    <MyButton type='commonly' text='重置'/>
    <MyButton type='commonly' text='查询结果导出'/>
    <MyButton type='commonly' icon='ios-trash-outline' text='批量删除'/>
    <MyButton type='text' text='回撤' @clickBtn='searchList'/>
    <MyButton type='commonly' icon='ios-trash-outline' text='批量删除' @clickBtn='deleteList'/>
    <div>
      <Input v-model="value" placeholder="Enter something..." style="width: 300px" />
    </div>
    <div>
      <Select v-model="value">
        <Option value="beijing">New York</Option>
        <Option value="shanghai">London</Option>
        <Option value="shenzhen">Sydney</Option>
      </Select>
    </div>
    <div>
      <RadioGroup v-model="animal">
        <Radio label="金斑蝶"></Radio>
        <Radio label="爪哇犀牛"></Radio>
        <Radio label="印度黑羚"></Radio>
      </RadioGroup>
    </div>
    <Page :total="100" show-sizer show-elevator/>
  </div>
</template>

<script>
import TopNav from '../components/TopNav'
import MyButton from '../components/MyButton'
export default {
  components: {TopNav,MyButton},
  data() {
    return {
      value:'',
      animal:''
    }
  },
  props: [],
  mounted() {},
  methods: {
    deleteList(){
      this.$Modal.confirm({
        title: '确认是否要删除信息？',
        content: '<p>请您确认是否要删除所选中的信息，删除后将无法恢复。</p>',
        onOk: () => {
          this.$Message.info('Clicked ok');
        },
        onCancel: () => {
          // this.$Message.info('Clicked cancel');
        }
      });
    }
  },
  watch: {},
  computed: {}
}
</script>

<style scoped>
.ivu-select{
  width: 200px;
}
</style>
