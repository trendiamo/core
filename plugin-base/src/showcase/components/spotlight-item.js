import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { transition } from 'ext'

const PersonaName = styled.span`
  font-weight: 500;
  font-size: 18px;
`

const PersonaDescription = styled.div`
  font-size: 14px;
`

const SpotlightItem = compose(
  withHandlers(() => {
    let imgRef, nameRef
    return {
      setImgRef: () => ref => (imgRef = ref),
      setNameRef: () => ref => (nameRef = ref),
      handleClick: ({ onClick }) => () => {
        transition.addElement('img', imgRef.base || imgRef)
        transition.addElement('name', nameRef.base || nameRef)
        onClick()
      },
    }
  })
)(({ setImgRef, setNameRef, spotlight, handleClick }) => (
  <ListItem onClick={handleClick}>
    <ListImg ref={setImgRef} src={spotlight.persona.profilePic.url} />
    <ListContent>
      <PersonaName ref={setNameRef}>{spotlight.persona.name}</PersonaName>
      <PersonaDescription>{spotlight.text}</PersonaDescription>
    </ListContent>
    <ListChevron />
  </ListItem>
))

export default SpotlightItem
