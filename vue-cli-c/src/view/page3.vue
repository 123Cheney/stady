<template>
  <div>
    <quill-editor
      v-model="infoForm"
      ref="myQuillEditor"
      class="editer"
      :options="editorOption"
      @change="onEditorChange($event)"
      @ready="onEditorReady($event)"
    ></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: { quillEditor },
  data() {
    return {
      infoForm: "",
      editorOption: {
        // theme: 'bubble',
        placeholder: "输入备注"
      }
    };
  },
  props: [],
  created() {},
  mounted() {},
  methods: {
    onEditorReady(editor) {
      // console.log("editoe", editor);
    },
    onEditorChange(param) {
      // console.log(param);
    }
  },
  watch: {},
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ thead tr th {
  background: #f5f7fa;
}
.quill-editor.editer {
  // border: 1px solid red;
  width: 800px;
  height: 200px;
}
</style>
