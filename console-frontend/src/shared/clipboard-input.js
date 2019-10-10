import Button from 'shared/button'
import copy from 'clipboard-copy'
import CopyIcon from '@material-ui/icons/FileCopy'
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
  border-radius: ${showUpToUsBranding() ? '0px' : '3px'};
  border-style: solid;
  border-width: 1px;
  display: flex;
  height: 100%;
  overflow: hidden;
  ${({ pasteable }) =>
    pasteable && 'width: 100%; transition: border-color 0.3s ease-in-out 0.4s; justify-content: space-between;'}

`

const TextInput = styled(props => <Input {...omit(props, ['wasCopied', 'pasteable', 'backgroundColor'])} />)`
  padding-left: 0.8rem;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  ${({ pasteable, wasCopied }) =>
    pasteable && !wasCopied && 'margin-right: 14px;'}
  transition: margin 0.4s ease-in-out;
  ${showUpToUsBranding() && 'color: #272932;'}
  input {
    padding: 6px 0;
  }
`

const CopyButton = styled(props => <Button {...omit(props, ['pasteable'])} />)`
  height: 100%;
  ${({ pasteable }) => (pasteable ? 'width: 120px;' : '')}
  box-shadow: none;
  border-radius: 0;
`

const CopyButtonContainer = styled.div``

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
        <CopyButtonContainer>
          <CopyButton
            color={isCopied ? 'success' : type || 'primaryGradient'}
            disabled={isLoading}
            fullWidth
            inline
            pasteable={pasteable}
            size={size}
            type="submit"
            variant="contained"
          >
            {isCopied ? <DoneIcon /> : pasteable && !wasCopied ? 'Get Link' : <CopyIcon />}
          </CopyButton>
        </CopyButtonContainer>
      </Tooltip>
    </Container>
  )
}

export default ClipboardInput
