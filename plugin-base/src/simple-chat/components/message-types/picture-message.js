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

const PictureMessage = ({ onClick, picture }) => {
  const url = useMemo(
    () =>
      picture.picUrl &&
      imgixUrl(picture.picUrl, {
        rect: stringifyRect(picture.picRect),
        fit: 'crop',
        w: 260,
        h: 260,
      }),
    [picture.picRect, picture.picUrl]
  )
  const onPictureClick = useCallback(
    () => {
      onClick({ type: 'clickPictureMessage', item: { url: picture.picUrl } })
    },
    [onClick, picture.picUrl]
  )

  return (
    <PictureCard onClick={onPictureClick}>
      <Picture src={url} />
    </PictureCard>
  )
}

export default PictureMessage
