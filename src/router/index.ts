import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { FilterRouterArr, LOGIN, ROOT_PAGE_NAME } from '@/router/constant';
import { App } from 'vue';
import User from '../views/userList.vue'
import Book from '../views/bookList.vue'
import Welcome from '../views/welcome.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/users',
    name: 'users',
    redirect:'/welcome',
    component: () => import('../views/users.vue') ,
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/user', component: User },
      { path: '/book', component: Book },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})




export default router
