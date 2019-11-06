import React from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const ThumbUpContainer = styled.div`
  border: solid 2px #ffb652;
  border-radius: 50%;
  background-color: #cb7e3d;
  height: 26px;
  width: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledThumbUpIcon = styled(ThumbUpIcon)`
  color: #ffb652;
  width: 16px;
  height: 16px;
`

const ImpactPoint = () => (
  <ThumbUpContainer>
    <StyledThumbUpIcon />
  </ThumbUpContainer>
)

export default ImpactPoint
