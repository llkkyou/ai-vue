<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button @click="handleEdit({})" type="primary">新增</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />
    <el-table :data="tableData" style="width: 100%;margin-top: 25px">
      <el-table-column width="500" label="文章标题" fixed="left">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ scope.row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span>{{ categoryMap[scope.row.categoryId] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="authorName" label="作者" width="150" />
      <el-table-column prop="readCount" label="阅读量" width="150" />
      <el-table-column prop="updatedAt" label="发布时间" width="150" />
      <el-table-column label="操作" fixed="right" width="240">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)" text type="primary">编辑</el-button>
          <el-button @click="handlePublish(scope.row)" v-if="scope.row.status === 0 || scope.row.status === 2" text
            type="success">发布</el-button>
          <el-button @click="handleUnpublish(scope.row)" v-if="scope.row.status === 1" text
            type="warning">下线</el-button>
          <el-button @click="handleDelete(scope.row)" text type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top:25px" :page-size="pagination.size" layout="prev, pager, next"
      :total="pagination.total" @change="handleChange" />
    <ArticleDialog v-model:modelValue="dialogVisible" :article="currentArticle" :categoryies="categoryies"
      @success="handleSuccess" />
  </div>
</template>

<script setup name="Knowledge">
import { onMounted, ref, reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { categoryTree, artclePage, getArticleDetail, changeArticleStatus, deleteArticle } from '@/api/admin'
import ArticleDialog from '@/components/ArticleDialog.vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const formItem = [
  { comp: 'input', prop: 'title', label: '文章标题', placeholder: '请输入文章标题' },
  { comp: 'select', prop: 'categoryId', label: '分类', placeholder: '请选择分类' },
  {
    comp: 'select', prop: 'status', label: '状态', placeholder: '请选择状态', options: [
      { label: '草稿', value: 0 },
      { label: '已发布', value: 1 },
      { label: '已下线', value: 2 }
    ]
  }
]

// 分页参数
const pagination = reactive({
  currentPage: 1,
  size: 10,
  total: 0
})

const handleSearch = async (formData = {}) => {
  console.log(formData, '查询参数')
  const params = {
    ...pagination,
    ...formData
  }

  const { records, total } = await artclePage(params)
  // console.log(data, '文章列表')
  tableData.value = records
  pagination.total = total
}

// 分页改变
const handleChange = (page) => {
  pagination.currentPage = page
  handleSearch()
}

// 分类映射
const categoryMap = reactive({})
// 分类列表
const categoryies = ref([])
// 列表数据
const tableData = ref([])

// 新增和编辑
const dialogVisible = ref(false)
const currentArticle = ref(null)
const handleSuccess = () => {
  dialogVisible.value = false
  // 刷新列表
  handleSearch()
}
const handleEdit = (row) => {
  // console.log(row, '11111111111')
  if (!row.id) {
    // 新增
    currentArticle.value = null
    dialogVisible.value = true
  } else {
    // 编辑
    getArticleDetail(row.id).then(res => {
      currentArticle.value = res
      dialogVisible.value = true
    })
  }
}

// 发布
const handlePublish = (row) => {
  // console.log(row, '发布')
  ElMessageBox.confirm(
    `确定发布文章${row.title}吗？`,
    '确认',
    {
      confirmButtonText: '确认发布',
      cancelButtonText: '取消',
      type: 'info'
    }
  ).then(() => {
    // 发布文章
    changeArticleStatus(row.id, { status: 1 }).then(res => {
      ElMessage.success('发布成功')
      handleSearch()
    })
  })
}
// 下线
const handleUnpublish = (row) => {
  // console.log(row, '下线')
  ElMessageBox.confirm(
    `确定下线文章${row.title}吗？`,
    '确认',
    {
      confirmButtonText: '确认下线',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    // 下线文章
    changeArticleStatus(row.id, { status: 2 }).then(res => {
      ElMessage.success('下线成功')
      handleSearch()
    })
  })
}

// 删除
const handleDelete = (row) => {
  // console.log(row, '删除')
  ElMessageBox.confirm(
    `确定删除文章${row.title}吗？`,
    '确认',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'danger'
    }
  ).then(() => {
    // 删除文章
    deleteArticle(row.id).then(res => {
      ElMessage.success('删除成功')
      handleSearch()
    })
  })
}



onMounted(async () => {
  const data = await categoryTree()
  // console.log(data, '分类树')
  categoryies.value = data.map(item => {
    categoryMap[item.id] = item.categoryName
    return {
      label: item.categoryName,
      value: item.id
    }
  })
  formItem[1].options = categoryies.value

  // 获取列表
  handleSearch()
})
</script>
