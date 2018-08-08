import { authGql } from 'auth/utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { pick } from 'lodash'
import React from 'react'
import Steps from 'screens/brand-profile/steps'
import { withRouter } from 'react-router'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'

const Shipping = ({ brandInfoForm, brandInfoSubmit, setInfoValue }) => (
  <React.Fragment>
    <Helmet>
      <title>{'Shipping Information'}</title>
    </Helmet>
    <section className="section">
      <div className="container container--tiny">
        <Steps currentStep={3} stepCount={3} tags={['SETUP', 'PREVIEW', 'SHIPPING']} />
        <div className="section__title section__title--center">
          <h1 className="section__title-text h2">{'SHIPPING INFORMATION'}</h1>
        </div>
        <form acceptCharset="UTF-8" onSubmit={brandInfoSubmit}>
          <div className="o-layout">
            <div className="o-layout__item u-1/1 u-1/1@tab">
              <p>
                {
                  'Before you are able to sell on Trendiamo we need some information regarding your shippment process. How long does it take for your packages to arrive at the following destinations?'
                }
              </p>
            </div>
          </div>
          <div className="o-layout">
            <div className="o-layout__item u-1/3 u-1/3@tab">
              <label htmlFor="domesticShippingTime">{'DOMESTIC'}</label>
              <div className="selector-wrapper">
                <select
                  id="domesticShippingTime"
                  name="domesticShippingTime"
                  onChange={setInfoValue}
                  required
                  style={{ paddingLeft: '10px' }}
                  value={brandInfoForm.domesticShippingTime || ''}
                >
                  <option hidden value="">
                    {'Choose here'}
                  </option>
                  <option value={'1-3 Business Days'}>{'1-3 Business Days'}</option>
                  <option value={'3-7 Business Days'}>{'3-7 Business Days'}</option>
                  <option value={'7-15 Business Days'}>{'7-15  Business Days'}</option>
                  <option value={'15-30 Business Days'}>{'15-30  Business Days'}</option>
                </select>
              </div>
            </div>
            <div className="o-layout__item u-1/3 u-1/3@tab">
              <label htmlFor="euShippingTime">{'INSIDE EUROPE'}</label>
              <div className="selector-wrapper">
                <select
                  id="euShippingTime"
                  name="euShippingTime"
                  onChange={setInfoValue}
                  required
                  style={{ paddingLeft: '10px' }}
                  value={brandInfoForm.euShippingTime || ''}
                >
                  <option hidden value="">
                    {'Choose here'}
                  </option>
                  <option value={'1-3 Business Days'}>{'1-3 Business Days'}</option>
                  <option value={'3-7 Business Days'}>{'3-7 Business Days'}</option>
                  <option value={'7-15 Business Days'}>{'7-15  Business Days'}</option>
                  <option value={'15-30 Business Days'}>{'15-30  Business Days'}</option>
                </select>
              </div>
            </div>
            <div className="o-layout__item u-1/3 u-1/3@tab">
              <label htmlFor="outsideEuShippingTime">{'OUTSIDE EUROPE'}</label>
              <div className="selector-wrapper">
                <select
                  id="outsideEuShippingTime"
                  name="outsideEuShippingTime"
                  onChange={setInfoValue}
                  required
                  style={{ paddingLeft: '10px' }}
                  value={brandInfoForm.outsideEuShippingTime || ''}
                >
                  <option hidden value="">
                    {'Choose here'}
                  </option>
                  <option value={'1-3 Business Days'}>{'1-3 Business Days'}</option>
                  <option value={'3-7 Business Days'}>{'3-7 Business Days'}</option>
                  <option value={'7-15 Business Days'}>{'7-15  Business Days'}</option>
                  <option value={'15-30 Business Days'}>{'15-30  Business Days'}</option>
                </select>
              </div>
            </div>
            <div className="o-layout__item u-1/1 u-1/1@tab">
              <label htmlFor="generalShippingInfo">{'GENERAL SHIPPMENT INFORMATION'}</label>
              <textarea
                autoCapitalize="off"
                autoCorrect="off"
                id="generalShippingInfo"
                name="generalShippingInfo"
                onChange={setInfoValue}
                placeholder="Things like: Who are you shipping with? Tracking Number Emails?"
                required
                rows="1"
                spellCheck="false"
                type="text"
                value={brandInfoForm.generalShippingInfo || ''}
              />
            </div>
            <div className="o-layout__item u-1/1 u-1/1@tab">
              <label htmlFor="trendiamoShippingInfo">{'INFORMATION FOR TRENDIAMO'}</label>
              <textarea
                autoCapitalize="off"
                autoCorrect="off"
                id="trendiamoShippingInfo"
                name="trendiamoShippingInfo"
                onChange={setInfoValue}
                placeholder="Anything we should know?"
                required
                rows="1"
                spellCheck="false"
                type="text"
                value={brandInfoForm.trendiamoShippingInfo || ''}
              />
            </div>
          </div>
          <div className="account__form-buttons">
            <Link className="c-btn c-btn--light account__form-submit" to="/u/create-brand-profile/2">
              {'Previous'}
            </Link>
            <input className="c-btn c-btn--primary account__form-submit" type="submit" value="FINISH" />
            <a className="link account__form-secondary-btn" href="/">
              {'CANCEL'}
            </a>
          </div>
        </form>
      </div>
    </section>
  </React.Fragment>
)

const me = gql`
  query {
    me {
      brand {
        id
        name
        domesticShippingTime
        euShippingTime
        generalShippingInfo
        outsideEuShippingTime
        trendiamoShippingInfo
      }
    }
  }
`

const updateBrand = gql`
  mutation($brand: BrandInputType!) {
    updateBrand(brand: $brand) {
      errors {
        key
        message
      }
    }
  }
`

export default compose(
  graphql(me, { options: { fetchPolicy: 'network-only' } }),
  graphql(updateBrand),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    brand: data.me.brand,
  })),
  withState('errors', 'setErrors', []),
  withState('brandInfoForm', 'setBrandInfoForm', ({ brand }) => {
    return pick(brand, [
      'id',
      'name',
      'domesticShippingTime',
      'euShippingTime',
      'generalShippingInfo',
      'outsideEuShippingTime',
      'trendiamoShippingInfo',
    ])
  }),
  withRouter,
  withHandlers({
    brandInfoSubmit: ({ auth, brandInfoForm, history, mutate, setErrors }) => event => {
      event.preventDefault()
      authGql(auth, async () => {
        const newBrandInfoForm = { ...brandInfoForm, isComplete: true }
        const { data } = await mutate({
          variables: { brand: newBrandInfoForm },
        })
        if (data.updateBrand.errors && data.updateBrand.errors.length) {
          setErrors(data.updateBrand.errors)
        } else {
          history.push('/u/create-brand-profile/4')
        }
      })
    },
    setInfoValue: ({ brandInfoForm, setBrandInfoForm }) => event => {
      setBrandInfoForm({ ...brandInfoForm, [event.target.name]: event.target.value })
    },
  })
)(Shipping)
