import Arrow from 'shared/arrow'
import { h } from 'preact'
import { IconChevronLeft } from 'icons'
import { List } from 'shared/list'
import ProductItem from './product-item'
import styled from 'styled-components'
import transition from './transition'
import { animate, TopSlideAnimation } from 'shared/animate'
import { compose, lifecycle, withHandlers, withProps } from 'recompose'

const FlexDiv = styled.div`
  display: flex;
`

const BackButton = animate(styled.button`
  color: #aaa;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;

  position: absolute;
  left: 10px;
  top: 10px;

  background: transparent;
  outline: none;
  border: none;
  padding: 0;

  transform: ${({ isEntering, isLeaving }) => (isEntering || isLeaving ? 'translateY(-200px)' : 'none')};
  transition: transform 0.6s ease;
`)

const Chevron = styled(IconChevronLeft)`
  fill: #aaa;
  height: 12px;
  width: 12px;
  vertical-align: middle;
`

const Span = styled.span`
  margin-left: 3px;
  vertical-align: middle;
`

const CoverImg = styled.img`
  border-radius: 50%;
  height: 45px;
  width: 45px;
  object-fit: cover;
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

const InfluencerDescription = animate(
  styled.div`
    color: #ddd;
    font-size: 12px;
  `,
  250 * 2
)

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
  withProps(({ id, website }) => ({
    spotlight: website.spotlights.find(e => e.id === id),
  }))
)(({ isLeaving, routeToRoot, setImgRef, setNameRef, spotlight }) => (
  <FlexDiv>
    <CoverImg ref={setImgRef} src={spotlight.influencer.profilePic.url} />
    <div style={{ paddingLeft: '10px' }}>
      <span ref={setNameRef}>{spotlight.influencer.name}</span>
      <TopSlideAnimation timeout={250 * 1}>
        <InfluencerDescription>{spotlight.influencer.description}</InfluencerDescription>
      </TopSlideAnimation>
    </div>
    <BackButton isLeaving={isLeaving} onClick={routeToRoot}>
      <Chevron />
      <Span>{'Back'}</Span>
    </BackButton>
  </FlexDiv>
))

const ContentSpotlight = compose(
  withProps(({ id, website }) => ({
    spotlight: website.spotlights.find(e => e.id === id),
  }))
)(({ isLeaving, spotlight }) => (
  <div>
    <span>{`Products selected by ${spotlight.influencer.name.split(' ')[0]}`}</span>
    <AnimatedBlackArrow isLeaving={isLeaving} timeout={250 * 2} />
    <TopSlideAnimation isLeaving={isLeaving}>
      <List>
        {spotlight.productPicks.map(product => (
          <ProductItem key={product.url} product={product} />
        ))}
      </List>
    </TopSlideAnimation>
  </div>
))

export { CoverSpotlight, ContentSpotlight }
