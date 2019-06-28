import styled from 'styled-components'
import { AssessmentProducts } from 'special/assessment/message-types'
import { clickAssessmentProduct } from 'special/assessment/utils'
import { h } from 'preact'
import { priceColor } from 'special/assessment/message-types/assessment-product'
import { useCallback } from 'preact/hooks'

const Container = styled.div`
  padding: 20px;
`

const styleConfig = {
  image: {
    height: 300,
  },
  card: {
    minWidth: 120,
    margin: 0,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.2)',
  },
  details: {
    padding: '8px 10px 10px',
  },
  highlightText: {
    padding: '4px 14px 4px 12px',
  },
  detailsPrice: {
    color: priceColor,
  },
}

const Content = ({ results }) => {
  const onClick = useCallback(({ item }) => {
    clickAssessmentProduct(item)
  }, [])

  return (
    <Container>
      <AssessmentProducts big data={results} onClick={onClick} styleConfig={styleConfig} />
    </Container>
  )
}

export default Content
