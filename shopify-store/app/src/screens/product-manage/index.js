import { ApolloProvider } from 'react-apollo'
import clientShopify from '../../graphql/client-shopify'
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
      <ApolloProvider client={clientShopify}>
        <ProductsList brand={brand} />
      </ApolloProvider>
      <div className="container container--tiny" style={{ textAlign: 'center' }}>
        {' '}
        <p>
          {'Upload a file containing your products to get started!'}
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
                  {'Submit to Tredniamo'}
                </label>
                <p hidden={!file} style={{ textAlign: 'left' }}>
                  {`${file.name}`}
                </p>
                <p hidden={!alert} style={{ color: `${alert.color}`, textAlign: 'left' }}>
                  {`${alert.text}`}
                </p>
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
  branch(({ data }) => data && (data.loading || data.error), renderNothing),
  branch(checkAuthError, treatAuthError),
  withProps(({ data }) => ({
    brand: data.me.brand,
  })),
  withState('csv', 'setCsv', ''),
  withState('file', 'setFile', false),
  withState('alert', 'setAlert', false),
  withState('isLoading', 'setIsLoading', false),
  withHandlers({
    fileSubmit: ({ file, setIsLoading, setFile, setAlert }) => event => {
      event.preventDefault()
      if (file == false) {
        setAlert({
          color: '#D12328',
          text: 'You need to upload a file first!',
        })
      } else {
        let formData = new FormData()
        formData.append('file_name', 'uploadedCsv')
        formData.append('file', file)
        let options = {
          body: formData,
          headers: {
            'X-USER-EMAIL': localStorage.getItem('authEmail'),
            'X-USER-TOKEN': localStorage.getItem('authToken'),
          },
          method: 'POST',
        }
        setIsLoading(true)
        fetch(`https://${process.env.API_ENDPOINT}/api/v1/csv`, options).then(response => {
          if (response.ok == true) {
            setIsLoading(false)
            setFile(false)
            setAlert({
              color: '#3F964D',
              text: 'Successfully sent to trendiamo, please check your email for more details!',
            })
          }
        })
      }
    },
    onFileUpload: ({ setFile, setAlert }) => event => {
      setAlert(false)
      event.preventDefault()
      const file = event.target.files[0]
      setFile(file)
    },
  })
)(ProductManage)
