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

      
        var scene = new BABYLON.Scene(engine);
        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(0, -0.5, -1.0), scene);
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
        camera.setPosition(new BABYLON.Vector3(10, 10, 10));
        light.position = new BABYLON.Vector3(20, 150, 70);
        camera.minZ = 10.0;
        camera.attachControl(canvas, true);
        
        scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);

        var sourceMat = new BABYLON.StandardMaterial("sourceMat", scene);
        sourceMat.wireframe = true;
        sourceMat.backFaceCulling = false;

        var a = BABYLON.Mesh.CreateSphere("sphere", 16, 4, scene);
        var b = BABYLON.Mesh.CreateBox("box", 4, scene);
        var c = BABYLON.Mesh.CreateBox("box", 4, scene);

        // 材料
        a.material = sourceMat;
        b.material = sourceMat;
        c.material = sourceMat;

        a.position.y += 5;
        b.position.y += 2.5;
        c.position.y += 3.5;
        c.rotation.y += Math.PI / 8.0;

        var aCSG = BABYLON.CSG.FromMesh(a);
        var bCSG = BABYLON.CSG.FromMesh(b);
        var cCSG = BABYLON.CSG.FromMesh(c);

        // 多材料
        var mat0 = new BABYLON.StandardMaterial("mat0", scene);
        var mat1 = new BABYLON.StandardMaterial("mat1", scene);

        mat0.diffuseColor.copyFromFloats(0.8, 0.2, 0.2);
        mat0.backFaceCulling = false;

        mat1.diffuseColor.copyFromFloats(0.2, 0.8, 0.2);
        mat1.backFaceCulling = false;

        var subCSG = bCSG.subtract(aCSG);
        var newMesh = subCSG.toMesh("csg", mat0, scene);
        newMesh.position = new BABYLON.Vector3(-10, 0, 0);

        subCSG = aCSG.subtract(bCSG);
        newMesh = subCSG.toMesh("csg2", mat0, scene);
        newMesh.position = new BABYLON.Vector3(10, 0, 0);

        subCSG = aCSG.intersect(bCSG);
        newMesh = subCSG.toMesh("csg3", mat0, scene);
        newMesh.position = new BABYLON.Vector3(0, 0, 10);

        // Submeshes are built in order : mat0 will be for the first cube, and mat1 for the second
        // var multiMat = new BABYLON.MultiMaterial("multiMat", scene);
        // multiMat.subMaterials.push(mat0, mat1);

        // // Last parameter to true means you want to build 1 subMesh for each mesh involved
        // subCSG = bCSG.subtract(cCSG);
        // newMesh = subCSG.toMesh("csg4", multiMat, scene, true);
        // newMesh.position = new BABYLON.Vector3(0, 0, -10);

        return scene;
    };
        // var createScene = function (engine) {
        // // Create the scene space
        // var scene = new BABYLON.Scene(engine);

        // // Add a camera to the scene and attach it to the canvas
        // var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
        // camera.attachControl(canvas, true);

        // // Add lights to the scene
        // var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), scene);
        // light1.diffuse = new BABYLON.Color3(1, 0, 0);
        // light1.specular = new BABYLON.Color3(0, 1, 0);
        // light1.groundColor = new BABYLON.Color3(0, 1, 0);


        // // Add and manipulate meshes in the scene
        // var option = {
        //   diameter: 1.5, //半径
        //   thickness: 0.2,  //厚度
        //   tessellation: 3, //边数
        // }
        // var hoop = BABYLON.MeshBuilder.CreateTorus("hoop", option, scene);

        // return scene;

    // };

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

};
</script>

<style lang="scss" scoped>
</style>
