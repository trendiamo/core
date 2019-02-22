import styled from 'styled-components'

const Cards = styled.div`
  @media (min-width: 900px) {
    display: flex;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: 3px 9px 26px 0 rgba(0, 0, 0, 0.13);
  margin-bottom: 30px;
  background-color: #fff;
  padding: 40px 30px;
  color: #4a4a4a;
  display: flex;
  align-items: center;

  @media (min-width: 900px) {
    margin-bottom: 0;
    margin-left: 14px;
    margin-right: 14px;
    flex: 1;
  }

  h3 {
    margin-top: 2rem;
    font-size: 22px;
    font-weight: 500;
    color: #191919;
  }

  p {
    flex: 1;
    line-height: 1.5;
    font-size: 16px;
    margin: 0;
  }
`

export const FeatureCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

export const FeatureCard = styled.div`
  max-width: 600px;
  border-radius: 12px;
  box-shadow: -1px 18px 33px 0 rgba(99, 122, 159, 0.2);
  background-color: #fff;
  margin: 20px;
  padding: 20px;

  img {
    width: 100%;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 1.2em;
    font-weight: 700;
    padding: 10px;
    text-align: left;
    line-height: 1.2em;
  }

  p {
    font-size: 1em;
    color: #393939;
    text-align: left;
    padding: 10px;
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
  }

  h1 p {
    margin: 0;
    padding: 0;
  }

  h1 b {
    color: #ff5f41;
  }
`

export default Cards
