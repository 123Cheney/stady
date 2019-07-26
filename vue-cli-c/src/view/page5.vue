<template>
  <div class="pie-3d" :style="{width: option.width}">
    <div class="legend" :style="{top: option.legTop, right: option.legRight}">
      <p v-for="(item,index) in pieData" :key="index" :style="{marginBottom: option.legItemGap}">
        <span
          class="icon"
          :style="{background:`rgb(${item.color[0]}, ${item.color[1]}, ${item.color[2]}`}"
        ></span>
        <span class="name">{{item.name}}</span>
      </p>
    </div>
    <canvas :id="option.id" :style="{width: option.width, height: option.height}"></canvas>
  </div>
</template>

<script>
import * as BABYLON from "babylonjs";
export default {
  components: {},
  data() {
    return {
      canvas: "",
      scene: "",
      engine: "",
      option: {
        id: "two",
        width: "480px",
        height: "400px",
        centerColor: [255, 255, 255],
        legTop: "100px",
        legRight: "40px",
        legItemGap: "30px"
      },
      pieData: [
        {
          name: "测试数据1",
          color: [108, 111, 181],
          opctity: 0.7,
          value: 40
        },
        {
          name: "测试数据2",
          color: [211, 121, 149],
          opctity: 0.7,
          value: 30
        },
        {
          name: "测试数据3",
          color: [0.6, 0.4, 0.6],
          color: [237, 75, 111],
          opctity: 0.7,
          value: 40
        }
      ]
    };
  },
  props: {},
  mounted() {
    this.initial();
  },

  methods: {
    initial () {
      let _this = this;
      _this.canvas = document.getElementById(this.option.id);
      // 加载3D引擎
      _this.engine = new BABYLON.Engine(_this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      });

      setTimeout(() => {
        _this.scene = this.createScene();
        _this.engine.runRenderLoop(function() {
          _this.scene.render();
        });
        window.addEventListener("resize", function() {
          _this.engine.resize();
        });
      }, 0);
    },

    createArc(scene, height=0.2, diameter=0.6) {
      var a = BABYLON.MeshBuilder.CreateCylinder(
        "a",
        {
          diameter: diameter-0.2,
          height: height + 0.01,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var b = BABYLON.MeshBuilder.CreateCylinder(
        "b",
        {
          diameter: diameter, //外半径
          height: height,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var c = BABYLON.MeshBuilder.CreateBox(
        "c",
        { width: diameter, depth:diameter, height: height + 0.01 },
        scene
      );

      c.position.x = -diameter/2;
      a.isVisible = false;
      b.isVisible = false;
      c.isVisible = false;

      var aCSG = BABYLON.CSG.FromMesh(a);
      var bCSG = BABYLON.CSG.FromMesh(b);
      var cCSG = BABYLON.CSG.FromMesh(c);

      var byCSG = bCSG.subtract(aCSG).subtract(cCSG);
      var clonebyCSG = byCSG.clone();
      var byMesh = byCSG.toMesh("csg1", null, scene);
      var clonebyMesh = clonebyCSG.toMesh("csg2", null, scene);
      clonebyMesh.isVisible = false;

      a.scaling = new BABYLON.Vector3(0.9, 1.2, 0.9);
      b.scaling = new BABYLON.Vector3(1.1, 1.1, 1.1);
      c.scaling = new BABYLON.Vector3(1.1, 1.1, 1.1);
      c.position.x = -diameter*1.1/2;
      aCSG = BABYLON.CSG.FromMesh(a);
      bCSG = BABYLON.CSG.FromMesh(b);
      cCSG = BABYLON.CSG.FromMesh(c);
      var ByCSG = bCSG.subtract(aCSG).subtract(cCSG);
      var ByMesh = ByCSG.toMesh("csg5", null, scene);
      byMesh.isVisible = false;
      ByMesh.isVisible = false;
      
      if (this.pieData) {
        var sum = 0;
        var flag = 0;
        var arc = 0;
        this.pieData.map(item => {
          sum += item.value;
        });
        this.pieData.map((item, index) => {
          let subMesh = '';
          let subCSG = '';
          let mat0 = new BABYLON.StandardMaterial("mat0", scene);
          mat0.diffuseColor = new BABYLON.Color3(
            item.color[0] / 255,
            item.color[1] / 255,
            item.color[2] / 255
          );
          arc = (item.value / sum) * 360;
          if (arc > 0 && arc <= 180) {
            ByMesh.rotation.y = (Math.PI / 180) * arc;
            ByCSG = BABYLON.CSG.FromMesh(ByMesh);
            subCSG = byCSG.subtract(ByCSG);
          } else {
            clonebyMesh.rotation.y = (Math.PI / 180) * arc + Math.PI;
            clonebyCSG = BABYLON.CSG.FromMesh(clonebyMesh);
            subCSG = byCSG.union(clonebyCSG);
          }
          let scall = index / 1.5 + 1;
          subCSG.scaling = new BABYLON.Vector3(1, scall, 1);
          subMesh = subCSG.toMesh("csg7", mat0, scene);
          subMesh.position = new BABYLON.Vector3(
            0,
            (scall * height) / 2 - 0.2,
            0
          );
          subMesh.rotation.y = (Math.PI / 180) * flag;
          subMesh.visibility = item.opctity;
          flag += arc;
        });
      }
    },

    createScene () {
      let { centerColor } = this.option;
      let _this = this;
      var scene = new BABYLON.Scene(_this.engine);
      // 背景色
      // scene.clearColor = new BABYLON.Color3(0, 0, 0);
      var camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 6,
        Math.PI / 4,
        2,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.lowerRadiusLimit = 2
      camera.upperRadiusLimit = 2
      camera.attachControl(_this.canvas, true);
      camera.targetScreenOffset = new BABYLON.Vector2(-0.1, 0);

      var light1 = new BABYLON.HemisphericLight(
        "light1",
        new BABYLON.Vector3(1, 1, 0),
        scene
      );
      var light2 = new BABYLON.PointLight(
        "light2",
        new BABYLON.Vector3(0, 1, -1),
        scene
      );
      // 中间圆柱
      var sourceMat = new BABYLON.StandardMaterial("sourceMat", scene);
      sourceMat.diffuseColor.copyFromFloats(
        centerColor[0] / 255,
        centerColor[1] / 255,
        centerColor[2] / 255
      );
      var center = BABYLON.MeshBuilder.CreateCylinder(
        "center",
        {
          diameter: 0.2,
          height: 0.3,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      center.material = sourceMat;
      this.createArc(scene, 0.2, 0.6);

      return scene;
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.pie-3d {
  position: relative;
  background: rgb(51, 51, 76);
  .legend {
    position: absolute;
    color: #fff;
    font-size: 14px;
    .icon {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      vertical-align: baseline;
      margin-right: 10px;
    }
  }
}
</style>
