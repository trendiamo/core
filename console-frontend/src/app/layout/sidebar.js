import Menu from './menu'
import React, { memo, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Drawer, Hidden, withWidth } from '@material-ui/core'
import { drawerWidth, drawerWidthClosed } from './layout-styles'
import { isWidthUp } from '@material-ui/core/withWidth'
import { showUpToUsBranding } from 'utils'

const ModalProps = {
  keepMounted: true, // Better open performance on mobile.
}

const background = showUpToUsBranding()
  ? 'linear-gradient(to bottom, #12e5c4, #18e0aa)'
  : 'linear-gradient(180deg, #ff843e, #ff6c40 52%, #ff5642)'

const StyledDrawer = styled(Drawer)`
  > div {
    border: none;
    flex: 1;
    margin-top: 0;
    min-height: 100vh;
    position: fixed;
    transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
    overflow-x: hidden;
    ${({ variant, open }) =>
      variant === 'temporary' || open
        ? `
      background: #fff;
      padding-left: 10px;
      box-shadow: 0 16px 16px 0 rgba(0, 0, 0, 0.24), 0 0 16px 0 rgba(0, 0, 0, 0.18);
      white-space: nowrap;
      width: ${drawerWidth}px;
      z-index: 5000;
      &:before {
        content: '';
        background: ${background};
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 10px;
      }
      `
        : `
      background: ${background};
      width: 56px;
      @media (min-width: 600px) {
        width: ${drawerWidthClosed}px;
      }
  `}
  }
`

const DrawerGhost = styled.div`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  ${({ isClosed }) => isClosed && `width: ${drawerWidthClosed}px;`}
  @media (max-width: 959.95px) {
    width: 0;
  }
`

const Sidebar = ({ sidebarOpen, toggleOpen, width }) => {
  const [menuLoaded, setMenuLoaded] = useState(false)

  useEffect(() => {
    let didCancel = false
    setTimeout(() => {
      didCancel || setMenuLoaded(true)
    }, 2000)
    return () => (didCancel = true)
  }, [])

  const isFoldable = useMemo(() => !(showUpToUsBranding() && isWidthUp('md', width)), [width])

  return (
    <>
      <Hidden implementation="js" mdUp>
        <DrawerGhost />
        <StyledDrawer ModalProps={ModalProps} onClose={toggleOpen} open={sidebarOpen} variant="temporary">
          <Menu isFoldable={isFoldable} menuLoaded={menuLoaded} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
        </StyledDrawer>
      </Hidden>
      <Hidden implementation="js" smDown>
        <DrawerGhost isClosed={!sidebarOpen} />
        <StyledDrawer open={sidebarOpen} variant="permanent">
          <Menu isFoldable={isFoldable} menuLoaded={menuLoaded} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
        </StyledDrawer>
      </Hidden>
    </>
  )
}

// withWidth used to initialize the visibility on first render
export default withWidth({ resizeInterval: Infinity, noSSR: true })(memo(Sidebar))
