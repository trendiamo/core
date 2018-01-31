import { $ } from 'utils'
import { apiSignUp } from './utils'

const handleFormSubmit = event => {
  event.preventDefault()
  const firstName = $('#FirstName').value
  const lastName = $('#LastName').value
  const email = $('#Email').value
  const password = $('#CreatePassword').value
  apiSignUp({ consumer: { email, firstName, lastName, password } })
}

export default () => $('#create_customer').addEventListener('submit', handleFormSubmit)
