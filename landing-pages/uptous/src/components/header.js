import styled from 'styled-components'

const Header = styled.h2`
  text-transform: uppercase;
  font-size: 13.34vw;
  line-height: 0.9;
  font-weight: 900;
  margin-bottom: 60px;
  color: #272a32;
  display: flex;
  flex-direction: column;
  margin-left: -0.1em;
  margin-right: -0.1em;

  span,
  b {
    white-space: nowrap;
    display: block;
    margin-left: 0.11em;
    margin-right: 0.11em;
  }
  b {
    font-weight: 900;
    color: #107173;
  }

  @media (min-width: 375px) {
    font-size: 50px;
  }

  @media (min-width: 1000px) {
    font-size: calc(20px + 4vw);
    flex-direction: row;
    margin-bottom: 5rem;
  }
`

export default Header
