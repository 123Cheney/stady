<template>
  <span :class="[type?type:'main' ,'my-btn']" @click="clickEvent">
    <Icon v-if="icon" :type="icon"/>{{text?text:'btnText'}}
  </span>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['type','text','icon'],
  methods: {
    clickEvent(){
      this.$emit('clickBtn')
    }
  },
}
</script>

<style scoped>
.my-btn{
  font-family: PingFangSC-Regular;
  font-size: 0.14rem;
  display: inline-block;
  line-height: 0.32rem;
  height: 0.32rem;
  padding: 0 0.15rem;
  border-radius: 4px;
  cursor: pointer;
}
.ivu-icon{
  margin-right: 0.05rem;
  font-size: 0.16rem;
}
.main{
  background: linear-gradient(to right,#FB6A31,#FA4A57);
  color: #fff;
}
.secondary{
  border: 1px solid #FF1F36;
  color: #FF1F36;
}
.commonly{
  border: 1px solid #E6EDF5;
  color: #2B343D;
}
.main:hover{
  background: #FB6A31;
  color: #fff;
}
.secondary:hover,.commonly:hover{
  background: linear-gradient(to right,#FB6A31,#FA4A57);
  color: #fff;
}
.my-btn:active{
  background: #FA4A57;
  color: #fff;
}
</style>
