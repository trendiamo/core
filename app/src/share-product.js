import copy from 'copy-to-clipboard'
import React from 'react'
import { compose, withHandlers, withProps, withState } from 'recompose'

const ShareProduct = ({ hasShared, handleClick }) => (
  <span className={hasShared ? 'is-success' : null} onClick={handleClick}>
    {hasShared ? 'Link copied' : 'Share'}
  </span>
)

export default compose(
  withState('hasShared', 'setHasShared', false),
  withProps(({ product }) => {
    const { location: loc } = window
    const port = loc.port ? `:${loc.port}` : ''
    const url = `${loc.protocol}//${loc.hostname}${port}${product.url}`
    return { url }
  }),
  withHandlers({
    handleClick: ({ setHasShared, url }) => event => {
      event.preventDefault()
      copy(url)
      setHasShared(true)
    }
  })
)(ShareProduct)
