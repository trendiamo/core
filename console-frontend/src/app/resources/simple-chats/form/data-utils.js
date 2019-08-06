const defaults = {
  seller: {
    name: 'Seller Name',
    bio: 'Seller Bio',
  },
  heading: 'Heading',
}

const previewConverter = {
  seller(seller = {}) {
    return {
      name: seller.name || defaults.seller.name,
      bio: seller.bio || defaults.seller.bio,
      profilePic: { url: seller.profilePic ? seller.profilePic.url : '', picRect: seller.picRect || {} },
      profilePicAnimation: { url: seller.profilePicAnimation ? seller.profilePicAnimation.url : '', picRect: {} },
    }
  },
  mainData(heading, useSellerAnimation, simpleChatSections) {
    const newData = { heading, useSellerAnimation, simpleChatSections }
    newData.simpleChatSections = newData.simpleChatSections
      .map(simpleChatSection => {
        const messages = simpleChatSection.simpleChatMessagesAttributes
        return { ...simpleChatSection, simpleChatMessages: messages && messages.filter(message => !message._destroy) }
      })
      .filter(simpleChatSection => !simpleChatSection._destroy)
    return { simpleChat: newData }
  },
}

const formObjectTransformer = json => {
  return {
    id: json.id,
    name: json.name || '',
    heading: json.heading || '',
    teaserMessage: json.teaserMessage || '',
    extraTeaserMessage: json.extraTeaserMessage || '',
    sellerId: (json.seller && json.seller.id) || '',
    useSellerAnimation: json.useSellerAnimation || false,
    triggerIds: json.triggerIds || [],
    lockVersion: json.lockVersion,
    __seller: json.seller,
    simpleChatSectionsAttributes: json.simpleChatSectionsAttributes
      ? json.simpleChatSectionsAttributes.map(simpleChatSection => ({
          ...simpleChatSection,
          __key: simpleChatSection.__key,
        }))
      : [
          {
            key: 'default',
            simpleChatMessagesAttributes: [{ type: 'SimpleChatTextMessage', html: '', __key: 'new-0' }],
          },
        ],
  }
}

export { previewConverter, formObjectTransformer }
