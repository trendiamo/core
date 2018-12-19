import Cover, { BelowCover } from 'app/content/cover'
import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { Tile, TilesWrapper } from 'shared/tiles'
import { TopSlideAnimation } from 'shared/animate'

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
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
      <TopSlideAnimation timeout={250 * 0}>
        <PersonaDescription>{persona.description}</PersonaDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
)

const NavigationItem = compose(
  withHandlers({
    onTileClick: ({ navigationItem }) => () => {
      mixpanel.track(
        'Clicked Product',
        {
          flowType: 'navigation',
          hostname: location.hostname,
          navItemText: navigationItem.text,
        },
        () => {
          window.location = navigationItem.url
        }
      )
    },
  })
)(({ navigationItem, onTileClick }) => (
  <Tile imageUrl={navigationItem.picture.url} onClick={onTileClick} title={navigationItem.text} />
))

export const NavigationBase = ({ navigationItems, persona }) => (
  <ColFlexDiv>
    <Cover>
      <NavigationCover persona={persona} />
    </Cover>
    <BelowCover>
      <Container>
        <TopSlideAnimation timeout={250 * 1}>
          <TilesWrapper>
            {navigationItems.map(navigationItem => (
              <NavigationItem key={navigationItem.id} navigationItem={navigationItem} />
            ))}
          </TilesWrapper>
        </TopSlideAnimation>
      </Container>
    </BelowCover>
  </ColFlexDiv>
)

const Navigation = compose(
  graphql(
    gql`
      query($id: ID!) {
        navigation(id: $id) {
          id
          navigationItems {
            id
            text
            url
            picture {
              url
            }
          }
        }
      }
    `,
    ({ id }) => ({ id })
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    navigationItems: data.navigation && data.navigation.navigationItems,
  }))
)(NavigationBase)

export default Navigation
