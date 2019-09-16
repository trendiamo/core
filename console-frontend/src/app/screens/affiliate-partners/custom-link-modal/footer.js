import Button from 'shared/button'
import ClipboardInput from 'shared/clipboard-input'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Input } from '@material-ui/core'

const urlInputProps = { pattern: 'https?://.+' }

const Container = styled.div`
  background: #f4f8f8;
  min-height: 100px;
  padding: 25px 60px 40px;
`

const ClipboardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`

const InputContainer = styled.div`
  width: 70%;
`

const Footer = ({ affiliation }) => {
  const [inputUrl, setInputUrl] = useState('')
  const [outputUrl, setOutputUrl] = useState(null)

  const onLinkChange = useCallback(event => {
    setInputUrl(event.target.value)
  }, [])

  const getLink = useCallback(
    event => {
      event.preventDefault()
      setOutputUrl(`${inputUrl}/?aftk=${affiliation.token}`)
    },
    [affiliation.token, inputUrl]
  )

  return (
    <Container>
      {outputUrl ? (
        <ClipboardContainer>
          <ClipboardInput text={outputUrl} />
        </ClipboardContainer>
      ) : (
        <Form onSubmit={getLink}>
          <InputContainer>
            <Input
              autoFocus
              fullWidth
              inputProps={urlInputProps}
              onChange={onLinkChange}
              placeholder="Paste URL link here"
              required
              value={inputUrl}
            />
          </InputContainer>
          <Button color="primaryGradient" type="submit">
            {'Get Link'}
          </Button>
        </Form>
      )}
    </Container>
  )
}

export default Footer
