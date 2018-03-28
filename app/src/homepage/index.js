import { $ } from 'utils'

const handleFormSubmit = event => {
  event.preventDefault()
  const username = $('#InfluencerUsername').value
  window.location = `/collections/${username}`
}

export default () => $('#username-form').addEventListener('submit', handleFormSubmit)
