const defaults = {
  avatarPic: '/img/icons/placeholder_avatar.png',
  productPic: '/img/icons/placeholder_product.png',
  spotlightName: 'Seller Name',
  spotlightDescription: 'Seller Description',
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
        const profilePic = spotlight.__seller && (spotlight.__seller.profilePic || spotlight.__seller.profilePicUrl)
        const picRect = spotlight.__seller && spotlight.__seller.picRect
        const sellerName = spotlight.__seller && spotlight.__seller.name
        const sellerDescription = spotlight.__seller && spotlight.__seller.description
        if (spotlight._destroy) return null
        return {
          ...spotlight,
          id: spotlight.id || `new-${i}`,
          productPicks,
          seller: {
            ...spotlight.__seller,
            name: sellerName || defaults.spotlightName,
            description: sellerDescription || defaults.spotlightDescription,
            profilePic: { url: (profilePic && profilePic.url) || defaults.avatarPic, picRect },
            profilePicUrl: profilePic || defaults.avatarPic,
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
          picture: { url: productPick.picture.url || defaults.productPic, picRect: productPick.picRect },
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
            picture: productPick.picture || { url: '' },
            picRect: productPick.picRect || {},
            __key: productPick.__key,
          }))
        : [
            {
              url: '',
              name: '',
              description: '',
              displayPrice: '',
              picture: { url: '' },
              picRect: {},
              __key: 'new-0',
            },
          ],
      __key: spotlight.__key,
    })),
  }
}

export { previewConverter, formObjectTransformer }
