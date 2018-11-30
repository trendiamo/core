import Breadcrumbs from 'shared/breadcrumbs'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MuiAppBar from '@material-ui/core/AppBar'
import React from 'react'
import styled from 'styled-components'
import Toolbar from '@material-ui/core/Toolbar'
import { branch, compose, renderNothing, withProps } from 'recompose'
import { withStoreConsumer } from 'ext/recompose/with-store'

const ButtonsContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  flex-flow: row wrap;
`

const AppBarContent = compose(
  withStoreConsumer,
  branch(({ store }) => !store.appBarContent, renderNothing),
  withProps(({ store }) => ({
    Actions: store.appBarContent.Actions,
    breadcrumbs: store.appBarContent.breadcrumbs,
  }))
)(({ Actions, breadcrumbs }) => (
  <React.Fragment>
    <Breadcrumbs breadcrumbs={breadcrumbs} />
    {Actions && <ButtonsContainer>{Actions}</ButtonsContainer>}
  </React.Fragment>
))

const AppBar = ({ classes, open, toggleOpen }) => (
  <MuiAppBar className={classNames(classes.appBar, open && classes.appBarShift)} position="absolute">
    <Toolbar className={classes.topToolbar}>
      <IconButton aria-label="Open drawer" className={classes.menuButton} color="inherit" onClick={toggleOpen}>
        <MenuIcon />
      </IconButton>
      <AppBarContent />
    </Toolbar>
  </MuiAppBar>
)

export default AppBar
