import MUIButton from '@material-ui/core/Button'
import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'

const EditButton = styled(MUIButton)`
  color: black;
  &:hover {
    color: ${showUpToUsBranding() ? '#0f7173' : '#ff6641'};
  }
`

export default EditButton
