import DoneIcon from '@material-ui/icons/Done'
import omit from 'lodash.omit'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import theme, { frekklsButtons, uptousButtons } from 'app/theme'
import { Button, Input, Tooltip } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const Container = styled.div`
  background-color: ${showUpToUsBranding() ? '#f4f8f8' : 'white'};
  border-color: ${({ isCopied }) =>
    isCopied ? theme.customPalette.success.main : showUpToUsBranding() ? 'white' : 'rgba(239, 239, 242)'};
  border-radius: ${showUpToUsBranding() ? '30px' : '3px'};
  border-style: solid;
  border-width: 1px;
  display: flex;
  height: 100%;
  overflow: hidden;
`

const UrlInput = styled(props => <Input {...omit(props, ['isCopied'])} />)`
  flex: 4;
  margin-left: 0.8rem;
  ${showUpToUsBranding() &&
    `
    color: #1b3b50;
    line-height: 1.2;
    margin-left: 1.1rem;
  `}
`

const CopyButtonContainer = styled.div`
  ${!showUpToUsBranding() && 'flex: 1;'}
`

const CopyButton = styled(props => <Button {...omit(props, ['isCopied'])} />)`
  border-radius: 0;
  box-shadow: none;
  line-height: 1;
  height: 100%;
  width: 100%;
  &:after {
    background: #000;
    bottom: 0;
    content: '';
    left: 0;
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.3s;
  }
  &:hover:after {
    opacity: 0.2;
  }
  span {
    z-index: 1;
  }
  ${({ isCopied }) =>
    isCopied &&
    `
    background-image: none !important;
    background-color: ${theme.customPalette.success.main} !important;
    &:hover {
      background-image: none !important;
      background-color: ${theme.customPalette.success.main} !important;
    }
  `}
  ${showUpToUsBranding() &&
    `
    border-radius: 30px;
    font-size: 18px;
    width: 90px;
    &:after {
      border-radius: 30px;
    }
  `}
`

const ClipboardInput = ({ text, ...props }) => {
  const [isCopied, setIsCopied] = useState(false)

  const copyUrl = useCallback(
    async () => {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      showUpToUsBranding() && setTimeout(() => setIsCopied(false), 3000)
    },
    [text]
  )

  const onInputFocus = useCallback(event => event.target.select(), [])

  return (
    <Container isCopied={isCopied} {...props}>
      <UrlInput defaultValue={text} disableUnderline fullWidth isCopied={isCopied} onFocus={onInputFocus} readOnly />
      <Tooltip title={isCopied ? 'Copied!' : 'Copy to Clipboard'}>
        <CopyButtonContainer>
          <CopyButton
            fullWidth
            isCopied={isCopied}
            onClick={copyUrl}
            style={showUpToUsBranding() ? uptousButtons.primaryGradient : frekklsButtons.primaryGradient}
            variant="contained"
          >
            {isCopied ? <DoneIcon /> : 'Copy'}
          </CopyButton>
        </CopyButtonContainer>
      </Tooltip>
    </Container>
  )
}

export default ClipboardInput
