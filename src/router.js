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
    meta: {
      auth: true,
      roles: ['Non Profit Secretary']
    },
    children: [
      {
        path: '',
        name: 'secretary',
        component: () => import('@/pages/secretary/SecretaryMenu.vue'),
      },
      {
        path: 'event-input',
        name: 'EventInput',
        component: () => import('@/pages/secretary/EventInput.vue'),
      },
      {
        path: 'item-group',
        name: 'ItemGroups',
        component: () => import('@/pages/secretary/ItemGroupList.vue'),
      },
      {
        path: 'items/:group/:assetCategory?',
        name: 'Items',
        component: () => import('@/pages/secretary/ItemList.vue'),
        props: true,
      },
      {
        path: 'assets-category',
        name: 'AssetsCategory',
        component: () => import('@/pages/secretary/AssetCategoryList.vue'),
      },
      {
        path: 'add-item/:group/:assetCategory?',
        name: 'AddItem',
        component: () => import('@/pages/secretary/ItemInput.vue'),
        props: true,
      },
      {
        path: 'purchaseHistory',
        name: 'PurchaseHistory',
        component: () => import('@/pages/secretary/PurchaseReceiptList.vue'),
        props: { mode: 'history' },
      },
      {
        path: 'purchaseReceipt/:id',
        name: 'PurchaseReceipt',
        component: () => import('@/pages/secretary/PurchaseReceiptDetail.vue'),
        props: { mode: 'history' },
      },
      {
        path: 'add-purchase-receipt',
        name: 'addPurchaseReceipt',
        component: () => import('@/pages/secretary/PurchaseReceiptInput.vue')
      },
      {
        path: 'address',
        name: 'Address',
        component: () => import('@/pages/secretary/AddressInput.vue'),
      },
      {
        path: 'news-input',
        name: 'NewsInput',
        component: () => import('@/pages/secretary/NewsInput.vue'),
      }
    ],
  },
  {
    path: '/accountant',
    meta: {
      auth: true,
      roles: ['Non Profit Accounting']
    },
    children: [
      {
        path: '',
        name: 'accountant',
        component: () => import('@/pages/accountant/AccountantMenu.vue'),
      },
      {
        path: 'bank-account',
        name: 'BankAccount',
        component: () => import('@/pages/accountant/BankAccountList.vue'),
      },
      {
        path: 'bank-account-detail/:id',
        name: 'BankAccountDetail',
        component: () => import('@/pages/accountant/BankAccount.vue'),
        props: router => ({ mode: 'edit', id: router.params.id }),
      },
      {
        path: 'add-bank-account',
        name: 'AddBankAccount',
        component: () => import('@/pages/accountant/BankAccount.vue'),
        props: { mode: 'add' }
      },
      {
        path: 'expenses/:name',
        name: 'Expenses',
        component: () => import('@/pages/accountant/ExpenseList.vue'),
      },
      {
        path: 'add-expense/:name',
        name: 'AddExpense',
        component: () => import('@/pages/accountant/ExpenseInput.vue'),
      },
      {
        path: 'purchase-to-approve',
        name: 'PurchaseToApprove',
        component: () => import('@/pages/secretary/PurchaseReceiptList.vue'),
        props: { mode: 'approve' },
      },
      {
        path: 'purchase-detail/:id',
        name: 'PurchaseDetail',
        component: () => import('@/pages/secretary/PurchaseReceiptDetail.vue'),
        props: { mode: 'approve' },
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
        path: 'infaq',
        name: 'Infaq',
        component: () => import('@/pages/donor/InfaqInput.vue'),
      },
      {
        path: 'zakat',
        name: 'Zakat',
        component: () => import('@/pages/donor/ZakatInput.vue'),
      },
      {
        path: 'hibah',
        name: 'Hibah',
        component: () => import('@/pages/donor/HibahInput.vue'),
      },
      {
        path: 'fidyah',
        name: 'Fidyah',
        component: () => import('@/pages/donor/FidyahInput.vue'),
      },
      {
        path: 'event',
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
        path: 'donation',
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
          {
            path: 'donation-qr',
            name: 'QR',
            component: () => import('@/pages/donor/QRDonation.vue'),
          },
        ],
      },
      {
        path: 'news/:id',
        name: 'News',
        component: () => import('@/pages/donor/NewsDetail.vue'),
      }
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
      {
        path: 'tipe/:donation_type',
        name: 'HistoryWithType',
        component: () => import('@/pages/donor/History.vue'),
      }
    ],
  },
  {
    path: '/equran',
    children: [
      {
        path: '',
        name: 'SurahList',
        component: () => import('@/pages/donor/SurahList.vue'),
      },
      {
        path: ':id',
        name: 'Surah',
        component: () => import('@/pages/donor/Surah.vue'),
      },
      {
        path: 'dzikir-pagi',
        name: 'DzikirPagi',
        component: () => import('@/pages/donor/DzikirPagi.vue'),
      },
      {
        path: 'dzikir-petang',
        name: 'DzikirPetang',
        component: () => import('@/pages/donor/DzikirPetang.vue'),
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
  {
    name: 'Register',
    path: '/account/register',
    component: () => import('@/pages/Register.vue'),
  },
  {
    name: 'ForgotPassword',
    path: '/account/forgot-password',
    component: () => import('@/pages/ForgotPassword.vue'),
  },
]

let router = createRouter({
  history: createWebHistory('/fundraising'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    if (isLoggedIn) {
      await userResource.reload()
    }
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Account' && !isLoggedIn) {
    next({ name: 'Login' });
  } else if (to.meta.auth && !isLoggedIn) {
    next({ name: 'Login' });
  } else if (to.meta.roles && userResource.data && userResource.data.roles) {
    const hasRequiredRole = to.meta.roles.some(role => userResource.data.roles.includes(role));
    if (!hasRequiredRole) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router
