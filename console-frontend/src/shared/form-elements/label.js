import styled from 'styled-components'
import { InputLabel as MuiLabel } from '@material-ui/core'
import { showUpToUsBranding } from 'utils'

const Label = styled(MuiLabel)`
  ${showUpToUsBranding() &&
    `font-family: Lato, "Helvetica", "Arial", sans-serif;
    font-weight: 700;
    color: #272932;`}
`

export default Label
