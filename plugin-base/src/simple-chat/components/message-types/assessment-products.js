import AssessmentProduct from './assessment-product'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  align-content: baseline;
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
`

const AssessmentProducts = ({ data, big, styleConfig, onClick }) => (
  <Container big={big}>
    {data.map(product => (
      <AssessmentProduct big={big} data={product} key={product.id} onClick={onClick} styleConfig={styleConfig} />
    ))}
  </Container>
)

export default AssessmentProducts
