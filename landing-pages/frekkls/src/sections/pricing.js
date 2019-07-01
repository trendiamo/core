import React from 'react'
import styled from 'styled-components'

import Section from '../components/section'

/* eslint-disable react/jsx-max-depth */
const Pricing = styled(({ className }) => (
  <Section className={className}>
    <h3>{'Customized to your needs'}</h3>
    <div className="pricing-container">
      <div className="pricing tool">
        <div className="title">{'Just the tool'}</div>
        <div className="details-container">
          <div className="price">{'49€ — 490€'}</div>
          <div className="price-label">{'Based on company size'}</div>
          <ul>
            <li>{'Frekkls plugin on your site'}</li>
            <li>{'Admin Panel Access'}</li>
            <li>{'Unlimited Flows'}</li>
            <li>{'Data Insights'}</li>
          </ul>
        </div>
      </div>
      <div className="pricing service">
        <div className="title">{'Seller service'}</div>
        <div className="details-container">
          <div className="price">{'10% — 20%'}</div>
          <div className="price-label">{'Commission'}</div>
          <ul>
            <li>{'Content created by sellers'}</li>
            <li>{'As much traffic as you want'}</li>
            <li>{'Unlimited access to sellers'}</li>
            <li>{'Performance based'}</li>
          </ul>
        </div>
      </div>
    </div>
  </Section>
))`
  background: #fafafa;
  padding-bottom: 15vh;

  .pricing-container {
    flex: 1;
    display: flex;
    width: 60vw;
    justify-content: space-between;
  }

  .pricing {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25vw;
  }

  .title {
    font-size: 2.5vw;
    text-transform: uppercase;
    font-weight: bold;
    width: 100%;
    text-align: center;
    line-height: 3;
    margin-bottom: 4vh;
  }

  .details-container {
    padding: 1rem;
  }

  .price {
    font-size: 2vw;
    line-height: 1.4;
  }

  .price-label {
    font-size: 1vw;
  }

  .price,
  .price-label {
    text-align: center;
    font-weight: 500;
  }

  .price-label {
    text-transform: uppercase;
  }

  .pricing.tool {
    background: #fd8b61;
    .title {
      background: #ff7242;
    }
  }

  .pricing.service {
    background: #8ec6f0;
    .title {
      background: #56aceb;
    }
  }

  ul {
    margin-top: 4vh;
  }
  li {
    font-size: 1.25vw;
    line-height: 2;
  }
`
/* eslint-enable react/jsx-max-depth */

export default Pricing
