import Avatar from 'shared/table-elements/avatar'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import { AssignmentTurnedInOutlined, PersonPinOutlined, SmsOutlined } from '@material-ui/icons'
import { imgixUrl, stringifyRect } from 'plugin-base'

const StyledSelectLabel = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  svg {
    color: #9ea1a6;
  }
`

const SelectLabelText = styled(Typography)`
  font-family: Roboto, Helvetica, Arial, sans-serif;
  padding-left: 15px;
  color: #372727
  font-size: 16px;
`

const optionIcon = moduleTtype => {
  switch (moduleTtype) {
    case 'Showcase':
      return <PersonPinOutlined />
    case 'Outro':
      return <AssignmentTurnedInOutlined />
    case 'SimpleChat':
      return <SmsOutlined />
    default:
      return null
  }
}

const SuggestionWithModuleIcon = ({ suggestion }) => (
  <StyledSelectLabel>
    {optionIcon(suggestion.value.type)}
    <SelectLabelText>{suggestion.value.name}</SelectLabelText>
  </StyledSelectLabel>
)

const SuggestionWithAvatar = ({ suggestion }) => (
  <StyledSelectLabel>
    <Avatar
      alt={suggestion.value.name}
      src={imgixUrl(suggestion.value.profilePicUrl, { rect: stringifyRect(suggestion.value.picRect) })}
      style={{ marginRight: '0.5rem' }}
    />
    <SelectLabelText>{suggestion.label}</SelectLabelText>
  </StyledSelectLabel>
)

const suggestionTypes = (suggestionItem, { suggestion }) => {
  switch (suggestionItem) {
    case 'withAvatar':
      return <SuggestionWithAvatar suggestion={suggestion} />
    case 'withModuleIcon':
      return <SuggestionWithModuleIcon suggestion={suggestion} />
    default:
      return suggestion.label
  }
}

export { SuggestionWithModuleIcon, SuggestionWithAvatar, suggestionTypes }
