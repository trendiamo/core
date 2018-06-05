import { Button } from '../shared/buttons'
import ColorLink from '../shared/color-link'
import css from '../shared/style'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 0 2rem;
  max-width: 600px;
  min-height: 100vh;

  @media (min-width: 632px) {
    margin: 0 auto;
  }
`

const StyledLink = styled(Link)`
  color: white;
`

const Legal = () => (
  <StyledDiv>
    <Helmet style={[{ cssText: css }]} />
    <Button>
      <StyledLink to="/">{'‹ Back'}</StyledLink>
    </Button>
    <h1>{'Legal text'}</h1>
    <p>
      {
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    </p>
    <p>
      {
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    </p>
    <ColorLink to="/">{'Go back to the store'}</ColorLink>
  </StyledDiv>
)

export default Legal
