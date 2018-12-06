import React from 'react'
import sanitizeProps from 'shared/sanitize-props'
import styled from 'styled-components'
import { Collapse, IconButton } from '@material-ui/core'
import { compose, withHandlers, withState } from 'recompose'
import { Divider, FlexBar, Header } from './index'
import { ExpandMore } from '@material-ui/icons'

const FoldIcon = styled(props => <ExpandMore {...sanitizeProps(props, ['folded'])} />)`
  transform: rotate(${({ folded }) => (folded ? '0deg' : '540deg')});
  transition: transform 0.6s;
`

const ExpandButton = styled(IconButton)`
  margin-left: auto;
`

const SectionContainer = styled.div`
  margin: 0;
`

const Content = styled.div`
  margin: 16px 0 16px;
`

const Section = ({ title, children, folded, foldable, toggleFolded, actions, hideTop, hideBottom }) => (
  <SectionContainer>
    {!hideTop && <Divider />}
    <FlexBar>
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
)(Section)
