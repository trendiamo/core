import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Card, CardImg } from 'shared/card'
import { imgixUrl, stringifyRect } from 'tools'

const ImageCard = styled(Card)`
  margin-right: 0;
  min-width: 260px;
`

const Image = styled(CardImg)`
  height: 260px;
  cursor: zoom-in;
`

const ImageMessage = ({ onClick, imageMessage }) => {
  const url = useMemo(
    () =>
      imageMessage.img.url &&
      imgixUrl(imageMessage.img.url, {
        rect: stringifyRect(imageMessage.imgRect),
        fit: 'crop',
        w: 260,
        h: 260,
      }),
    [imageMessage.imgRect, imageMessage.img.url]
  )
  const onImageClick = useCallback(() => {
    onClick({ type: 'clickImageMessage', item: { url: imageMessage.img.url } })
  }, [onClick, imageMessage.img.url])

  return (
    <ImageCard onClick={onImageClick}>
      <Image src={url} />
    </ImageCard>
  )
}

export default ImageMessage
