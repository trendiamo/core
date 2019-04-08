import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Collapse, IconButton } from '@material-ui/core'
import { compose, onlyUpdateForKeys, withHandlers, withState } from 'recompose'
import { Divider, FlexBar, Header } from './index'
import { DragHandle } from 'shared/sortable-elements'
import { ExpandMore } from '@material-ui/icons'

const FoldIcon = styled(props => <ExpandMore {...omit(props, ['folded'])} />)`
  transform: rotate(${({ folded }) => (folded ? '0deg' : '540deg')});
  transition: transform 0.6s;
`

const SectionContainer = styled.div`
  margin: 0;
  ${({ backgroundColor }) => (backgroundColor ? `background-color: ${backgroundColor};` : null)}
`

const Content = styled.div`
  margin: 0px 0 16px;
`

const FoldButtonTemplate = ({ isFoldedByLogic, folded, toggleFolded }) => (
  <IconButton aria-expanded={!(isFoldedByLogic || folded)} aria-label="Show more" onClick={toggleFolded}>
    <FoldIcon folded={isFoldedByLogic || folded} />
  </IconButton>
)

const FoldButton = compose(onlyUpdateForKeys(['isFoldedByLogic', 'folded']))(FoldButtonTemplate)

const HeaderBar = ({ dragHandle, ellipsize, isFoldedByLogic, toggleFolded, folded, foldable, title, actions }) => (
  <FlexBar>
    {dragHandle && <DragHandle />}
    <Header ellipsize={ellipsize} variant="subtitle1">
      {title}
    </Header>
    {actions}
    {foldable && <FoldButton folded={folded} isFoldedByLogic={isFoldedByLogic} toggleFolded={toggleFolded} />}
  </FlexBar>
)

const FormSection = ({
  backgroundColor,
  dragHandle,
  title,
  children,
  folded,
  ellipsize,
  foldable,
  toggleFolded,
  actions,
  hideTop,
  hideBottom,
  isFoldedByLogic,
}) => (
  <SectionContainer backgroundColor={backgroundColor}>
    {!hideTop && <Divider />}
    <HeaderBar
      actions={actions}
      dragHandle={dragHandle}
      ellipsize={ellipsize}
      foldable={foldable}
      folded={folded}
      isFoldedByLogic={isFoldedByLogic}
      title={title}
      toggleFolded={toggleFolded}
    />
    {!hideBottom && <Divider folded={isFoldedByLogic || folded} />}
    <Collapse in={isFoldedByLogic !== undefined ? !isFoldedByLogic : !folded} timeout="auto">
      <Content>{children}</Content>
    </Collapse>
  </SectionContainer>
)

export default compose(
  withState('folded', 'setFolded', ({ folded }) => folded),
  withHandlers({
    toggleFolded: ({ folded, setFolded, setIsFoldedByLogic }) => () => {
      setIsFoldedByLogic && setIsFoldedByLogic(!folded)
      setFolded(!folded)
    },
  })
)(FormSection)
