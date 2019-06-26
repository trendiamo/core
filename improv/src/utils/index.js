import omit from 'lodash.omit'

const $$ = (selector, callback) => Array.prototype.map.call(document.querySelectorAll(selector), callback)

export const hostname = process.env.NODE_ENV === 'production' ? location.hostname : process.env.CLIENT

export const useMultipleTagging = hostname !== 'www.pierre-cardin.de'

const implFactory = {
  'www.baldessarini.com': {
    parseProducts() {
      const products = $$('.product-item-info', e => {
        const url = e.querySelector('a').href
        const title = e.querySelector('.product-item-name').innerText
        const displayPrice = e.querySelector('.price-wrapper .price').innerText
        const priceInCents = e.querySelector('.price-wrapper').dataset.priceAmount * 100
        const images = Array.prototype.map.call(e.querySelectorAll('.product-image-photo'), img => ({
          alt: img.alt,
          src: img.dataset.src,
        }))
        return {
          url,
          title,
          images,
          displayPrice,
          priceInCents,
          currency: 'EUR',
        }
      })
      return products
    },
  },
  'www.pierre-cardin.de': {
    parseProducts() {
      const products = $$('.product-item', e => {
        if (!e.querySelector('.price-wrapper .price')) return
        const url = e.querySelector('a').href
        const title = e.querySelector('.product-item-name').innerText
        const displayPrice = e.querySelector('.price-wrapper .price').innerText
        const gender = location.pathname === '/damen' ? 'women' : location.pathname === '/herren' ? 'men' : null
        const priceInCents = e.querySelector('.price-wrapper').dataset.priceAmount * 100
        const images = Array.prototype.map.call(e.querySelectorAll('.product-image-photo'), img => ({
          alt: img.alt,
          src: img.dataset.src,
        }))
        const picUrl = e.querySelectorAll('.product-image-photo')[0].dataset.src
        const id = url.split('/').pop()
        const formFit = e.querySelector('.passform-fit').innerText || false
        return {
          id,
          formFit,
          url,
          title,
          picUrl,
          gender,
          images,
          displayPrice,
          priceInCents,
          currency: 'EUR',
        }
      })
      return products.filter(product => !!product)
    },
  },
  '0.0.0.0': {
    parseProducts() {
      return [
        {
          url:
            'https://www.baldessarini.com/de/kleidung/specials/business-looks/sakko-aus-120-schurwolle-14015-000-07124-999',
          title: 'SAKKO AUS 120-SCHURWOLLE',
          picUrl:
            'https://www.baldessarini.com/media/catalog/product/cache/small_image/e9c3970ab036de70892d86c6d221abfe/f/r/front_4049364472067.jpg',
          images: [
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/e9c3970ab036de70892d86c6d221abfe/f/r/front_4049364472067.jpg',
            },
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/e9c3970ab036de70892d86c6d221abfe/b/a/back_4049364472067.jpg',
            },
          ],
          displayPrice: '349,00 €',
          priceInCents: 34900,
          currency: 'EUR',
        },
        {
          url:
            'https://www.baldessarini.com/de/kleidung/collection/t-shirts/sommerliches-poloshirt-47342-000-05258-822',
          title: 'REGULAR FIT SOMMERLICHES POLOSHIRT',
          picUrl:
            'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894723274.jpg',
          images: [
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894723274.jpg',
            },
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/b/a/back_4048894723274.jpg',
            },
          ],
          displayPrice: '99,90 €',
          priceInCents: 9990,
          currency: 'EUR',
        },
        {
          url:
            'https://www.baldessarini.com/de/kleidung/collection/t-shirts/doppelpack-rundhals-jersey-47264-000-05166-100',
          title: 'DOPPELPACK RUNDHALS JERSEY',
          picUrl:
            'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_40488940564261.jpg',
          images: [
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_40488940564261.jpg',
            },
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/d/e/detail01_40488940564261.jpg',
            },
          ],
          displayPrice: '49,90 €',
          priceInCents: 4990,
          currency: 'EUR',
        },
        {
          url:
            'https://www.baldessarini.com/de/catalog/product/view/id/42619/s/doppelpack-v-neck-jersey-47265-000-05166-999/category/20/',
          title: 'DOPPELPACK V-NECK JERSEY',
          picUrl:
            'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894056600.jpg',
          images: [
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894056600.jpg',
            },
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894056600.jpg',
            },
          ],
          displayPrice: '49,90 €',
          priceInCents: 4990,
          currency: 'EUR',
        },
        {
          url: 'https://www.baldessarini.com/de/kleidung/collection/hosen/leichte-baumwollhose-19001-000-06632-726',
          title: 'LEICHTE BAUMWOLLHOSE',
          picUrl:
            'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894719918.jpg',
          images: [
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894719918.jpg',
            },
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894719918.jpg',
            },
          ],
          displayPrice: '159,90 €',
          priceInCents: 15990,
          currency: 'EUR',
        },
        {
          url:
            'https://www.baldessarini.com/de/kleidung/collection/hosen/leichte-jerseyhose-movimento-19007-000-08402-790',
          title: 'LEICHTE JERSEYHOSE - MOVIMENTO',
          picUrl:
            'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894746891.jpg',
          images: [
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894746891.jpg',
            },
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894746891.jpg',
            },
          ],
          displayPrice: '119,90 €',
          priceInCents: 11990,
          currency: 'EUR',
        },
        {
          url: 'https://www.baldessarini.com/de/kleidung/collection/hosen/legere-chino-movimento-16837-000-02236-833',
          title: 'LEGERE CHINO - MOVIMENTO',
          picUrl:
            'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894692686.jpg',
          images: [
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894692686.jpg',
            },
            {
              alt: '',
              src:
                'https://www.baldessarini.com/media/catalog/product/cache/small_image/700x700/e9c3970ab036de70892d86c6d221abfe/f/r/front_4048894692686.jpg',
            },
          ],
          displayPrice: '139,90 €',
          priceInCents: 13990,
          currency: 'EUR',
        },
      ]
    },
  },
  'www.delius-contract.de': {
    iconsMatch: {
      'purpose-deligard.svg': 'DELIGARD',
      'purpose-dimout.svg': 'Verdunkelungsstoffe',
      'purpose-delitherm.svg': 'DELITHERM',
      'purpose-akustik.svg': 'Akustik',
      'purpose-ship.svg': 'Ship',
      'purpose-delicare.svg': 'DELICARE',
      'purpose-delimar.svg': 'DELIMAR',
    },
    parseProducts() {
      const products = $$('.product', e => {
        const url = e.querySelector('a').href
        const title = e.querySelector('.product--name').innerText
        const picUrl = e.querySelectorAll('.img-responsive')[0].src
        const idDiv = e.querySelector('h3 .pull-right')
        const id = idDiv ? idDiv.innerText : title
        const showPrice = !!idDiv
        const filters = []
        const iconDivs = e.querySelectorAll('.product-icons .pull-left img')
        if (iconDivs) {
          iconDivs.forEach(item => {
            filters.push(item.alt)
          })
        }
        return {
          id,
          url,
          title,
          picUrl,
          filters,
          displayPrice: showPrice && id,
        }
      })
      return products.filter(product => !!product)
    },
    filter: [],
    getFilter() {
      if (this.filter.length === 0) {
        const filterDiv = document.querySelectorAll('form[name=filter] ul')
        if (filterDiv.length === 0) return
        const checkboxDivs = filterDiv[1].querySelectorAll('.checkbox')
        checkboxDivs.forEach(checkboxDiv => {
          if (checkboxDiv.querySelector('input').id === 'deliflamm') return
          const checkbox = checkboxDiv.querySelector('[id^="purpose-"]')
          const icon = checkboxDiv.querySelector('img')
          const filterName = this.iconsMatch[icon.alt]
          const imgUrl = icon.src
          const object = {
            name: filterName,
            checked: checkbox.checked,
            imgUrl,
          }
          this.filter.push(object)
        })
      }
      return this.filter
    },
    filterFinalData(products) {
      return products.map(product => {
        return omit({ ...product }, ['filters'])
      })
    },
  },
}

export const impl = implFactory[hostname]

export const parseProducts = () => impl && impl.parseProducts()

export const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

const authFetch = async (url, options) =>
  await fetch(url, {
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Plain ${process.env.RESTDB_KEY}`,
    }),
    ...options,
  })

const apiGetRequest = async url => {
  const response = await authFetch(url, {
    method: 'get',
  })
  return await response.json()
}

const apiCreateRequest = async (url, body) => {
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: 'post',
  })
  return await response.json()
}

const apiUpdateRequest = async (url, body) => {
  const response = await authFetch(url, {
    body: JSON.stringify(body),
    method: 'put',
  })
  return await response.json()
}

export const getClient = hostname => apiGetRequest(`${process.env.RESTDB_CLIENTS_ENDPOINT}/?hostname=${hostname}`)
export const getClientRecords = id => apiGetRequest(process.env.RESTDB_CLIENTS_ENDPOINT + '/' + id)
export const createClientRecord = body => apiCreateRequest(process.env.RESTDB_CLIENTS_ENDPOINT, body)
export const updateClientRecords = (id, body) => apiUpdateRequest(process.env.RESTDB_CLIENTS_ENDPOINT + '/' + id, body)
