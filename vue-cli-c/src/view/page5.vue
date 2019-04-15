<template>
  <div class="page">
    <div id="myChart" :style="{width: '100%', height: '600px'}"></div>
  </div>
</template>


<script>
import "../../node_modules/echarts/map/js/china.js";
export default {
  components: {},
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
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
        title: {
          // text: "iphone销量",
          // subtext: "纯属虚构",
          // left: "center"
        },
        tooltip: {
          // trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["全国存续企业总量", "全国存续企业总注册资本"]
        },
        visualMap: {
          min: 0,
          max: 2500,
          left: "left",
          // top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          orient: "horizontal",
          color: ["#9ee3ff", "#2d73cf"]
        },
        series: [
          {
            name: "全国存续企业总量",
            type: "map",
            mapType: "china",
            label: {
              normal: {
                show: true,
                formatter: param => {
                  // console.log(param)
                  if (param.value) {
                    return param.name + param.value;
                  }
                }
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: Math.round(Math.random() * 1000) },
              { name: "天津", value: Math.round(Math.random() * 1000) },
              { name: "上海", value: Math.round(Math.random() * 1000) },
              { name: "广东", value: Math.round(Math.random() * 1000) },
              { name: "台湾", value: Math.round(Math.random() * 1000) },
              { name: "香港", value: Math.round(Math.random() * 1000) },
              { name: "澳门", value: Math.round(Math.random() * 1000) },
              { name: "青海", value: Math.round(Math.random() * 1000) },
              { name: "四川", value: Math.round(Math.random() * 1000) },
              { name: "湖北", value: Math.round(Math.random() * 1000) },
              { name: "陕西", value: Math.round(Math.random() * 1000) }
            ]
          },
          {
            name: "全国存续企业总注册资本",
            type: "map",
            mapType: "china",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { name: "北京", value: Math.round(Math.random() * 1000) },
              { name: "浙江", value: Math.round(Math.random() * 1000) },
              { name: "广西", value: Math.round(Math.random() * 1000) },
              { name: "内蒙古", value: Math.round(Math.random() * 1000) },
              { name: "吉林", value: Math.round(Math.random() * 1000) },
              { name: "贵州", value: Math.round(Math.random() * 1000) },
              { name: "新疆", value: Math.round(Math.random() * 1000) }
            ]
          }
        ]
      });
    },
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
