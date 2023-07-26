import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: {
        isRequiredAuth: true
      },
      children: [
        {
          path: '',
          name: 'adminHome',
          component: () => import('../views/Admin/AdminHome.vue')
        },
        {
          path: '/admin-add-food',
          name: 'adminFoodAdd',
          component: () => import('../views/Admin/AdminAddFood.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isUserAuthenticated = false
  const isRequiredAuth = to.matched.some((record) => record.meta.isRequiredAuth)

  if (isRequiredAuth && !isUserAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
