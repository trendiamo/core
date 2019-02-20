import styled from 'styled-components'

const Button = styled.button.attrs({
  type: 'button',
})`
  appearance: none;
  background-color: #ff543c;
  border: 0;
  border-radius: 80px;
  letter-spacing: 0.8px;
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  padding: 20px 30px;
  text-transform: uppercase;
  margin: 0 auto;
  outline: none;
  line-height: 1;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  font-family: Roboto, sans-serif;
`

export const OutlineButton = styled.button.attrs({
  type: 'button',
})`
  background-color: transparent;
  border: 2px solid #ff6e5c;
  border-radius: 80px;
  letter-spacing: 0.8px;
  color: #ff6e5c;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.7px;
  padding: 20px 30px;
  text-transform: uppercase;
  margin: 0 auto;
  outline: none;
  line-height: 1;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  font-family: Roboto, sans-serif;
`

export const NoOutlineButton = styled.button.attrs({
  type: 'button',
})`
  border: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #323232;
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  outline: none;
  background-color: #fff;
  cursor: pointer;
  font-family: Roboto, sans-serif;
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
