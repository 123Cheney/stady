<!-- 发布公告 -->
<template>
  <div class='notice-list'>
    <el-dialog title="公告列表"
               :modal-append-to-body='false'
               :close-on-click-modal='false'
               :visible.sync="visit"
               :before-close='cancel'>
      <div>
        <el-table :data="tableData" 
                  style="width: 100%"
                  row-key="id"
                  :expand-row-keys='expandRow'
                  @row-click='rowClick'>
          <el-table-column type="expand" width="0">
            <template slot-scope="props">
              <div class="expand-content">
                <p>{{ props.row.detail }}</p>
                <h3 @click="shouqi">收起<i class="el-icon-d-arrow-left"></i></h3>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="序号" type="index" width="50">
          </el-table-column>
          <el-table-column label="标题" prop="title">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <button size="mini" class="option-btn"
                @click.stop="handleDelete(scope.row)">删除
              </button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  components: {},
  // props:  {type: Number或[Number, String], default: 0, required: true}
  props: {
    visit: {
      type: Boolean
    }
  },
  data () {
    return {
      expandRow:[],
      tableData: [
        {
          id: '1',
          title: '内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知',
          detail: `内部公告 - 关于国路安疫情期间相关工作`
        },
        {
          id: '2',
          title:'内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知',
          detail: `内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知`
        },
        {
          id: '3',
          title:'内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知',
          detail: `内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知`
        },
        {
          id: '4',
          title:'内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知',
          detail: `内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知`
        },
        {
          id: '5',
          title:'内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知',
          detail: `内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知
                    内部公告 - 关于国路安疫情期间相关工作及薪金发放方案的通知`
        }
      ]
    };
  },
  methods: {
    submit () {
      this.$parent.showListDialog(false);
    },
    cancel () {
      this.$parent.showListDialog(false);
    },
    handleDelete(param){
      console.log(param.id)
    },
    rowClick(param){
      this.expandRow = [param.id];
      console.log(param)
    },
    shouqi(){
      this.expandRow = [];
    }
  },
  computed: {},
  created () {

  },
  mounted () {
    
  },
  beforeDestroy () { }, //生命周期 - 销毁之前
  destroyed () { }, //生命周期 - 销毁完成
  activated () { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
.notice-list {
  /deep/ .el-dialog {
    width: 1080px;
    height: 709px;
    background: rgba(10, 24, 61, 1);
    border: 1px solid rgba(29, 42, 89, 1);
    box-shadow: 0px 10px 13px 0px rgba(8, 17, 40, 0.78);
    border-radius: 8px;
    .el-dialog__header {
      padding-left: 40px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(23, 34, 75, 1);
      .el-dialog__title {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(40, 74, 193, 1);
        line-height: 30px;
        padding-bottom: 5px;
        border-bottom: 2px solid rgba(74, 110, 184, 1);
      }
    }
    .el-dialog__body {
      overflow-y: scroll;
      height: 86%;
      .el-table{
        background: #0a183f !important;
        .el-table__header{
          background: #1f2b55 !important;
          th, tr{
            background: #1f2b55 !important;
            color:rgba(140,170,232,1);
          }
          th{
            border-bottom: none;
          }
        }
        
        .el-table__row{
          background: #0a183f !important;
          color:rgba(140,170,232,1);
          &:hover>td{
            background: #0a183f !important;
            color: #fff;
            background-color: #0c1a51 !important;
          }
          td{
            border-bottom: 1px solid #122243;
            padding: 6px 0;
          }
        }
      }
      .el-table__expanded-cell{
        background:rgba(6,15,47,1);
        width: 1014px;
        border:1px solid rgba(29,42,89,1);
        border-radius:4px;
        color: #fff;
      }
      .expand-content{
        min-height: 100px;
        max-height: 503px;
        padding: 20px;
        overflow-y: scroll;
        p{
          line-height: 30px;
          padding-bottom: 20px;
        }
        h3{
          height: 30px;
          line-height: 30px;
          text-align: center;
          cursor: pointer;
          i{
            margin-left: 10px;
            transform: rotateZ(90deg)
          }
        }
      }
      .option-btn{
        color:rgba(235,118,100,1);
        width:46px;
        height:20px;
        background:rgba(235,118,100,0.2);
        border:1px solid rgba(235,118,100,1);
        border-radius:2px;
        outline: none;
        &:hover{
          color:rgba(255,201,193,1);
          background:rgba(235,118,100,0.6);
        }
        &:active{
          color: #fff;
          background:rgba(235,118,100,1);
        }
      }
    }
  }
}
</style>