const defaults = {
  persona: {
    name: 'Persona Name',
    description: 'Persona Description',
  },
  title: 'Title',
}

const previewConverter = {
  persona(form) {
    const formPersona = form.__persona || {}
    return {
      name: formPersona.name || defaults.persona.name,
      description: formPersona.description || defaults.persona.description,
      profilePic: {
        url: formPersona.profilePicUrl,
      },
    }
  },
  mainData(form) {
    const newData = { ...form }
    newData.simpleChatSteps = newData.simpleChatStepsAttributes
    newData.simpleChatSteps = newData.simpleChatSteps
      .map(simpleChatStep => {
        const messages = simpleChatStep.simpleChatMessagesAttributes
        return { ...simpleChatStep, simpleChatMessages: messages && messages.filter(message => !message._destroy) }
      })
      .filter(simpleChatStep => !simpleChatStep._destroy)
    return { simpleChat: newData }
  },
}

const formObjectTransformer = () => json => {
  return {
    id: json.id,
    name: json.name || '',
    title: json.title || '',
    chatBubbleText: json.chatBubbleText || '',
    chatBubbleExtraText: json.chatBubbleExtraText || '',
    personaId: (json.persona && json.persona.id) || '',
    lockVersion: json.lockVersion,
    __persona: json.persona,
    simpleChatStepsAttributes: json.simpleChatStepsAttributes
      ? json.simpleChatStepsAttributes.map(simpleChatStep => ({
          ...simpleChatStep,
          __key: simpleChatStep.__key,
        }))
      : [
          {
            simpleChatMessagesAttributes: [{ text: '', __type: 'text', __key: 'new-0' }],
          },
        ],
  }
}

const formObject = {
  name: '',
  title: '',
  personaId: '',
  chatBubbleText: '',
  chatBubbleExtraText: '',
  simpleChatStepsAttributes: [
    {
      simpleChatMessagesAttributes: [{ text: '' }],
    },
  ],
}

export { previewConverter, formObjectTransformer, formObject }
