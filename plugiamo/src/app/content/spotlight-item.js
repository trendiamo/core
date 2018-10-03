import { h } from 'preact'
import { IconChevronRight } from 'icons'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { ListContent, ListImg, ListItem } from 'shared/list'

const InfluencerName = styled.div`
  font-weight: 500;
`

const Chevron = styled(IconChevronRight)`
  height: 16px;
  width: 16px;
  margin: 10px;
`

const SpotlightItem = ({ onListItemClick, spotlight }) => (
  <ListItem onClick={onListItemClick}>
    <ListImg src={spotlight.influencer.profilePic.url} />
    <ListContent>
      <InfluencerName>{spotlight.influencer.name}</InfluencerName>
    </ListContent>
    <Chevron />
  </ListItem>
)

export default compose(
  withHandlers({
    onListItemClick: ({ routeToSpotlight, spotlight }) => () => routeToSpotlight(spotlight),
  })
)(SpotlightItem)
