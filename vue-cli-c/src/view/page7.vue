<template>
  <div class="page">
    <!-- <canvas id="renderCanvas"></canvas> -->
    <canvas id="renderCanvas" :style="{width: '800px',height: '400px'}"></canvas>
  </div>
</template>



<script>
import * as BABYLON from "babylonjs";
export default {
  components: {},
  data() {
    return {};
  },
  props: [],
  mounted() {
    var canvas = document.getElementById("renderCanvas");
    // 加载3D引擎
    var engine = new BABYLON.Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true
    });
    // CreateScene function that creates and return the scene
    var createScene = function () {

    // Create the scene space
    var scene = new BABYLON.Scene(engine);

    // Add a camera to the scene and attach it to the canvas
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas, true);

    // Add lights to the scene
    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
    var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), scene);

    // 灯光设置颜色
    // light1.diffuse = new BABYLON.Color3(1, 0, 0);
    // light1.specular = new BABYLON.Color3(0, 1, 0);
    // light1.groundColor = new BABYLON.Color3(0, 1, 0);

  //  var plane1 = BABYLON.MeshBuilder.CreatePlane("plane", {width: 0.2, size:0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
  //      plane1.position.x= 0.1;
  //  var plane2 = BABYLON.MeshBuilder.CreatePlane("plane", {width: 0.2, size:0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE}, scene);
 

      var a = BABYLON.MeshBuilder.CreateCylinder("a", {  diameter:0.4, height: 0.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE,tessellation: 96}, scene);
      var b = BABYLON.MeshBuilder.CreateCylinder("b", {  diameter:0.6, height: 0.5, sideOrientation: BABYLON.Mesh.DOUBLESIDE,tessellation: 96}, scene);
      var c = BABYLON.MeshBuilder.CreateCylinder("c", {  diameter:0.6, height: 0.6, sideOrientation: BABYLON.Mesh.DOUBLESIDE,tessellation:4,}, scene)

      // var c = BABYLON.MeshBuilder.CreateBox("c", {  height: 0.25, diameterTop: 0, diameterBottom: 0.8}, scene)
      // c.position.x = -0.5;
      // c.rotation.z = Math.PI/2
      // console.log(c)
      a.position.x = 0.7;
      b.position.x = 0.7;
      c.position.x = -0.7;
      c.position.y = 0.3;
      // a.visibility = 0
      // b.visibility = 0
      // c.visibility = 0
      console.log(a)

      var mat0 = new BABYLON.StandardMaterial("mat0", scene);
      var aCSG = BABYLON.CSG.FromMesh(a);
      var bCSG = BABYLON.CSG.FromMesh(b);
      var cCSG = BABYLON.CSG.FromMesh(c);

      var subCSG = bCSG.subtract(aCSG);
      var newMesh = subCSG.toMesh("csg1", mat0,scene);
      newMesh.position = new BABYLON.Vector3(0.5, 0, 0);
      newMesh.visibility = 0

      var clone = subCSG.clone();
      clone = subCSG.toMesh("csg2", mat0,scene);
      clone.visibility = 0
      clone.position = new BABYLON.Vector3(-0.5, 0, 0);

      var ccc = BABYLON.CSG.FromMesh(clone);

      subCSG = ccc.subtract(cCSG);
      newMesh = subCSG.toMesh("csg3", mat0,scene);
      newMesh.position = new BABYLON.Vector3(0, 0, 0);



      // subCSG = bCSG.subtract(cCSG);
      // newMesh = subCSG.toMesh("csg2", mat0,scene);
      // newMesh.position = new BABYLON.Vector3(-0.5, 0, 0);


      // console.log(cone1.material)
    

    return scene;

};

    var scene = createScene();

    //在canvas中渲染这个场景（注意渲染是一个定时循环)
    engine.runRenderLoop(function() {
      scene.render();
    });

    window.addEventListener("resize", function() {
      engine.resize();
    });
  },

  methods: {},
  watch: {},
  computed: {}







  // var faceColors = [];
		// 		faceColors[0] = new Color4(206, 168, 48, 1.0);
		// 		faceColors[1] = new Color4(206, 168, 48, 1.0);
		// 		faceColors[2] = new Color4(206, 168, 48, 1.0);
};
</script>

<style lang="scss" scoped>
</style>
