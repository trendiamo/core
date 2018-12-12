import Arrow from 'shared/arrow'
import BackButton from 'shared/back-button'
import i18n from 'ext/i18n'
import ProductItem from './product-item'
import styled from 'styled-components'
import transition from 'ext/transition'
import { animate, TopSlideAnimation } from 'shared/animate'
import { compose, lifecycle, withHandlers, withProps } from 'recompose'
import { CoverImg, PaddedCover, PersonaDescription } from 'shared/cover'
import { h } from 'preact'
import { List } from 'shared/list'

const FlexDiv = styled.div`
  display: flex;
`

const AnimatedBlackArrow = animate(styled(Arrow).attrs({
  color: '#000',
  lineColor: '#444',
  width: '150px',
})`
  opacity: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 0 : 1)};
  transform: ${({ isEntering, isLeaving }) =>
    isEntering ? 'translateX(-200px)' : isLeaving ? 'translateX(600px)' : 'none'};
  transition: opacity 1s ease, transform 0.6s ease;
`)

const CoverSpotlight = compose(
  withHandlers(() => {
    let imgRef, nameRef
    return {
      landElements: () => () => {
        if (!transition.isLiftingElements) return
        transition.landElement('img', imgRef.base)
        transition.landElement('name', nameRef)
      },
      setImgRef: () => ref => (imgRef = ref),
      setNameRef: () => ref => (nameRef = ref),
    }
  }),
  lifecycle({
    componentDidMount() {
      const { landElements } = this.props
      landElements()
    },
  }),
  withProps(({ id, spotlights }) => ({
    spotlight: spotlights.find(e => e.id === id),
  }))
)(({ isLeaving, routeToCuration, setImgRef, setNameRef, spotlight }) => (
  <FlexDiv>
    <CoverImg ref={setImgRef} src={spotlight.persona.profilePic.url} />
    <PaddedCover>
      <span ref={setNameRef}>{spotlight.persona.name}</span>
      <TopSlideAnimation timeout={250 * 1}>
        <PersonaDescription>{spotlight.text}</PersonaDescription>
      </TopSlideAnimation>
    </PaddedCover>
    <BackButton isLeaving={isLeaving} onClick={routeToCuration} />
  </FlexDiv>
))

const Container = styled.div`
  height: 100%;
  padding: 1rem;
`

const ContentSpotlight = compose(
  withProps(({ id, spotlights }) => ({
    spotlight: spotlights.find(e => e.id === id),
  })),
  withProps(({ spotlight }) => ({
    firstName: spotlight.persona.name.split(' ')[0],
  }))
)(({ firstName, isLeaving, spotlight }) => (
  <Container>
    <span>{i18n.productsSelectedBy(firstName)}</span>
    <AnimatedBlackArrow isLeaving={isLeaving} timeout={250 * 2} />
    <TopSlideAnimation isLeaving={isLeaving}>
      <List>
        {spotlight.productPicks.map(product => (
          <ProductItem key={product.url} product={product} spotlight={spotlight} />
        ))}
      </List>
    </TopSlideAnimation>
  </Container>
))

export { CoverSpotlight, ContentSpotlight }
