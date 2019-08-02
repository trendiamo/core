import Avatar from 'shared/table-elements/avatar'
import moduleIcon from 'shared/module-icon'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
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

const SuggestionWithModuleIcon = ({ suggestion }) => (
  <StyledSelectLabel>
    {moduleIcon(suggestion.value.type)}
    <SelectLabelText>{suggestion.value.name}</SelectLabelText>
  </StyledSelectLabel>
)

const SuggestionWithAvatar = ({ suggestion }) => (
  <StyledSelectLabel>
    <Avatar
      alt={suggestion.value.name}
      src={imgixUrl(suggestion.value.profilePic.url, { rect: stringifyRect(suggestion.value.picRect) })}
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
