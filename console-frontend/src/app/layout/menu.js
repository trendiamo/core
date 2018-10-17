import classnames from 'classnames'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import { DashboardMenuItem } from 'ra-ui-materialui'
import DefaultIcon from '@material-ui/icons/ViewList'
import { MenuItemLink } from 'ra-ui-materialui'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { getResources, translate } from 'ra-core'

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
}

const Menu = ({ classes, className, dense, hasDashboard, onMenuClick, resources, ...rest }) => (
  <div className={classnames(classes.main, className)} {...rest}>
    {hasDashboard && <DashboardMenuItem onClick={onMenuClick} />}
    {resources.filter(r => r.hasList).map(resource => (
      <MenuItemLink
        dense={dense}
        key={resource.name}
        leftIcon={resource.icon ? <resource.icon /> : <DefaultIcon />}
        onClick={onMenuClick}
        primaryText={resource.name}
        to={`/${resource.name}`}
      />
    ))}
  </div>
)

Menu.defaultProps = {
  onMenuClick: () => null,
}

const mapStateToProps = state => ({
  open: state.admin.ui.sidebarOpen,
  pathname: state.routing.location.pathname, // used to force redraw on navigation
  resources: getResources(state),
})

const enhance = compose(
  translate,
  connect(
    mapStateToProps,
    {},
    null,
    {
      areStatePropsEqual: (prev, next) =>
        prev.resources.every((value, index) => value === next.resources[index]) &&
        prev.pathname === next.pathname &&
        prev.open === next.open,
    }
  ),
  withStyles(styles)
)

export default enhance(Menu)
