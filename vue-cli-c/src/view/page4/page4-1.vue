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
// 我发现了css一个特别

// sass变量

.page {
  height: 100%;
  background: #1b2456;
  .box {
    position: relative;
    height: 100%;
    width:  100%;
    $width: calc(100% / 2);
    $height: 100vh;
    $itemW: calc((100vw - 260px)/2 - 20px);
    $itemH: calc(100vh - 20px);
    perspective: 8000px;
    .content {
      position: absolute;
      width:  $width;
      height: $height;
      border: 1px solid aqua;
      transform-style: preserve-3d;
      // transform: translateX(200px) rotatex(70deg) rotateZ(60deg);
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
            transform: translate($itemW, 0);
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
            transform: translate($itemW, 0);
          }
          50% {
            transform: translate(0px, 0);
          }
          100% {
            transform: translate($itemW, 0px);
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
            transform: translate(0, $itemH);
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
