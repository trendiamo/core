import { apiCsvUpload } from 'auth/utils'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { Helmet } from 'react-helmet'
import Loader from 'shared/loader'
import ProductsList from './products-list'
import React from 'react'
import { branch, compose, renderNothing, withHandlers, withProps, withState } from 'recompose'
import { checkAuthError, treatAuthError } from 'auth/utils'

const ProductManage = ({ brand, isLoading, onFileUpload, file, fileSubmit, alert }) => (
  <React.Fragment>
    <Helmet>
      <title>{'My Products'}</title>
    </Helmet>
    <section className="section">
      <ProductsList brand={brand} />
      <div className="container container--tiny" style={{ textAlign: 'center' }}>
        {' '}
        <p>
          {'To get started upload a file with your product details!'}
          <br />
          {'CSV or Excel files are prefered.'}
        </p>
        <div className="account__form-buttons">
          <div className="o-layout">
            <div className="o-layout__item u-1/2 u-1/4@tab">
              <Loader isLoading={isLoading} />
              <a className="c-btn c-btn--light account__form-submit" href="/" style={{ width: '100%' }}>
                {'FINISH'}
              </a>
            </div>
            <div className="o-layout__item u-1/2 u-1/4@tab">
              <input hidden id="setFile" onChange={onFileUpload} type="file" />
              <label
                className="c-btn c-btn--primary"
                htmlFor="setFile"
                style={{ backgroundColor: '#6B8BD2', width: '100%' }}
              >
                {'UPLOAD'}
              </label>
            </div>
          </div>
          <div className="account__form-buttons">
            <div className="o-layout">
              <div className="o-layout__item u-1/1 u-1/2@tab">
                <input
                  hidden
                  id="fileSubmit"
                  onClick={fileSubmit}
                  style={{ marginTop: '5px', width: '100%' }}
                  type="submit"
                />
                <label
                  className="c-btn c-btn--primary account__form-submit"
                  htmlFor="fileSubmit"
                  style={{ marginTop: '5px', width: '100%' }}
                >
                  {'Submit to Trendiamo'}
                </label>
                {file ? (
                  <p style={{ textAlign: 'left' }}>{file.name}</p>
                ) : (
                  alert && <p style={{ color: alert.color, textAlign: 'center' }}>{alert.text}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
)

const me = gql`
  query {
    me {
      brand {
        id
        shopifyCollectionId
      }
    }
  }
`

export default compose(
  graphql(me, { options: { fetchPolicy: 'network-only' } }),
  branch(checkAuthError, treatAuthError),
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  withProps(({ data }) => ({
    brand: data.me.brand,
  })),
  withState('csv', 'setCsv', ''),
  withState('file', 'setFile', null),
  withState('alert', 'setAlert', null),
  withState('isLoading', 'setIsLoading', false),
  withHandlers({
    fileSubmit: ({ file, setIsLoading, setFile, setAlert }) => async event => {
      event.preventDefault()
      if (file == null) {
        setAlert({
          color: '#D12328',
          text: 'You need to upload a file first!',
        })
      } else {
        let formData = new FormData()
        formData.append('file_name', 'uploadedCsv')
        formData.append('file', file)
        setIsLoading(true)
        const response = await apiCsvUpload(formData)
        if (response.ok == true) {
          setIsLoading(false)
          setFile(null)
          setAlert({
            color: '#3F964D',
            text: 'Successfully sent to trendiamo, please check your email for more details!',
          })
        }
      }
    },
    onFileUpload: ({ setFile, setAlert }) => event => {
      setAlert(null)
      event.preventDefault()
      const file = event.target.files[0]
      setFile(file)
    },
  })
)(ProductManage)
