import { Helmet } from 'react-helmet'
import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers, withState } from 'recompose'

const ProductManage = ({ setInfoValue }) => (
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
  withState('csv', 'setCsv', ''),
  withHandlers({
    setInfoValue: ({ setCsv }) => event => {
      event.preventDefault()
      const file = event.target.files[0]
      setCsv(file)
      if (window.confirm(`Upload ${file.name} to Trendiamo?`)) {
        console.log(file.type)
        if (file.size / 1000000 < 2) {
          if (file.type === 'text/csv') {
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
            fetch(`https://626694df.ngrok.io/api/v1/csv`, options).then(response => {
              if (response.ok == true) {
                alert('Successfully uploaded the file!')
              }
            })
          } else {
            alert('Please upload a csv file!')
          }
        } else {
          alert('Your File exceeds 2 MB!')
        }
      } else {
        console.log('Do Nothing')
      }
    },
  })
)(ProductManage)
