<template>
  <div>
    <!-- card卡片增加视觉感 -->
    <el-card class="box-card" style="">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item title="数据上传" name="1">
          <div style="width: 1200px;margin: 15px;">
            <el-row :gutter="20">
              <el-col :span="15">
                <div style="width:60%;margin:0 auto;">
                  <p>This is of great significance for understanding the occurrence and development mechanism of cancer and promoting the development of precision medicine.</p>
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="fileList"
                    multiple
                  >
                    <i class="el-icon-upload" />
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div slot="tip" class="el-upload__tip">只能上传fastq.gz文件,且不超过500kb</div>
                  </el-upload>
                </div>
              </el-col>
              <el-col :span="6">
                <div style="width:100%;margin:0 auto;margin-top: 80px;">
                  <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="基础质控">
                      <el-switch v-model="form.delivery" />
                    </el-form-item>
                    <el-form-item label="算法">
                      <el-select v-model="form.region" placeholder="请选择算法">
                        <el-option label="spotclean" value="shanghai" />
                        <el-option label="区域二" value="beijing" />
                      </el-select>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">提交</el-button>
                      <el-button>清空</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
        <el-collapse-item title="结果" name="2">
          <div style="width: 1200px;margin: 15px;">
            <div style="width:80%;margin:0 auto;margin-top: 30px;">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%"
              >
                <el-table-column prop="name" label="数据集名称" width="180" />
                <el-table-column prop="date" label="上传时间" width="180" />
                <el-table-column prop="algorithm" label="算法" width="180" />
                <el-table-column
                  prop="state"
                  label="状态"
                  width="100"
                  :filters="[{ text: '成功', value: '成功' }, { text: '失败', value: '失败' }]"
                  :filter-method="filterTag"
                  filter-placement="bottom-end"
                >
                  <template slot-scope="scope">
                    <el-tag
                      :type="scope.row.state === '成功' ? 'success' : 'danger'"
                      disable-transitions
                    >{{ scope.row.state }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100">
                  <template slot-scope="scope">
                    <!-- @click.stop 阻止冒泡事件 -->
                    <el-button type="text" size="small" @click="dialogVisible = true">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!-- 图片预览弹窗 -->
    <el-dialog title="详细信息" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
      <template slot-scope="scope" />

    </el-dialog>

  </div>
</template>
<script>
export default {
  name: '',
  data() {
    return {
      fileList: [{
        name: 'SRR7722937_1.fastq.gz',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        name: 'SRR7722937_1.fastq.gz',
        date: '2024-1-24',
        algorithm: 'spotclean',
        state: '成功'
      }],
      activeNames: ['1']
    }
  },
  methods: {
    setup() {
      const fetchPosts = async() => {
        try {
          const data = await api.getTable() // 调用封装的接口函数
          tableData.value = data
        } catch (error) {
        // 处理错误
        }
      }
    },

    handleChange(val) {
      console.log(val)
    },
    /** 分页 */
    handleSizeChange(val) {
      this.pagesQuery.pageNum = 0
      this.pagesQuery.pageSize = val
      console.log('单页数量', val)
    },
    handleCurrentChange(val) {
      console.log('页数', val)
      this.pagesQuery.pageNum = val
    },

    // 图片预览
    previewImage(imgurl) {
      this.preViewVisible = true
      this.preViewImageUrl = imgurl
    }
  }
}
</script>
<style scoped>
.box-card{
  margin: 20px;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }

</style>
