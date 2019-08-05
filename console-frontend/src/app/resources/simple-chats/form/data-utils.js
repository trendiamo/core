const defaults = {
  seller: {
    name: 'Seller Name',
    description: 'Seller Description',
  },
  title: 'Title',
}

const previewConverter = {
  seller(seller = {}) {
    return {
      name: seller.name || defaults.seller.name,
      description: seller.description || defaults.seller.description,
      profilePic: { url: seller.profilePic ? seller.profilePic.url : '', picRect: seller.picRect || {} },
      profilePicAnimation: { url: seller.profilePicAnimation ? seller.profilePicAnimation.url : '', picRect: {} },
    }
  },
  mainData(title, useSellerAnimation, simpleChatSteps) {
    const newData = { title, useSellerAnimation, simpleChatSteps }
    newData.simpleChatSteps = newData.simpleChatSteps
      .map(simpleChatStep => {
        const messages = simpleChatStep.simpleChatMessagesAttributes
        return { ...simpleChatStep, simpleChatMessages: messages && messages.filter(message => !message._destroy) }
      })
      .filter(simpleChatStep => !simpleChatStep._destroy)
    return { simpleChat: newData }
  },
}

const formObjectTransformer = json => {
  return {
    id: json.id,
    name: json.name || '',
    title: json.title || '',
    chatBubbleText: json.chatBubbleText || '',
    chatBubbleExtraText: json.chatBubbleExtraText || '',
    sellerId: (json.seller && json.seller.id) || '',
    useSellerAnimation: json.useSellerAnimation || false,
    triggerIds: json.triggerIds || [],
    lockVersion: json.lockVersion,
    __seller: json.seller,
    simpleChatStepsAttributes: json.simpleChatStepsAttributes
      ? json.simpleChatStepsAttributes.map(simpleChatStep => ({
          ...simpleChatStep,
          __key: simpleChatStep.__key,
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
