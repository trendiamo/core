import { authGql } from 'auth/utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import React from 'react'
import { withRouter } from 'react-router'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'

const Preview = ({ brandInfoForm, brandInfoSubmit, errors, setInfoValue }) => (
  <React.Fragment>
    <Helmet>
      <title>{'Profile Preview'}</title>
    </Helmet>
    <section className="section">
      <div className="container container--tiny">
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
          <div className="container container--tiny">
            <div className="o-layout">
              <div className="o-layout__item u-1/1 u-1/1@tab">
                <label htmlFor="headerContentPhoto">{'Header Photo Url'}</label>
                <input
                  autoCapitalize="off"
                  autoCorrect="off"
                  id="headerContentPhoto"
                  name="headerContentPhoto"
                  onChange={setInfoValue}
                  placeholder="header photo url"
                  required
                  spellCheck="false"
                  type="text"
                  value={brandInfoForm.headerContentPhoto}
                />
              </div>
              <div className="o-layout__item u-1/1 u-1/1@tab">
                <label htmlFor="headerContentVideo">{'Header Video Url'}</label>
                <input
                  autoCapitalize="off"
                  autoCorrect="off"
                  id="headerContentVideo"
                  name="headerContentVideo"
                  onChange={setInfoValue}
                  placeholder="header video url"
                  required
                  spellCheck="false"
                  type="text"
                  value={brandInfoForm.headerContentVideo}
                />
              </div>
              <div className="o-layout__item u-1/1 u-1/1@tab">
                <label htmlFor="shortDescription">{'Short Description'}</label>
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
                  value={brandInfoForm.shortDescription}
                />
              </div>
              <div className="o-layout__item u-1/1 u-1/1@tab">
                <label htmlFor="longDescription">{'Long Description'}</label>
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
                  value={brandInfoForm.longDescription}
                />
              </div>
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
  graphql(updateBrand, {
    options: {
      refetchQueries: [
        {
          query: me,
        },
      ],
    },
  }),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    brand: data.me.brand,
  })),
  withState('errors', 'setErrors', []),
  withState('brandInfoForm', 'setBrandInfoForm', ({ brand }) => ({ ...brand })),
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
    setInfoValue: ({ brandInfoForm, setBrandInfoForm }) => event => {
      setBrandInfoForm({ ...brandInfoForm, [event.target.name]: event.target.value })
    },
  })
)(Preview)
