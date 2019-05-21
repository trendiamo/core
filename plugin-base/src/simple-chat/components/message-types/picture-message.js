import React from 'react'
import styled from 'styled-components'
import { Card, CardImg } from 'shared/card'
import { compose, withHandlers, withProps } from 'recompose'
import { imgixUrl } from 'tools'

const PictureCard = styled(Card)`
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
  withProps(({ picUrl }) => ({
    url: picUrl && imgixUrl(picUrl, { fit: 'crop', w: 180, h: 260 }),
  })),
  withHandlers({
    onPictureClick: ({ onClick, url }) => () => {
      onClick({ type: 'clickPictureMessage', item: { url } })
    },
  })
)(PictureMessage)