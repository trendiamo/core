import ColorLink from '../shared/color-link'
import css from '../shared/style'
import Helmet from 'react-helmet'
import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  text-align: center;
`

const NoMatch = ({ location }) => (
  <StyledDiv>
    <Helmet style={[{ cssText: css }]} />
    <h1>{'404 - Not found'}</h1>
    <p>
      {'No match for '}
      <code>{location.pathname}</code>
    </p>
    <ColorLink to="/">{'Go back to the store'}</ColorLink>
  </StyledDiv>
)

export default NoMatch
