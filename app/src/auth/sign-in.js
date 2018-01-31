import { $ } from 'utils'
import { apiSignIn } from './utils'

const handleFormSubmit = event => {
  event.preventDefault()
  const email = $('#CustomerEmail').value
  const password = $('#CustomerPassword').value
  apiSignIn({ consumer: { email, password } })
}

export default () => $('#customer_login').addEventListener('submit', handleFormSubmit)
