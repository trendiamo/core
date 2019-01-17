import { infoMsg } from 'shared/info-msg'

const inits = {
  Impressorajato: () => {
    document.querySelector('#livechat-compact-container').style.visibility = 'hidden'
  },
}

const init = () => {
  const account = localStorage.getItem('trnd-plugin-account')
  const method = inits[account]
  if (!method) return
  try {
    method()
  } catch (e) {
    infoMsg('init failed', e)
  }
}

export default init
