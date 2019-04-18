<template>
  <div class="page">
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>


<script>
import "../../node_modules/echarts/map/js/china.js";
export default {
  components: {},
  data() {
    return {
      mapColor: ["#9ee3ff", "#2d73cf"],
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
        legend: {
          orient: "vertical",
          left: "left",
          selectedMode: "single",
          data: ["存续企业总量", "存续企业总注册资本", "贸易金额"]
        },
        visualMap: [
          {
            type: "continuous",
            min: 0,
            max: 1000,
            // left: 100,
            seriesIndex: 0,
            calculable: true,
            inRange: {
              color: this.mapColor,
            }
          },
        //   {
        //     type: "continuous",
        //     min: 0,
        //     max: 1000,
        //     // left: 180,
        //     seriesIndex: 1,
        //     calculable: true,
        //     inRange: {
        //       color: ["#feffff", "#ff2d00"]
        //     }
        //   },
        //   {
        //     type: "continuous",
        //     min: 0,
        //     max: 1000,
        //     // left: 260,
        //     seriesIndex: 2,
        //     calculable: true,
        //     inRange: {
        //       color: ["#dbfae2", "#00aa54"]
        //     }
        //   }
        ],
        series: [
          {
            name: "存续企业总量",
            type: "map",
            mapType: "china",
            label: {formatter: (params) => {
              if(!isNaN(params.value)){
                console.log(params.value)
              }
            }},
            showLegendSymbol:false,
            data: [
              { name: "香港", value: Math.round(Math.random() * 1000) },
              { name: "贵州", value: Math.round(Math.random() * 1000) },
              { name: "新疆", value: Math.round(Math.random() * 1000) }
            ]
          },
          {
            name: "存续企业总注册资本",
            type: "map",
            mapType: "china",
            data: [
              { name: "吉林", value: Math.round(Math.random() * 1000) },
              { name: "贵州", value: Math.round(Math.random() * 1000) },
              { name: "新疆", value: Math.round(Math.random() * 1000) }
            ]
          },
          {
            name: "贸易金额",
            type: "map",
            mapType: "china",
            data: [
              { name: "北京", value: Math.round(Math.random() * 1000) },
              { name: "浙江", value: Math.round(Math.random() * 1000) },
              { name: "广西", value: Math.round(Math.random() * 1000) }
            ]
          }
        ]
      });
      myChart.on('legendselectchanged', function (params) {
        
      });
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="less" scoped>
.main {
  .box {
  }
}
</style>
