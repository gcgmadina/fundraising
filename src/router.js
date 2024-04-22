// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHistory } from "@ionic/vue-router"

import { session } from './data/session'
import { userResource } from '@/data/user'
import { inject } from 'vue'  

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/donor',
    component: () => import('@/pages/Home.vue'),
  },
  {
    path: '/secretary',
    children: [
      {
        path: '',
        name: 'secretary',
      },
      {
        path: '/event-input',
        name: 'EventInput',
        component: () => import('@/pages/secretary/EventInput.vue'),
        meta: { 
          auth: true,
          roles: ['Non Profit Secretary']
        },
      },
    ],
  },
  {
    path: '/donor',
    children: [
      {
        path: '',
        name: 'DonorHome',
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
        path: '/event',
        children: [
          {
            path: '',
            name: 'EventList',
            component: () => import('@/pages/donor/ListEvent.vue'),
          },
          {
            path: ':id',
            name: 'EventDetail',
            component: () => import('@/pages/donor/EventDetail.vue'),
          },
        ],
      },
      {
        path: '/donation',
        children: [
          {
            path: '',
            name: 'Donation',
            component: () => import('@/pages/donor/ListDonationEvent.vue'),
          },
          {
            path: 'specific-donation/:id',
            name: 'SpecificDonation',
            component: () => import('@/pages/donor/SpecificDonationInput.vue'),
          },
        ],
      },      
    ],
  },
  {
    path: '/history',
    meta: { auth: true },
    children: [
      {
        path: '',
        name: 'History',
        component: () => import('@/pages/donor/History.vue'),
      },
      {
        path: ':id',
        name: 'DonationDetail',
        component: () => import('@/pages/donor/DonationDetail.vue'),
      },
    ],
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('@/pages/Account.vue'),
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
  let user = inject('$user')
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.meta.auth && !isLoggedIn) {
    next({ name: 'Login' })
  } else if (to.meta.roles && !to.meta.roles.includes(user.role)) {
    next({ name: 'Home' })
  } else {
    next()
  }

  // if (to.name === 'Login' && isLoggedIn) {
  //   next({ name: 'Donor' })
  //   // next({name: 'Accountant'})
  // } else if (to.name !== 'Login' && !isLoggedIn) {
  //   next({ name: 'Login' })
  // } else {
  //   next()
  // }
})

export default router
