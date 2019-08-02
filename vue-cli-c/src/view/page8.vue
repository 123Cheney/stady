<template>
  <div class="page">
    <div id="container" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
HighchartsMore(Highcharts)
export default {
  components: {},
  data() {
    return {};
  },
  props: [],
  mounted() {
    var chart = Highcharts.chart("container", {
      chart: {
        polar: true,
        type: "areaspline",
        backgroundColor:'#1d1455'
      },
      title: {
        text: ''
      },
      legend:{
        enabled: false,
      },
      pane: {
        size: "80%",
        background:{
          backgroundColor:'#1a2164',
          borderWidth: 0,
        }
      },
      xAxis: {
        categories: ['data1','data2','data3','data4','data5','data6'],
        // categories: ['数据1','数据2','数据3','数据4','数据5','数据6'],
        lineWidth: 0,
        tickmarkPlacement: "off",
        gridLineColor:'#5b5197',
        labels:{
          style: { "color": "#fff", "fontSize": "14px",}
        }
      },
      yAxis: {
        // gridLineInterpolation: "polygon",
        gridLineInterpolation: "circle",
        lineWidth: 0,
        gridLineColor:'#5b5197',
        labels:{
          enabled: false
        }
        
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderColor: 'rgba(0,0,0,0.3)',
        style: { "color": "#fff","fontSize": "14px", },
        shared: true,
      },
      series: [
        {
          name: "预算拨款",
          data: [43000, 19000, 60000, 35000, 17000, 10000],
          color: '#94ce9b',
          marker:{
            enabled:false
          }
        },
        {
          name: "实际支出",
          data: [50000, 39000, 42000, 31000, 26000, 14000],
          color:'#c2896b',
          marker:{
            enabled:false
          }
        }
      ]
    });
  },
  methods: {},
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
/deep/ .highcharts-credits{
  display: none !important;
}
</style>
