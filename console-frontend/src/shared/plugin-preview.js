import PluginPreviewFrame from 'shared/plugin-preview-frame'
import React from 'react'
import styled from 'styled-components'
import { withWidth } from '@material-ui/core'

const PreviewContainer = styled.div`
  ${({ width }) =>
    width === 'xs' || width === 'sm'
      ? ''
      : `position: sticky;
  top: 50%;
  margin-bottom: 45px;`}
`

const PluginPreview = styled(({ className, children, width }) => (
  <PreviewContainer width={width}>
    <PluginPreviewFrame className={className}>{children}</PluginPreviewFrame>
  </PreviewContainer>
))`
  border: 0;
  overflow: hidden;
  border-radius: 8px;
  width: 320px;
  height: 500px;
  box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
  position: absolute;
  right: 50%;
  transform: ${({ width }) => (width === 'xs' || width === 'sm' ? 'translate(50%)' : 'translate(50%, -50%)')};
  margin-bottom: 30px;
`

export default withWidth({ noSSR: true })(PluginPreview)
