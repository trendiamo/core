import styled from 'styled-components'

const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem;

  @media (min-width: 900px) {
    padding-top: 60px;
    padding-bottom: 60px;
  }
`

export default Section
