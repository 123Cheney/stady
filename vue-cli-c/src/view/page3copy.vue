<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <div style="float: right; padding: 3px 0">
          <el-button type="text" @click='addItem'>添加</el-button>
          <el-button type="text" @click='deleteItem'>删除</el-button>
          <el-button type="text" @click='saveCard'>保存</el-button>
        </div>
      </div>
      <el-table :data="tableData"  style="width: 100%" @select="handleSelect">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="a" label="项目名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.a" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="b" label="年份" >
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.b" type="year" placeholder="选择年" size="small"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="c" label="项目预算(万元)">
          <template slot-scope="scope">
            <el-input v-model="scope.row.c" size="small"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="d" label="资料">
          <template slot-scope="scope">
            <el-input v-model="scope.row.d" size="small"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <quill-editor v-model="infoForm"
      ref="myQuillEditor"
      class="editer"
      :options="editorOption" @change="onEditorChange($event)" @ready="onEditorReady($event)">
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: {quillEditor},
  data() {
    return {
      infoForm: '',
      editorOption: {
          theme: 'bubble',
          placeholder: "输入备注",
      },
      tableData:[
        {a:'a1',b:'2019',c:'c1',d:'d1'},
        {a:'a2',b:'2018',c:'c2',d:'d2'},
        {a:'1',b:'',c:'',d:''},
        {a:'12',b:'',c:'',d:''},
        {a:'1',b:'',c:'',d:''},
        {a:'1',b:'',c:'',d:''},
      ],
      propTabelData:[
        {type:'', prop:'', label:''}
      ],
      checkedItems:[],
    };
  },
  props: [],
  created(){},
  mounted() {},
  methods: {
     onEditorReady(editor) {
       console.log('editoe',editor)
      },
      onEditorChange(param){
        console.log(param)
      },
    handleSelect(val,row){
      this.checkedItems = val;
    },
    // 添加
    addItem(){
      let canAdd = false;
      if(this.tableData.length==0){
        canAdd=true;
      }else{
        let lastItem = this.tableData[this.tableData.length-1];
        for(var i in lastItem){
          if(lastItem[i]!=''){
            canAdd=true;
          }
        };
      };
      if(canAdd){
        this.tableData.push({a:'',b:'',c:'',d:''});
      }else{
        this.$message({ message: '请先填写空白项',type: 'warning' });
      }
    },
    // 批量删除
    deleteItem(){
      this.tableData.map((value,key)=>{
        this.checkedItems.map((item,index)=>{
          if(item===value){
            this.tableData.splice(key, 1);
            this.deleteItem();
          }
        })
      })
    },
    saveCard(){
      console.log(this.tableData);
    }
  },
  watch: {},
  computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
};
</script>

<style lang="scss" scoped>
/deep/ thead tr th{
  background: #F5F7FA;
}
.quill-editor.editer{
  border: 1px solid red;
  width: 200px;
  height: 200px;
}
</style>
