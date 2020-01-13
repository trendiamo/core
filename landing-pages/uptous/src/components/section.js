import styled from 'styled-components'

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  padding: 30px ${({ fullWidth }) => (fullWidth ? '0px' : '20')}px;

  @media (min-width: 1000px) {
    padding: 30px 0;
    max-width: 1160px;
  }
`

export default Section
