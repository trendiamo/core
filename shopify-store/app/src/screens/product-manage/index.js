import { Helmet } from 'react-helmet'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'

const ProductManage = ({ brandInfoSubmit, setInfoValue }) => (
  <React.Fragment>
    <Helmet>
      <title>{'My Products'}</title>
    </Helmet>
    <section className="section">
      <div className="container container--tiny" style={{ textAlign: 'center' }}>
        {' '}
        <p>
          {'Upload a CSV file with your products to get started!'}
          <br />
          {'You can download the template file here.'}
        </p>
        <a
          className="c-btn"
          download="delivery-logo-postmates.png"
          href={''}
          style={{ backgroundColor: '#6B8BD2' }}
          target="_blank"
        >
          {'DOWNLOAD TEMPLATE CSV'}
        </a>
        <div className="account__form-buttons">
          <a className="c-btn c-btn--light account__form-submit" href="/">
            {'FINISH'}
          </a>
          <input hidden id="fileUpload" onChange={setInfoValue} type="file" />
          <label className="c-btn c-btn--primary account__form-submit" htmlFor="fileUpload">
            {'UPLOAD'}
          </label>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default compose(
  withState('csvForm', 'setCsvForm', ''),
  withHandlers({
    setInfoValue: ({ setCsvForm }) => event => {
      event.preventDefault()
      setCsvForm(event.target.value)
      if (window.confirm(`Upload ${event.target.value} to Trendiamo?`)) {
        console.log('Send Email')
      } else {
        console.log('Do Nothing')
      }
    },
  })
)(ProductManage)
