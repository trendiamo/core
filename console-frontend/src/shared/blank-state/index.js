import Link from 'shared/link'
import React from 'react'
import { Container, Description, Header, Image, StyledButton } from './components'

const BlankState = ({ title, imageSource, description, route, onClick, buttonText }) => (
  <Container>
    {imageSource && <Image alt="" src={imageSource} />}
    {title && <Header variant="h4">{title}</Header>}
    {description && <Description variant="body1">{description}</Description>}
    {route && (
      <Link to={route}>
        <StyledButton color="primaryGradient" onClick={onClick} variant="contained">
          {buttonText}
        </StyledButton>
      </Link>
    )}
  </Container>
)

export default BlankState
