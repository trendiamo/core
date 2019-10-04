export default {
  onInit: () => {
    if (window.innerWidth <= 768) return false
  },
  pluginZIndex: 1200,
  onShow: () => {
    if (!window.zE) return
    window.zE('webWidget', 'hide')
  },
  processChatOptions(chatOptions) {
    if (!window.zE) return chatOptions
    return [
      ...chatOptions,
      {
        id: 'stop',
        type: 'option',
        text: 'I have another question or issue.',
      },
    ]
  },
  onChatStop: () => {
    if (!window.zE) return
    document.querySelector('.frekkls-container').remove()
    window.zE('webWidget', 'show')
    window.zE('webWidget', 'toggle')
  },
}
