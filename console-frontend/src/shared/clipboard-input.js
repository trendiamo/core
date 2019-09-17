import Button from 'shared/button'
import DoneIcon from '@material-ui/icons/Done'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
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

const UrlInput = styled(props => <Input {...omit(props, ['wasCopied', 'pasteable', 'backgroundColor'])} />)`
  padding-left: 0.8rem;
  background-color: ${({ backgroundColor }) => backgroundColor || '#fff'};
  ${({ pasteable, wasCopied }) =>
    pasteable && !wasCopied && 'margin-right: 14px;'}
  transition: margin 0.4s ease-in-out;
`

const CopyButton = styled(props => <Button {...omit(props, ['pasteable'])} />)`
  height: 100%;
  width: ${({ pasteable }) => (pasteable ? '135px' : '90px')};
  box-shadow: none;
  border-radius: 0;
`

const CopyButtonContainer = styled.div``

const ClipboardInput = ({
  text,
  type,
  size,
  pasteable,
  backgroundColor,
  urlInputProps,
  mixFunction,
  placeholder,
  ...props
}) => {
  const [isCopied, setIsCopied] = useState(false)
  const [wasCopied, setWasCopied] = useState(false)
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const changeText = useCallback(
    event => {
      if (wasCopied) return
      setInputText(event.target.value)
    },
    [wasCopied]
  )

  const copyUrl = useCallback(
    async event => {
      event.preventDefault()
      setIsCopied(true)
      setWasCopied(true)
      showUpToUsBranding() && setTimeout(() => setIsCopied(false), 3000)
      if (outputText === inputText) {
        await navigator.clipboard.writeText(pasteable ? inputText : text)
        return
      }
      const final = mixFunction ? mixFunction(inputText) : inputText
      setOutputText(final)
      setInputText(final)
      await navigator.clipboard.writeText(final)
    },
    [inputText, mixFunction, outputText, pasteable, text]
  )

  const onInputFocus = useCallback(event => event.target.select(), [])

  return (
    <Container isCopied={isCopied} onSubmit={copyUrl} pasteable={pasteable} {...props}>
      <UrlInput
        backgroundColor={backgroundColor}
        disableUnderline
        fullWidth
        inputProps={urlInputProps}
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
            fullWidth
            pasteable={pasteable}
            size={size}
            type="submit"
            variant="contained"
          >
            {isCopied ? <DoneIcon /> : pasteable && !wasCopied ? 'Get Link' : 'Copy'}
          </CopyButton>
        </CopyButtonContainer>
      </Tooltip>
    </Container>
  )
}

export default ClipboardInput
