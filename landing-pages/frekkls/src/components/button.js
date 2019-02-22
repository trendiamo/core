import styled from 'styled-components'

const Button = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  border: 0;
  border-radius: 12px;
  letter-spacing: 0.8px;
  color: #fff;
  font-size: 24px;
  padding: 13px 18px;
  margin: 0 auto;
  outline: none;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  font-family: Roboto, sans-serif;
  box-shadow: 0 5px 14px 0 rgba(255, 104, 63, 0.25);
  background-image: linear-gradient(127deg, #ff843e, #ff683f 100%);
  &:hover {
    background-color: #ff683f;
    box-shadow: none;
    background-image: none;
  }
  &:active {
    background-color: #ff8240;
    box-shadow: none;
    background-image: none;
  }
  @media (min-width: 900px) {
    padding: 13px 20px;
  }
`

export const FeatureButton = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  background-color: #ff6e5d;
  border: 0;
  border-radius: 80px;
  letter-spacing: 0.8px;
  color: #fff;
  display: inline-block;
  width: auto;
  font-size: 0.9em;
  font-weight: 700;
  padding: 20px 30px;
  text-transform: uppercase;
  margin: 0 auto;
  outline: none;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
`

export default Button
