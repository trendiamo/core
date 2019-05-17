import Button from 'shared/button'
import ContentEditable from 'react-contenteditable'
import omit from 'lodash.omit'
import React from 'react'
import RichTextEditor from 'react-rte'
import styled from 'styled-components'
import trim from 'lodash.trim'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { InputLabel, Tooltip } from '@material-ui/core'

const Label = styled(InputLabel)`
  font-size: 12px;
`

const StyledRichTextEditor = styled(RichTextEditor)`
  border: none !important;
  line-height: 25px !important;
  padding-top: 5px;
  word-break: break-word;
  .RichTextEditor__editor___1QqIU {
    display: ${({ isMarkdownMode }) => isMarkdownMode && 'none'};
    font-family: Roboto, Helvetica, Arial, sans-serif !important;
    line-height: 25px;
    padding-top: 5px;
    word-break: break-word;
  }
  .EditorToolbar__root___3_Aqz {
    border-color: #e7e8e7;
    line-height: 0;
    margin: 0 !important;
    padding-bottom: 0 !important;
    position: relative;
    & > div {
      border-right: 1px solid #e7e8e7;
      margin: 0;
      &:last-child {
        border-right: none;
        padding-right: none;
      }
    }
    & button {
      border: none;
      border-radius: 0 !important;
      cursor: pointer;
      opacity: 0.6;
      outline-color: #ff6641;
    }
    & input {
      outline: none;
      &:focus {
        border-color: #ff6641;
      }
    }
  }
`

const StyledEditorContainer = styled.div`
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
  position: relative;
`

const StyledTooltip = styled(Tooltip)`
  margin: 6px 0;
`

const MarkdownIcon = styled.a`
  display: ${({ isMarkdownMode }) => !isMarkdownMode && 'none'};
  position: absolute;
  right: 16px;
  top: 16px;
  z-index: 5;
  & img {
    filter: brightness(0);
    &:hover {
      filter: none;
    }
  }
`

const DisabledToolbar = styled.div`
  display: ${({ isMarkdownMode }) => !isMarkdownMode && 'none'};
  background-color: rgba(255, 255, 255, 0.6) !important;
  border: none !important;
  cursor: not-allowed;
  height: 30px;
  position: absolute;
  top: 10px;
  width: 170px;
  z-index: 10;
`

const SwitchButtonContainer = styled.div`
  display: inline-block;
`

const SwitchButton = styled(Button)`
  border-radius: 0;
  color: #ff6641;
  min-height: 0;
  opacity: 0.9 !important;
  padding: 4px 12px;
`

const OmittedContentEditable = ({ ...props }) => <ContentEditable {...omit(props, ['isMarkdownMode'])} />

const StyledContentEditable = styled(OmittedContentEditable)`
  display: ${({ isMarkdownMode }) => !isMarkdownMode && 'none'};
  font-size: 16px;
  line-height: 25px;
  outline: none;
  padding: 15px 10px 10px;
  white-space: pre-wrap;
  word-break: break-word;
  &:empty::before {
    color: #9197a3;
    content: attr(placeholder);
    display: block;
    margin: -1px 0 1px -1px;
  }
  &:empty:focus::before {
    color: #bdc1c9;
  }
`

const toolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold (Cmd+Shift+B)', style: 'BOLD' },
    { label: 'Italic (Cmd+Shift+I)', style: 'ITALIC' },
  ],
}

export default compose(
  withState('isMarkdownMode', 'setIsMarkdownMode', false),
  withState('value', 'setValue', ({ simpleChatMessage }) =>
    RichTextEditor.createValueFromString(simpleChatMessage.text, 'markdown')
  ),
  withHandlers({
    onMarkdownKeyDown: () => event => {
      if (event.keyCode === 13) {
        event.preventDefault()
        document.execCommand('insertHTML', false, '\n')
      }
    },
    onMarkdownPaste: () => event => {
      event.preventDefault()
      document.execCommand('insertHTML', false, (event.originalEvent || event).clipboardData.getData('text/plain'))
    },
    onRTEReturn: () => () => {
      document.execCommand('insertHTML', false, '\n')
      return 'handled'
    },
    onSwitchButtonClick: ({ isMarkdownMode, setIsMarkdownMode }) => () => {
      setIsMarkdownMode(!isMarkdownMode)
    },
    onValueChange: ({ onChange, setValue, simpleChatMessage, simpleChatMessageIndex }) => event => {
      const value = event.nativeEvent ? RichTextEditor.createValueFromString(event.target.value, 'markdown') : event
      setValue(value)
      onChange({ ...simpleChatMessage, text: trim(value.toString('markdown')) || '' }, simpleChatMessageIndex)
    },
  }),
  lifecycle({
    // Prevents the component to crash (the base editor Draft.js has some known issues)
    componentDidCatch() {
      this.forceUpdate()
    },
  })
)(
  ({
    disabled,
    onMarkdownKeyDown,
    onMarkdownPaste,
    onRTEReturn,
    onSwitchButtonClick,
    onValueChange,
    isMarkdownMode,
    value,
    onFocus,
  }) => (
    <>
      <Label required>{'Message'}</Label>
      <StyledEditorContainer>
        <StyledTooltip placement="left" title="Learn about the Markdown syntax">
          <MarkdownIcon
            href="https://www.markdownguide.org/cheat-sheet"
            isMarkdownMode={isMarkdownMode}
            rel="noopener noreferrer"
            target="_blank"
          >
            <img alt="" src="/img/icons/markdown.svg" />
          </MarkdownIcon>
        </StyledTooltip>
        <StyledRichTextEditor
          customControls={[
            <Tooltip key={0} placement="top" title="Switch to preview to use these commands">
              <DisabledToolbar isMarkdownMode={isMarkdownMode} />
            </Tooltip>,
            <SwitchButtonContainer key={1}>
              <SwitchButton onClick={onSwitchButtonClick} size="small">
                {`${isMarkdownMode ? 'preview' : 'markdown'}`}
              </SwitchButton>
            </SwitchButtonContainer>,
          ]}
          handleReturn={onRTEReturn}
          isMarkdownMode={isMarkdownMode}
          onChange={onValueChange}
          onFocus={onFocus}
          placeholder="Insert a message"
          readOnly={disabled}
          toolbarConfig={toolbarConfig}
          value={value}
        />
        <StyledContentEditable
          disabled={disabled}
          html={value.toString('markdown')}
          isMarkdownMode={isMarkdownMode}
          onChange={onValueChange}
          onFocus={onFocus}
          onKeyDown={onMarkdownKeyDown}
          onPaste={onMarkdownPaste}
          placeholder="Insert a message"
        />
      </StyledEditorContainer>
    </>
  )
)
