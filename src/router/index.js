// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/AppDefault.vue'),
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/AppLogin.vue'),
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/AppHome.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("apiToken");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router
