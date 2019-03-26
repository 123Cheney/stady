<template>
  <div class="top-nav">
    <Icon v-if="icon" :type="icon" />
    <span v-if="firstTier">{{firstTier}}</span>
    <span v-if="secondTier">></span>
    <span v-if="secondTier">{{secondTier}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['icon','firstTier','secondTier'],
}
</script>

<style lang="scss" scoped>
.top-nav{
  background: #fff;
  height: 0.43rem;
  line-height: 0.43rem;
  .ivu-icon{
    padding-left: 0.2rem;
    font-size: 0.15rem;
  }
  span{
    font-family: PingFangSC-Regular;
    font-size: 0.13rem;
    padding-left: 0.08rem;
  }
}
</style>
