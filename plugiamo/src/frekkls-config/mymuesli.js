const homepageModules = {
  '/mm2go-nathaliedesiree': '/simple-chat/338',
  '/mm2go-jmblog': '/simple-chat/336',
  '/mm2go-bergherz': '/simple-chat/334',
  '/mm2go-cindydess': '/simple-chat/342',
  '/mm2go-blessmysoul': '/simple-chat/332',
  '/mm2go-coffeeandblush': '/simple-chat/329',
  '/mm2go-powerfulplant': '/simple-chat/328',
  '/mm2go-cfterri': '/simple-chat/363',
  '/vegan-powerfulplant': '/simple-chat/328',
  '/mm2go-susanne.schoene': '/simple-chat/376',
  '/mm2go-elias': '/simple-chat/362',
  '/mm2go-marnifaktur': '/simple-chat/350',
  '/mm2go-jennimelzer': '/simple-chat/381',
  '/mm2go-jjtigerminka': '/simple-chat/369',
  '/mm2go-alicia9': '/simple-chat/365',
  '/mm2go-mamawahnsinn': '/simple-chat/384',
  '/mm2go-mothersfinest': '/simple-chat/390',
  '/mm2go-kkkeiki': '/simple-chat/387',
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
