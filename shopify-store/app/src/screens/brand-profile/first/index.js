import { authGql } from 'auth/utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Helmet } from 'react-helmet'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import { withRouter } from 'react-router'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'

const Info = ({ brandInfoForm, brandInfoSubmit, errors, username, setInfoValue }) => (
  <React.Fragment>
    <Helmet>
      <title>{'Profile Information'}</title>
    </Helmet>
    <section className="section">
      <div className="container container--tiny">
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
          <label htmlFor="name">{'BRAND NAME'}</label>
          <div className="brand-name-container" style={{ display: 'flex' }}>
            <div className="brand-name-container-input" style={{ width: '100%' }}>
              <input
                autoCapitalize="off"
                autoCorrect="off"
                autoFocus
                id="name"
                name="name"
                onChange={setInfoValue}
                placeholder={username}
                required
                spellCheck="false"
                type="text"
                value={brandInfoForm.name}
              />
            </div>
            <div className="brand-name-container-mark">
              <a
                className="product-stock-mark"
                data-for="brand-name"
                data-tip
                href=""
                style={{
                  alignItems: 'center',
                  display: 'flex',
                  height: '48px',
                  justifyContent: 'center',
                  width: '48px',
                }}
                target="_blank"
              >
                {'?'}
              </a>
              <ReactTooltip
                aria-haspopup="true"
                delayHide={100}
                delayShow={100}
                effect="solid"
                id="brand-name"
                place="top"
                type="dark"
              >
                <p>
                  {`If your chosen username does not`}
                  <br />
                  {`represent your brand's name`}
                  <br />
                  {`correctly you can change it here`}
                </p>
              </ReactTooltip>
            </div>
          </div>

          <label htmlFor="legalName">{'LEGAL NAME OF BUSINESS'}</label>
          <input
            autoCapitalize="off"
            autoCorrect="off"
            id="legalName"
            name="legalName"
            onChange={setInfoValue}
            placeholder={username + ' LLC.'}
            required
            spellCheck="false"
            type="text"
            value={brandInfoForm.legalName}
          />
          <div className="o-layout">
            <div className="o-layout__item u-1/1 u-3/4@tab">
              <label htmlFor="legalAddressStreet">{'LEGAL ADDRESS OF BUSINESS'}</label>
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
            <input className="c-btn c-btn--primary account__form-submit" type="submit" value="NEXT" />
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
      username
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
  graphql(me),
  graphql(addBrand, {
    name: 'addBrandMutation',
    options: {
      refetchQueries: [
        {
          query: me,
        },
      ],
    },
  }),
  graphql(updateBrand, {
    name: 'updateBrandMutation',
    options: {
      refetchQueries: [
        {
          query: me,
        },
      ],
    },
  }),
  withState('errors', 'setErrors', []),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    brand: data.me.brand,
    username: data.me.username,
  })),
  withState('brandInfoForm', 'setBrandInfoForm', ({ username, brand }) => {
    if (brand == null) {
      return {
        legalAddressCity: '',
        legalAddressCountry: '',
        legalAddressNumber: '',
        legalAddressPostalCode: '',
        legalAddressStreet: '',
        legalName: username + ' LLC.',
        logoUrl: '',
        name: username,
      }
    } else {
      return brand
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
        if (data.updateBrand.errors && data.updateBrand.errors.length) {
          setErrors(data.updateBrand.errors)
        } else {
          history.push('/u/create-brand-profile/2')
        }
      })
    },
    setInfoValue: ({ brandInfoForm, setBrandInfoForm }) => event => {
      setBrandInfoForm({ ...brandInfoForm, [event.target.name]: event.target.value })
      if ([event.target.name][0] === 'files[0]') {
        brandInfoForm.logoUrl = URL.createObjectURL(event.target.files[0])
        setBrandInfoForm({ ...brandInfoForm, [event.target.name]: event.target.value })
      }
    },
  })
)(Info)
