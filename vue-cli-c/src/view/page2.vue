<template>
  <div class="pie-3d">
    <canvas touch-action="none" :id="option.id" :style="{width: option.width, height: option.height}"></canvas>
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
        id: 'two',
        width: '480px',
        height: '400px',
        centerColor: [0.2, 0.4, 0.5],
      },
      pieData: [
        {
          name: '项目1',
          color: [0.2, 0.6, 0.4],
          opctity: 1,
          value: 30
        },
        {
          name: '项目2',
          color: [0.2, 0.4, 0.5],
          opctity: 1,
          value: 60
        },
        {
          name: '项目3',
          color: [0.6, 0.4, 0.6],
          opctity: 1,
          value: 40
        },
        {
          name: '项目4',
          color: [0.4, 0.2, 0.3],
          opctity: 1,
          value: 100
        }
      ],
    };
  },
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

      _this.scene = this.createScene();

      _this.engine.runRenderLoop(function() {
        _this.scene.render();
      });

      window.addEventListener("resize", function() {
        _this.engine.resize();
      });
    },

    createArc(scene, arc, height, rotationY, py, color3, opcity=1 ) {
      let gap = 0;
      if(arc>Math.PI){
        gap = 0;
      }else{
        gap = 0.01;
      };

      var a = BABYLON.MeshBuilder.CreateCylinder(
        "a",
        {
          diameter: 0.4, //内半径
          // height: 0.6,
          height: height+0.01,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var b = BABYLON.MeshBuilder.CreateCylinder(
        "b",
        {
          diameter: 0.6, //外半径
          // height: 0.5,
          height: height,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var c = BABYLON.MeshBuilder.CreateBox(
        "c",
        { width: 0.6, depth: 0.6, 
        // height: 0.6 },
        height: height+0.01 },
        scene
      );
      a.position.x = 0.8;
      b.position.x = 0.8;
      c.position.x = -0.3;
      a.visibility = 0;
      b.visibility = 0;
      c.visibility = 0;

      var mat0 = new BABYLON.StandardMaterial("mat0", scene);
      // mat0.diffuseColor = new BABYLON.Color3(color3[0], color3[1], color3[2]);

      var aCSG = BABYLON.CSG.FromMesh(a);
      var bCSG = BABYLON.CSG.FromMesh(b);
      var cCSG = BABYLON.CSG.FromMesh(c);

      // 合成中间空心圆柱体
      var subCSG = bCSG.subtract(aCSG);
      var newMesh = subCSG.toMesh("csg1", mat0, scene);
      newMesh.position = new BABYLON.Vector3(0, 0, 0);
      newMesh.visibility = 0;

      // 转成CSG
      var newCSG = BABYLON.CSG.FromMesh(newMesh);

      // 合成半圆（空心圆柱+c）
      subCSG = newCSG.subtract(cCSG);
      newMesh = subCSG.toMesh("csg2", mat0, scene);
      newMesh.position = new BABYLON.Vector3(0, 0, 0);

      var A = BABYLON.MeshBuilder.CreateCylinder(
        "A",
        {
          diameter: 0.4-gap, //内半径
          // height: 0.61,
          height: height+gap+0.01,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var B = BABYLON.MeshBuilder.CreateCylinder(
        "B",
        {
          diameter: 0.6+gap, //外半径
          // height: 0.51,
          height: height+gap,
          sideOrientation: BABYLON.Mesh.DOUBLESIDE,
          tessellation: 96
        },
        scene
      );
      var C = BABYLON.MeshBuilder.CreateBox(
        "C",
        { width: 0.61, depth: 0.61, 
        // height: 0.61 },
        height: height+gap+0.01, },
        scene
      );
      A.position.x = 0.8;
      B.position.x = 0.8;
      C.position.x = -0.3;
      A.visibility = 0;
      B.visibility = 0;
      C.visibility = 0;

      var ACSG = BABYLON.CSG.FromMesh(A);
      var BCSG = BABYLON.CSG.FromMesh(B);
      var CCSG = BABYLON.CSG.FromMesh(C);

      // 合成中间空心圆柱体
      var SubCSG = BCSG.subtract(ACSG);
      var NewMesh = SubCSG.toMesh("Csg1", mat0, scene);
      NewMesh.position = new BABYLON.Vector3(0, 0, 0);
      NewMesh.visibility = 0;

      // 转成CSG
      var NewCSG = BABYLON.CSG.FromMesh(NewMesh);

      // 合成半圆（空心圆柱+c）
      SubCSG = NewCSG.subtract(CCSG);
      NewMesh = SubCSG.toMesh("Csg2", mat0, scene);
      NewMesh.position = new BABYLON.Vector3(0, 0, 0);
      if(arc >0 && arc <= Math.PI ){
        NewMesh.rotation.y = arc;
      }else{
        NewMesh.rotation.y = arc + Math.PI ;
      };

      newMesh.visibility = 0;
      NewMesh.visibility = 0;

      var lastCSG = BABYLON.CSG.FromMesh(newMesh);
      var LastCSG = BABYLON.CSG.FromMesh(NewMesh);

      if(this.pieData){
        this.pieData.map((item,index)=>{
          if(arc >0 && arc <= Math.PI ){
            subCSG = lastCSG.subtract(LastCSG);
          }else{
            subCSG = lastCSG.union(LastCSG);
          }
          mat0.diffuseColor = new BABYLON.Color3(item.color[0], item.color[1], item.color[2]);
          newMesh = subCSG.toMesh("csga"+index, mat0, scene);
          newMesh.position = new BABYLON.Vector3(0, 0+py, 0);
          newMesh.rotation.y = rotationY+index+2;
          newMesh.visibility = opcity;
        })
      }
      

      // if(arc >0 && arc <= Math.PI ){
      //   subCSG = lastCSG.subtract(LastCSG);
      // }else{
      //   subCSG = lastCSG.union(LastCSG);
      // }
      // newMesh = subCSG.toMesh("csg2", mat0, scene);
      // newMesh.position = new BABYLON.Vector3(0, 0+py, 0);
      // newMesh.rotation.y = rotationY;
      // newMesh.visibility = opcity;

    },

    createScene() {
      let { centerColor } = this.option;
      let _this = this;
      var scene = new BABYLON.Scene(_this.engine);
      var camera = new BABYLON.ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI /3,
        2,
        BABYLON.Vector3.Zero(),
        scene
      );
      camera.attachControl(_this.canvas, true);
      // camera.target = new BABYLON.Vector3(-10, 0, 0);
      // camera.position = new BABYLON.Vector3(0, 0, 2);
      // camera.targetScreenOffset = new BABYLON.Vector2(-0.5, 0);

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
      
      // *************************
      // const turret = BABYLON.MeshBuilder.CreateSphere('turret', {segments: 16, diameter: .5});
      // var turretPivot = new BABYLON.TransformNode("pivot", scene);
      // turret.parent = turretPivot;
      // turret.position.z = 1.5;
      // turretPivot.parent = sphere;
      
      //**************************

      // ~~~~~~~~~~~~~~~~~~~~~~~~~~
      // 中间圆柱
      var sourceMat = new BABYLON.StandardMaterial("sourceMat", scene);
      sourceMat.diffuseColor.copyFromFloats(108/255, 111/255, 181/255)
      var center = BABYLON.MeshBuilder.CreateCylinder("center", { diameter: 0.2,  height: 0.3, sideOrientation: BABYLON.Mesh.DOUBLESIDE, tessellation: 96 }, scene );
      center.material = sourceMat;
      center.position.y = 0.05;
      camera.setTarget(center)
      camera.lockedTarget = center
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~

      // this.formatData(scene)
      // 弧度，高度，角度，位置，颜色，透明度
      this.createArc(scene, Math.PI/180*(75), 0.2, Math.PI/180*(0), 0, [0.2, 0.3, 0.4], 1);

      return scene;
    },

    formatData(scene){
      if(this.pieData){
        let sum = 0;
        let flag = 0;
        this.pieData.map(item=>{
          sum += item.value;
        });
        this.pieData.map((item,index)=>{
          item.arc = (item.value)/sum*360;
          this.createArc(scene, Math.PI/180*(item.arc), 0.2+index/10, Math.PI/180*(flag), 0+index/20, item.color, item.opctity);
          flag += item.arc;
        })
      }
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>
