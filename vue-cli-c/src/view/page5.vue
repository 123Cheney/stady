<template>
  <div class="map-xizang">
    <div class="map-box" :style="{width: '400px', height: '400px'}">
      <div id="myChart" :style="{width: '400px', height: '400px'}"></div>
    </div>
  </div>
</template>


<script>
// import "../../node_modules/echarts/map/js/china.js";
import "../../node_modules/echarts/map/js/province/xizang.js";
export default {
  components: {},
  data() {
    return {
      mapColor: ["#9ee3ff", "#2d73cf"]
    };
  },
  props: [],
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   selectedMode: "single",
        //   data: ["存续企业总量"]
        // },
        // tooltip: {
        //   show: true
        // },
        // visualMap: [
        //   {
        //     type: "continuous",
        //     min: 0,
        //     max: 1000,
        //     // left: 100,
        //     seriesIndex: 0,
        //     calculable: true,
        //     inRange: {
        //       color: this.mapColor,
        //     }
        //   },
        // ],
        series: [
          {
            name: "存续企业总量",
            type: "map",
            mapType: "西藏",
            label:{
              normal:{
                show: true,
                position: ['50%', '50%'],
                offset:[100,100]
              }

            },
            itemStyle: {
              // shadowColor: 'red',
              // shadowOffsetX: 0,
              // shadowOffsetY: 20,

            },
            showLegendSymbol:false,
            data: [
              { name: "阿里地区", value: Math.round(Math.random() * 1000) },
              { name: "林芝市", value: Math.round(Math.random() * 1000) },
              { name: "山南市", value: Math.round(Math.random() * 1000) }
            ]
          }
        ]
      });
      myChart.on("legendselectchanged", function(params) {});
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="less" scoped>
.map-xizang {
  .map-box {
    background: url('../assets/mapBg.png') center no-repeat;
    background-size: 100% 100%;
  }
}
</style>
