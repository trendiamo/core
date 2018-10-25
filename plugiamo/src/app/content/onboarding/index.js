import { h } from 'preact'
import history from 'ext/history'
import { location } from 'config'
import { matchUrl } from 'ext/simple-router'
import querystring from 'querystring'
import { Router } from 'ext/simple-router'
import styled from 'styled-components'
import { TopSlideAnimation } from 'shared/animate'
import { compose, withHandlers, withProps } from 'recompose'
import { CoverImg, InfluencerDescription, PaddedCover } from 'shared/cover'
import { IconBed, IconFamily, IconHome, IconLove, IconPortfolio, IconSaveMoney, IconSchool, IconTree } from 'icons'
import { List, ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { OptionButton, OptionsWrapper } from 'shared/option-button'

const FlexDiv = styled.div`
  display: flex;
`

const OnboardingBackground = styled.div`
  background-color: #f5f9fc;
  padding: 1rem;
  flex: 1;
`

const CoverOnboarding = () => (
  <FlexDiv>
    <CoverImg src="https://media.graphcms.com/ldBc0l5fTkSskjgscwam" />
    <PaddedCover>
      <span>{"Hi, I'm João!"}</span>
      <TopSlideAnimation timeout={250 * 1}>
        <InfluencerDescription>
          {"I'm a Uniplaces specialist, I want to help you to choose a perfect place!"}
        </InfluencerDescription>
      </TopSlideAnimation>
    </PaddedCover>
  </FlexDiv>
)

const H2 = styled.h2`
  margin: 0;
  font-size: 18px;
  margin-bottom: 12px;
`

const universities = [
  {
    address: 'Av. Rovisco Pais, 1',
    id: 3025,
    name: 'Instituto Superior Técnico',
    query: {
      east: '-9.130089282989504',
      north: '38.74312196015692',
      south: '38.730501812418424',
      university: '{"name":"IST - Instituto Superior Técnico","lat":38.7368192,"lng":-9.138705,"id":"3025"}',
      west: '-9.147319793701174',
    },
  },
  {
    address: 'Av. Berna, 26 C',
    id: 3020,
    name: 'Universidade Nova de Lisboa',
    query: {
      east: '-9.151718616485597',
      north: '38.73723060371599',
      south: '38.73011681265178',
      university: '{"name":"Universidade Nova de Lisboa","lat":38.733682,"lng":-9.160333,"id":"3020"}',
      west: '-9.168949127197267',
    },
  },
]

const UniversityItem = compose(
  withHandlers({
    onClick: ({ onClick, university }) => () => {
      onClick(university.query)
    },
  })
)(({ onClick, university }) => (
  <ListItem onClick={onClick}>
    <ListImg
      src="https://static.thenounproject.com/png/6399-200.png"
      style={{ height: '24px', marginLeft: '10px', width: '24px' }}
    />
    <ListContent>
      <div style={{ fontWeight: 'bold ' }}>{university.name}</div>
      <div style={{ color: '#4a4a4a', fontSize: '12px' }}>{university.address}</div>
    </ListContent>
    <ListChevron />
  </ListItem>
))

const UniList = ({ onClick }) => (
  <List>
    {universities.map(university => (
      <UniversityItem key={university.id} onClick={onClick} university={university} />
    ))}
  </List>
)

const ContentOnboarding = compose(
  withProps(() => ({
    city: matchUrl(location.pathname, '/accommodation/:city').city.replace(/^\w/, c => c.toUpperCase()),
  })),
  withHandlers({
    navTo: () => newQuery => {
      const query = {
        ...querystring.parse(location.search.substr(1)),
        ...newQuery,
      }
      window.location = `${location.pathname}?${querystring.stringify(query)}`
    },
  }),
  withHandlers({
    navTo2: () => () => history.replace('/onboarding/uniplaces/2'),
    onCheapClick: ({ navTo }) => () =>
      navTo({
        order: 'price_asc',
      }),
    onCouplesClick: ({ navTo }) => () =>
      navTo({
        'restrictions-occupancy[]': 'couples',
      }),
    onPlaceClick: ({ navTo }) => () =>
      navTo({
        'rent-type[]': 'property',
      }),
    onRoomClick: ({ navTo }) => () =>
      navTo({
        'rent-type[]': ['unit', 'subunit'],
      }),
    onUniClick: ({ navTo }) => uniQuery => navTo(uniQuery),
  })
)(({ city, navTo2, onUniClick, onCheapClick, onCouplesClick, onPlaceClick, onRoomClick }) => (
  <OnboardingBackground>
    <Router history={history}>
      <div path={'/onboarding/uniplaces'}>
        <H2>{`Why are you moving to ${city}?`}</H2>
        <OptionsWrapper>
          <OptionButton Icon={IconSchool} onClick={navTo2} title="Study" />
          <OptionButton Icon={IconPortfolio} title="Work" />
          <OptionButton Icon={IconFamily} title="Family" />
          <OptionButton Icon={IconTree} title="Leisure" />
        </OptionsWrapper>
      </div>
      <div path={'/onboarding/uniplaces/2'}>
        <H2>{`Where are you going to study?`}</H2>
        <UniList onClick={onUniClick} />
      </div>
      <div path={'/onboarding/uniplaces/3'}>
        <H2>{`Looking for something specific?`}</H2>
        <OptionsWrapper>
          <OptionButton Icon={IconBed} onClick={onRoomClick} title="Just a Room" />
          <OptionButton Icon={IconHome} onClick={onPlaceClick} title="Entire Place" />
          <OptionButton Icon={IconLove} onClick={onCouplesClick} title="For Couples" />
          <OptionButton Icon={IconSaveMoney} onClick={onCheapClick} title="Cheap Places" />
        </OptionsWrapper>
      </div>
    </Router>
  </OnboardingBackground>
))

export { CoverOnboarding, ContentOnboarding }
