import { createRouter, createWebHistory } from 'vue-router'
import BackendLayout from '@/components/BackendLayout.vue'
import AuthLayout from '@/components/AuthLayout.vue'
import FrontendLayout from '@/components/FrontendLayout.vue'

// 路由配置
const backhandRoutes = [
  {
    path: '/back',
    redirect: '/back/dashboard',
    component: BackendLayout,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard.vue'),
        meta: {
          title: '数据分析',
          icon: 'PieChart'
        }
      },
      {
        path: 'knowledge',
        component: () => import('@/views/knowledge.vue'),
        meta: {
          title: '知识文章',
          icon: 'ChatLineSquare'
        }
      },
      {
        path: 'consultations',
        component: () => import('@/views/consultations.vue'),
        meta: {
          title: '咨询记录',
          icon: 'Message'
        }
      },
      {
        path: 'emotional',
        component: () => import('@/views/emotional.vue'),
        meta: {
          title: '情绪日志',
          icon: 'User'
        }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
          title: '登录'
        }
      }, {
        path: 'register',
        component: () => import('@/views/register.vue'),
        meta: {
          title: '注册'
        }
      }
    ]
  }
]

const frontendRoutes = [
  {
    path: '/',
    component: FrontendLayout,
    children: [
      {
        path: '/',
        component: () => import('@/views/home.vue'),
      }, {
        path: 'consultation',
        component: () => import('@/views/frontendConsultation.vue'),
      }, {
        path: 'emotion-diary',
        component: () => import('@/views/frontendEmotionDiary.vue'),
      }, {
        path: 'knowledges',
        component: () => import('@/views/frontendKnowledge.vue'),
      },

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: [...backhandRoutes, ...frontendRoutes]
})

/* // 路由前置守卫
router.beforeEach((to, from, next) => {
  // 检查是否有token
  const token = localStorage.getItem('token')
  if (token) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // 如果是后台用户
    if (userInfo.userType === 2) {
      if (to.path === '/back') {
        next()
      } else {
        next('/auth/dashboard')
      }
    } else if (userInfo.userType === 1) {

    }
  } else {
    if (to.path === '/back') {
      // 如果是访问后台页面，跳转到登录页
      next('/auth/login')
    } else {
      // 如果是访问其他页面，跳转到登录页
      next('/auth/login')
    }
  }
}) */

export default router
