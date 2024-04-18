<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item,index) of timeline" :key="index" :timestamp="item.timestamp" placement="top">
        <el-card>
          <h4>{{ item.title }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          timestamp: '2024/4/10',
          title: 'SpotClean',
          content: 'LiYunbing committed 2024/4/10 13:46'
        },
        {
          timestamp: '2024/3/20',
          title: 'Controller',
          content: 'LiYunbing committed 2024/3/20 08:21'
        },
        {
          timestamp: '2024/1/15',
          title: 'Build Template',
          content: 'LiYunbing committed 2024/1/15 14:05'
        },
        {
          timestamp: '2023/11/19',
          title: 'Test Data',
          content: 'LiYunbing committed 2023/11/19 09:34'
        }
      ]
    }
  },
  methods: {
    setup() {
      const fetchPosts = async() => {
        try {
          const data = await api.getTime() // 调用封装的接口函数
          timeline.value = data
        } catch (error) {
        // 处理错误
        }
      }
    }
  }
}
</script>
