import findIndex from 'lodash.findindex'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import Section from 'shared/section'
import SimpleChatMessage from './simple-chat-message'
import styled from 'styled-components'
import { AddItemButton, Cancel, Field, FormSection } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { Menu, MenuItem as MUIMenuItem } from '@material-ui/core'
import { MessageOutlined, OndemandVideo, Redeem } from '@material-ui/icons'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const StyledAddItemButton = styled(props => <AddItemButton {...omit(props, ['adjustMargin'])} />)`
  margin-bottom: -16px;
  ${({ adjustMargin }) => adjustMargin && 'margin-top: 16px;'}
`

const MessageIcon = styled(MessageOutlined)`
  font-size: 18px;
  margin-right: 6px;
`

const VideoIcon = styled(OndemandVideo)`
  font-size: 18px;
  margin-right: 6px;
`

const ProductIcon = styled(Redeem)`
  font-size: 18px;
  margin-right: 6px;
`

const MenuItem = ({ children, onClick, value, ...props }) => {
  const addSimpleChatMessage = useCallback(() => onClick(value), [onClick, value])

  return (
    <MUIMenuItem {...props} onClick={addSimpleChatMessage}>
      {children}
    </MUIMenuItem>
  )
}

const StyledMenu = styled(Menu)`
  div:last-child {
    margin-top: 48px;
    width: 160px;
    transform-origin: top center !important;
    li {
      color: rgba(0, 0, 0, 0.8);
      font-size: 15px;
    }
  }
`

const SortableSimpleChatMessage = SortableElement(SimpleChatMessage)

const SimpleChatMessages = ({
  allowDelete,
  isCropping,
  onChange,
  onFocus,
  setIsCropping,
  setSimpleChatMessagePicture,
  simpleChatMessages,
}) => (
  <div>
    {simpleChatMessages.map((simpleChatMessage, index) =>
      simpleChatMessage._destroy ? null : (
        <SortableSimpleChatMessage
          allowDelete={allowDelete}
          index={index}
          isCropping={isCropping}
          key={simpleChatMessage.id || simpleChatMessage.__key}
          onChange={onChange}
          onFocus={onFocus}
          setIsCropping={setIsCropping}
          setSimpleChatMessagePicture={setSimpleChatMessagePicture}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={index}
        />
      )
    )}
  </div>
)

const SimpleChatMessagesContainer = SortableContainer(SimpleChatMessages)

const SimpleChatStep = ({
  allowDelete,
  collapseOtherSimpleChatSteps,
  folded,
  isCropping,
  isFormLoading,
  onChange,
  onToggleContent,
  setIsCropping,
  setSimpleChatMessagesPictures,
  simpleChatStep,
  simpleChatStepIndex,
  simpleChatMessagesPictures,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const deleteSimpleChatStep = useCallback(
    () => {
      onChange(
        {
          id: simpleChatStep.id,
          _destroy: true,
        },
        simpleChatStepIndex
      )
    },
    [onChange, simpleChatStep.id, simpleChatStepIndex]
  )

  const editSimpleChatStepValue = useCallback(
    event => {
      const name = event.target.name.replace('simpleChatStep_', '')
      onChange(Object.assign({ ...simpleChatStep }, { [name]: event.target.value }), simpleChatStepIndex)
    },
    [onChange, simpleChatStep, simpleChatStepIndex]
  )

  const onAddMessageClick = useCallback(event => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onSimpleChatMessagesSortEnd = useCallback(
    ({ oldIndex, newIndex }) => {
      const orderedSimpleChatMessages = arrayMove(simpleChatStep.simpleChatMessagesAttributes, oldIndex, newIndex)
      onChange({ ...simpleChatStep, simpleChatMessagesAttributes: orderedSimpleChatMessages }, simpleChatStepIndex)
    },
    [onChange, simpleChatStep, simpleChatStepIndex]
  )

  const setSimpleChatMessagePicture = useCallback(
    (simpleChatMessageIndex, blob, setProgress) => {
      const picture = { simpleChatStepIndex, simpleChatMessageIndex, blob, setProgress }
      const simpleChatMessagePictureIndex = findIndex(simpleChatMessagesPictures, {
        simpleChatStepIndex,
        simpleChatMessageIndex,
      })
      simpleChatMessagePictureIndex >= 0
        ? simpleChatMessagesPictures.splice(simpleChatMessagePictureIndex, 1, picture)
        : simpleChatMessagesPictures.push(picture)
      setSimpleChatMessagesPictures(simpleChatMessagesPictures)
    },
    [setSimpleChatMessagesPictures, simpleChatMessagesPictures, simpleChatStepIndex]
  )

  const setSimpleChatMessagesForm = useCallback(
    (simpleChatMessage, simpleChatMessageIndex) => {
      let newSimpleChatMessagesAttributes = [...simpleChatStep.simpleChatMessagesAttributes]
      newSimpleChatMessagesAttributes[simpleChatMessageIndex] = simpleChatMessage
      onChange(
        { ...simpleChatStep, simpleChatMessagesAttributes: newSimpleChatMessagesAttributes },
        simpleChatStepIndex
      )
    },
    [onChange, simpleChatStep, simpleChatStepIndex]
  )

  const addSimpleChatMessage = useCallback(
    messageType => {
      closeMenu()
      const simpleChatMessageObject =
        messageType === 'SimpleChatTextMessage'
          ? { text: '' }
          : messageType === 'SimpleChatProductMessage'
          ? { title: '', picUrl: '', url: '', displayPrice: '' }
          : { videoUrl: '' }
      onChange(
        {
          ...simpleChatStep,
          simpleChatMessagesAttributes: simpleChatStep.simpleChatMessagesAttributes
            ? [
                ...simpleChatStep.simpleChatMessagesAttributes,
                {
                  ...simpleChatMessageObject,
                  type: messageType,
                  __key: `new-${simpleChatStep.simpleChatMessagesAttributes.length}`,
                },
              ]
            : [{ ...simpleChatMessageObject, type: messageType, __key: 'new-0' }],
        },
        simpleChatStepIndex
      )
    },
    [closeMenu, onChange, simpleChatStep, simpleChatStepIndex]
  )

  if (simpleChatStep._destroy) return null

  return (
    <Section>
      <FormSection
        actions={
          allowDelete && (
            <Cancel disabled={isCropping || isFormLoading} index={simpleChatStepIndex} onClick={deleteSimpleChatStep} />
          )
        }
        dragHandle
        ellipsize
        foldable
        folded={folded}
        hideTop
        title={
          simpleChatStepIndex === 0 ? 'Initial Step' : simpleChatStep.id ? `Step: ${simpleChatStep.key}` : 'New Option'
        }
      >
        <>
          {simpleChatStep.key !== 'default' && (
            <Field
              disabled={isCropping || isFormLoading}
              fullWidth
              inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
              label="Option"
              margin="normal"
              name="simpleChatStep_key"
              onChange={editSimpleChatStepValue}
              onFocus={() => onToggleContent(true) && collapseOtherSimpleChatSteps}
              required
              value={simpleChatStep.key}
            />
          )}
          {simpleChatStep.simpleChatMessagesAttributes && (
            <SimpleChatMessagesContainer
              allowDelete={simpleChatStep.simpleChatMessagesAttributes.length > 1}
              helperClass="sortable-element"
              isCropping={isCropping}
              isFormLoading={isFormLoading}
              onChange={setSimpleChatMessagesForm}
              onFocus={() => onToggleContent(true) && collapseOtherSimpleChatSteps}
              onSortEnd={onSimpleChatMessagesSortEnd}
              setIsCropping={setIsCropping}
              setSimpleChatMessagePicture={setSimpleChatMessagePicture}
              simpleChatMessages={simpleChatStep.simpleChatMessagesAttributes}
              useDragHandle
            />
          )}
          <StyledAddItemButton
            adjustMargin={
              !simpleChatStep.simpleChatMessagesAttributes ||
              simpleChatStep.simpleChatMessagesAttributes.every(message => message._destroy)
            }
            aria-haspopup="true"
            aria-owns={anchorEl ? 'new-message-menu' : undefined}
            disabled={isFormLoading}
            message="Add Message"
            onClick={onAddMessageClick}
          />
          <StyledMenu
            anchorEl={anchorEl}
            disableAutoFocusItem
            id="new-message-menu"
            onClose={closeMenu}
            open={Boolean(anchorEl)}
            transitionDuration={150}
          >
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatTextMessage">
              <MessageIcon />
              {'Text'}
            </MenuItem>
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatProductMessage">
              <ProductIcon />
              {'Product'}
            </MenuItem>
            <MenuItem onClick={addSimpleChatMessage} value="SimpleChatVideoMessage">
              <VideoIcon />
              {'Video'}
            </MenuItem>
          </StyledMenu>
        </>
      </FormSection>
    </Section>
  )
}

export default SimpleChatStep
