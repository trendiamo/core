import Menu from './menu'
import React, { memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Drawer, Hidden } from '@material-ui/core'
import { drawerWidth, drawerWidthClosed } from './layout-styles'
import { showUpToUsBranding } from 'utils'

const ModalProps = {
  keepMounted: true, // Better open performance on mobile.
}

const background = showUpToUsBranding()
  ? 'linear-gradient(to bottom, #0f7173, #376996)'
  : 'linear-gradient(180deg, #ff843e, #ff6c40 52%, #ff5642)'

const StyledDrawer = styled(Drawer)`
  > div:last-child {
    border: none;
    flex: 1;
    margin-top: 0;
    height: 100%;
    position: fixed;
    transition: width 0.2s ease-in-out;
    overflow-x: hidden;
    ${({ variant, open }) =>
      variant === 'temporary' || open
        ? `
      background: #fff;
      padding-left: 10px;
      box-shadow: ${
        showUpToUsBranding()
          ? '8px 0 8px 0 rgba(0, 0, 0, 0.065)'
          : '0 16px 16px 0 rgba(0, 0, 0, 0.24), 0 0 16px 0 rgba(0, 0, 0, 0.18)'
      };

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
  flex-shrink: 0;
  transition: width 0.2s ease-in-out;
  ${({ isClosed }) => isClosed && `width: ${drawerWidthClosed}px;`}
  width: 0;
  @media (min-width: 960px) {
    width: ${drawerWidth}px;
  }
`

const Sidebar = ({ sidebarOpen, toggleOpen }) => {
  const [menuLoaded, setMenuLoaded] = useState(false)

  useEffect(() => {
    let didCancel = false
    setTimeout(() => {
      didCancel || setMenuLoaded(true)
    }, 2000)
    return () => (didCancel = true)
  }, [])

  return (
    <>
      <Hidden implementation="js" mdUp>
        <DrawerGhost />
        <StyledDrawer ModalProps={ModalProps} onClose={toggleOpen} open={sidebarOpen} variant="temporary">
          <Menu isFoldable menuLoaded={menuLoaded} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
        </StyledDrawer>
      </Hidden>
      <Hidden implementation="js" smDown>
        <DrawerGhost isClosed={!sidebarOpen} />
        <StyledDrawer open={sidebarOpen} variant="permanent">
          <Menu menuLoaded={menuLoaded} sidebarOpen={sidebarOpen} toggleOpen={toggleOpen} />
        </StyledDrawer>
      </Hidden>
    </>
  )
}

export default memo(Sidebar)
