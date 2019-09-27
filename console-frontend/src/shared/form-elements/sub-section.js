import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'

const SubSection = styled.div`
  padding: ${showUpToUsBranding() ? '16px' : '16px 24px'};
`

export default SubSection
