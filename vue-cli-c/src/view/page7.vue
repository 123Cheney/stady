<!-- ecahrt 3dmap -->
<template>
  <div class="box">
    <div class='mapbox'
         ref="mapone"></div>
    <div class='mapbox'
         ref="maptwo"></div>
  </div>
</template>
<script>

import echarts from "echarts";
import china from 'echarts/map/js/china'
import anhui from 'echarts/map/js/province/anhui'
export default {
  components: {},
  //props:  {type: Number或[Number, String], default: 0, required: true}
  props: {},
  data () {
    return {

    };
  },
  methods: {
    initone () {
      let mychart = echarts.init(this.$refs.mapone)
      let option = {
        tooltip: {},
        geo: {
          map: "china",
          // map: "安徽",
          regions: [{
            name: '安徽',
            itemStyle: {
              color: '#5177ee'
            }
          }]
        },
        series: [
          {
            // type: 'scatter',
            // 波纹特效
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: 5,
            rippleEffect: {
              scale: 10
            },
            geoIndex: 0,
            data: [
              {
               value: [117.27, 31.86],
               symbol: 'pin'
              }
            ]
          }
        ]
      };
      mychart.setOption(option)
    },
    inittwo () {
      let mychart = echarts.init(this.$refs.maptwo)
      let option = {
        tooltip: {},
        geo3D: {
          map: "china",
          // map: "安徽",
          regions: [{
            name: '安徽',
            itemStyle: {
              color: '#5177ee'
            }
          }],
          itemStyle: {
            borderWidth: 1,
            borderColor: '#999'
          }
        },
        series: [
          {
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            geo3DIndex: 0,
            polyline: true,
            effect: {
              show: true,
              trailColor: 'red',
              trailOpacity: 1
            },
            // lineStyle: {
            //   color: 'red',
            //   opacity: 0
            // },
            data: [
              [
                [117.27, 31.86, -10], // 起点的经纬度和海拔坐标
                [114.87, 40.82, 2000]  // 终点的经纬度和海拔坐标
              ]
            ]
          },
          
        ]
      };
      mychart.setOption(option)
    },

  },
  computed: {},
  watch: {},
  created () {

  },
  mounted () {
    this.initone()
    this.inittwo()
  },
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.box {
  display: flex;
}
.mapbox {
  height: 380px;
  width: 380px;
}
</style>