import emojify from 'ext/emojify'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { transition } from 'ext'

const PersonaName = styled.span`
  font-weight: 500;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
  .Win32 & {
    font-weight: 600;
  }
`

const PersonaDescription = styled.div`
  font-size: 14px;
  .Win32 & {
    letter-spacing: -0.1px;
    font-size: 13.1px;
    font-weight: 500;
  }
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
)(({ setImgRef, setNameRef, spotlight, handleClick, selectInList, listSelected }) => (
  <ListItem listSelected={listSelected} onClick={handleClick} selectInList={selectInList}>
    <ListImg
      animation={spotlight.persona.profilePicAnimationUrl}
      imgRef={setImgRef}
      picture={spotlight.persona.profilePic.url}
    />
    <ListContent>
      <PersonaName ref={setNameRef}>{spotlight.persona.name}</PersonaName>
      <PersonaDescription dangerouslySetInnerHTML={{ __html: emojify(spotlight.persona.description) }} />
    </ListContent>
    <ListChevron />
  </ListItem>
))

export default SpotlightItem
