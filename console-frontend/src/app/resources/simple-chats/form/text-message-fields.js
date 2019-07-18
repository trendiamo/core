import CodeMirror from 'react-codemirror'
import jsBeautify from 'js-beautify'
import Quill from 'react-quill'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import Tooltip from 'shared/tooltip'
import { Code as IconCode } from '@material-ui/icons'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/edit/closetag'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'react-quill/dist/quill.snow.css'

const StyledToolbar = styled.div`
  &.ql-snow.ql-toolbar {
    background-color: #f5f5f5;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
    position: relative;
  }
`

const ToolbarSection = styled.div`
  display: inline-block;
  margin-right: 15px;
  vertical-align: middle;

  &:last-child {
    position: absolute;
    right: 0;
  }
`

const ToolbarButton = styled.button`
  &&&:disabled,
  &&&:disabled:hover {
    cursor: default;

    .ql-fill {
      fill: #bbb;
    }

    .ql-stroke {
      stroke: #bbb;
    }
  }

  &:focus svg,
  &:hover svg {
    color: #ff6641;
  }

  svg {
    ${({ active }) => active && 'color: #ff6641;'}
    width: 100%;
  }
`

const Toolbar = ({ id, isHTMLMode, toggleSource }) => (
  <StyledToolbar id={id}>
    <ToolbarSection>
      <Tooltip disabled={isHTMLMode} placement="top" title="Bold (Cmd + B)">
        <ToolbarButton className="ql-bold" disabled={isHTMLMode} />
      </Tooltip>
      <Tooltip disabled={isHTMLMode} placement="top" title="Italic (Cmd + I)">
        <ToolbarButton className="ql-italic" disabled={isHTMLMode} />
      </Tooltip>
      <Tooltip disabled={isHTMLMode} placement="top" title="Underline (Cmd + U)">
        <ToolbarButton className="ql-underline" disabled={isHTMLMode} />
      </Tooltip>
    </ToolbarSection>
    <ToolbarSection>
      <Tooltip disabled={isHTMLMode} placement="top" title="Link">
        <ToolbarButton className="ql-link" disabled={isHTMLMode} />
      </Tooltip>
    </ToolbarSection>
    <ToolbarSection>
      <Tooltip disabled={isHTMLMode} placement="top" title="Ordered list">
        <ToolbarButton className="ql-list" disabled={isHTMLMode} value="ordered" />
      </Tooltip>
      <Tooltip disabled={isHTMLMode} placement="top" title="Bullet list">
        <ToolbarButton className="ql-list" disabled={isHTMLMode} value="bullet" />
      </Tooltip>
    </ToolbarSection>
    <ToolbarSection>
      <Tooltip placement="top" title="Toggle source">
        <ToolbarButton active={isHTMLMode} onClick={toggleSource} type="button">
          <IconCode />
        </ToolbarButton>
      </Tooltip>
    </ToolbarSection>
  </StyledToolbar>
)

const TextEditor = styled(Quill)`
  ${({ hidden }) => hidden && 'display: none;'}

  .ql-container {
    border-radius: 0 0 4px 4px;
  }

  .ql-editor ol,
  .ql-editor ul {
    padding-left: 5px;
    margin: 10px 0;
  }

  .ql-editor ul > li::before {
    text-align: center;
  }

  .ql-editor.ql-blank::before {
    color: rgba(0, 0, 0, 0.5);
  }

  .ql-editor *:first-child {
    margin-top: 0;
  }

  .ql-editor *:last-child {
    margin-bottom: 0;
  }

  &&& .ql-tooltip {
    border-radius: 4px;
    padding: 6px 12px;
    transform: translate(125px, 5px);
    z-index: 5000;

    input {
      border-radius: 2px;
      transition: 200ms;
    }

    input:focus {
      border-color: #ff6641;
      outline: none;
    }
  }
`

const HTMLEditor = styled(CodeMirror)`
  .CodeMirror {
    border: 1px solid #ccc;
    border-radius: 0 0 4px 4px;
    display: grid;
    height: 100%;
    padding: 8px 15px;

    &-placeholder {
      color: rgba(0, 0, 0, 0.5);
    }

    &-line {
      height: 18px;

      .cm-tag {
        color: #3a8c3e;
      }

      .cm-attribute {
        color: #06c;
      }

      .cm-string {
        color: #ff6641;
      }

      .cm-comment {
        color: rgba(255, 255, 255, 0.5);
      }

      .cm-error {
        background: rgba(221, 70, 76, 0.25);
      }
    }
  }
`

// https://quilljs.com/docs/configuration
const textEditorConfig = {
  formats: ['bold', 'italic', 'underline', 'link', 'list', 'bullet', 'image'],
  modules: {
    clipboard: {
      matchVisual: false,
    },
    keyboard: {
      bindings: {
        tab: null,
      },
    },
  },
}

// https://codemirror.net/doc/manual.html#config
const htmlEditorConfig = {
  autoCloseTags: true,
  indentWithTabs: true,
  mode: 'text/html',
  placeholder: 'Edit the HTML',
  scrollbarStyle: null,
  smartIndent: true,
  tabSize: 2,
  theme: 'default',
}

// https://github.com/beautify-web/js-beautify#css--html
const beautifyHTML = value => {
  if (value === '<p><br></p>') return ''
  return jsBeautify.html(value, {
    'indent-with-tabs': true,
  })
}

const TextMessageFields = ({
  disabled,
  onChange,
  onFocus,
  simpleChatMessage,
  simpleChatMessageIndex,
  simpleChatStep,
}) => {
  const textEditorRef = useRef(null)
  const [isHTMLMode, setIsHTMLMode] = useState(false)
  const [value, setValue] = useState(simpleChatMessage.html)

  const toolbarId = useMemo(
    () => `toolbar-${simpleChatStep.__key || simpleChatStep.key}-${simpleChatMessage.id || simpleChatMessage.__key}`,
    [simpleChatMessage, simpleChatStep]
  )

  const textEditorModules = useMemo(() => ({ toolbar: `#${toolbarId}`, ...textEditorConfig.modules }), [toolbarId])

  const htmlEditorOptions = useMemo(() => ({ readOnly: disabled, ...htmlEditorConfig }), [disabled])

  useEffect(() => {
    // Change default input placeholder on mount
    textEditorRef.current.editor.theme.tooltip.textbox.dataset.link = 'https://frekkls.com'
  }, [])

  const onValueChange = useCallback(
    value => {
      setValue(value)
      const html = textEditorRef.current && textEditorRef.current.getEditorContents()
      onChange({ ...simpleChatMessage, html: beautifyHTML(html) }, simpleChatMessageIndex)
    },
    [onChange, simpleChatMessage, simpleChatMessageIndex]
  )

  const toggleSource = useCallback(
    async () => {
      !isHTMLMode && setValue(beautifyHTML(value))
      await setIsHTMLMode(!isHTMLMode)
      isHTMLMode && textEditorRef.current.focus()
    },
    [isHTMLMode, value]
  )

  const onFocusChange = useCallback(focused => focused && onFocus(), [onFocus])

  return (
    <>
      <Toolbar id={toolbarId} isHTMLMode={isHTMLMode} toggleSource={toggleSource} />
      <TextEditor
        formats={textEditorConfig.formats}
        hidden={isHTMLMode}
        modules={textEditorModules}
        onChange={isHTMLMode ? null : onValueChange}
        onFocus={onFocus}
        placeholder="Write your message"
        readOnly={disabled}
        ref={textEditorRef}
        value={value}
      />
      {isHTMLMode && (
        <HTMLEditor
          autoFocus
          onChange={onValueChange}
          onFocusChange={onFocusChange}
          options={htmlEditorOptions}
          value={value}
        />
      )}
    </>
  )
}

export default TextMessageFields
