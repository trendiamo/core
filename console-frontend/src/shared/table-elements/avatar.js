import styled from 'styled-components'
import { Avatar } from '@material-ui/core'

export default styled(Avatar)`
  display: inline-block;
  vertical-align: middle;
  opacity: ${({ disabled }) => disabled && 0.5};
`
