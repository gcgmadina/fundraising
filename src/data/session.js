import router from '@/router'
import { computed, reactive } from 'vue'
import { createResource } from 'frappe-ui'

import { userResource } from './user'

export function sessionUser() {
  const cookies = new URLSearchParams(document.cookie.split('; ').join('&'))
  let _sessionUser = cookies.get('user_id')
  if (_sessionUser === 'Guest') {
    _sessionUser = null
  }
  return _sessionUser
}

export const session = reactive({
  login: createResource({
    url: 'login',
    makeParams({ email, password }) {
      return {
        usr: email,
        pwd: password,
      }
    },
    onSuccess(data) {
      userResource.reload()
      session.user = sessionUser()
      session.login.reset()
      // router.replace(data.default_route || '/')
      router.replace(data.default_route || '/donor')
    },
  }),
  logout: createResource({
    url: 'logout',
    onSuccess() {
      userResource.reset()
      session.user = sessionUser()
      router.replace({ name: 'Home' })
    },
  }),
  user: sessionUser(),
  isLoggedIn: computed(() => !!session.user),
})
