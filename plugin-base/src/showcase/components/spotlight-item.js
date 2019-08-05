import React, { useCallback, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { sellerPicUrl } from 'tools'
import { transition } from 'ext'

const SellerName = styled.div`
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

const SellerDescription = styled.div`
  font-size: 14px;
  .Win32 & {
    letter-spacing: -0.1px;
    font-size: 13.1px;
    font-weight: 500;
  }
`

const SpotlightItem = ({ spotlight, onClick, setListSelected, listSelected, withoutPicture, bordered }) => {
  const imgRef = useRef()
  const nameRef = useRef()

  const newOnClick = useCallback(
    () => {
      if (!withoutPicture) {
        transition.addElement('img', imgRef.current)
        transition.addElement('name', nameRef.current)
      }
      onClick(spotlight)
    },
    [onClick, spotlight, withoutPicture]
  )

  const animation = useMemo(
    () =>
      spotlight.seller.profilePicAnimation && !spotlight.useSellerAnimation && spotlight.seller.profilePicAnimation.url,
    [spotlight]
  )

  return (
    <ListItem bordered={bordered} listSelected={listSelected} onClick={newOnClick} setListSelected={setListSelected}>
      {!withoutPicture && (
        <ListImg
          animation={animation}
          picture={sellerPicUrl(spotlight.seller, spotlight.useSellerAnimation, { w: 101, h: 101 })}
          ref={imgRef}
        />
      )}
      <ListContent withoutPicture={withoutPicture}>
        <SellerName ref={nameRef}>{spotlight.seller.name}</SellerName>
        <SellerDescription dangerouslySetInnerHTML={{ __html: spotlight.seller.description }} />
      </ListContent>
      <ListChevron />
    </ListItem>
  )
}

export default SpotlightItem
