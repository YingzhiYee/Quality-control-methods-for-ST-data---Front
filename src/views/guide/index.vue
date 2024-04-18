<template>
  <div>
    <!-- card卡片增加视觉感 -->
    <el-card class="box-card">
      <!-- tabs切换 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item label="名称">
                <el-input v-model="form.name" placeholder="请输入数据集名称" clearable prefix-icon="el-icon-search" />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item label="状态">
                <el-select v-model="form.pname" placeholder="请选择处理状态">
                  <el-option label="成功" value="first" />
                  <el-option label="失败" value="second" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form :label-position="labelPosition" label-width="80px" :model="form">
              <el-form-item label="处理日期">
                <el-date-picker v-model="form.start" type="date" placeholder="选择日期" style="width: 100%;" />
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
      <el-button type="primary" icon="el-icon-search" style="margin-bottom: 10px;text-align: center; margin-right: 20px;">搜索</el-button>
      <el-button icon="el-icon-refresh-left" style="margin-bottom: 10px; text-align: center; margin-right: 40px;">重置</el-button>
      <!-- 表格 -->
      <el-table :data="dataList" border style="width: 100%" size="small" max-height="680px" @row-click="goDetails">
        <el-table-column label="数据集名称" align="center" show-overflow-tooltip prop="name" />
        <el-table-column label="上传时间" align="center" prop="startdate" />
        <el-table-column label="结束时间" align="center" prop="enddate" />
        <el-table-column label="使用算法" align="center" prop="algorithm" />
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
        <el-table-column label="聚类图" align="center" prop="pic" />
        <el-table-column label="操作" align="center" fixed="right" width="100">
          <template slot-scope="scope">
            <!-- @click.stop 阻止冒泡事件 -->
            <el-button type="text" size="small" @click="dialogVisible = true">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      form: {
        name: '',
        id: '',
        pname: '',
        department: '',
        start: '',
        end: ''
      },
      dialogVisible: false,
      tabPosition: 'top',
      dateArray: [1], // 选择时间
      // 查询参数
      queryParams: {
        shopName: '',
        status: 0,
        startTime: '',
        endTime: ''
      },
      // 分页参数
      pagesQuery: {
        pageNum: 1,
        pageSize: 0,
        total: 1
      },
      statusOptions: [
        {
          value: 0,
          label: '全部'
        },
        {
          value: 1,
          label: '来源1'
        },
        {
          value: 2,
          label: '来源2'
        }
      ],
      dataList: [{
        name: 'SRR7722937_1.fastq.gz',
        startdate: '2024-1-24 20:30:12',
        enddate: '2024-1-24 20:32:01',
        state: '成功',
        pic: '',
        algorithm: 'spotclean'
      }, {
        name: 'test.txt',
        startdate: '2024-1-24 20:29:12',
        enddate: '',
        state: '失败',
        pic: '',
        algorithm: ''
      }, {
        name: 'SRR7722937_2.fastq.gz',
        startdate: '2024-1-24 20:45:13',
        enddate: '2024-1-24 20:47:15',
        state: '成功',
        pic: '',
        algorithm: 'spotclean'
      }, {
        name: 'SRR7722937_3.fastq.gz',
        startdate: '2024-1-25 00:07:35',
        enddate: '2024-1-25 00:09:02',
        state: '成功',
        pic: '',
        algorithm: 'spotclean'
      }, {
        name: 'YX-Endo-Decidu_S1_L001_I1_001.fastq.gz',
        startdate: '2024-1-25 00:10:03',
        enddate: '2024-1-25 00:12:35',
        state: '成功',
        pic: '',
        algorithm: 'spotclean'
      }, {
        name: 'YX-Endo-Decidu_S1_L001_R1_001.fastq.gz',
        startdate: '2024-1-25 10:30:23',
        enddate: '2024-1-25 10:33:01',
        state: '成功',
        pic: '',
        algorithm: 'spotclean'
      },
      {
        name: 'YX-Endo-Decidu_S1_L001_R2_001.fastq.gz',
        startdate: '2024-1-25 10:40:06',
        enddate: '2024-1-25 10:42:41',
        state: '成功',
        pic: '',
        algorithm: 'spotclean'
      }],
      // 图片预览
      preViewVisible: false,
      preViewImageUrl: ''
    }
  },
  methods: {
    setup() {
    const fetchPosts = async () => {
      try {
        const data = await api.getData(); // 调用封装的接口函数
        dataList.value = data;
      } catch (error) {
        // 处理错误
      }
  } 
  },
    // tabs切换
    changeTabs(e) {
      console.log('tabs切换', e)
    },

    // 选择日期
    changeDate(e) {
      console.log('changeDate 时间选择 ->', e)
      if (e) {
        this.queryParams.startTime = e[0]
        this.queryParams.endTime = e[1]
      } else {
        this.queryParams.startTime = ''
        this.queryParams.endTime = ''
      }
    },

    /** 搜索按钮操作 */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("搜索 submit!");
          console.log('搜索 queryParams -> ', this.queryParams)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    /** 重置表单
     * 1、this.$refs 这个是必须dom渲染完成后。且表单需要有ref，formName的名字记得一致
     * 2、需要完整 el-form及 form-item 组件中 且 配置 prop，不配置的执行此方法，该输入框值不会重置。
     */
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
      console.log('重置后数据：', this.queryParams)
    },

    // select切换选中
    changeSelect(e) {
      console.log('changeSelect->', e)
    },

    /** 跳转到详情页面*/
    goDetails(row) {
      console.log('获取行 row 数据->', row)
      // this.$router.push({ path: "/marketManage/worthitDetails?id=" + row });
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
