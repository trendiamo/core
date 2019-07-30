import React from 'react'
import styled from 'styled-components'

import CtaForm from '../components/cta-form'

const Cta = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 4vw;
  @media (min-width: 900px) {
    flex-direction: row;
  }
`

const CtaLeft = styled.div`
  flex: 3;
  font-size: 4vw;
  line-height: 1.4;
  margin-bottom: 1rem;
  @media (min-width: 900px) {
    font-size: 1.5vw;
    margin-bottom: 0;
  }
`

const CtaRight = styled.div`
  flex: 5;
`

const EmailCta = () => (
  <Cta>
    <CtaLeft>{'Join thousands of brands and get free tips and resources delivered directly to your inbox.'}</CtaLeft>
    <CtaRight>
      <CtaForm />
    </CtaRight>
  </Cta>
)

export default EmailCta
