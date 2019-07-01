import React from 'react'
import styled from 'styled-components'

import Section from '../components/section'

const Visuals = styled(({ className }) => <Section className={className}>{'Visuals'}</Section>)`
  background: linear-gradient(to right, #fafafa 0%, #fafafa 50%, #fff 50%, #fff 100%);
`

export default Visuals
