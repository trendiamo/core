import Cover, { BelowCover } from 'shared/cover'
import PersonaInstagram from 'shared/persona-instagram'
import React from 'react'
import styled from 'styled-components'
import { compose } from 'recompose'
import { CoverImg, CoverInner, PaddedCover, PersonaDescription } from 'shared/cover'
import { Tile, TilesWrapper } from 'shared/tiles'
import { TopSlideAnimation } from 'shared/animate'
import { withTextTyping } from 'ext'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

const FlexDiv = styled.div`
  display: flex;
`

const Container = styled.div`
  flex: 1;
  padding: 1rem;
  background-color: #ebeef2;
`

const NavigationCover = compose(withTextTyping(({ persona }) => persona.description, 300))(
  ({ FlowBackButton, persona, currentDescription }) => (
    <CoverInner>
      {FlowBackButton && <FlowBackButton />}
      <FlexDiv>
        <CoverImg src={persona.profilePic.url} />
        <PaddedCover>
          <span>{persona.name}</span>
          <PersonaInstagram url={persona.instagramUrl} />
          <PersonaDescription text={persona.description} typingText={currentDescription} />
        </PaddedCover>
      </FlexDiv>
    </CoverInner>
  )
)

const Navigation = ({ FlowBackButton, navigationItems, onTileClick, persona }) => (
  <ColFlexDiv>
    <Cover>
      <NavigationCover FlowBackButton={FlowBackButton} persona={persona} />
    </Cover>
    <BelowCover>
      <Container>
        <TopSlideAnimation delay={250 * 1}>
          <TilesWrapper objectForResetCheck={{ ...navigationItems, persona }}>
            {navigationItems.map((navigationItem, index) => (
              <Tile
                highlight
                imageUrl={navigationItem.picture.url}
                key={navigationItem.id || `new-${index}`}
                onClick={() => onTileClick(navigationItem)}
                title={navigationItem.text}
              />
            ))}
          </TilesWrapper>
        </TopSlideAnimation>
      </Container>
    </BelowCover>
  </ColFlexDiv>
)

export default Navigation
