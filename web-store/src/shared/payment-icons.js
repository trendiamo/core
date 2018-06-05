import IconMastercard from '../icons/mastercard'
import IconPaypal from '../icons/paypal'
import IconVisa from '../icons/visa'
import React from 'react'
import styled from 'styled-components'

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
`

const IconContainer = styled.div`
  background-color: #d1d1d1;
  border-radius: 5px;
  height: 30px;
  min-width: 60px;
  padding: 6px 10px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: ${({ visa }) => (visa ? '78%' : '90%')};
    margin-top: ${({ paypal }) => (paypal ? '2px' : 0)};
    margin-right: ${({ paypal }) => (paypal ? '-2px' : 0)};
  }
`

const PaymentIcons = () => (
  <IconsContainer>
    <IconContainer paypal>
      <IconPaypal />
    </IconContainer>
    <IconContainer visa>
      <IconVisa />
    </IconContainer>
    <IconContainer mastercard>
      <IconMastercard />
    </IconContainer>
  </IconsContainer>
)

export default PaymentIcons
