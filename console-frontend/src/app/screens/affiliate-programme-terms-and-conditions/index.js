import content from './content'
import NotFound from 'app/screens/not-found'
import React from 'react'
import styled from 'styled-components'
import { Container } from 'shared/blank-state/components'
import { showUpToUsBranding } from 'utils'

const AffiliateProgrammeTermsAndConditionsContent = styled.div``

const AffiliateProgrammeTermsAndConditionsPage = () => {
  if (showUpToUsBranding()) {
    return (
      <Container>
        <div style={{ maxWidth: '700px' }}>
          <AffiliateProgrammeTermsAndConditionsContent dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </Container>
    )
  } else {
    return <NotFound />
  }
}
export default AffiliateProgrammeTermsAndConditionsPage