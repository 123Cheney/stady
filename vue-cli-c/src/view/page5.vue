<template>
  <div class="page">
    <canvas id="renderCanvas" :style="{width: '800px',height: '400px'}"></canvas>
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
      engine: ""
    };
  },
  props: [],
  mounted() {
    this.initial();
  },

  methods: {
    initial() {
      let _this = this;
      _this.canvas = document.getElementById("renderCanvas");
      // 加载3D引擎
      _this.engine = new BABYLON.Engine(_this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      });

      _this.scene = this.createScene();

      _this.engine.runRenderLoop(function() {
        _this.scene.render();
      });

      window.addEventListener("resize", function() {
        _this.engine.resize();
      });
    },

    createMesh(scene) {

      var a = BABYLON.MeshBuilder.CreateCylinder(
        "a",
        {
          diameter: 1, 
          height: 0.1,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 3
        },
        scene
      );
      var b = BABYLON.MeshBuilder.CreateCylinder(
        "b",
        {
          diameter: 0.7, 
          height: 0.2,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 3
        },
        scene
      );
      a.visibility = 0;
      b.visibility = 0;

      var mat0 = new BABYLON.StandardMaterial("mat0", scene);

      var aCSG = BABYLON.CSG.FromMesh(a);
      var bCSG = BABYLON.CSG.FromMesh(b);

      bCSG.scaling = new BABYLON.Vector3(0.5, 1.5, 0.5);
      var bMesh = bCSG.toMesh("csg6", mat0, scene);
      bMesh.position = new BABYLON.Vector3(0, 0, 0);
      bMesh.visibility = 0

      var cCSG = BABYLON.CSG.FromMesh(bMesh);
      // 
      // var c = bCSG.toMesh("c", mat0, scene);
      // bCSG = BABYLON.CSG.FromMesh(c);
      
      
      var subCSG = aCSG.subtract(cCSG);
      // subCSG.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

      var newMesh = subCSG.toMesh("csg1", mat0, scene);
      newMesh.position = new BABYLON.Vector3(0, 0, 0);

    },

    createScene() {
      let _this = this;
      var scene = new BABYLON.Scene(_this.engine);
      var camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 5,
        Math.PI / 4,
        2,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(_this.canvas, false);
      

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
      
      this.createMesh()

      return scene;
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
