import Button from 'shared/button'
import classNames from 'classnames'
import ContentEditable from 'react-contenteditable'
import injectSheet from 'react-jss'
import React from 'react'
import RichTextEditor from 'react-rte'
import { compose, lifecycle, withHandlers, withState } from 'recompose'
import { Tooltip } from '@material-ui/core'
import { trim } from 'lodash'
import { OndemandVideo as VideoIcon } from '@material-ui/icons'

const styles = {
  editor: {
    border: 'none !important',
  },
  editorContainer: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '5px',
    position: 'relative',
  },
  hidden: {
    display: 'none !important',
  },
  markdownEditor: {
    fontSize: '16px',
    lineHeight: '25px',
    outline: 'none',
    padding: '15px 10px 10px',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    '&:empty::before': {
      color: '#9197a3',
      content: 'attr(placeholder)',
      display: 'block',
      margin: '-1px 0 1px -1px',
    },
    '&:empty:focus::before': {
      color: '#bdc1c9',
    },
  },
  markdownIcon: {
    position: 'absolute',
    right: '42px',
    top: '16px',
    zIndex: 5,
    '& img': {
      filter: 'brightness(0)',
      '&:hover': {
        filter: 'none',
      },
    },
  },
  RTEditor: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    lineHeight: '25px',
    paddingTop: '5px',
    wordBreak: 'break-word',
  },
  switchButton: {
    borderRadius: 0,
    color: '#ff6641',
    minHeight: 0,
    opacity: '0.9 !important',
    padding: '5.3px 13px',
  },
  switchButtonContainer: {
    display: 'inline-block',
  },
  toolbar: {
    borderColor: '#e7e8e7',
    margin: '0 !important',
    paddingBottom: '0 !important',
    position: 'relative',
    '& > div': {
      borderRight: '1px solid #e7e8e7',
      margin: '0',
      '&:last-child': {
        borderRight: 'none',
        paddingRight: 'none',
      },
    },
    '& button': {
      border: 'none',
      borderRadius: '0 !important',
      cursor: 'pointer',
      opacity: 0.6,
      outlineColor: '#ff6641',
    },
    '& input': {
      outline: 'none',
      '&:focus': {
        borderColor: '#ff6641',
      },
    },
  },
  toolbarDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.6) !important',
    border: 'none !important',
    cursor: 'not-allowed',
    height: '30px',
    position: 'absolute',
    top: '10px',
    width: '198px',
    zIndex: 10,
  },
  tooltip: {
    margin: '6px 0',
  },
  videoIcon: {
    cursor: 'help',
    position: 'absolute',
    right: '10px',
    top: '15px',
    width: 20,
    zIndex: 5,
    '&:hover': {
      color: '#ff6641',
    },
  },
}

const toolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'LINK_BUTTONS', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    { label: 'Bold (Cmd+Shift+B)', style: 'BOLD' },
    { label: 'Italic (Cmd+Shift+I)', style: 'ITALIC' },
    { label: 'Underline (Cmd+Shift+U)', style: 'UNDERLINE' },
  ],
}

const MarkdownRTE = compose(
  withState('markdownMode', 'setMarkdownMode', false),
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
    onSwitchButtonClick: ({ markdownMode, setMarkdownMode }) => () => {
      setMarkdownMode(!markdownMode)
    },
    onValueChange: ({ name, onChange, setValue, simpleChatMessage, simpleChatMessageIndex }) => event => {
      const value = event.nativeEvent ? RichTextEditor.createValueFromString(event.target.value, 'markdown') : event
      setValue(value)
      const newName = name.replace('simpleChatMessage_', '')
      onChange(
        Object.assign({}, simpleChatMessage, {
          [newName]: trim(value.toString('markdown')),
        }),
        simpleChatMessageIndex
      )
    },
  }),
  lifecycle({
    // Prevents the component to crash (the base editor Draft.js has some known errors)
    componentDidCatch() {
      this.forceUpdate()
    },
  })
)(
  ({
    classes,
    disabled,
    onMarkdownKeyDown,
    onMarkdownPaste,
    onRTEReturn,
    onSwitchButtonClick,
    onValueChange,
    markdownMode,
    value,
  }) => (
    <div className={classes.editorContainer}>
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        placement="top-start"
        title="If you paste a YouTube link, the video will be shown"
      >
        <VideoIcon className={classes.videoIcon} />
      </Tooltip>
      <Tooltip
        classes={{ tooltip: classes.tooltip }}
        placement="top-start"
        title="Click here to know more about the Markdown syntax"
      >
        <a
          className={classNames(classes.markdownIcon, !markdownMode && classes.hidden)}
          href="https://www.markdownguide.org/cheat-sheet"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img alt="" src="/img/icons/markdown.svg" />
        </a>
      </Tooltip>
      <RichTextEditor
        className={classes.editor}
        customControls={[
          <Tooltip key={0} placement="top" title="Switch to preview to use this commands">
            <div className={classNames(classes.toolbarDisabled, !markdownMode && classes.hidden)} />
          </Tooltip>,
          <div className={classes.switchButtonContainer} key={1}>
            <Button className={classes.switchButton} onClick={onSwitchButtonClick} size="small">
              {`Switch to ${markdownMode ? 'preview' : 'markdown'}`}
            </Button>
          </div>,
        ]}
        editorClassName={classNames(classes.RTEditor, markdownMode && classes.hidden)}
        handleReturn={onRTEReturn}
        onChange={onValueChange}
        placeholder="Insert a message"
        readOnly={disabled}
        toolbarClassName={classes.toolbar}
        toolbarConfig={toolbarConfig}
        value={value}
      />
      <ContentEditable
        className={classNames(classes.markdownEditor, !markdownMode && classes.hidden)}
        disabled={disabled}
        html={value.toString('markdown')}
        onChange={onValueChange}
        onKeyDown={onMarkdownKeyDown}
        onPaste={onMarkdownPaste}
        placeholder="Insert a message"
      />
    </div>
  )
)

export default injectSheet(styles)(MarkdownRTE)
