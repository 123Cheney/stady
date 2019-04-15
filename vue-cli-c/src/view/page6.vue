<template>
  <div class="page">
    <cardBox :cardData='cardData'>
      <template slot-scope="val">
        <h1>{{val.data.title}}</h1>
      </template>
    </cardBox>
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
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
