import omit from 'lodash.omit'
import React from 'react'
import { compose, createSink, mapProps, withHandlers, withProps, withState } from 'recompose'
import { isEqual } from 'lodash'
import { withStoreConsumer } from 'ext/recompose/with-store'

// we only want the persisted chat steps for use in selects
const extractPersistedChatSteps = (chatStepAttributes, results, hash) => {
  const { id } = chatStepAttributes
  if (!id || hash[id]) return results
  hash[id] = true
  results.push({ id, __index: results.length, __ref: chatStepAttributes.__ref })
  if (!chatStepAttributes.chatOptionsAttributes) return results
  chatStepAttributes.chatOptionsAttributes.forEach(chatOptionAttributes => {
    extractPersistedChatSteps(chatOptionAttributes.destinationChatStepAttributes, results, hash)
  })
  return results
}

const Sink = createSink(({ scriptedChatsForm, store, setStore }) => {
  if (isEqual(scriptedChatsForm, store.scriptedChatsForm)) return
  setStore({ ...store, scriptedChatsForm })
})

const withScriptedChatsFormProvider = BaseComponent =>
  compose(
    withStoreConsumer,
    withState('newChatSteps', 'setNewChatSteps', []),
    withProps(({ form }) => ({
      persistedChatSteps: extractPersistedChatSteps(form.chatStepAttributes, [], {}),
    })),
    withHandlers({
      addNewChatStep: ({ newChatSteps, persistedChatSteps, setNewChatSteps }) => () => {
        const newChatStep = {
          chatMessagesAttributes: [
            {
              text: '',
            },
          ],
          chatOptionsAttributes: [],
          __index: persistedChatSteps.slice(1).length + newChatSteps.length + 1,
          __ref: React.createRef(),
        }
        setNewChatSteps([...newChatSteps, newChatStep])
        return newChatStep
      },
    }),
    withProps(({ addNewChatStep, newChatSteps, persistedChatSteps }) => ({
      scriptedChatsForm: {
        addNewChatStep,
        newChatSteps,
        persistedChatSteps,
      },
    }))
  )(({ scriptedChatsForm, ...props }) => (
    <React.Fragment>
      <Sink scriptedChatsForm={scriptedChatsForm} {...props} />
      <BaseComponent {...omit(props, ['scriptedChatsForm', 'store', 'setStore'])} />
    </React.Fragment>
  ))

const withScriptedChatsFormConsumer = BaseComponent =>
  compose(
    withStoreConsumer,
    withProps(({ store }) => ({
      addNewChatStep: store.scriptedChatsForm.addNewChatStep,
      persistedChatSteps: store.scriptedChatsForm.persistedChatSteps,
      newChatSteps: store.scriptedChatsForm.newChatSteps,
    })),
    mapProps(props => omit(props, ['store', 'setStore']))
  )(BaseComponent)

export default { consumer: withScriptedChatsFormConsumer, provider: withScriptedChatsFormProvider }
