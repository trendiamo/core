import Avatar from 'shared/table-elements/avatar'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const StyledSelectLabel = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  &:hover {
    background-color: #deebff;
    cursor: pointer;
  }
  svg {
    color: #9ea1a6;
  }
`

const SelectLabelText = styled(Typography)`
  padding-left: 15px;
  color: #372727
  font-size: 16px;
`

const OptionWithAvatar = option => (
  <StyledSelectLabel ref={option.innerRef} {...option.innerProps}>
    <Avatar alt={option.value.name} src={option.value.imgUrl} style={{ marginRight: '0.5rem' }} />
    <SelectLabelText>{option.value.name}</SelectLabelText>
  </StyledSelectLabel>
)

export { OptionWithAvatar, StyledSelectLabel, SelectLabelText }
