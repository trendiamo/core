import IconBtnGrid from 'icons/icon-btn-grid'
import IconBtnList from 'icons/icon-btn-list'
import React from 'react'
import { compose, withHandlers } from 'recompose'
import styled, { css } from 'styled-components'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const IconContainer = styled.div`
  cursor: pointer;
  margin-left: 1rem;
  ${({ active }) =>
    active &&
    css`
      svg {
        color: #5da494;
      }
    `};
`

const ViewTypeSelector = ({ onGridClick, onListClick, viewType }) => (
  <StyledDiv>
    <IconContainer active={viewType === 'grid'} onClick={onGridClick}>
      <IconBtnGrid />
    </IconContainer>
    <IconContainer active={viewType === 'list'} onClick={onListClick}>
      <IconBtnList />
    </IconContainer>
  </StyledDiv>
)

export default compose(
  withHandlers({
    onGridClick: ({ onViewTypeChange }) => () => onViewTypeChange('grid'),
    onListClick: ({ onViewTypeChange }) => () => onViewTypeChange('list'),
  })
)(ViewTypeSelector)
