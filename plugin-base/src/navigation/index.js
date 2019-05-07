import React from 'react'
import styled from 'styled-components'
import { BelowCover, CoverImg, CoverInner, PaddedCover, PersonaDescription } from 'shared/cover/components'
import { compose } from 'recompose'
import { Cover, PersonaInstagram, Tile, TilesWrapper, TopSlideAnimation } from 'shared'
import { imgixUrl } from 'tools'
import { Title } from 'shared'
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

const PersonaName = styled.div`
  color: #fff;
  display: inline-block;
`

const NavigationCover = compose(withTextTyping(({ persona }) => persona.description, 300))(
  ({ FlowBackButton, persona, currentDescription }) => (
    <CoverInner>
      {FlowBackButton && <FlowBackButton />}
      <FlexDiv>
        <CoverImg src={imgixUrl(persona.profilePic.url, { fit: 'crop', w: 45, h: 45 })} />
        <PaddedCover>
          <PersonaName>{persona.name}</PersonaName>
          <PersonaInstagram url={persona.instagramUrl} />
          <PersonaDescription text={persona.description} typingText={currentDescription} />
        </PaddedCover>
      </FlexDiv>
    </CoverInner>
  )
)

const Navigation = ({ FlowBackButton, title, navigationItems, onTileClick, persona }) => (
  <ColFlexDiv>
    <Cover>
      <NavigationCover FlowBackButton={FlowBackButton} persona={persona} />
    </Cover>
    <BelowCover>
      <Container>
        <Title>{title}</Title>
        <TopSlideAnimation delay={250 * 1}>
          <TilesWrapper objectForResetCheck={{ ...navigationItems, persona }}>
            {navigationItems.map((navigationItem, index) => (
              <Tile
                highlight
                imageUrl={imgixUrl(navigationItem.picture.url, { fit: 'crop', w: 156, h: 120 })}
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
