import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/LandingPage.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Authentication.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue')
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/TicketManagement.vue')
    },
  ]
})

export default router
