const homepageModules = {
  '/mm2go-nathaliedesiree': '/simple-chat/338',
  '/mm2go-jmblog': '/simple-chat/336',
  '/mm2go-bergherz': '/simple-chat/334',
  '/mm2go-cindydess': '/simple-chat/342',
  '/mm2go-blessmysoul': '/simple-chat/332',
  '/mm2go-coffeeandblush': '/simple-chat/329',
  '/mm2go-powerfulplant': '/simple-chat/328',
}

const memorizeModule = ({ homepageModule }) => {
  localStorage.setItem('trnd-mymuesli-homepage-module-path', homepageModule)
}

export default {
  onInit: () => {
    if (location.pathname === '/') {
      return
    }
    const homepageModule = homepageModules[location.pathname]
    if (homepageModule) {
      document.querySelector('popup.md-modal a').addEventListener('click', () => {
        memorizeModule({ homepageModule })
      })
    }
  },
  processOptions: options => {
    if (location.pathname !== '/') return options
    const path = localStorage.getItem('trnd-mymuesli-homepage-module-path')
    if (path) {
      return { path }
    }
    return options
  },
}
