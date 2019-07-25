const defaults = {
  avatarPic: '/img/icons/placeholder_avatar.png',
  productPic: '/img/icons/placeholder_product.png',
  spotlightName: 'Persona Name',
  spotlightDescription: 'Persona Description',
  productName: 'Product Name',
  productDescription: 'Product Description',
  productPrice: '',
  title: 'Title',
  subtitle: 'Subtitle',
}

const previewConverter = {
  title(title) {
    return title || defaults.title
  },
  subtitle(subtitle) {
    return subtitle || defaults.subtitle
  },
  spotlights(spotlights) {
    return spotlights
      .map((spotlight, i) => {
        const productPicks = this.productPicks(spotlight)
        const profilePic = spotlight.__persona && (spotlight.__persona.profilePic || spotlight.__persona.profilePicUrl)
        const picRect = spotlight.__persona && spotlight.__persona.picRect
        const personaName = spotlight.__persona && spotlight.__persona.name
        const personaDescription = spotlight.__persona && spotlight.__persona.description
        if (spotlight._destroy) return null
        return {
          ...spotlight,
          id: spotlight.id || `new-${i}`,
          productPicks,
          persona: {
            ...spotlight.__persona,
            name: personaName || defaults.spotlightName,
            description: personaDescription || defaults.spotlightDescription,
            profilePic: { url: (profilePic && profilePic.url) || defaults.avatarPic, picRect },
            profilePicUrl: profilePic || defaults.avatarPic,
          },
          translation: {
            selectedBy: `Products selected by ${personaName && personaName.split(' ')[0]}`,
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
    personaId: (json.persona && json.persona.id) || '',
    title: json.title || '',
    subtitle: json.subtitle || '',
    chatBubbleText: json.chatBubbleText || '',
    chatBubbleExtraText: json.chatBubbleExtraText || '',
    triggerIds: json.triggerIds || [],
    lockVersion: json.lockVersion,
    __persona: json.persona,
    usePersonaAnimation: json.usePersonaAnimation || false,
    spotlightsAttributes: json.spotlightsAttributes.map(spotlight => ({
      id: spotlight.id,
      personaId: (spotlight.persona && spotlight.persona.id) || '',
      __persona: spotlight.persona,
      usePersonaAnimation: spotlight.usePersonaAnimation || false,
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
