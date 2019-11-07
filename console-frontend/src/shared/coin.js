import React from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

const IconContainer = styled.div`
  background-color: #cb7e3d;
  border: solid 3px #ffb652;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height || '30'}px;
  width: ${({ width }) => width || '30'}px;
`

const Icon = styled(ThumbUpIcon)`
  color: #ffb652;
  padding: 3px;
  height: ${({ height }) => height / 1.33 || '24'}px;
  width: ${({ width }) => width / 1.33 || '24'}px;
`

const Coin = props => (
  <IconContainer {...props}>
    <Icon {...props} />
  </IconContainer>
)

export default Coin
