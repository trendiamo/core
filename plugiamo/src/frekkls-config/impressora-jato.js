export default {
  position: 'right-elevated',
  onShow: () => {
    const liveChatContainer = document.querySelector('#livechat-compact-container')
    if (!liveChatContainer) return
    liveChatContainer.style.visibility = 'hidden'
  },
  processChatOptions(chatOptions) {
    if (!document.querySelector('#livechat-compact-container')) return chatOptions
    return [
      ...chatOptions,
      {
        id: 'stop',
        text: this.i18n.okCool,
      },
    ]
  },
  getFinalChatOptions() {
    if (!document.querySelector('#livechat-compact-container')) return []
    return [{ id: 'stop', text: this.i18n.okCool }]
  },
  onChatStop: () => {
    const liveChatContainer = document.querySelector('#livechat-compact-container')
    if (liveChatContainer) liveChatContainer.style.visibility = 'visible'
    if (window.LC_API && window.LC_API.open_chat_window) window.LC_API.open_chat_window({ source: 'trendiamo' })
  },
  i18n: {
    okCool: 'Quero falar com um consultor',
    productsSelectedBy: firstName => `Produtos selecionados por ${firstName}:`,
  },
}
