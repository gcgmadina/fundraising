// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHistory } from "@ionic/vue-router"

import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/accountant',
    name: 'Accountant',
    component: () => import('@/pages/accountant/Accountant.vue'),
  },
  {
    path: '/donor',
    name: 'Donor',
    component: () => import('@/pages/donor/Donor.vue'),
  },
  {
    path: '/infaq',
    name: 'Infaq',
    component: () => import('@/pages/donor/InfaqInput.vue'),
  },
  {
    path: '/zakat',
    name: 'Zakat',
    component: () => import('@/pages/donor/ZakatInput.vue'),
  },
  {
    path: '/hibah',
    name: 'Hibah',
    component: () => import('@/pages/donor/HibahInput.vue'),
  },
  {
    path: '/kaffarat',
    name: 'Kaffarat',
    component: () => import('@/pages/donor/KaffaratInput.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/frontend'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
    // next({name: 'Accountant'})
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
