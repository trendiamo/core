import Link from 'shared/link'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const Breadcrumbs = ({ breadcrumbs }) => (
  <React.Fragment>
    {breadcrumbs.map((breadcrumb, i) => (
      <React.Fragment key={breadcrumb.route || breadcrumb.text}>
        {breadcrumb.route ? (
          <Link to={breadcrumb.route}>
            <Typography color="default" style={{ display: 'inline' }} variant="h6">
              {breadcrumb.text}
            </Typography>
          </Link>
        ) : (
          <Typography color="default" style={{ display: 'inline' }} variant="h6">
            {breadcrumb.text}
          </Typography>
        )}
        {i < breadcrumbs.length - 1 && (
          <Typography color="default" style={{ display: 'inline', margin: '0 0.5rem' }} variant="h6">
            {'/'}
          </Typography>
        )}
      </React.Fragment>
    ))}
  </React.Fragment>
)

export default Breadcrumbs
