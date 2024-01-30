import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainLayout from '@/Layouts/MainLayout.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'HomeView',
        component: () => import('@/views/HomeView.vue'),
        meta: { transition: 'fade' },
      },
      {
        path: '/trades',
        name: 'MyTrades',
        component: () => import('@/views/MyTrades.vue'),
        meta: { transition: 'slide-left' },
      },
      {
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('@/views/DashBoardView.vue'),
        meta: { transition: 'slide-right' },
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
