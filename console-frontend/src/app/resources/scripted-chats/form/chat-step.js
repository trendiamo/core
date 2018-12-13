import AddCircleOutline from '@material-ui/icons/AddCircleOutline'
import Cancel from './shared/cancel'
import ChatStepMessage from './chat-step-message'
import ChatStepOption from './chat-step-option'
import React from 'react'
import styled from 'styled-components'
import { Button, Card, CardContent, Divider, IconButton, List, ListItem, Typography } from '@material-ui/core'
import { compose, withHandlers, withProps } from 'recompose'

const StyledList = styled(List)`
  margin-top: 1rem;
`

const StyledTypography = styled(Typography)`
  display: inline-block;
  margin-left: 20px;
`

const StyledAddCircleOutline = styled(AddCircleOutline)`
  color: #6c6c6c;
`

const AddButton = ({ disabled, addAction, objectName }) => (
  <Button disabled={disabled} onClick={addAction} size="small">
    <StyledAddCircleOutline />
    <StyledTypography>{`Add ${objectName}`}</StyledTypography>
  </Button>
)

const ChatStep = ({
  addChatStepMessage,
  deleteAction,
  index,
  isFormLoading,
  addChatStepOption,
  form,
  editChatMessageAttribute,
  editChatOptionAttribute,
  deleteChatMessage,
  deleteChatStepOption,
  onChange,
  chatStepType,
  setForm,
  addAction,
  showChildSteps,
}) => (
  <Card>
    <CardContent>
      <StyledList>
        {' '}
        <Divider component="li" />
        <li>
          <Typography variant="h6">{`Chat Step #${index + 1}`}</Typography>
        </li>
        <ListItem>
          <Typography variant="h6">{'Messages'}</Typography>
        </ListItem>
        {form[chatStepType] &&
          form[chatStepType].chatMessagesAttributes.map(
            (chatMessage, chatMessageIndex) =>
              //if there's a _destroy key in chatMessage object we don't want to show it, it will be destroyed on save
              !chatMessage._destroy && (
                // eslint-disable-next-line react/no-array-index-key
                <div key={chatMessageIndex}>
                  <ChatStepMessage
                    chatStepType={chatStepType}
                    form={form}
                    index={chatMessageIndex}
                    isFormLoading={isFormLoading}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`chat-step-${index}-message-${chatMessageIndex}}`}
                    onChange={editChatMessageAttribute}
                  />
                  {form[chatStepType].chatMessagesAttributes.length > 1 && (
                    <ListItem>
                      <IconButton>
                        <Cancel disabled={isFormLoading} index={chatMessageIndex} onClick={deleteChatMessage} />
                      </IconButton>
                    </ListItem>
                  )}
                </div>
              )
          )}
        <ListItem>
          <AddButton addAction={addChatStepMessage} disabled={isFormLoading} index={index} objectName="Chat Message" />{' '}
        </ListItem>
        {form[chatStepType] && form[chatStepType].chatOptionsAttributes && (
          <React.Fragment>
            <ListItem>
              <Typography variant="h6">{'Options'}</Typography>
            </ListItem>
            {form[chatStepType].chatOptionsAttributes.map(
              (chatOption, chatOptionIndex) =>
                //if there's a _destroy key in chaOption object we don't want to show it, it will be destroyed on save
                !chatOption._destroy && (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={chatOptionIndex}>
                    <ChatStepOption
                      addAction={addAction}
                      addChatStepMessage={addChatStepMessage}
                      chatStepIndex={index}
                      chatStepType={chatStepType}
                      deleteAction={deleteAction}
                      editChatStepAttribute={onChange}
                      form={form}
                      index={chatOptionIndex}
                      isFormLoading={isFormLoading}
                      // eslint-disable-next-line react/no-array-index-key
                      key={`chat-step-${index}-option-${chatOptionIndex}}`}
                      onChange={editChatOptionAttribute}
                      setForm={setForm}
                      showChildSteps={showChildSteps}
                    />
                    {form[chatStepType].chatOptionsAttributes.length > 1 && (
                      <ListItem>
                        <IconButton>
                          <Cancel disabled={isFormLoading} index={chatOptionIndex} onClick={deleteChatStepOption} />
                        </IconButton>
                      </ListItem>
                    )}
                  </div>
                )
            )}
            <ListItem>
              <AddButton
                addAction={addChatStepOption}
                disabled={isFormLoading}
                index={index}
                objectName="Chat Option"
              />{' '}
            </ListItem>
          </React.Fragment>
        )}
      </StyledList>
    </CardContent>
  </Card>
)

export default compose(
  withProps(({ chatStepType }) => ({
    chatStepType,
  })),
  withHandlers({
    editChatMessageAttribute: ({ chatStepType, onChange, form }) => (chatMessageIndex, newValue) => {
      onChange(chatMessageIndex, newValue, 'chatMessagesAttributes', form, chatStepType)
    },
    editChatOptionAttribute: ({ chatStepType, onChange, form }) => (chatOptionIndex, newValue) => {
      onChange(chatOptionIndex, newValue, 'chatOptionsAttributes', form, chatStepType)
    },
    addChatStepMessage: ({ addAction, chatStepType, form }) => () => {
      const newMessage = {
        delay: '',
        text: '',
      }
      addAction(newMessage, 'chatMessagesAttributes', form, chatStepType)
    },
    addChatStepOption: ({ addAction, chatStepType, form }) => () => {
      const newOption = {
        text: '',
        destinationChatStepId: '',
      }
      addAction(newOption, 'chatOptionsAttributes', form, chatStepType)
    },
    deleteChatMessage: ({ deleteAction, chatStepType, form }) => chatMessageIndex => {
      deleteAction(chatMessageIndex, 'chatMessagesAttributes', form, chatStepType)
    },
    deleteChatStepOption: ({ deleteAction, chatStepType, form }) => chatOptionIndex => {
      deleteAction(chatOptionIndex, 'chatOptionsAttributes', form, chatStepType)
    },
  })
)(ChatStep)
