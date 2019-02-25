import styled from 'styled-components'
import { BelowCover, Cover, CoverImg, PaddedCover, PersonaDescription, TopSlideAnimation } from 'plugin-base'
import { Card, CardContent, CardImg, CardsContainer, CardsWrapper } from 'shared/card'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { imgixUrl } from 'plugin-base'

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

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 12px;

  a {
    color: inherit;
  }
`

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: #181818;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const TypeAndPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 1.8;
`

const Type = styled.div`
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.1px;
  color: #4a4a4a;
  text-transform: uppercase;
`

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.1px;
  color: #25997e;
`

const humanizeType = type => {
  switch (type) {
    case 'room_shared':
      return 'Shared room'
    default:
      return type
  }
}

const humanizePrice = price => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(price)
}

const HouseCard = compose(
  withHandlers({
    onClick: ({ card }) => () => (window.location = card.url),
  })
)(({ card, onClick }) => (
  <Card onClick={onClick} style={{ minWidth: '230px', cursor: 'pointer' }}>
    <CardImg src={card.mainPhotoUrl} style={{ height: '170px', objectFit: 'cover' }} />
    <CardContent>
      <Title>{card.title}</Title>
      <TypeAndPrice>
        <Type>{humanizeType(card.type)}</Type>
        <Price>{humanizePrice(card.monthlyPrice.fixedPrice)}</Price>
      </TypeAndPrice>
    </CardContent>
  </Card>
))

const SpotahomeCover = ({ persona }) => (
  <FlexDiv>
    <CoverImg src={imgixUrl(persona.profilePic.url, { fit: 'crop', 'max-w': 45, 'max-h': 45 })} />
    <PaddedCover>
      <span>{persona.name}</span>
      <TopSlideAnimation timeout={250 * 0}>
        <PersonaDescription>{persona.description}</PersonaDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
)

const Base = ({ cards, onClick, persona, search }) => (
  <ColFlexDiv>
    <Cover>
      <SpotahomeCover persona={persona} />
    </Cover>
    <BelowCover>
      <Container>
        <H2>
          <span>{'Accommodations for you in '}</span>
          <a href={`/madrid/?${search}`} onClick={onClick}>
            {'Madrid'}
          </a>
        </H2>
        <CardsWrapper>
          <CardsContainer style={{ width: `${246 * cards.length}px` }}>
            {cards.map(card => (
              <HouseCard card={card} key={card.id} />
            ))}
          </CardsContainer>
        </CardsWrapper>
      </Container>
    </BelowCover>
  </ColFlexDiv>
)

export default compose(
  withHandlers({
    onClick: ({ search }) => event => {
      event.preventDefault()
      window.location = `/madrid/?${search}`
      return false
    },
  })
)(Base)
