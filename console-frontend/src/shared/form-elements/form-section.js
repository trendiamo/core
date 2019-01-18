import omit from 'lodash.omit'
import React from 'react'
import styled from 'styled-components'
import { Collapse, IconButton } from '@material-ui/core'
import { compose, withHandlers, withState } from 'recompose'
import { Divider, FlexBar, Header } from './index'
import { ExpandMore } from '@material-ui/icons'

const FoldIcon = styled(props => <ExpandMore {...omit(props, ['folded'])} />)`
  transform: rotate(${({ folded }) => (folded ? '0deg' : '540deg')});
  transition: transform 0.6s;
`

const ExpandButton = styled(IconButton)`
  margin-left: auto;
`

const SectionContainer = styled.div`
  margin: 0;
  ${({ backgroundColor }) => (backgroundColor ? `background-color: ${backgroundColor};` : null)}
`

const Content = styled.div`
  margin: 0px 0 16px;
`

const FormSection = ({
  backgroundColor,
  dragHandle,
  title,
  children,
  folded,
  foldable,
  toggleFolded,
  actions,
  hideTop,
  hideBottom,
}) => (
  <SectionContainer backgroundColor={backgroundColor}>
    {!hideTop && <Divider />}
    <FlexBar>
      {dragHandle}
      <Header variant="subtitle1">{title}</Header>
      {actions}
      {foldable && (
        <ExpandButton aria-expanded={folded} aria-label="Show more" onClick={toggleFolded}>
          <FoldIcon folded={folded} />
        </ExpandButton>
      )}
    </FlexBar>
    {!hideBottom && <Divider folded={folded} />}
    <Collapse in={!folded} timeout="auto" unmountOnExit>
      <Content>{children}</Content>
    </Collapse>
  </SectionContainer>
)

export default compose(
  withState('folded', 'setFolded', ({ folded }) => folded),
  withHandlers({
    toggleFolded: ({ folded, setFolded }) => () => {
      setFolded(!folded)
    },
  })
)(FormSection)
