<template>
  <div class="chart-area" :style="{height:'450px', width: '550px'}">
    <div ref="pie" class="pie-box"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";
export default {
  components: {},
  data() {
    return {
      myChart: ""
    };
  },
  methods: {
    init() {
      this.myChart = echarts.init(this.$refs.pie);
      function makeGaussian(amplitude, x0, y0, sigmaX, sigmaY) {
        return function(amplitude, x0, y0, sigmaX, sigmaY, x, y) {
          var exponent = -(
            Math.pow(x - x0, 2) / (2 * Math.pow(sigmaX, 2)) +
            Math.pow(y - y0, 2) / (2 * Math.pow(sigmaY, 2))
          );
          return amplitude * Math.pow(Math.E, exponent);
        }.bind(null, amplitude, x0, y0, sigmaX, sigmaY);
      }
      var gaussian = makeGaussian(50, 0, 0, 20, 20);

      var data = [];
      // // 曲面图要求给入的数据是网格形式按顺序分布。
      // for (var y = -50; y <= 50; y++) {
      //   for (var x = -50; x <= 50; x++) {
      //     var z = gaussian(x, y);
      //     data.push([x, y, z]);
      //   }
      // }
      data = [
        [
          [0, 0, 0], [0.0001, 0, 0],
          [0, 1, 0], [0.0001, 1, 1],
          [0, 2, 0], [0.0001, 2, 3],
          [0, 3, 0], [0.0001, 3, 4]
        ],
        [
          [1, 0, 0], [1.0001, 0, 0],
          [1, 1, 0], [1.0001, 1, 1],
          [1, 2, 0], [1.0001, 2, 3],
          [1, 3, 0], [1.0001, 3, 4]
        ],
        [
          [2, 0, 0], [2.0001, 0, 0],
          [2, 1, 0], [2.0001, 1, 1],
          [2, 2, 0], [2.0001, 2, 3],
          [2, 3, 0], [2.0001, 3, 4]
        ],
        [
          [3, 0, 0], [3.0001, 0, 0],
          [3, 1, 0], [3.0001, 1, 1],
          [3, 2, 0], [3.0001, 2, 3],
          [3, 3, 0], [3.0001, 3, 4]
        ],
        [
          [4, 0, 0], [4.0001, 0, 0],
          [4, 1, 0], [4.0001, 1, 1],
          [4, 2, 0], [4.0001, 2, 3],
          [4, 3, 0], [4.0001, 3, 4]
        ],
        [
          [5, 0, 0], [5.0001, 0, 0],
          [5, 1, 0], [5.0001, 1, 1],
          [5, 2, 0], [5.0001, 2, 3],
          [5, 3, 0], [5.0001, 3, 4]
        ],
        [
          [6, 0, 0], [6.0001, 0, 0],
          [6, 1, 0], [6.0001, 1, 1],
          [6, 2, 0], [6.0001, 2, 3],
          [6, 3, 0], [6.0001, 3, 4]
        ],
        
      ];
      let option = {
        tooltip: {},
        backgroundColor: "#251135",
        visualMap: {
          show: false,
          dimension: 2,
          min: 0,
          max: 10,
          inRange: {
            color: ["#c94fc3", "#5d3bbe"]
          }
        },
        grid3D: {
          // width: '80%',
          // height: '90%',
          // left: '10%',
          boxHeight: 80,
          boxDepth: 80,
          axisPointer: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: "#6044c9"
            }
          },
          splitLine: {
            lineStyle: {
              width: 1,
              color: "rgba(96, 68, 201, 0.4)"
            }
          },
          viewControl: {
            projection: "orthographic"
            // beta: -60
          }
        },
        xAxis3D: {
          type: "category",
          // name:' ',
          data: ["300", "250", "200", "150", "100", "50", "0"]
        },
        yAxis3D: {
          type: "category",
          // name:' ',
          data: ["data1", "data2", "data3", "data4"]
        },
        zAxis3D: {
          type: "value",
          // name:' ',
          max: 10,
          axisLabel: {
            // show: false
          },
          splitLine: {
            // show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 1,
              color: "rgba(96, 68, 201, 0.4)"
            }
          }
        },
        series: [
          {
            type: "surface",
            wireframe: {
              show: false
            },
            data: data[0]
          },{
            type: "surface",
            wireframe: {
              show: false
            },
            // data: data[1]
            data: []
          },{
            type: "surface",
            wireframe: {
              show: false
            },
            data: data[2]
          },{
            type: "surface",
            wireframe: {
              show: false
            },
            // data: data[3]
            data: []
          },{
            type: "surface",
            wireframe: {
              show: false
            },
            data: data[4]
          },{
            type: "surface",
            wireframe: {
              show: false
            },
            // data: data[5]
            data: []
          },{
            type: "surface",
            wireframe: {
              show: false
            },
            data: data[6]
          }
        ]
      };
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.init();
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.chart-area {
  .pie-box {
    height: 100%;
  }
}
</style>
