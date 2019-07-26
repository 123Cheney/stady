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
    initial() {
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

    createArc(scene, height) {
      var a = BABYLON.MeshBuilder.CreateCylinder(
        "a",
        {
          diameter: 0.4,
          height: height + 0.01,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var b = BABYLON.MeshBuilder.CreateCylinder(
        "b",
        {
          diameter: 0.6, //外半径
          height: height,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var c = BABYLON.MeshBuilder.CreateBox(
        "c",
        { width: 0.6, depth: 0.6, height: height + 0.01 },
        scene
      );
      a.position.x = 0.8;
      b.position.x = 0.8;
      c.position.x = -0.3;
      a.isVisible = false;
      b.isVisible = false;
      c.isVisible = false;

      var aCSG = BABYLON.CSG.FromMesh(a);
      var bCSG = BABYLON.CSG.FromMesh(b);
      var cCSG = BABYLON.CSG.FromMesh(c);

      // 合成中间空心圆柱体
      var subCSG = bCSG.subtract(aCSG);
      var newMesh = subCSG.toMesh("csg1", null, scene);
      newMesh.position = new BABYLON.Vector3(0, 0, 0);
      newMesh.isVisible = false;

      // 转成CSG
      var newCSG = BABYLON.CSG.FromMesh(newMesh);

      // 合成小半圆（空心圆柱+c）
      subCSG = newCSG.subtract(cCSG);
      newMesh = subCSG.toMesh("csg2", null, scene);
      newMesh.position = new BABYLON.Vector3(0, 0, 0);
      // 复制小半圆
      var clonMesh = newMesh.clone();
      clonMesh.position = new BABYLON.Vector3(0, 0, 0);

      var A = BABYLON.MeshBuilder.CreateCylinder(
        "A",
        {
          diameter: 0.4 - 0.01, //内半径
          height: height + 0.02,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var B = BABYLON.MeshBuilder.CreateCylinder(
        "B",
        {
          diameter: 0.6 + 0.01, //外半径
          height: height + 0.01,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var C = BABYLON.MeshBuilder.CreateBox(
        "C",
        { width: 0.61, depth: 0.61, height: height + 0.02 },
        scene
      );
      A.position.x = 0.8;
      B.position.x = 0.8;
      C.position.x = -0.3;
      A.isVisible = false;
      B.isVisible = false;
      C.isVisible = false;

      var ACSG = BABYLON.CSG.FromMesh(A);
      var BCSG = BABYLON.CSG.FromMesh(B);
      var CCSG = BABYLON.CSG.FromMesh(C);

      // 合成中间空心圆柱体
      var SubCSG = BCSG.subtract(ACSG);
      var NewMesh = SubCSG.toMesh("Csg1", null, scene);
      NewMesh.position = new BABYLON.Vector3(0, 0, 0);
      NewMesh.isVisible = false;

      // 转成CSG
      var NewCSG = BABYLON.CSG.FromMesh(NewMesh);

      // 合成大半圆（空心圆柱+c）
      SubCSG = NewCSG.subtract(CCSG);
      NewMesh = SubCSG.toMesh("Csg2", null, scene);
      NewMesh.position = new BABYLON.Vector3(0, 0, 0);

      clonMesh.isVisible = false;
      newMesh.isVisible = false;
      NewMesh.isVisible = false;

      var lastCSG = BABYLON.CSG.FromMesh(newMesh);
      var LastCSG = BABYLON.CSG.FromMesh(NewMesh);
      if (this.pieData) {
        var sum = 0;
        var flag = 0;
        var arc = 0;
        this.pieData.map(item => {
          sum += item.value;
        });
        this.pieData.map((item, index) => {
          let mat0 = new BABYLON.StandardMaterial("mat0", scene);
          mat0.diffuseColor = new BABYLON.Color3(
            item.color[0] / 255,
            item.color[1] / 255,
            item.color[2] / 255
          );
          arc = (item.value / sum) * 360;
          if (arc > 0 && arc <= 180) {
            NewMesh.rotation.y = (Math.PI / 180) * arc;
            LastCSG = BABYLON.CSG.FromMesh(NewMesh);
            subCSG = lastCSG.subtract(LastCSG);
          } else {
            clonMesh.rotation.y = (Math.PI / 180) * arc + Math.PI;
            LastCSG = BABYLON.CSG.FromMesh(clonMesh);
            subCSG = lastCSG.union(LastCSG);
          }
          let scall = index / 1.5 + 1;
          subCSG.scaling = new BABYLON.Vector3(1, scall, 1);
          newMesh = subCSG.toMesh("csg2", mat0, scene);
          newMesh.position = new BABYLON.Vector3(
            0,
            (scall * height) / 2 - 0.2,
            0
          );
          newMesh.rotation.y = (Math.PI / 180) * flag;
          newMesh.visibility = item.opctity;
          flag += arc;
        });
      }
    },

    createScene() {
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
      // sourceMat.diffuseColor.copyFromFloats(0.2, 0.4, 0.2);
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

      // this.formatData(scene)
      // 弧度，高度，角度，位置，颜色，透明度
      this.createArc(scene, 0.2);

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
