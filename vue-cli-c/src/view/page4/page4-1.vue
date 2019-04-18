<template>
  <div class="page">
    <div class="box">
      <div class="content">
        <div class="dot1 dot">
          <div class="one"></div>
        </div>
        <div class="dot2 dot">
          <div class="two"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: [],
  mounted() {},
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
// animation: name duration timing-function delay iteration-count direction;
//            名称
//            播放时间
//            运动曲线(linear,ease,ease-in,ease-out,ease-in-out)
//            延时播放
//            播放次数 (n, infinite)
//            是否应该轮流反向播放动画(normal,alternate);

.page {
  height: 100%;
  background: #1b2456;
  .box {
    position: relative;
    width: 300px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .content {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 1px solid aqua;
      // transform-style: preserve-3d;
      // transform: rotatex(60deg) rotateZ(60deg);
      .dot{
        position: absolute;
        left: 0;
        top: 0;
      }
      .dot1 {
        transform: translate(0, 0);
        animation: dot1 3s ease-in infinite;
        @keyframes dot1 {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(280px, 0);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }
      }
      .dot2 {
        transform: translate(280px, 0);
        animation: dot2 3s ease-in infinite;
        @keyframes dot2 {
          0% {
            transform: translate(280px, 0);
          }
          50% {
            transform: translate(0px, 0);
          }
          100% {
            transform: translate(280px, 0px);
          }
        }
      }
      .one,.two {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 0;
        top: 0;
        border-radius: 50%;
        background-image: -webkit-radial-gradient(50% 50%,#0cf1ee,rgb(82, 94, 95));
        z-index: 100;
        animation: one 3s ease-out infinite;
        @keyframes one {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(0, 280px);
          }
          100% {
            transform: translate(0, 0px);
          }
        }
      }
    }
  }
}
</style>
