import auth from 'auth'
import Dialog from 'shared/dialog'
import omit from 'lodash.omit'
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { apiRequest, apiTriggerShow } from 'utils'
import { Button, Input, Link, Typography } from '@material-ui/core'

const StyledButton = styled(Button)`
  border-radius: 0;
  box-shadow: none;
  height: 40px;
`

const StyledLink = styled(Link)`
  text-decoration: 'none';

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`

const UrlInput = styled(Input)`
  flex: 4;
  margin-left: 0.8rem;
`

const ButtonDiv = styled.div`
  flex: 1;
`

const UrlDiv = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: rgba(239, 239, 242);
  margin: 1.5rem;
  border-radius: 3px;
  display: flex;
  overflow: hidden;
`

const handleUrlFocus = event => event.target.select()

const validHostnames = () => auth.getAccount().websitesAttributes[0].hostnames

const PreviewUrlBox = ({ module }) => {
  const [url, setUrl] = useState('')
  const [isValidUrl, setIsValidUrl] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [triggerUrl, setTriggerUrl] = useState(null)

  const fetchTrigger = async module => {
    const { json, requestError } = await apiRequest(apiTriggerShow, [module.triggerIds[0]])
    setIsLoading(false)
    if (requestError) {
      setUrl(`https://${validHostnames()[0]}`)
    } else {
      setUrl(`https://${validHostnames()[0] + json.urlMatchers[0]}`)
      setTriggerUrl(`https://${validHostnames()[0] + json.urlMatchers[0]}`)
    }
  }

  const moduleToFragment = () => {
    if (!module.type || !module.id || url === triggerUrl) return ''
    return `#trnd:path:/${module.type}/${module.id}`
  }

  const onUrlChange = useCallback(event => {
    setUrl(event.target.value)
    const hostname = event.target.value.replace(/^https?:\/\//i, '').split('/')[0]
    const isProtocolValid = event.target.value.match(/^https?:\/\//)
    setIsValidUrl(validHostnames().includes(hostname) && isProtocolValid)
  }, [])

  useEffect(() => {
    if (module.triggerIds.length > 0) {
      fetchTrigger(module)
    } else {
      setIsLoading(false)
      setUrl(`https://${validHostnames()[0]}`)
    }
  }, [module, module.triggerIds])

  return (
    <UrlDiv>
      <UrlInput
        disabled={isLoading}
        disableUnderline
        fullWidth
        onChange={onUrlChange}
        onFocus={handleUrlFocus}
        value={url}
      />
      <ButtonDiv>
        {isValidUrl ? (
          <StyledLink href={url + moduleToFragment(module, url)} rel="noopener noreferrer" target="_blank">
            <StyledButton color="primary" fullWidth variant="contained">
              {'Go'}
            </StyledButton>
          </StyledLink>
        ) : (
          <StyledButton color="primary" disabled fullWidth variant="contained">
            {'Go'}
          </StyledButton>
        )}
      </ButtonDiv>
    </UrlDiv>
  )
}

const FilteredTypography = props => <Typography {...omit(props, ['fontSize', 'fontWeight'])} />

const StyledTypography = styled(FilteredTypography)`
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight};
  color: black;
`

const ContentContainer = styled.div`
  text-align: center;
`

const DialogContent = ({ module }) => (
  <ContentContainer>
    <StyledTypography fontSize="2.1rem" fontWeight="300">
      {'Preview this Module'}
    </StyledTypography>
    <StyledTypography fontSize="1.1rem" fontWeight="500">
      {'Insert the url of the page where you want to see this module.'}
    </StyledTypography>
    <PreviewUrlBox module={module} />
  </ContentContainer>
)

const DialogActions = ({ handleClose }) => (
  <Button color="primary" onClick={handleClose} variant="text">
    {'Done'}
  </Button>
)

const PreviewModal = ({ open, setOpen, module }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  return (
    <Dialog
      content={<DialogContent module={module} />}
      dialogActions={<DialogActions handleClose={handleClose} />}
      fullWidth
      handleClose={handleClose}
      maxWidth="sm"
      open={open}
      title=""
    />
  )
}

export default PreviewModal
