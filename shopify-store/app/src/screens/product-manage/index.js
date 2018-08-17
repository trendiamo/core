import { Helmet } from 'react-helmet'
import React from 'react'
import { compose, withHandlers, withState } from 'recompose'

const ProductManage = ({ setInfoValue }) => (
  <React.Fragment>
    <Helmet>
      <title>{'My Products'}</title>
    </Helmet>
    <section className="section">
      <div
        className="container container--tiny"
        style={{
          borderRadius: '14px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.18)',
          marginBottom: '2rem',
          marginTop: '2rem',
          paddingBottom: '1rem',
          paddingTop: '1rem',
          position: 'relative',
          width: '90%',
        }}
      >
        {'YOUR PRODUCTS'}
        <div
          style={{
            backgroundColor: '#F4F4F4',
            borderRadius: '6px',
            margin: '1%',
            width: '20%',
          }}
        >
          <br />
        </div>
        <div
          style={{
            backgroundColor: '#F4F4F4',
            borderRadius: '6px',
            margin: '1%',
          }}
        >
          <br />
        </div>
        <div
          style={{
            backgroundColor: '#F4F4F4',
            borderRadius: '6px',
            margin: '1%',
            width: '35%',
          }}
        >
          <br />
        </div>
        <div
          style={{
            backgroundColor: '#F4F4F4',
            borderRadius: '6px',
            margin: '1%',
            width: '80%',
          }}
        >
          <br />
        </div>
        <div
          style={{
            backgroundColor: 'white',
            border: '2px solid rgb(200, 200, 200)',
            borderRadius: '6px',
            bottom: '-10%',
            boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.18) 0px 4px 16px',
            color: 'rgb(200, 200, 200)',
            fontWeight: 'regular',
            letterSpacing: '1px',
            padding: '1%',
            position: 'absolute',
            right: '-3%',
            transform: 'rotate(-20deg)',
          }}
        >
          {'Empty'}
        </div>
      </div>
      <div className="container container--tiny" style={{ textAlign: 'center' }}>
        {' '}
        <p style={{}}>
          {'Upload a CSV file with your products to get started!'}
          <br />
          {'You can download the template file here.'}
        </p>
        <div className="o-layout">
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
  withHandlers({
    setInfoValue: ({ setCsv }) => event => {
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
      fetch(`https://${process.env.API_ENDPOINT}/api/v1/csv`, options).then(response => {
        if (response.ok == true) {
          alert('Successfully uploaded the file!')
        }
      })
    },
  })
)(ProductManage)
