<template>
  <div class="chart-ring" :style="{height:'450px', width: '550px'}" >
    <el-button ><router-link to="page7-1"> to apple</router-link></el-button>
    <div ref="pie" class="pie-box"></div>   
  </div>
</template>

<script>
import echarts from "echarts";
import 'echarts-gl';
export default {
  components: {},
  data () {
    return {
      myChart: ""
    };
  },
  methods: {
    init () {
      this.myChart = echarts.init(this.$refs.pie);
      var data0 = [[0,0,0],[0,1,3],[0,2,3],[0,3,0]];
      var data1 = [[1,0,0],[1,1,4],[1,2,3.5],[1,3,0]];
      var data2 = [[2,0,0],[2,1,3.1],[2,2,2.2],[2,3,0]];
      var data3 = [[3,0,0],[3,1,1],[3,2,1.5],[3,3,0]];
      var data4 = [[4,0,0],[4,1,1],[4,2,1],[4,3,0]];
      var data5 = [[5,0,0],[5,1,1],[5,2,1.2],[5,3,0]];
      var data6 = [[6,0,0],[6,1,1],[6,2,1.2],[6,3,0]];
      let option = {
        tooltip: {},
        backgroundColor: '#251135',
        visualMap: {
            show: false,
            dimension: 1,
            min: 0,
            max: 5,
            inRange: {
              color: ['#3e2e9e', '#b948b0',  'blue' ]
            }
        },
        grid3D: {
          // width: '80%',
          // height: '90%',
          // left: '10%',
          boxHeight: 80,
          boxDepth: 80,
          axisPointer:{
            show: false
          },
          axisLabel:{
            textStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            lineStyle:{
              width: 1,
              color: '#6044c9'
            }
          },
          splitLine:{
            lineStyle:{
              width: 1,
              color: 'rgba(96, 68, 201, 0.4)'
            }
          },
          viewControl: {
              projection: 'orthographic'
          }
        },
        xAxis3D: {
          type: 'category',
          name:' ',
          data:['300','250','200','150', '100', '50', '0']
        },
        yAxis3D: {
          type: 'category',
          name:' ',
          data:['data1','data2','data3','data4']
        },
        zAxis3D: {
          type: 'value',
          name:' ',
          max: 10,
          axisLabel:{
            // show: false
          },
          splitLine:{
            // show: false
          },
          axisTick:{
            show: false
          },
          axisLine:{
            lineStyle: {
              width: 1,
              color: 'rgba(96, 68, 201, 0.4)'
            }
          }
        },
        
        series: [
          {
            type: 'line3D',
            data: data0,
            lineStyle: {
              width: 3
            }
          },
          {
              type: 'line3D',
              data: data1,
              lineStyle: {
                  width: 3
              }
          },
          {
            type: 'line3D',
              data: data2,
              lineStyle: {
                  width: 3
              }
          },
          {
            type: 'line3D',
              data: data3,
              lineStyle: {
                  width: 3
              }
          },
          {
            type: 'line3D',
              data: data5,
              lineStyle: {
                  width: 3
              }
          },
          {
            type: 'line3D',
              data: data6,
              lineStyle: {
                  width: 3
              }
          },
          {
            type: 'line3D',
              data: data4,
              lineStyle: {
                  width: 3
              }
          },
        ]
      };
      this.myChart.setOption(option);
    },
  },
  mounted () {
    this.init()
  },
  computed: {
    
  }
};
</script>

<style lang="scss" scoped>
.chart-ring {
  .pie-box {
    height: 100%;
  }
}
</style>
