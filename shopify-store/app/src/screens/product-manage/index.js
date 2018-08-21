import { ApolloProvider } from 'react-apollo'
import clientShopify from '../../graphql/client-shopify'
import { Helmet } from 'react-helmet'
import Loader from 'shared/loader'
import Products from './products'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const ProductManage = ({ isLoading, setInfoValue }) => (
  <React.Fragment>
    <Helmet>
      <title>{'My Products'}</title>
    </Helmet>
    <section className="section">
      <ApolloProvider client={clientShopify}>
        <Products />
      </ApolloProvider>
      <div className="container container--tiny" style={{ textAlign: 'center' }}>
        {' '}
        <p>
          {'Upload a CSV file with your products to get started!'}
          <br />
          {'You can download the template file here.'}
        </p>
        <div className="o-layout">
          <Loader isLoading={isLoading} />
          <div className="o-layout__item u-1/1 u-1/2@tab">
            <a
              className="c-btn"
              download="delivery-logo-postmates.png"
              href={'https://s3.eu-central-1.amazonaws.com/trnd-assets/products_template.csv'}
              style={{ backgroundColor: '#6B8BD2', width: '100%' }}
              target="_blank"
            >
              {'DOWNLOAD TEMPLATE CSV'}
            </a>
          </div>
        </div>
        <div className="account__form-buttons">
          <div className="o-layout">
            <div className="o-layout__item u-1/2 u-1/4@tab">
              <a className="c-btn c-btn--light account__form-submit" href="/" style={{ width: '100%' }}>
                {'FINISH'}
              </a>
            </div>
            <div className="o-layout__item u-1/2 u-1/4@tab">
              <input hidden id="fileUpload" onChange={setInfoValue} type="file" />
              <label
                className="c-btn c-btn--primary account__form-submit"
                htmlFor="fileUpload"
                style={{ width: '100%' }}
              >
                {'UPLOAD'}
              </label>
            </div>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default compose(
  withState('csv', 'setCsv', ''),
  withState('isLoading', 'setIsLoading', false),
  withHandlers({
    setInfoValue: ({ setCsv, setIsLoading }) => event => {
      event.preventDefault()
      const file = event.target.files[0]
      setCsv(file)
      if (!confirm(`Upload ${file.name} to Trendiamo?`)) {
        return
      }
      if (file.size / 1000000 >= 2) {
        alert('Please upload a csv file!')
        return
      }
      if (file.type !== 'text/csv') {
        alert('Please upload a csv file!')
        return
      }
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
          alert('Successfully uploaded the file!')
        }
      })
    },
  })
)(ProductManage)
