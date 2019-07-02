import React from 'react'
import styled from 'styled-components'

import Checkbox from '../images/checkbox.svg'
import Section from '../components/section'

/* eslint-disable react/jsx-max-depth */
const Pricing = styled(({ className }) => (
  <Section className={className} id="pricing">
    <h3>{'Customized to your needs'}</h3>
    <div className="pricing-container">
      <div className="tool">
        <div className="pricing">
          <div className="title">{'Just the tool'}</div>
          <div className="details-container">
            <div className="price">{'From 99€/month'}</div>
            <div className="price-label">{'Based on monthly traffic'}</div>
            <ul>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'Frekkls plugin on your site'}</p>
                </div>
              </li>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'Admin Panel Access'}</p>
                </div>
              </li>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'Unlimited Flows'}</p>
                </div>
              </li>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'Data Insights'}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="center">
          <div>{'Boost your sales by showing user generated content of your fans, customers and employees.'}</div>
        </div>
      </div>
      <div className="service">
        <div className="pricing">
          <div className="title">{'Seller service'}</div>
          <div className="details-container">
            <div className="price">{'10% — 20%'}</div>
            <div className="price-label">{'Commission'}</div>
            <ul>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'Content created by sellers'}</p>
                </div>
              </li>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'As much traffic as you want'}</p>
                </div>
              </li>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'Unlimited access to sellers'}</p>
                </div>
              </li>
              <li>
                <div className="pricing-item-container">
                  <img alt="" className="checkbox" src={Checkbox} />
                  <p>{'Performance based sales commissions only'}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="center">
          <div>
            {
              'Unleash the full salesforce potential by integrating content created by our sellers, influencers and sales experts.'
            }
          </div>
        </div>
      </div>
    </div>
  </Section>
))`
  background: #fafafa;
  padding-bottom: 10vh;

  .pricing-container {
    flex: 1;
    flex-direction: column;
    display: flex;
    width: 60vw;
    justify-content: space-between;
  }

  @media (min-width: 900px) {
    .pricing-container {
      flex-direction: row;
      height: 50vh;
    }
  }

  .pricing-container > div {
    display: flex;
    flex-direction: column;
  }

  .center {
    text-align: center;
  }
  .center > div {
    padding-top: 2rem;
    padding-bottom: 2rem;
    font-size: 1.4vw;
    line-height: 1.4;
  }
  @media (min-width: 900px) {
    .center > div {
      width: 25vw;
    }
  }

  .pricing {
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
  }
  @media (min-width: 900px) {
    .pricing {
      width: 25vw;
    }
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
    padding: 0 1rem;
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

  .tool .pricing {
    background: #fd8b61;
    .title {
      background: #ff7242;
    }
  }

  .service .pricing {
    background: #8ec6f0;
    .title {
      background: #56aceb;
    }
  }

  ul {
    margin-top: 4vh;
  }

  .pricing-item-container {
    margin: 2vh 0;
    display: flex;
    align-items: center;
    padding: 0 2rem;

    .checkbox {
      height: 1.5vw;
      margin-right: 1vw;
    }

    p {
      margin: 0;
      font-size: 1.25vw;
      line-height: 1.3;
    }

    &:last-child {
      align-items: flex-start;
    }
  }

  @media (max-width: 899px) {
    h3 {
      font-size: 6vw;
    }

    .pricing-container {
      width: 90vw;
    }

    .title {
      font-size: 6vw;
    }

    .price {
      font-size: 8vw;
    }

    .price-label {
      font-size: 4vw;
    }

    .pricing-item-container .checkbox {
      height: 4vw;
      margin-right: 10px;
    }

    .pricing-item-container p {
      font-size: 4vw;
    }

    .details-container {
      margin-bottom: 20px;
    }

    .center div {
      font-size: 4vw;
    }
  }
`
/* eslint-enable react/jsx-max-depth */

export default Pricing
