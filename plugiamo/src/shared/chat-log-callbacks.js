import getFrekklsConfig from 'frekkls-config'

const chatLogCallbacks = {
  processChatOptions: getFrekklsConfig().processChatOptions,
  onChatStop: getFrekklsConfig().onChatStop,
}

export default chatLogCallbacks
