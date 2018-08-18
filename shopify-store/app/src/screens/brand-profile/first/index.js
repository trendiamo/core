import { authGql } from 'auth/utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Helmet } from 'react-helmet'
import Logo from './logo'
import { pick } from 'lodash'
import React from 'react'
import Steps from 'screens/brand-profile/steps'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'

const CorrectFormMargin = styled.div`
  margin-left: -18px;
`

const Info = ({ brandInfoForm, brandInfoSubmit, canSubmit, errors, setInfoValue, setLogoValue }) => (
  <React.Fragment>
    <Helmet>
      <title>{'Profile Information'}</title>
    </Helmet>
    <section className="section">
      <div className="container container--tiny">
        <Steps currentStep={1} stepCount={3} tags={['SETUP', 'PREVIEW', 'SHIPPING']} />
        <div className="section__title section__title--center">
          <h1 className="section__title-text h2">{'PROFILE INFORMATION'}</h1>
        </div>
        <form acceptCharset="UTF-8" onSubmit={brandInfoSubmit}>
          {errors.length > 0 && (
            <ul>
              {errors.map(error => (
                <li key={error.key}>
                  {error.key}
                  {': '}
                  {error.message}
                </li>
              ))}
            </ul>
          )}
          <Logo onChange={setLogoValue} value={brandInfoForm.logoUrl} />
          <label htmlFor="name">{'Brand name'}</label>
          <div className="brand-name-container-input" style={{ width: '100%' }}>
            <input
              autoCapitalize="off"
              autoCorrect="off"
              autoFocus
              id="name"
              name="name"
              onChange={setInfoValue}
              required
              spellCheck="false"
              type="text"
              value={brandInfoForm.name}
            />
          </div>

          <label htmlFor="legalName">{'Legal name of business'}</label>
          <input
            autoCapitalize="off"
            autoCorrect="off"
            id="legalName"
            name="legalName"
            onChange={setInfoValue}
            required
            spellCheck="false"
            type="text"
            value={brandInfoForm.legalName}
          />
          <div className="o-layout">
            <div className="o-layout__item u-1/1 u-3/4@tab">
              <label htmlFor="legalAddressStreet">{'Legal address of business'}</label>
              <input
                autoCapitalize="off"
                autoCorrect="off"
                id="legalAddressStreet"
                name="legalAddressStreet"
                onChange={setInfoValue}
                placeholder="Street Name "
                required
                spellCheck="false"
                type="text"
                value={brandInfoForm.legalAddressStreet}
              />
            </div>
            <div className="o-layout__item u-1/1 u-1/4@tab">
              <CorrectFormMargin>
                <label className="hidden-label" htmlFor="number" style={{ visibility: 'hidden' }}>
                  {'First Name'}
                </label>
                <input
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="legalAddressNumber"
                  onChange={setInfoValue}
                  placeholder="Number"
                  required
                  spellCheck="false"
                  type="text"
                  value={brandInfoForm.legalAddressNumber}
                />
              </CorrectFormMargin>
            </div>
          </div>
          <div className="o-layout">
            <div className="o-layout__item u-1/1 u-2/3@tab">
              <input
                autoCapitalize="off"
                autoCorrect="off"
                name="legalAddressCity"
                onChange={setInfoValue}
                placeholder="City"
                required
                spellCheck="false"
                type="text"
                value={brandInfoForm.legalAddressCity}
              />
            </div>
            <div className="o-layout__item u-1/1 u-1/3@tab">
              <CorrectFormMargin>
                <input
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="legalAddressPostalCode"
                  onChange={setInfoValue}
                  placeholder="Postal-Code"
                  required
                  spellCheck="false"
                  type="text"
                  value={brandInfoForm.legalAddressPostalCode}
                />
              </CorrectFormMargin>
            </div>
          </div>
          <div className="o-layout">
            <div className="o-layout__item u-1/1 u-1/1@tab">
              <input
                autoCapitalize="off"
                autoCorrect="off"
                name="legalAddressCountry"
                onChange={setInfoValue}
                placeholder="Country"
                required
                spellCheck="false"
                type="text"
                value={brandInfoForm.legalAddressCountry}
              />
            </div>
          </div>
          <div className="account__form-buttons">
            <input
              className="c-btn c-btn--primary account__form-submit"
              disabled={!canSubmit}
              type="submit"
              value="NEXT"
            />
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
        legalAddressCity
        legalAddressCountry
        legalAddressNumber
        legalAddressPostalCode
        legalAddressStreet
        legalName
        name
        logoUrl
      }
    }
  }
`

const addBrand = gql`
  mutation($brand: BrandInputType!) {
    addBrand(brand: $brand) {
      legalAddressCity
      legalAddressCountry
      legalAddressNumber
      legalAddressPostalCode
      legalAddressStreet
      legalName
      name
      logoUrl
      errors {
        key
        message
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
  graphql(addBrand, {
    name: 'addBrandMutation',
  }),
  graphql(updateBrand, {
    name: 'updateBrandMutation',
  }),
  withState('canSubmit', 'setCanSubmit', false),
  withState('errors', 'setErrors', []),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    brand: data.me.brand,
  })),
  withState('brandInfoForm', 'setBrandInfoForm', ({ brand, setCanSubmit }) => {
    if (brand == null) {
      return {
        legalAddressCity: '',
        legalAddressCountry: '',
        legalAddressNumber: '',
        legalAddressPostalCode: '',
        legalAddressStreet: '',
        legalName: '',
        logoUrl: '',
        name: '',
      }
    } else {
      setCanSubmit(brand.logoUrl.length > 0)
      return pick(brand, [
        'id',
        'legalAddressCity',
        'legalAddressCountry',
        'legalAddressNumber',
        'legalAddressPostalCode',
        'legalAddressStreet',
        'legalName',
        'logoUrl',
        'name',
      ])
    }
  }),
  withRouter,
  withHandlers({
    brandInfoSubmit: ({
      auth,
      brand,
      brandInfoForm,
      history,
      addBrandMutation,
      updateBrandMutation,
      setErrors,
    }) => event => {
      event.preventDefault()
      authGql(auth, async () => {
        const mutation = brand == null ? addBrandMutation : updateBrandMutation
        const { data } = await mutation({
          variables: { brand: brandInfoForm },
        })
        const mutationData = brand == null ? data.addBrand : data.updateBrand
        if (mutationData.errors && mutationData.errors.length) {
          setErrors(mutationData.errors)
        } else {
          history.push('/u/create-brand-profile/2')
        }
      })
    },
    setInfoValue: ({ brandInfoForm, setBrandInfoForm }) => event => {
      setBrandInfoForm({ ...brandInfoForm, [event.target.name]: event.target.value })
    },
    setLogoValue: ({ brandInfoForm, setCanSubmit, setBrandInfoForm }) => value => {
      const newBrandInfoForm = { ...brandInfoForm, logoUrl: value }
      setBrandInfoForm(newBrandInfoForm)
      setCanSubmit(newBrandInfoForm.logoUrl.length > 0)
    },
  })
)(Info)
