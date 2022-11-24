import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from './views/home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/home/Home.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
