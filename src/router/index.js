// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/AppDefault.vue'),
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('@/views/AppLogin.vue'),
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/AppHome.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
