import { compose } from 'recompose'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import React from 'react'
import SuccessIcon from 'shared/success-icon'

const Complete = () => (
  <React.Fragment>
    <Helmet>
      <title>{'Success'}</title>
    </Helmet>
    <section className="section section--account account account--main">
      <div className="container container--tiny">
        <div className="section__title section__title--center section__title--desc">
          <h1 className="section__title-text h2">{'SUCCESS'}</h1>
          <SuccessIcon />
          <br />
          <p>
            {
              'Your brand details have been successfully saved! You can now begin to upload your products to Trendiamo and start selling them.'
            }
          </p>
          <Link className="c-btn c-btn--primary" to="/u/manage-products">
            {'Manage Products'}
          </Link>
        </div>
      </div>
    </section>
  </React.Fragment>
)

export default compose()(Complete)
