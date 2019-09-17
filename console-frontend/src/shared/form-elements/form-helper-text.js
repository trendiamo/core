import styled from 'styled-components'
import { memo } from 'react'
import { FormHelperText as MuiFormHelperText } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const StyledHelperText = styled(MuiFormHelperText)`
  ${showUpToUsBranding()
    ? `
      font-size: 13px;
      color: #272932;
      font-weight: 300;
      margin-top: 4px;
      font-family: Lato, "Helvetica", "Arial", sans-serif;
    `
    : `
      font-size: 13px;
      color: #32333d;
      font-weight: 300;
      margin-top: 4px;
  `}
`

export default memo(StyledHelperText)
