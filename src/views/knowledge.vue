<template>
  <div>
    <PageHead title="知识文章">
      <template #buttons>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">删除</el-button>
      </template>
    </PageHead>
    <TableSearch :formItem="formItem" @search="handleSearch" />
  </div>
</template>

<script setup name="Knowledge">
import { onMounted, ref, reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { categoryTree, artclePage } from '@/api/admin'

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

const handleSearch = (formData) => {
  console.log(formData, '查询参数')
}

// 分类映射
const categoryMap = reactive({})
// 分类列表
const categoryies = ref([])
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
})
</script>
