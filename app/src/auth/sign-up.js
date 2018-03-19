import { $ } from 'utils'
import { apiSignUp } from './utils'

const handleFormSubmit = event => {
  event.preventDefault()
  const firstName = $('#FirstName').value
  const lastName = $('#LastName').value
  const email = $('#Email').value
  const password = $('#CreatePassword').value
  const username = $('#Username').value
  apiSignUp({ user: { email, firstName, lastName, password, username } })
}

export default () => $('#create_customer').addEventListener('submit', handleFormSubmit)
