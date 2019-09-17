import styled from 'styled-components'
import { IconButton as MuiIconButton } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const IconButton = styled(MuiIconButton)`
  ${showUpToUsBranding() ? ':hover { background: #e7ecef; }' : ''}
`

export default IconButton
