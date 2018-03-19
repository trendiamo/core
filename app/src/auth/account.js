import { getMetadata } from 'utils'
import { updateMe } from './utils'

export default () => {
  if (document.referrer.endsWith('/account/login') || document.referrer.endsWith('/account/register')) {
    updateMe({ customerRef: getMetadata().customerRef })
    window.location = '/'
  }
}
