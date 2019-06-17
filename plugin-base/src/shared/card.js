import styled from 'styled-components'

const Card = styled.div`
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  min-width: 112px;
  margin-right: 1rem;
`

const CardContent = styled.div`
  padding: 8px;
`

const CardImg = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
`

export { Card, CardContent, CardImg }
