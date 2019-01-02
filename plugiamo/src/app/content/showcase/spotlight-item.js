import mixpanel from 'ext/mixpanel'
import styled from 'styled-components'
import transition from 'ext/transition'
import { compose, withHandlers } from 'recompose'
import { h } from 'preact'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { location } from 'config'

const PersonaName = styled.span`
  font-weight: 500;
  font-size: 18px;
`

const PersonaDescription = styled.div`
  font-size: 14px;
`

const SpotlightItem = ({ onListItemClick, setImgRef, setNameRef, spotlight }) => (
  <ListItem onClick={onListItemClick}>
    <ListImg ref={setImgRef} src={spotlight.persona.profilePic.url} />
    <ListContent>
      <PersonaName ref={setNameRef}>{spotlight.persona.name}</PersonaName>
      <PersonaDescription>{spotlight.text}</PersonaDescription>
    </ListContent>
    <ListChevron />
  </ListItem>
)

export default compose(
  withHandlers(() => {
    let imgRef, nameRef
    return {
      onListItemClick: ({ routeToSpotlight, spotlight }) => () => {
        mixpanel.track('Clicked Persona', {
          flowType: 'showcase',
          hostname: location.hostname,
          personaName: spotlight.persona.name,
          personaRef: spotlight.persona.id,
        })
        transition.addElement('img', imgRef.base)
        transition.addElement('name', nameRef.base)
        routeToSpotlight(spotlight)
      },
      setImgRef: () => ref => (imgRef = ref),
      setNameRef: () => ref => (nameRef = ref),
    }
  })
)(SpotlightItem)
