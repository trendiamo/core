import styled from 'styled-components'

// this was used like this:

// const ProductsContainer = styled.div`
//   overflow-x: scroll;
//   margin-left: -1rem;
//   margin-right: -1rem;
//   padding: 0 1rem;
//   padding-bottom: 1rem;
// `

// const Products = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding-right: 1rem;
// `

const Card = styled.div`
  border-radius: 7px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`

const CardContent = styled.div`
  padding: 8px;
`

const CardImg = styled.img`
  width: 100%;
  border-radius: 7px 7px 0 0;
`

export { Card, CardContent, CardImg }
