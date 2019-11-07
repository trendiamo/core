import Button from 'shared/button'
import copy from 'clipboard-copy'
import CopyIcon from '@material-ui/icons/FileCopyOutlined'
import DoneIcon from '@material-ui/icons/Done'
import omit from 'lodash.omit'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import theme from 'app/theme'
import { Input, Tooltip } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const Container = styled(props => <form {...omit(props, ['isCopied', 'backgroundColor', 'pasteable'])} />)`
  ${({ isCopied }) => !isCopied && 'background-clip: padding-box;'}
  border-color: ${({ isCopied }) =>
    isCopied ? theme.customPalette.success.main : showUpToUsBranding() ? 'transparent' : 'rgba(239, 239, 242)'};
  border-radius: ${showUpToUsBranding() ? '6px' : '3px'};
  border-style: solid;
  border-width: 2px;
  display: flex;
  height: 100%;
  overflow: hidden;
  ${({ pasteable }) =>
    pasteable && 'width: 100%; transition: border-color 0.3s ease-in-out 0.4s; justify-content: space-between;'}

`

const TextInput = styled(props => <Input {...omit(props, ['wasCopied', 'pasteable', 'backgroundColor'])} />)`
  padding-left: 0.8rem;
  transition: margin 0.4s ease-in-out;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  border-radius: ${({ pasteable }) => (pasteable ? '6px' : '6px 0 0 6px')};

  ${showUpToUsBranding() && 'color: #272932;'}
  ${({ pasteable, wasCopied }) =>
    pasteable && !wasCopied && 'margin-right: 14px;'}

  input {
    padding: 8px;
  }
`

const CopyButtonContainer = styled.div`
  position: relative;
  background-color: ${({ isCopied }) =>
    isCopied ? theme.customPalette.success.main : showUpToUsBranding() ? 'transparent' : 'rgba(239, 239, 242)'};
`

const CopyButton = styled(props => <Button {...omit(props, ['pasteable', 'wasCopied'])} />)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  box-shadow: none;
  ${({ pasteable, wasCopied }) => pasteable && !wasCopied && 'width: 120px;'}
`

const ClipboardInput = ({
  backgroundColor,
  inputProps,
  mixFunction,
  onCopy,
  pasteable,
  placeholder,
  size,
  text,
  type,
  isLoading,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const [wasCopied, setWasCopied] = useState(false)
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const timeoutRef = useRef(null)

  const changeText = useCallback(
    event => {
      if (wasCopied) return
      setInputText(event.target.value)
    },
    [wasCopied]
  )

  const updateCopyButton = useCallback(() => {
    setIsCopied(true)
    setWasCopied(true)
    if (showUpToUsBranding()) {
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false)
      }, 3000)
    }
  }, [])

  const copyText = useCallback(
    async event => {
      event.preventDefault()
      if (outputText === inputText) {
        updateCopyButton()
        onCopy && onCopy(pasteable ? inputText : text)
        copy(pasteable ? inputText : text)
        return
      }
      const final = mixFunction ? await mixFunction(inputText) : inputText
      if (!final) return
      updateCopyButton()
      setOutputText(final)
      setInputText(final)
      onCopy && onCopy(final)
      copy(final)
    },
    [inputText, mixFunction, onCopy, outputText, pasteable, text, updateCopyButton]
  )

  const onInputFocus = useCallback(event => event.target.select(), [])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (
    <Container isCopied={isCopied} onSubmit={copyText} pasteable={pasteable} {...props}>
      <TextInput
        backgroundColor={backgroundColor}
        disableUnderline
        fullWidth
        inputProps={inputProps}
        onChange={changeText}
        onFocus={onInputFocus}
        pasteable={pasteable}
        placeholder={placeholder}
        readOnly={!pasteable}
        required
        value={pasteable ? inputText : text}
        wasCopied={wasCopied}
      />
      <Tooltip title={wasCopied ? 'Copied!' : pasteable ? 'Get Link' : 'Copy to Clipboard'}>
        <CopyButtonContainer isCopied={isCopied}>
          <CopyButton
            color={isCopied ? 'success' : type || 'primaryGradient'}
            disabled={isLoading}
            fullWidth
            inline
            pasteable={pasteable}
            size={size}
            type="submit"
            variant="contained"
            wasCopied={wasCopied}
          >
            {isCopied ? <DoneIcon /> : pasteable && !wasCopied ? 'Create Link' : <CopyIcon />}
          </CopyButton>
        </CopyButtonContainer>
      </Tooltip>
    </Container>
  )
}

export default ClipboardInput
