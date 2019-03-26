<template>
  <div>
    <el-card class="box-card m20 table160">
      <div slot="header" class="clearfix">
        <span>信息系统项目申报情况</span>
      </div>
      <el-table :data="tableData">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="{ row }">
            <el-input v-if="true" v-model="row.date" size="small" placeholder="请填写预算项目名称"></el-input>
            <span v-else>{{row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="frequency" label="批复时间及文号">
          <template slot-scope="{ row }">
            <el-input v-if="true" v-model="row.frequency" size="small" placeholder="请填写批复时间及文号"></el-input>
            <span v-else>{{row.frequency}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="scale" label="项目预算(万元）">
          <template slot-scope="{ row }">
            <el-input-number v-model="row.scale" controls-position="right" size="small"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column prop="memory" label="资料" width="400">
          <template >
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :limit="2"
              :auto-upload="false"
            >
              <p slot="trigger" class="upload">
                <span>上传项目建议书</span>
              </p>
            </el-upload>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :limit="2"
              :auto-upload="false"
            >
              <p slot="trigger" class="upload">
                <span>上传可行性研究报告</span>
              </p>
            </el-upload>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :limit="2"
              :auto-upload="false"
            >
              <p slot="trigger" class="upload">
                <span>上传初步设计方案</span>
              </p>
            </el-upload>
            <el-upload
              class="upload-demo"
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :limit="2"
              :auto-upload="false"
            >
              <p slot="trigger" class="upload">
                <span>上传竣工验收报告</span>
              </p>
            </el-upload>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "",
          frequency: "", // 系统年度使用频率
          scale: "", //系统用户规模
          memory: "" // 数据存储量大小(GB)
        }
      ]
    };
  },
  props: [],
  methods: {
    searchList() {
      console.log("ddd");
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped>
</style>
