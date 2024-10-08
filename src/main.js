import './index.css'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import { IonicVue } from '@ionic/vue'
import '@ionic/vue/css/ionic.bundle.css'

import {
  Button,
  Card,
  Input,
  setConfig,
  frappeRequest,
  resourcesPlugin,
} from 'frappe-ui'
import { session } from './data/session'
import { userResource } from './data/user'

let app = createApp(App)

setConfig('resourceFetcher', frappeRequest)

app.use(router)
app.use(IonicVue)
app.use(resourcesPlugin)

app.component('Button', Button)
app.component('Card', Card)
app.component('Input', Input)

app.provide("$session", session)
app.provide("$user", userResource)

app.mount('#app')
