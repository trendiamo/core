import Divider from './form-elements/divider'
import omit from 'lodash.omit'
import Paper from 'shared/paper'
import React, { memo, useCallback, useMemo, useState } from 'react'
import SectionTitle from './form-elements/section-title'
import styled from 'styled-components'
import { Collapse } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const SectionContent = styled(props => <div {...omit(props, ['foldable'])} />)`
  padding: ${({ foldable }) => (!foldable ? (showUpToUsBranding() ? '12px' : '16px 24px') : '0')};
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ foldable }) => (!foldable ? (showUpToUsBranding() ? '16px' : '16px 24px') : '0')};
`

const Section = ({
  actions,
  className,
  children,
  title,
  ellipsizeTitle,
  foldable,
  dragHandle,
  hideDragHandle,
  ...props
}) => {
  const [folded, setFolded] = useState(false)

  const toggleFolded = useCallback(
    () => {
      setFolded(!folded)
    },
    [folded]
  )

  const showDivider = useMemo(() => !showUpToUsBranding() || foldable, [foldable])

  return (
    <Paper className={className} elevation={4} foldable={foldable} {...props}>
      <Container>
        {title &&
          (typeof title === 'string' ? (
            <>
              <SectionTitle
                actions={actions}
                dragHandle={dragHandle}
                ellipsize={ellipsizeTitle}
                foldable={foldable}
                folded={folded}
                hideDragHandle={hideDragHandle}
                title={title}
                toggleFolded={toggleFolded}
              />
              {showDivider && <Divider folded={folded} />}
            </>
          ) : (
            title
          ))}
        {foldable ? (
          <Collapse in={!folded} timeout="auto">
            <SectionContent foldable={foldable}>{children}</SectionContent>
          </Collapse>
        ) : (
          <SectionContent>{children}</SectionContent>
        )}
      </Container>
    </Paper>
  )
}

export default memo(Section)
