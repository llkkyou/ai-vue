# 心语AI心理健康平台

## 项目介绍

心语AI心理健康平台是一个面向用户提供心理健康服务的综合性平台，包含用户端和管理端两大模块。平台采用前后端分离架构，通过AI助手为用户提供实时的心理健康支持和建议。

### 核心功能

**用户端：**
- AI心理咨询：基于SSE技术的实时流式对话，支持打字机效果和会话历史管理
- 情绪日记：记录用户情绪状态，提供情绪分析和改善建议
- 心理健康知识库：提供专业的心理健康知识文章，支持分类浏览和搜索
- 情绪花园：通过多维度展示用户情绪状态，帮助用户了解自身情绪变化

**管理端：**
- 数据分析：集成ECharts实现数据可视化，展示平台运营数据
- 知识文章管理：支持文章的创建、编辑、发布和删除
- 咨询记录管理：查看和管理用户的咨询会话记录
- 情绪日志管理：查看和分析用户的情绪日记数据

## 技术栈

- **前端框架：** Vue 3 + Vite
- **UI组件库：** Element Plus
- **路由：** Vue Router
- **状态管理：** Pinia
- **网络请求：** Axios
- **数据可视化：** ECharts
- **富文本编辑：** WangEditor
- **实时通信：** SSE (Server-Sent Events)
- **样式：** SCSS

## 项目结构

```
src/
├── api/              # API接口封装
│   ├── admin.js      # 管理端接口
│   └── frontend.js   # 用户端接口
├── assets/           # 静态资源
│   └── images/       # 图片资源
├── components/       # 公共组件
│   ├── ArticleDialog.vue     # 文章编辑对话框
│   ├── AuthLayout.vue        # 认证页面布局
│   ├── BackendLayout.vue     # 管理端布局
│   ├── FrontendLayout.vue    # 用户端布局
│   ├── MarkdownRenderer.vue  # Markdown渲染组件
│   ├── Navbar.vue            # 导航栏组件
│   ├── PageHead.vue          # 页面标题组件
│   ├── RichTextEditor.vue     # 富文本编辑器组件
│   ├── Sidebar.vue           # 侧边栏组件
│   └── TableSearch.vue        # 表格搜索组件
├── config/           # 配置文件
│   └── index.js      # 全局配置
├── router/           # 路由配置
│   └── index.js      # 路由定义和守卫
├── stores/           # Pinia状态管理
│   └── admin.js      # 管理端状态
├── utils/            # 工具函数
│   └── request.js    # Axios请求封装
├── views/            # 页面组件
│   ├── consultations.vue        # 咨询记录管理
│   ├── dashboard.vue            # 数据分析看板
│   ├── emotional.vue            # 情绪日志管理
│   ├── frontendConsultation.vue # AI咨询页面
│   ├── frontendEmotionDiary.vue # 情绪日记页面
│   ├── frontendKnowledge.vue    # 知识库页面
│   ├── home.vue                 # 首页
│   ├── knowledge.vue            # 知识文章管理
│   ├── login.vue                # 登录页
│   └── register.vue             # 注册页
├── App.vue           # 根组件
└── main.js           # 入口文件
```

## 安装和运行

### 前提条件

- Node.js 20.19.0 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 主要API

### 用户端API

| 接口 | 方法 | 描述 |
|------|------|------|
| `/user/add` | POST | 用户注册 |
| `/psychological-chat/session/start` | POST | 开始新会话 |
| `/psychological-chat/sessions` | GET | 获取会话列表 |
| `/psychological-chat/sessions/{id}/messages` | GET | 获取会话消息 |
| `/psychological-chat/sessions/{id}/emotion` | GET | 获取会话情绪分析 |
| `/emotion-diary` | POST | 添加情绪日记 |
| `/knowledge/article/page` | GET | 获取文章列表 |
| `/knowledge/article/{id}` | GET | 获取文章详情 |

### 管理端API

| 接口 | 方法 | 描述 |
|------|------|------|
| `/user/login` | POST | 用户登录 |
| `/user/logout` | POST | 用户登出 |
| `/knowledge/category/tree` | GET | 获取分类树 |
| `/knowledge/article/page` | GET | 获取文章列表 |
| `/knowledge/article` | POST | 创建文章 |
| `/knowledge/article/{id}` | GET | 获取文章详情 |
| `/knowledge/article/{id}` | PUT | 更新文章 |
| `/knowledge/article/{id}/status` | PUT | 更改文章状态 |
| `/knowledge/article/{id}` | DELETE | 删除文章 |
| `/psychological-chat/sessions` | GET | 获取咨询会话列表 |
| `/psychological-chat/sessions/{id}/messages` | GET | 获取会话消息 |
| `/emotion-diary/admin/page` | GET | 获取情绪日记列表 |
| `/emotion-diary/admin/{id}` | DELETE | 删除情绪日记 |
| `/data-analytics/overview` | GET | 获取数据分析概览 |

## 项目亮点

1. **AI实时流式对话**：基于SSE技术实现AI心理咨询的流式响应，用户可实时看到AI的回复内容，提升交互体验；封装了完整的对话状态管理，支持打字机效果、错误重试、会话历史保存等功能。

2. **情绪可视化分析**：开发情绪花园模块，通过情绪分数、风险等级、改善建议等多维度展示用户情绪状态；集成ECharts实现数据可视化，帮助用户直观了解自身情绪变化趋势。

3. **双端权限管理系统**：设计并实现用户端/管理端双角色权限体系，基于Vue Router路由守卫实现权限控制，不同角色访问不同功能模块，确保系统安全性。

4. **模块化API封装**：基于Axios封装请求/响应拦截器，统一处理请求头token注入、错误提示、响应数据格式化；按功能模块拆分API接口，提高代码可维护性和复用性。

5. **Markdown渲染与富文本编辑**：开发MarkdownRenderer组件解析AI回复的Markdown内容，支持代码块、列表等格式；集成WangEditor富文本编辑器，实现知识文章的可视化编辑，提升内容管理效率。

6. **响应式布局设计**：基于Element Plus组件库的响应式能力，实现了基础的响应式布局；通过flex布局和容器最大宽度限制，确保在不同屏幕尺寸下的布局合理性；优化了导航栏和内容区域的布局结构，提升了跨设备的可用性。

## 路由配置

### 用户端路由
- `/` - 首页
- `/consultation` - AI咨询页面
- `/emotion-diary` - 情绪日记页面
- `/knowledges` - 知识库页面
- `/knowledge/article/:id` - 文章详情页

### 管理端路由
- `/back/dashboard` - 数据分析看板
- `/back/knowledge` - 知识文章管理
- `/back/consultations` - 咨询记录管理
- `/back/emotional` - 情绪日志管理

### 认证路由
- `/auth/login` - 登录页
- `/auth/register` - 注册页

## 状态管理

使用Pinia进行状态管理，目前包含以下store：

- **admin** - 管理端状态，包含侧边栏展开收起状态

## 环境变量

项目使用Vite的环境变量配置，可在`.env`文件中设置：

```
VITE_API_BASE_URL=/api  # API基础路径
```

## 注意事项

1. **登录状态管理**：登录后token存储在localStorage中，过期时间由后端控制。

2. **响应式数据**：使用Vue 3的Composition API和ref/reactive实现响应式数据管理。

3. **错误处理**：统一在Axios响应拦截器中处理错误，包括登录过期、网络错误等。

4. **图片资源**：静态图片资源放在`src/assets/images`目录下，通过`new URL()`方式导入。

5. **样式管理**：使用SCSS预处理器，支持嵌套、变量等特性。

## 许可证

MIT License


