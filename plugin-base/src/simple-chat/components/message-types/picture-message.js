import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { Card, CardImg } from 'shared/card'
import { imgixUrl, stringifyRect } from 'tools'

const PictureCard = styled(Card)`
  margin-right: 0;
  min-width: 260px;
`

const Picture = styled(CardImg)`
  height: 260px;
`

const PictureMessage = ({ onClick, pictureMessage }) => {
  const url = useMemo(
    () =>
      pictureMessage.picture.url &&
      imgixUrl(pictureMessage.picture.url, {
        rect: stringifyRect(pictureMessage.picRect),
        fit: 'crop',
        w: 260,
        h: 260,
      }),
    [pictureMessage.picRect, pictureMessage.picture.url]
  )
  const onPictureClick = useCallback(
    () => {
      onClick({ type: 'clickPictureMessage', item: { url: pictureMessage.picture.url } })
    },
    [onClick, pictureMessage.picture.url]
  )

  return (
    <PictureCard onClick={onPictureClick}>
      <Picture src={url} />
    </PictureCard>
  )
}

export default PictureMessage
