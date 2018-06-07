import { Button } from 'shared/buttons'
import countries from 'i18n-iso-countries'
import IconSuccess from 'icons/success'
import React from 'react'
import styled from 'styled-components'
import StyledModal from 'shared/styled-modal'
import { branch, compose, renderNothing, withProps } from 'recompose'

const H2 = styled.h2`
  text-transform: uppercase;
  margin: 0 0 1rem 0;
  text-align: center;
  font-weight: 500;
  color: #222;
`

const PaymentSuccessful = styled.div`
  border-bottom: 2px solid #e5e5e5;
  border-top: 2px solid #e5e5e5;
  display: flex;
  padding: 1rem 0;
`

const BillShipInfo = styled.div`
  padding: 1rem 0;
`

const OrderSummary = styled.div`
  border-bottom: 2px solid #e5e5e5;
  border-top: 2px solid #e5e5e5;
  padding: 1rem 0;
`

const ImportantLabel = styled.div`
  font-weight: 500;
  color: #222;
`

const GrayLabel = styled.div`
  color: #666;
`

const Table = styled.table`
  width: 100%;
  padding: 6px 0 0 0;

  td {
    padding: 6px 0;

    &:first-child {
      width: 60px;
    }
  }

  img {
    vertical-align: top;
  }
`

const PriceTd = styled.td`
  text-align: right;
`

const Center = styled.p`
  text-align: center;
`

const Total = styled.div`
  text-align: right;
  padding: 1rem 0 0 0;
`

const IconContainer = styled.div`
  flex-grow: 1;
  text-align: right;
  margin-right: 1rem;
  svg {
    width: 48px;
    height: 48px;
  }
`

const MessageContainer = styled.div`
  flex-grow: 1;
`

const OrderConfirmedModal = ({ country, closeModal, product, priceString, isModalOpen, shippingAddress }) => (
  <StyledModal
    appElement={document.body}
    contentLabel="Order Confirmed Modal"
    isOpen={isModalOpen}
    onRequestClose={closeModal}
  >
    <H2>{'Thank you !'}</H2>
    <PaymentSuccessful>
      <IconContainer>
        <IconSuccess />
      </IconContainer>
      <MessageContainer>
        <ImportantLabel>{'Payment Successful'}</ImportantLabel>
        <GrayLabel>{'Thank you for your purchase.'}</GrayLabel>
      </MessageContainer>
    </PaymentSuccessful>
    <BillShipInfo>
      <ImportantLabel>{'Billing & Shipping address'}</ImportantLabel>
      <div>{`${shippingAddress.recipientName}`}</div>
      <div>{shippingAddress.line1}</div>
      <div>{`${shippingAddress.postalCode} ${shippingAddress.city}`}</div>
      <div>{country}</div>
    </BillShipInfo>
    <OrderSummary>
      <ImportantLabel>{'Your Order Summary'}</ImportantLabel>
      <Table>
        <tbody>
          <tr>
            <td>
              <img alt="" height="48" src={product.featuredImage} width="48" />
            </td>
            <td>
              <ImportantLabel>{product.name}</ImportantLabel>
              <GrayLabel>{product.vendor}</GrayLabel>
            </td>
            <PriceTd>
              <ImportantLabel>{priceString}</ImportantLabel>
            </PriceTd>
          </tr>
          <tr>
            <td />
            <td>
              <ImportantLabel>{'Shipping Costs'}</ImportantLabel>
              <GrayLabel>{'Included'}</GrayLabel>
            </td>
            <PriceTd>
              <ImportantLabel>{'+ 0,00€'}</ImportantLabel>
            </PriceTd>
          </tr>
        </tbody>
      </Table>
    </OrderSummary>
    <Total>
      <ImportantLabel>{`TOTAL ${priceString}`}</ImportantLabel>
      <GrayLabel>{'incl. Taxes'}</GrayLabel>
    </Total>
    <Center>{'You will receive your invoice as an email'}</Center>
    <Button center onClick={closeModal}>
      {'Okey'}
    </Button>
  </StyledModal>
)

export default compose(
  withProps(({ orderConfirmationInfo }) => ({
    isModalOpen: !!orderConfirmationInfo,
  })),
  branch(({ isModalOpen }) => !isModalOpen, renderNothing),
  withProps(({ orderConfirmationInfo }) => ({
    product: orderConfirmationInfo.product,
    shippingAddress: orderConfirmationInfo.payer.payerInfo.shippingAddress,
  })),
  withProps(({ product, shippingAddress }) => ({
    country: countries.getName(shippingAddress.countryCode, 'en'),
    priceString: product.price.toLocaleString('de-DE', {
      currency: 'EUR',
      style: 'currency',
    }),
  }))
)(OrderConfirmedModal)
