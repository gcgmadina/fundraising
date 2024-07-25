import router from '@/router'
import { createResource } from 'frappe-ui'

export const userResource = createResource({
  url: 'non_profit.api.fundraising.get_user_info',
  cache: 'User',
  onError(error) {
    if (error && error.exc_type === 'AuthenticationError') {
      router.push({ name: 'LoginPage' })
    }
  },
})

export function registerUser(email, full_name, redirect_url) {
  return new Promise((resolve, reject) => {
    const resource = createResource({
      method: 'POST',
      url: 'frappe.core.doctype.user.user.sign_up',
      params: {
        email : email,
        full_name: full_name,
        redirect_to: redirect_url,
      },
      transform(data) {
        if (data[0] === 0) {
          data[1] = "Email sudah terdaftar"
          const error = new Error(data[1]);
          error.data = data;
          reject(error);
        } else {
          data[1] = "Email verifikasi telah dikirim"
          resolve(data[1]);
        }
      }
    })
    resource.reload()
  })
}