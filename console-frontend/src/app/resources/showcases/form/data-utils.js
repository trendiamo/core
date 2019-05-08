const defaults = {
  avatarPic: '/img/icons/placeholder_avatar.png',
  productPic: '/img/icons/placeholder_product.png',
  spotlightName: 'Persona Name',
  spotlightDescription: 'Persona Description',
  productName: 'Product Name',
  productDescription: 'Product Description',
  productPrice: '$0.00',
  title: 'Title',
  subtitle: 'Subtitle',
}

const previewConverter = {
  title(form) {
    return form.title || defaults.title
  },
  subtitle(form) {
    return form.subtitle || defaults.subtitle
  },
  spotlights(showcase) {
    const spotlights = showcase.spotlightsAttributes
      .map((spotlight, i) => {
        const productPicks = this.productPicks(spotlight)
        const profilePic = spotlight.__persona && (spotlight.__persona.profilePic || spotlight.__persona.profilePicUrl)
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
            profilePic: { url: profilePic || defaults.avatarPic },
            profilePicUrl: profilePic || defaults.avatarPic,
          },
          translation: {
            selectedBy: `Products selected by ${personaName && personaName.split(' ')[0]}`,
          },
        }
      })
      .filter(e => e)
    return { ...showcase, spotlights }
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
          picture: { url: productPick.picUrl || defaults.productPic },
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
    __persona: json.persona,
    spotlightsAttributes: json.spotlightsAttributes.map(spotlight => ({
      id: spotlight.id,
      personaId: (spotlight.persona && spotlight.persona.id) || '',
      __persona: spotlight.persona,
      productPicksAttributes: spotlight.productPicksAttributes
        ? spotlight.productPicksAttributes.map(productPick => ({
            id: productPick.id,
            url: productPick.url || '',
            name: productPick.name || '',
            description: productPick.description || '',
            displayPrice: productPick.displayPrice || '',
            picUrl: productPick.picUrl || '',
          }))
        : [
            {
              url: '',
              name: '',
              description: '',
              displayPrice: '',
              picUrl: '',
            },
          ],
    })),
  }
}

const formObject = {
  name: '',
  chatBubbleText: '',
  chatBubbleExtraText: '',
  personaId: '',
  title: '',
  subtitle: '',
  spotlightsAttributes: [
    {
      personaId: '',
      productPicksAttributes: [
        {
          url: '',
          name: '',
          description: '',
          displayPrice: '',
          picUrl: '',
        },
      ],
    },
  ],
}

export { previewConverter, formObjectTransformer, formObject }
