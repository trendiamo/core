import styled from 'styled-components'

const CardsWrapper = styled.div`
  overflow-x: scroll;
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 0 1rem;
  padding-bottom: 1rem;
`

const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-right: 1rem;
`

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

export { Card, CardContent, CardImg, CardsContainer, CardsWrapper }
