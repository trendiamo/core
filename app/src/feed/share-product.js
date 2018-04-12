import copy from 'copy-to-clipboard'
import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'
import styled, { css } from 'styled-components'

const StyledSpan = styled.span`
  ${({ success }) =>
    success &&
    css`
      color: #7bcf7d;
    `};
`

const ShareProduct = ({ hasShared, handleClick }) => (
  <StyledSpan onClick={handleClick} success={hasShared}>
    {hasShared ? 'Link copied' : 'Share'}
  </StyledSpan>
)

export default compose(
  withState('hasShared', 'setHasShared', false),
  withProps(({ product }) => {
    const { location: loc } = window
    const port = loc.port ? `:${loc.port}` : ''
    const url = product.url ? `${loc.protocol}//${loc.hostname}${port}${product.url}` : loc.href
    return { url }
  }),
  withHandlers({
    handleClick: ({ setHasShared, url }) => event => {
      event.preventDefault()
      copy(url)
      setHasShared(true)
    },
  })
)(ShareProduct)
