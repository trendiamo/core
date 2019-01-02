import Arrow from 'shared/arrow'
import Cover, { BelowCover } from 'app/content/cover'
import history from 'ext/history'
import routes from 'app/routes'
import SpotlightItem from './spotlight-item'
import styled from 'styled-components'
import transition from 'ext/transition'
import { animate, TopSlideAnimation } from 'shared/animate'
import { branch, compose, renderNothing, withHandlers, withProps } from 'recompose'
import { ContentSpotlight, CoverSpotlight } from './spotlight'
import { gql, graphql } from 'ext/recompose/graphql'
import { h } from 'preact'
import { isGraphCMS } from 'config'
import { List } from 'shared/list'
import { Router } from 'ext/simple-router'

const AnimatedWhiteArrow = animate(styled(Arrow).attrs({
  color: '#fff',
  lineColor: '#aaa',
  width: '100px',
})`
  opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
  transform: ${({ isEntering, isLeaving }) =>
    isEntering ? 'translateX(-200px)' : isLeaving ? 'translateX(600px)' : 'none'};
  transition: opacity 1s ease, transform 0.6s ease;
`)

const ArrowContainer = styled.div`
  position: absolute;
  bottom: 2px;
  left: 135px;
`

const Title = styled.div`
  font-size: 22px;
  line-height: 1.4;
`

const SubTitle = styled.div`
  font-size: 14px;
`

const CoverShowcase = ({ isLeaving, subtitle, title }) => (
  <div>
    <TopSlideAnimation isLeaving={isLeaving} timeout={250 * 0}>
      <Title>{title}</Title>
      <SubTitle>{subtitle}</SubTitle>
    </TopSlideAnimation>
    <ArrowContainer>
      <AnimatedWhiteArrow isLeaving={isLeaving} timeout={250 * 2} />
    </ArrowContainer>
  </div>
)

const Container = styled.div`
  flex: 1;
  padding: 1rem;
`

const ContentShowcase = ({ isLeaving, routeToSpotlight, spotlights }) => (
  <Container>
    <TopSlideAnimation isLeaving={isLeaving} timeout={250 * 1}>
      <List>
        {spotlights.map(spotlight => (
          <SpotlightItem key={spotlight.id} routeToSpotlight={routeToSpotlight} spotlight={spotlight} />
        ))}
      </List>
    </TopSlideAnimation>
  </Container>
)

const GhostLayer = styled.div`
  visibility: ${({ isTransitioning }) => (isTransitioning ? 'visible' : 'hidden')};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const ColFlexDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const ShowcaseBase = ({
  history,
  onRouteChange,
  routeToShowcase,
  routeToSpotlight,
  isTransitioning,
  spotlights,
  subtitle,
  title,
}) => (
  <ColFlexDiv>
    <Cover>
      <Router history={history} onChange={onRouteChange}>
        <CoverShowcase path="/showcase/:id" subtitle={subtitle} title={title} />
        <CoverSpotlight path="/showcase/:id/spotlight/:id" routeToShowcase={routeToShowcase} spotlights={spotlights} />
      </Router>
    </Cover>
    <BelowCover>
      <Router history={history} onChange={onRouteChange}>
        <ContentShowcase path="/showcase/:id" routeToSpotlight={routeToSpotlight} spotlights={spotlights} />
        <ContentSpotlight path="/showcase/:id/spotlight/:id" spotlights={spotlights} />
      </Router>
    </BelowCover>
    <GhostLayer isTransitioning={isTransitioning} ref={transition.setGhostRef} />
  </ColFlexDiv>
)

const Showcase = compose(
  withProps({ history }),
  graphql(
    isGraphCMS
      ? gql`
          query($id: ID!) {
            showcase(where: { id: $id }) {
              id
              title
              subtitle
              spotlights {
                id
                text
                persona {
                  id
                  name
                  description
                  profilePic {
                    url
                  }
                }
                productPicks {
                  url
                  name
                  description
                  displayPrice
                  picture {
                    url
                  }
                }
              }
            }
          }
        `
      : gql`
          query($id: ID!) {
            showcase(id: $id) {
              id
              title
              subtitle
              spotlights {
                id
                text
                persona {
                  id
                  name
                  description
                  profilePic {
                    url
                  }
                }
                productPicks {
                  url
                  name
                  description
                  displayPrice
                  picture {
                    url
                  }
                }
              }
            }
          }
        `,
    ({ id }) => ({ id: id.replace(/\/.+/, '') })
  ),
  branch(({ data }) => !data || data.loading || data.error, renderNothing),
  withProps(({ data }) => ({
    showcase: data.showcase,
    spotlights: data.showcase && data.showcase.spotlights,
    subtitle: data.showcase && data.showcase.subtitle,
    title: data.showcase && data.showcase.title,
  })),
  withHandlers({
    routeToShowcase: ({ showcase }) => () => history.replace(routes.showcase(showcase.id)),
    routeToSpotlight: ({ showcase }) => spotlight => history.replace(routes.spotlight(showcase.id, spotlight.id)),
  })
)(ShowcaseBase)

export default Showcase
