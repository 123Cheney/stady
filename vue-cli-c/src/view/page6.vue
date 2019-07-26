<template>
  <div class="page">
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
        id: 'one',
        width: '480px',
        height: '400px',
        centerColor: [75, 176, 176],
        legTop: '100px',
        legRight: '40px',
        legItemGap: '30px',
      },
      pieData: [
        {
          name: '测试数据1',
          color: [176, 169, 212],
          opctity: 1,
          value: 30
        },
        {
          name: '测试数据2',
          color: [231, 77, 118],
          opctity: 1,
          value: 40
        },
        {
          name: '测试数据3',
          color: [114, 182, 230],
          opctity: 1,
          value: 40
        },
        // {
          // name: '测试数据4',
          // color: [80, 59, 153],
          // opctity: 1,
          // value: 180
        // }
      ],
    };
  },
  props: [],
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

      setTimeout(()=>{
         _this.scene = this.createScene();

        _this.engine.runRenderLoop(function() {
          _this.scene.render();
        });

        window.addEventListener("resize", function() {
          _this.engine.resize();
        });
      },0)
    },

    createArc(scene, height=0.1, diameter=1) {
      var a = BABYLON.MeshBuilder.CreateCylinder(
        "a",
        {
          diameter: diameter, //外半径
          height: height,
          tessellation: 96
        },
        scene
      );
      var b = BABYLON.MeshBuilder.CreateBox(
        "b",
        { width: diameter, depth: diameter, height: height + 0.01 },
        scene
      );

      var A = BABYLON.MeshBuilder.CreateCylinder(
        "A",
        {
          diameter: diameter,
          height: height+0.02,
          tessellation: 3
        },
        scene
      );
      var B = BABYLON.MeshBuilder.CreateCylinder(
        "B",
        {
          diameter: diameter-0.3,
          height: height+0.03,
          tessellation: 3
        },
        scene
      );
      b.position.x = diameter/2;

      
     
      a.isVisible = false;
      b.isVisible = false;
      A.isVisible = false;
      B.isVisible = false;

      // 材料
      var mat0 = new BABYLON.StandardMaterial("mat0", scene);
      mat0.diffuseColor = new BABYLON.Color3(0.5, 0.2, 0.4);
      var mat1 = new BABYLON.StandardMaterial("mat1", scene);
      mat1.diffuseColor = new BABYLON.Color3(0.2, 0.4, 0.6);

      // 半圆
      var aCSG = BABYLON.CSG.FromMesh(a);
      var bCSG = BABYLON.CSG.FromMesh(b);
      var byCSG = aCSG.subtract(bCSG);
      var byMesh = byCSG.toMesh("csg1", mat0, scene);

      // 三角形
      var ACSG = BABYLON.CSG.FromMesh(A);
      var BCSG = BABYLON.CSG.FromMesh(B);
      var sjCSG = ACSG.subtract(BCSG);
      // var sjMesh = sjCSG.toMesh("csg2", null, scene);


      // ********************************************************
      // 克隆
      var cloneMesh = byMesh.clone();
      cloneMesh.material = mat1;
      // cloneMesh.rotation.y = Math.PI;
      var cloneCSG =  BABYLON.CSG.FromMesh(cloneMesh);

      byMesh.isVisible = false;
      cloneMesh.isVisible = false;

      
      if (this.pieData) {
        var sum = 0;
        var flag = 0;
        var arc = 0;
        this.pieData.map(item => {
          sum += item.value;
        });
        this.pieData.map((item, index) => {
          let mat0 = new BABYLON.StandardMaterial("mat0", scene);
          let arcMesh = '';
          let arcCSG = '';
          let lastMesh = '';
          mat0.diffuseColor = new BABYLON.Color3(
            item.color[0] / 255,
            item.color[1] / 255,
            item.color[2] / 255
          );
          arc = (item.value / sum) * 360;
          if (arc > 0 && arc <= 180) {
            cloneMesh.rotation.y = (Math.PI / 180) * arc;
            cloneCSG = BABYLON.CSG.FromMesh(cloneMesh);
            arcMesh = byCSG.subtract(cloneCSG).toMesh("csg1", mat0, scene);
          } else {
            cloneMesh.rotation.y = (Math.PI / 180) * arc + Math.PI;
            cloneCSG = BABYLON.CSG.FromMesh(cloneMesh);
            arcMesh = byCSG.union(cloneCSG).toMesh("csg1", mat0, scene);
          }
          arcMesh.rotation.y = (Math.PI / 180) * flag;
          arcMesh.isVisible = false;
          arcCSG = BABYLON.CSG.FromMesh(arcMesh);
          lastMesh = arcCSG.intersect(sjCSG).toMesh("csg3", mat0, scene);
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

      // this.formatData(scene)
      // 弧度，高度，角度，位置，颜色，透明度
      this.createArc(scene);

      return scene;
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
