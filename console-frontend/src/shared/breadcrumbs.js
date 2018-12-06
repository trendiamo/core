import classnames from 'classnames'
import Link from 'shared/link'
import React from 'react'
import Typography from '@material-ui/core/Typography'

const Title = ({ text, classes, responsive }) => (
  <Typography className={classnames(classes.title, responsive && classes.titleResponsive)} variant="h6">
    {text}
  </Typography>
)

const Breadcrumbs = ({ breadcrumbs, classes }) => (
  <React.Fragment>
    {breadcrumbs.map((breadcrumb, i) => (
      <React.Fragment key={breadcrumb.route || breadcrumb.text}>
        {breadcrumb.route ? (
          <Link to={breadcrumb.route}>
            <Title classes={classes} responsive text={breadcrumb.text} />
          </Link>
        ) : (
          <Title classes={classes} text={breadcrumb.text} />
        )}
        {i < breadcrumbs.length - 1 && <Title classes={classes} responsive text="/" />}
      </React.Fragment>
    ))}
  </React.Fragment>
)

export default Breadcrumbs
