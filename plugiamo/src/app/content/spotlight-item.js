import { h } from 'preact'
import { IconChevronRight } from 'icons'
import styled from 'styled-components'
import transition from './transition'
import { compose, withHandlers } from 'recompose'
import { ListContent, ListImg, ListItem } from 'shared/list'

const InfluencerName = styled.span`
  font-weight: 500;
`

const Chevron = styled(IconChevronRight)`
  height: 16px;
  width: 16px;
  margin: 10px;
`

const SpotlightItem = ({ onListItemClick, setImgRef, setNameRef, spotlight }) => (
  <ListItem onClick={onListItemClick}>
    <ListImg ref={setImgRef} src={spotlight.influencer.profilePic.url} />
    <ListContent>
      <InfluencerName ref={setNameRef}>{spotlight.influencer.name}</InfluencerName>
    </ListContent>
    <Chevron />
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
