import { h } from 'preact'
import styled from 'styled-components'
import transition from './transition'
import { compose, withHandlers } from 'recompose'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'

const InfluencerName = styled.span`
  font-weight: 500;
  font-size: 18px;
`

const InfluencerDescription = styled.div`
  font-size: 14px;
`

const SpotlightItem = ({ onListItemClick, setImgRef, setNameRef, spotlight }) => (
  <ListItem onClick={onListItemClick}>
    <ListImg ref={setImgRef} src={spotlight.influencer.profilePic.url} />
    <ListContent>
      <InfluencerName ref={setNameRef}>{spotlight.influencer.name}</InfluencerName>
      <InfluencerDescription>{spotlight.influencer.description}</InfluencerDescription>
    </ListContent>
    <ListChevron />
  </ListItem>
)

export default compose(
  withHandlers(() => {
    let imgRef, nameRef
    return {
      onListItemClick: ({ routeToSpotlight, spotlight }) => () => {
        transition.addElement('img', imgRef.base)
        transition.addElement('name', nameRef.base)
        routeToSpotlight(spotlight)
      },
      setImgRef: () => ref => (imgRef = ref),
      setNameRef: () => ref => (nameRef = ref),
    }
  })
)(SpotlightItem)
