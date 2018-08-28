import { compose } from 'recompose'
import { Helmet } from 'react-helmet'
import React from 'react'

const Complete = () => (
  <React.Fragment>
    <Helmet>
      <title>{'Success'}</title>
    </Helmet>
    <section className="section">
      <div className="container container--tiny">
        <div className="section__title section__title--center">
          <h1 className="section__title-text h2">{'SUCCESS'}</h1>
        </div>
        <div className="o-layout">
          <div className="o-layout__item u-1/1 u-1/1@tab">
            <p>
              {
                'You successfully upgraded your account to a brand profile! You can now begin to upload your products to Trendiamo and start selling them.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default compose()(Complete)
