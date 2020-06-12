<template>
  <div class="page">
    <div class="icon-cards">
      <div class="icon_cards_content">
        <div class="icon">
          <span class="qiu"></span>
        </div>
        <div class="icon"></div>
        <div class="icon"></div>
        <div class="icon"></div>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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

<style lang="less" scoped>
.page {
  height: 100%;
  background: #1b2456;
  .icon-cards {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    perspective: 8000px;
  }
  .icon_cards_content {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transform: rotatex(60deg) rotateZ(30deg);
  }
  .icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 300px;
    .qiu {
      position: absolute;
      display: inline-block;
      top: -10px;
      left: -10px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      transform: rotatex(-60deg) rotateY(30deg);
    }
  }
  .icon:nth-child(1) {
    border: 1px dashed red;
    .qiu {
      // background: #00f1eb;
      background-image: -webkit-radial-gradient(50% 50% , #0cf1ee, rgb(82, 94, 95));
      z-index: 100;
      animation: one 6s infinite;
    }
    @keyframes one {
      0% { left: -10px; top: -10px; opacity: 1; }
      25% { left: 290px; top: -10px; opacity: 1; }
      50% { left: 290px; top: 290px; opacity: 1; }
      75% { left: -10px; top: 290px; opacity: 0; }
      100% { left: -10px; top: -10px; opacity: 1; }
    }
  }
  .icon:nth-child(2) {
    border: 1px solid blue;
    transform: translateY(150px);
  }
  .icon:nth-child(3) {
    border: 1px dashed yellow;
    transform: translateY(300px);
  }
  .icon:nth-child(4) {
    border: 1px solid rgb(231, 35, 231);
    transform: rotateZ(90deg) translateX(150px) translateY(-150px);
  }
  .icon:nth-child(5) {
    border: 1px dashed rgb(15, 231, 87);
    transform: rotateZ(90deg) translateX(150px) translateY(150px);
  }
}
</style>
