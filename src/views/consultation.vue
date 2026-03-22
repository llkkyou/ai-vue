<template>
  <div>
    <PageHead title="咨询记录" />
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="会话ID" width="100">
        <template #default="scope">
          <el-avatar>{{ scope.row.userNickname }}</el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="情绪日志">
        <template #default="scope">
          <div class="session-title">{{ scope.row.sessionTitle }}</div>
          <div class="session-preview">{{ scope.row.lastMessageContent }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="messageCount" label="消息数" width="100" />
      <el-table-column prop="lastMessageTime" label="时间" width="100" />
      <<el-table-column label="操作" width="100">
        <template #default="scope">
          <el-button type="primary" text @click="viewSessionDetail">详情</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-pagination style="margin-top:25px" :page-size="pagination.size" layout="prev, pager, next"
      :total="pagination.total" @change="handleChange" />
  </div>
</template>

  <script setup name="consultation">
  import { onMounted, ref, reactive } from 'vue'
  import PageHead from '@/components/PageHead.vue'
  import { getConsultationPage } from '@/api/admin'

  const tableData = ref([])
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0
  })

  const viewSessionDetail = () => {
  }

  const handleChange = (page) => {
    pagination.currentPage = page
    handleSearch()
  }

  const handleSearch = () => {
    getConsultationPage(pagination).then(res => {
      const { records, total } = res
      tableData.value = records
      pagination.total = total
    })
  }

  onMounted(() => {
    handleSearch()
  })
</script>



  <style scoped></style>