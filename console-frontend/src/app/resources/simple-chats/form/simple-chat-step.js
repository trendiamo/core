import React from 'react'
import Section from 'shared/section'
import SimpleChatMessage from './simple-chat-message'
import styled from 'styled-components'
import { AddItemButton, Cancel, Field, FormSection } from 'shared/form-elements'
import { arrayMove } from 'react-sortable-hoc'
import { atLeastOneNonBlankCharRegexp } from 'utils'
import { branch, compose, renderNothing, shallowEqual, shouldUpdate, withHandlers, withState } from 'recompose'
import { isEqual, omit } from 'lodash'
import { Menu, MenuItem as MUIMenuItem } from '@material-ui/core'
import { MessageOutlined, Redeem } from '@material-ui/icons'
import { SortableContainer, SortableElement } from 'shared/sortable-elements'

const MessageIcon = styled(MessageOutlined)`
  font-size: 18px;
  margin-right: 6px;
`

const ProductIcon = styled(Redeem)`
  font-size: 18px;
  margin-right: 6px;
`

const MenuItem = compose(
  withHandlers({
    addSimpleChatMessage: ({ onClick, value }) => () => {
      onClick(value)
    },
  })
)(({ addSimpleChatMessage, ...props }) => (
  <MUIMenuItem {...props} onClick={addSimpleChatMessage}>
    {props.children}
  </MUIMenuItem>
))

const StyledMenu = styled(Menu)`
  div:last-child {
    margin-top: 48px;
    width: 160px;
    transform-origin: top center !important;
    li {
      justify-content: center;
      padding-right: 16px;
      color: rgba(0, 0, 0, 0.8);
    }
  }
`

const SortableSimpleChatMessage = compose(
  shouldUpdate((props, nextProps) => {
    return (
      props.isFormLoading !== nextProps.isFormLoading ||
      props.index !== nextProps.index ||
      props.allowDelete !== nextProps.allowDelete ||
      !shallowEqual(props.simpleChatMessage, nextProps.simpleChatMessage)
    )
  })
)(SortableElement(SimpleChatMessage))

const SimpleChatMessages = ({ allowDelete, simpleChatMessages, onChange, onFocus }) => (
  <div>
    {simpleChatMessages.map((simpleChatMessage, index) =>
      simpleChatMessage._destroy ? null : (
        <SortableSimpleChatMessage
          allowDelete={allowDelete}
          index={index}
          key={simpleChatMessage.id || `simple-chat-message${index}`}
          onChange={onChange}
          onFocus={onFocus}
          simpleChatMessage={simpleChatMessage}
          simpleChatMessageIndex={index}
        />
      )
    )}
  </div>
)

const SimpleChatMessagesContainer = compose(
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onSortEnd', 'onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  })
)(SortableContainer(SimpleChatMessages))

const SimpleChatStep = ({
  addSimpleChatMessage,
  allowDelete,
  anchorEl,
  closeMenu,
  collapseOtherSimpleChatSteps,
  deleteSimpleChatStep,
  editSimpleChatStepValue,
  folded,
  isFormLoading,
  onAddMessageClick,
  onSimpleChatMessagesSortEnd,
  simpleChatStepIndex,
  setSimpleChatMessagesForm,
  simpleChatStep,
}) => (
  <Section>
    <FormSection
      actions={
        allowDelete && <Cancel disabled={isFormLoading} index={simpleChatStepIndex} onClick={deleteSimpleChatStep} />
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
            disabled={isFormLoading}
            fullWidth
            inputProps={{ pattern: atLeastOneNonBlankCharRegexp }}
            label="Option"
            margin="normal"
            name="simpleChatStep_key"
            onChange={editSimpleChatStepValue}
            onFocus={collapseOtherSimpleChatSteps}
            required
            value={simpleChatStep.key}
          />
        )}
        {simpleChatStep.simpleChatMessagesAttributes && (
          <SimpleChatMessagesContainer
            allowDelete={simpleChatStep.simpleChatMessagesAttributes.length > 1}
            helperClass="sortable-element"
            isFormLoading={isFormLoading}
            onChange={setSimpleChatMessagesForm}
            onFocus={collapseOtherSimpleChatSteps}
            onSortEnd={onSimpleChatMessagesSortEnd}
            simpleChatMessages={simpleChatStep.simpleChatMessagesAttributes}
            useDragHandle
          />
        )}
        <AddItemButton
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
        >
          <MenuItem onClick={addSimpleChatMessage} value="text">
            <MessageIcon />
            {'Text'}
          </MenuItem>
          <MenuItem onClick={addSimpleChatMessage} value="product">
            <ProductIcon />
            {'Product'}
          </MenuItem>
        </StyledMenu>
      </>
    </FormSection>
  </Section>
)

export default compose(
  withState('anchorEl', 'setAnchorEl', null),
  withState('newMessageType', 'setNewMessageType', 'text'),
  branch(({ simpleChatStep }) => simpleChatStep._destroy, renderNothing),
  shouldUpdate((props, nextProps) => {
    const ignoreProps = ['onChange']
    return !isEqual(omit(props, ignoreProps), omit(nextProps, ignoreProps))
  }),
  withHandlers({
    closeMenu: ({ setAnchorEl }) => () => {
      setAnchorEl(null)
    },
    deleteSimpleChatStep: ({ onChange, simpleChatStepIndex, simpleChatStep }) => () => {
      onChange(
        {
          id: simpleChatStep.id,
          _destroy: true,
        },
        simpleChatStepIndex
      )
    },
    editSimpleChatStepValue: ({ simpleChatStep, simpleChatStepIndex, onChange }) => event => {
      const name = event.target.name.replace('simpleChatStep_', '')
      onChange(Object.assign({ ...simpleChatStep }, { [name]: event.target.value }), simpleChatStepIndex)
    },
    onAddMessageClick: ({ setAnchorEl }) => event => {
      setAnchorEl(event.currentTarget)
    },
    onSimpleChatMessagesSortEnd: ({ onChange, simpleChatStepIndex, simpleChatStep }) => ({ oldIndex, newIndex }) => {
      const orderedSimpleChatMessages = arrayMove(simpleChatStep.simpleChatMessagesAttributes, oldIndex, newIndex)
      onChange({ ...simpleChatStep, simpleChatMessagesAttributes: orderedSimpleChatMessages }, simpleChatStepIndex)
    },
    setSimpleChatMessagesForm: ({ simpleChatStep, simpleChatStepIndex, onChange }) => (
      simpleChatMessage,
      simpleChatMessageIndex
    ) => {
      let newSimpleChatMessagesAttributes = [...simpleChatStep.simpleChatMessagesAttributes]
      newSimpleChatMessagesAttributes[simpleChatMessageIndex] = simpleChatMessage
      onChange(
        { ...simpleChatStep, simpleChatMessagesAttributes: newSimpleChatMessagesAttributes },
        simpleChatStepIndex
      )
    },
  }),
  withHandlers({
    addSimpleChatMessage: ({
      closeMenu,
      onChange,
      simpleChatStepIndex,
      simpleChatStep,
      setNewMessageType,
    }) => newMessageType => {
      setNewMessageType(newMessageType)
      closeMenu()
      onChange(
        {
          ...simpleChatStep,
          simpleChatMessagesAttributes: simpleChatStep.simpleChatMessagesAttributes
            ? [...simpleChatStep.simpleChatMessagesAttributes, { text: '' }]
            : [{ text: '' }],
        },
        simpleChatStepIndex
      )
    },
  })
)(SimpleChatStep)
