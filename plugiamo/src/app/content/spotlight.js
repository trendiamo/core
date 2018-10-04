import Arrow from 'shared/arrow'
import { h } from 'preact'
import { IconChevronLeft } from 'icons'
import styled from 'styled-components'
import transition from './transition'
import { animate, TopSlideAnimation } from 'shared/animate'
import { Card, CardContent, CardImg } from 'shared/card'
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
  fill: white;
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
  <FlexDiv path={'/'}>
    <CoverImg ref={setImgRef} src={spotlight.influencer.profilePic.url} />
    <div style={{ paddingLeft: '10px' }}>
      <div ref={setNameRef}>{spotlight.influencer.name}</div>
    </div>
    <BackButton isLeaving={isLeaving} onClick={routeToRoot}>
      <Chevron />
      <Span>{'Back'}</Span>
    </BackButton>
  </FlexDiv>
))

const mockProducts = [
  {
    description: 'Lorem ipsum dolor sit amet pluribonum...',
    displayPrice: '44 €',
    id: 1,
    name: 'Cotton Shirt',
    url: 'https://placeimg.com/340/300/any',
  },
  {
    description: 'Lorem ipsum dolor sit amet pluribonum...',
    displayPrice: '38 €',
    id: 2,
    name: 'Blue pants',
    url: 'https://placeimg.com/340/301/any',
  },
  {
    description: 'Lorem ipsum dolor sit amet pluribonum...',
    displayPrice: '72 €',
    id: 2,
    name: 'Black Shoes',
    url: 'https://placeimg.com/340/302/any',
  },
]

const ProductsContainer = styled.div`
  overflow-x: scroll;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 0 1rem;
  padding-bottom: 1rem;
`

const Products = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
`

const ContentSpotlight = compose(
  withProps(({ id, website }) => ({
    spotlight: website.spotlights.find(e => e.id === id),
  }))
)(({ isLeaving, spotlight }) => (
  <div>
    <span>{`Products selected by ${spotlight.influencer.name}`}</span>
    <AnimatedBlackArrow isLeaving={isLeaving} timeout={250 * 2} />
    <TopSlideAnimation isLeaving={isLeaving}>
      <ProductsContainer>
        <Products style={{ width: (170 + 16) * mockProducts.length }}>
          {mockProducts.map(mockProduct => (
            <Card key={mockProduct.id} style={{ cursor: 'pointer', width: '170px' }}>
              <CardImg src={mockProduct.url} />
              <CardContent style={{ color: '#4a4a4a', letterSpacing: '0.1px' }}>
                <FlexDiv style={{ marginBottom: '4px' }}>
                  <div style={{ flex: 1, fontSize: '12px', fontWeight: '500', textTransform: 'uppercase' }}>
                    {mockProduct.name}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{mockProduct.displayPrice}</div>
                </FlexDiv>
                <div style={{ color: '#a9a9a9', fontSize: '12px' }}>{mockProduct.description}</div>
              </CardContent>
            </Card>
          ))}
        </Products>
      </ProductsContainer>
    </TopSlideAnimation>
  </div>
))

export { CoverSpotlight, ContentSpotlight }
