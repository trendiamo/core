import Cover, { BelowCover } from 'shared/cover'
import PersonaInstagram from 'shared/persona-instagram'
import React from 'react'
import styled from 'styled-components'
import { CoverImg, CoverInner, PaddedCover, PersonaDescription } from 'shared/cover'
import { Tile, TilesWrapper } from 'shared/tiles'
import { TopSlideAnimation } from 'shared/animate'

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

const NavigationCover = ({ FlowBackButton, persona }) => (
  <CoverInner>
    {FlowBackButton && <FlowBackButton />}
    <FlexDiv>
      <CoverImg src={persona.profilePic.url} />
      <PaddedCover>
        <span>{persona.name}</span>
        <PersonaInstagram url={persona.instagramUrl} />
        <TopSlideAnimation delay={250 * 0}>
          <PersonaDescription>{persona.description}</PersonaDescription>
        </TopSlideAnimation>
      </PaddedCover>
    </FlexDiv>
  </CoverInner>
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
