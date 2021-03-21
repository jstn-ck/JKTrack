import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/timetrack',
    name: 'Timetrack',
    component: () => import(/* webpackChunkName: "about" */ '../views/Timetrack.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "about" */ '../views/History.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
