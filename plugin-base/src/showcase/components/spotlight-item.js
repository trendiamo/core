import React, { useCallback, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { ListChevron, ListContent, ListImg, ListItem } from 'shared/list'
import { sellerImgUrl } from 'tools'
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

const SellerBio = styled.div`
  font-size: 14px;
  .Win32 & {
    letter-spacing: -0.1px;
    font-size: 13.1px;
    font-weight: 500;
  }
`

const SpotlightItem = ({ spotlight, onClick, setListSelected, listSelected, withoutImage, bordered }) => {
  const imgRef = useRef()
  const nameRef = useRef()

  const newOnClick = useCallback(() => {
    if (!withoutImage) {
      transition.addElement('img', imgRef.current)
      transition.addElement('name', nameRef.current)
    }
    onClick(spotlight)
  }, [onClick, spotlight, withoutImage])

  const animation = useMemo(
    () => spotlight.seller.animatedImg && !spotlight.useSellerAnimation && spotlight.seller.animatedImg.url,
    [spotlight]
  )

  return (
    <ListItem bordered={bordered} listSelected={listSelected} onClick={newOnClick} setListSelected={setListSelected}>
      {!withoutImage && (
        <ListImg
          animation={animation}
          img={sellerImgUrl(spotlight.seller, spotlight.useSellerAnimation, { w: 101, h: 101 })}
          ref={imgRef}
        />
      )}
      <ListContent withoutImage={withoutImage}>
        <SellerName ref={nameRef}>{spotlight.seller.name}</SellerName>
        <SellerBio dangerouslySetInnerHTML={{ __html: spotlight.seller.bio }} />
      </ListContent>
      <ListChevron />
    </ListItem>
  )
}

export default SpotlightItem
