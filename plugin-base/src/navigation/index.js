import Cover, { BelowCover } from 'shared/cover'
import React from 'react'
import styled from 'styled-components'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover'
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

const NavigationCover = ({ persona }) => (
  <FlexDiv>
    <CoverImg src={persona.profilePic.url} />
    <PaddedCover>
      <span>{persona.name}</span>
      <TopSlideAnimation delay={250 * 0}>
        <PersonaDescription>{persona.description}</PersonaDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
)

const Navigation = ({ navigationItems, onTileClick, persona }) => (
  <ColFlexDiv>
    <Cover>
      <NavigationCover persona={persona} />
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
