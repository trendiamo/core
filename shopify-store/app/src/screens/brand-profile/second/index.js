import { authGql } from 'auth/utils'
import Cover from './cover'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { pick } from 'lodash'
import Placeholder from 'icons/placeholder'
import React from 'react'
import Steps from 'screens/brand-profile/steps'
import { withRouter } from 'react-router'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { checkAuthError, treatAuthError } from 'auth/utils'

const Preview = ({
  brand,
  brandInfoForm,
  brandInfoSubmit,
  onPictureUrlChange,
  onVideoUrlChange,
  errors,
  setInfoValue,
}) => (
  <React.Fragment>
    <Helmet>
      <title>{'Profile Preview'}</title>
    </Helmet>
    <section className="section collection--center">
      <div className="container container--tiny">
        <Steps currentStep={2} stepCount={3} tags={['SETUP', 'PREVIEW', 'SHIPPING']} />
        <div className="section__title section__title--center">
          <h1 className="section__title-text h2">{'PROFILE PREVIEW'}</h1>
        </div>
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
        <div className="collection__header">
          <div className="container">
            <div className="o-layout">
              <div className="o-layout__item u-1/1 u-1/1@tab">
                <Cover brand={brand} onPictureUrlChange={onPictureUrlChange} onVideoUrlChange={onVideoUrlChange} />
              </div>
            </div>
            <div className="collection__header-info">
              <div className="collection-seller-info">
                <div className="seller-info-profilepic-container">
                  <img alt="" className="seller-info-profilepic" src={brand.logoUrl} />
                </div>
                <div className="seller-info-description-container">
                  <h1 className="collection-seller-info-title">{brand.name}</h1>
                  <div>
                    <textarea
                      autoCapitalize="off"
                      autoCorrect="off"
                      id="shortDescription"
                      name="shortDescription"
                      onChange={setInfoValue}
                      placeholder="short brand description"
                      required
                      rows="1"
                      spellCheck="false"
                      type="text"
                      value={brandInfoForm.shortDescription || ''}
                    />
                  </div>
                  <div>
                    <textarea
                      autoCapitalize="off"
                      autoCorrect="off"
                      id="longDescription"
                      name="longDescription"
                      onChange={setInfoValue}
                      placeholder="long brand description"
                      required
                      rows="4"
                      spellCheck="false"
                      type="text"
                      value={brandInfoForm.longDescription || ''}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="collection-products">
            <div className="o-layout__item u-1/2 u-1/3@tab u-1/4@desk">
              <a className="product-link" title="Dummy Product">
                <div className="product product--left product-grid-card-shadow">
                  <div className="product__media u-bg-grey">
                    <div className="grid-view-item__image">
                      <Placeholder />
                    </div>
                  </div>
                  <div className="product__details product-grid-card-details-padding">
                    <h3 className="product__title h4">{'Dummy Product'}</h3>
                    <h4 className="product__vendor h6">{brand.name}</h4>
                    <p className="product__price h5">
                      <span className="product__price-price">
                        <span className="money">{'€64.00'}</span>
                      </span>
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="container container--tiny">
          <div className="account__form-buttons">
            <Link className="c-btn c-btn--light account__form-submit" to="/u/create-brand-profile/1">
              {'Previous'}
            </Link>
            <input className="c-btn c-btn--primary account__form-submit" type="submit" value="NEXT" />
            <a className="link account__form-secondary-btn" href="/">
              {'CANCEL'}
            </a>
          </div>
        </div>
      </form>
    </section>
  </React.Fragment>
)

const me = gql`
  query {
    me {
      brand {
        id
        headerContentVideo
        headerContentPhoto
        shortDescription
        longDescription
        name
        logoUrl
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
  branch(checkAuthError, treatAuthError),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    brand: data.me.brand,
  })),
  withState('errors', 'setErrors', []),
  withState('brandInfoForm', 'setBrandInfoForm', ({ brand }) => {
    return pick(brand, ['id', 'headerContentVideo', 'headerContentPhoto', 'shortDescription', 'longDescription'])
  }),
  withRouter,
  withHandlers({
    brandInfoSubmit: ({ auth, brandInfoForm, history, mutate, setErrors }) => event => {
      event.preventDefault()
      authGql(auth, async () => {
        const { data } = await mutate({
          variables: { brand: brandInfoForm },
        })
        if (data.updateBrand.errors && data.updateBrand.errors.length) {
          setErrors(data.updateBrand.errors)
        } else {
          history.push('/u/create-brand-profile/3')
        }
      })
    },
    onPictureUrlChange: ({ brandInfoForm, setBrandInfoForm }) => value =>
      setBrandInfoForm({ ...brandInfoForm, headerContentPhoto: value, headerContentVideo: null }),
    onVideoUrlChange: ({ brandInfoForm, setBrandInfoForm }) => value =>
      setBrandInfoForm({ ...brandInfoForm, headerContentPhoto: null, headerContentVideo: value }),
    setInfoValue: ({ brandInfoForm, setBrandInfoForm }) => event =>
      setBrandInfoForm({ ...brandInfoForm, [event.target.name]: event.target.value }),
  })
)(Preview)
