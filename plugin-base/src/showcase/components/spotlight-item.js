import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { imgixUrl, stringifyRect } from 'tools'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { transition } from 'ext'

const PersonaName = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  max-width: 100%;
  flex-shrink: 0;
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
      handleClick: ({ onClick, withoutPicture, spotlight }) => () => {
        if (!withoutPicture) {
          transition.addElement('img', imgRef)
          transition.addElement('name', nameRef)
        }
        onClick(spotlight)
      },
    }
  })
)(({ setImgRef, setNameRef, spotlight, handleClick, selectInList, listSelected, withoutPicture, bordered }) => (
  <ListItem bordered={bordered} listSelected={listSelected} onClick={handleClick} selectInList={selectInList}>
    {!withoutPicture && (
      <ListImg
        animation={spotlight.persona.profilePicAnimationUrl}
        imgRef={setImgRef}
        picture={imgixUrl(spotlight.persona.profilePic.url, {
          rect: stringifyRect(spotlight.persona.profilePic.picRect || spotlight.persona.picRect),
          fit: 'crop',
          w: 101,
          h: 101,
        })}
      />
    )}
    <ListContent withoutPicture={withoutPicture}>
      <PersonaName ref={setNameRef}>{spotlight.persona.name}</PersonaName>
      <PersonaDescription dangerouslySetInnerHTML={{ __html: spotlight.persona.description }} />
    </ListContent>
    <ListChevron />
  </ListItem>
))

export default SpotlightItem
