import styled from 'styled-components'

const Cards = styled.div`
  @media (min-width: 900px) {
    margin-top: 70px;
    display: flex;
  }
`

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  box-shadow: -1px 18px 33px 0 rgba(99, 122, 159, 0.16);
  margin-bottom: 30px;
  background-color: #fff;
  padding: 60px 20px 40px;
  text-align: left;
  color: #4a4a4a;

  @media (min-width: 900px) {
    margin-bottom: 0;
    margin-left: 14px;
    margin-right: 14px;
    flex: 1;
  }

  h3 {
    font-size: 26px;
    font-weight: 700;
    line-height: 1.15;
  }

  p {
    flex: 1;
    line-height: 1.4;
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
    color: #393939 !important;
    text-align: left;
    padding: 10px;
    margin-bottom: 20px !important;
  }

  a {
    text-decoration: none;
  }

  h1 b {
    color: #ff5f41;
  }
`

export default Cards
