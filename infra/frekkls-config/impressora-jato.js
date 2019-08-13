window.frekklsConfig = {
  position: 'right',
  launcherConfig: {
    extraElevation: 25,
  },
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
        type: 'option',
        text: 'Quero falar com um consultor',
      },
    ]
  },
  onChatStop: () => {
    const liveChatContainer = document.querySelector('#livechat-compact-container')
    if (liveChatContainer) liveChatContainer.style.visibility = 'visible'
    if (window.LC_API && window.LC_API.open_chat_window) window.LC_API.open_chat_window({ source: 'trendiamo' })
  },
  i18n: {
    productsSelectedBy: firstName => `Produtos selecionados por ${firstName}:`,
  },
}
