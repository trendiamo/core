import FlexBar from './flex-bar'
import Header from './header'
import IconButton from './icon-button'
import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { DragHandle } from 'shared/sortable-elements'
import { ExpandMore } from '@material-ui/icons'
import { showUpToUsBranding } from 'utils'

const FoldButton = ({ folded, toggleFolded }) => (
  <IconButton aria-expanded={!folded} aria-label="Show more" onClick={toggleFolded}>
    <FoldIcon folded={folded} />
  </IconButton>
)

const FoldIcon = styled(props => <ExpandMore {...omit(props, ['folded'])} />)`
  transform: rotate(${({ folded }) => (folded ? '0deg' : '540deg')});
  transition: transform 0.6s;
`

const lateralPadding = showUpToUsBranding() ? '16px' : '24px'

const StyledFlexBar = styled(props => <FlexBar {...omit(props, ['isFormSectionTitle'])} />)`
  padding: ${({ isFormSectionTitle, foldable }) =>
    isFormSectionTitle || !foldable ? `16px ${lateralPadding}` : `0 ${lateralPadding} 16px`};
`

const SectionTitle = ({
  actions,
  isFormSectionTitle,
  dragHandle,
  ellipsize,
  foldable,
  folded,
  hideDragHandle,
  title,
  toggleFolded,
}) => (
  <StyledFlexBar foldable={foldable} isFormSectionTitle={isFormSectionTitle}>
    {dragHandle && <DragHandle hidden={hideDragHandle} />}
    <Header ellipsize={ellipsize} variant={showUpToUsBranding() ? 'h6' : 'subtitle1'}>
      {title}
    </Header>
    {actions}
    {foldable && <FoldButton folded={folded} toggleFolded={toggleFolded} />}
  </StyledFlexBar>
)

export default SectionTitle
