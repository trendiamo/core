import IconBtnGrid from 'icons/icon-btn-grid'
import IconBtnList from 'icons/icon-btn-list'
import IconBtnPeople from 'icons/icon-btn-people'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const IconContainer = styled.div`
  cursor: pointer;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  svg {
    color: ${({ active }) => (active ? '#36d4bc' : '#d5d5d5')};
  }
`

const ViewTypeSelector = ({ onGridClick, onListClick, onPeopleClick, viewType, showPeople }) => (
  <StyledDiv>
    <IconContainer active={viewType === 'grid'} onClick={onGridClick}>
      <IconBtnGrid />
    </IconContainer>
    <IconContainer active={viewType === 'list'} onClick={onListClick}>
      <IconBtnList />
    </IconContainer>
    {showPeople && (
      <IconContainer active={viewType === 'people'} onClick={onPeopleClick}>
        <IconBtnPeople />
      </IconContainer>
    )}
  </StyledDiv>
)

export default compose(
  withHandlers({
    onGridClick: ({ onViewTypeChange }) => () => onViewTypeChange('grid'),
    onListClick: ({ onViewTypeChange }) => () => onViewTypeChange('list'),
    onPeopleClick: ({ onViewTypeChange }) => () => onViewTypeChange('people'),
  })
)(ViewTypeSelector)
