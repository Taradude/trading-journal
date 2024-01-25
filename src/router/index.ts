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
      },
      {
        path: '/trades',
        name: 'MyTrades',
        component: () => import('@/views/MyTrades.vue'),
      },
      {
        path: '/dashboard',
        name: 'DashBoard',
        component: () => import('@/views/DashBoardView.vue'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
