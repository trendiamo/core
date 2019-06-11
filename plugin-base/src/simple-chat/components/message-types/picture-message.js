import React from 'react'
import styled from 'styled-components'
import { Card, CardImg } from 'shared/card'
import { compose, withHandlers, withProps } from 'recompose'
import { imgixUrl, stringifyRect } from 'tools'

const PictureCard = styled(Card)`
  margin-right: 0;
  min-width: 260px;
`

const Picture = styled(CardImg)`
  height: 260px;
`

const PictureMessage = ({ onPictureClick, url }) => {
  return (
    <PictureCard onClick={onPictureClick}>
      <Picture src={url} />
    </PictureCard>
  )
}

export default compose(
  withProps(({ picture }) => ({
    url:
      picture.picUrl &&
      imgixUrl(picture.picUrl, {
        rect: stringifyRect(picture.picRect),
        fit: 'crop',
        w: 260,
        h: 260,
      }),
  })),
  withHandlers({
    onPictureClick: ({ onClick, picture }) => () => {
      onClick({ type: 'clickPictureMessage', item: { url: picture.picUrl, picRect: picture.picRect } })
    },
  })
)(PictureMessage)
