import placeholderAvatarImage from 'assets/img/icons/placeholder_avatar.png'
import placeholderProductImage from 'assets/img/icons/placeholder_product.png'

const defaults = {
  avatarPic: placeholderAvatarImage,
  productPic: placeholderProductImage,
  spotlightName: 'Seller Name',
  spotlightBio: 'Seller Bio',
  productName: 'Product Name',
  productDescription: 'Product Description',
  productPrice: '',
  heading: 'Heading',
  subheading: 'Subheading',
}

const previewConverter = {
  heading(heading) {
    return heading || defaults.heading
  },
  subheading(subheading) {
    return subheading || defaults.subheading
  },
  spotlights(spotlights) {
    return spotlights
      .map((spotlight, i) => {
        const productPicks = this.productPicks(spotlight)
        const img = spotlight.__seller && (spotlight.__seller.img || spotlight.__seller.imgUrl)
        const imgRect = spotlight.__seller && spotlight.__seller.imgRect
        const sellerName = spotlight.__seller && spotlight.__seller.name
        const sellerBio = spotlight.__seller && spotlight.__seller.bio
        if (spotlight._destroy) return null
        return {
          ...spotlight,
          id: spotlight.id || `new-${i}`,
          productPicks,
          seller: {
            ...spotlight.__seller,
            name: sellerName || defaults.spotlightName,
            bio: sellerBio || defaults.spotlightBio,
            img: { url: (img && img.url) || defaults.avatarPic, imgRect },
            imgUrl: img || defaults.avatarPic,
          },
          translation: {
            selectedBy: `Products selected by ${sellerName && sellerName.split(' ')[0]}`,
          },
        }
      })
      .filter(e => e)
  },
  productPicks(spotlight) {
    return spotlight.productPicksAttributes
      .map((productPick, i) => {
        if (productPick._destroy) return null
        return {
          ...productPick,
          id: productPick.id || `new-${i}`,
          name: productPick.name || defaults.productName,
          description: productPick.description || defaults.productDescription,
          displayPrice: productPick.displayPrice || defaults.productPrice,
          img: { url: productPick.img.url || defaults.productPic, imgRect: productPick.imgRect },
        }
      })
      .filter(e => e)
  },
}

const formObjectTransformer = json => {
  return {
    id: json.id,
    name: json.name || '',
    sellerId: (json.seller && json.seller.id) || '',
    heading: json.heading || '',
    subheading: json.subheading || '',
    teaserMessage: json.teaserMessage || '',
    extraTeaserMessage: json.extraTeaserMessage || '',
    triggerIds: json.triggerIds || [],
    lockVersion: json.lockVersion,
    __seller: json.seller,
    useSellerAnimation: json.useSellerAnimation || false,
    spotlightsAttributes: json.spotlightsAttributes.map(spotlight => ({
      id: spotlight.id,
      sellerId: (spotlight.seller && spotlight.seller.id) || '',
      __seller: spotlight.seller,
      useSellerAnimation: spotlight.useSellerAnimation || false,
      productPicksAttributes: spotlight.productPicksAttributes
        ? spotlight.productPicksAttributes.map(productPick => ({
            id: productPick.id,
            url: productPick.url || '',
            name: productPick.name || '',
            description: productPick.description || '',
            displayPrice: productPick.displayPrice || '',
            img: productPick.img || { url: '' },
            imgRect: productPick.imgRect || {},
            __key: productPick.__key,
          }))
        : [
            {
              url: '',
              name: '',
              description: '',
              displayPrice: '',
              img: { url: '' },
              imgRect: {},
              __key: 'new-0',
            },
          ],
      __key: spotlight.__key,
    })),
  }
}

export { previewConverter, formObjectTransformer }
