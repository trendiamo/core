const defaults = {
  persona: {
    name: 'Persona Name',
    description: 'Persona Description',
  },
  title: 'Title',
}

const previewConverter = {
  persona(persona = {}) {
    return {
      name: persona.name || defaults.persona.name,
      description: persona.description || defaults.persona.description,
      profilePic: { url: persona.profilePic && persona.profilePic.url, picRect: persona.picRect },
    }
  },
  mainData(title, simpleChatSteps) {
    const newData = { title, simpleChatSteps }
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
    personaId: (json.persona && json.persona.id) || '',
    triggerIds: json.triggerIds || [],
    lockVersion: json.lockVersion,
    __persona: json.persona,
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
