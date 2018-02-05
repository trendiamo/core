import { getMetadata } from 'utils'
import { updateMe } from './utils'

export default () => {
  if (document.referrer.endsWith('/account/login')) {
    updateMe({ customerRef: getMetadata().consumerId })
    window.location = '/'
  }
}
