<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-title-wrapper">
      <span>湖北/非湖北统计</span>
      <img src="../../../../../common/img/dashboard/title.png"
           alt="">
    </div>
    <div class="dashboard-main-wrapper">
      <div class="statistics-wrapper">
        <div class="statistics-chart">
          <canvas ref="canvas"></canvas>
        </div>
        <div class="statistics-list">
          <div ref="innerbox"
               :class="{anim:animate==true}"
               @mouseenter="mEnter"
               @mouseleave="mLeave">
            <div class="statistics-item"
                 v-for="(t,index) in HbList"
                 :key="index">
              <div class="key">{{t.name}}</div>
              <div class="value">{{t.addrSpring}}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHuBeiOrNoHuBeiLsit } from '@/api/manage/dashboard/dashboard'
export default {
  data () {
    return {
      ishu: 0,
      nohu: 0,
      animate: false,
      timer: {},
      HbList: [
        {
          name: '1小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
        {
          name: '2小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
        {
          name: '3小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
        {
          name: '4小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
        {
          name: '5小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
        {
          name: '6小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
        {
          name: '7小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
        {
          name: '8小张小张',
          addrSpring: '湖北省黄冈市中央三区西栅栏大街89号'
        },
      ],
    }
  },
  mounted () {
    this.timer = setInterval(this.scroll, 1000);
    getHuBeiOrNoHuBeiLsit().then((res) => {
      if (res && res.code == '200') {
        if (res.result) {
          this.ishu = res.result.inHB
          this.nohu = res.result.unInHB
          this.HbList = res.result.entUsers
          this.init();
        }
      } else {
        this.$message.error('获取湖北非湖北失败,请刷新重新尝试');
      }
    }).catch((err) => {
      this.$message.error(err);
    })
  },
  methods: {
    init () {
      let mycanvas = this.$refs.canvas;
      let canvasWidth = mycanvas.parentNode.clientWidth;
      let canvasHeight = mycanvas.parentNode.clientHeight;
      mycanvas.height = canvasHeight;
      mycanvas.width = canvasWidth;
      let ctx = mycanvas.getContext("2d");

      let a = this.ishu, b = this.nohu;
      let A = a / (a + b)
      let B = b / (a + b)
      this.drawCanvas(ctx, canvasWidth / 2, canvasHeight / 2, A, B);
    },
    drawCanvas (context, x, y, A, B) {
      context.save();
      context.clearRect(0, 0, 2 * x, 2 * y);
      context.beginPath();
      context.lineCap = "round";
      context.lineWidth = 7;
      context.strokeStyle = '#e55587';
      context.arc(x, y, 65, Math.PI * 0.75, Math.PI * (0.75 + 0.5 * A), false);
      context.stroke();
      context.beginPath();
      context.strokeStyle = '#3051fb';
      context.arc(x, y, 65, Math.PI * 0.25, Math.PI * (0.25 - 0.5 * B), true);
      context.stroke();

      context.beginPath();
      context.lineWidth = 2;
      context.strokeStyle = '#161f48';
      context.arc(x, y, 75, Math.PI * 0.25, -Math.PI * 0.25, true);
      context.stroke();
      context.beginPath();
      context.strokeStyle = '#161f48';
      context.arc(x, y, 75, Math.PI * 0.75, Math.PI * 1.25, false);
      context.stroke();

      context.beginPath();
      context.fillStyle = '#fff';
      context.font = "14px Arial";
      context.textAlign = "end";
      context.textBaseline = "middle";
      context.fillText('湖北  ' + this.ishu, x - 100, y);
      context.beginPath();
      context.textAlign = "start";
      context.fillText('非湖北  ' + this.nohu, x + 100, y);
      context.restore();
    },
    scroll () {
      let innerbox = this.$refs.innerbox;
      innerbox.style.marginTop = '-32px';
      this.animate = !this.animate;
      var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function () {
        that.HbList.push(that.HbList[0]);
        that.HbList.shift();
        innerbox.style.marginTop = '0px';
        that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 500)
    },
    mEnter () {
      clearInterval(this.timer);
    },
    mLeave () {
      this.timer = setInterval(this.scroll, 1000);
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-wrapper {
  position: absolute;
  left: 8px;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background: linear-gradient(to left, #080c3d, transparent);
  .statistics-chart {
    height: 0;
    flex: 3;
    canvas {
      background: url(../../../../../common/img/dashboard/earth.png) no-repeat;
      background-position: center center;
    }
  }

  .statistics-list {
    height: 0;
    flex: 2;
    background: #333;
    overflow: hidden;
    transition: all 0.5s;
    .innerbox {
      transition: all 0.5s;
    }
    .anim {
      transition: all 0.5s;
    }
    .statistics-item {
      box-sizing: border-box;
      width: 100%;
      padding: 10px 5px 10px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: rgba(204, 220, 246, 0.6);
      .key {
        width: 22%;
      }
      .value {
        width: 0;
        flex: 1;
      }
    }
  }
}
</style>