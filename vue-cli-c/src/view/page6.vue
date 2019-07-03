<template>
  <div class="page">
    <cardBox :cardData='cardData' ref="child"></cardBox>
  </div>
</template>

<script>
import cardBox from "../components/cardBox";

export default {
  components: { cardBox },
  data() {
    return {
      cardData:[
        {
          title: '选项卡一',
          content: '选项卡一的内容'
        },
        {
          title: '选项卡二',
          content: '选项卡二的内容'
        },
        {
          title: '选项卡三',
          content: '选项卡三的内容'
        }
      ]
    };
  },
  methods: {},
  mounted(){
    this.$refs.child.childMethod('ss')
  }
};
</script>

<style lang="scss" scoped>
</style>
