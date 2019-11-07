import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { SnackbarProvider as NotistackSnackbarProvider, useSnackbar } from 'notistack'

const anchorOrigins = {
  mobile: { vertical: 'top', horizontal: 'center' },
  desktop: { vertical: 'bottom', horizontal: 'right' },
}

const ClosingElement = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`

const CloseOnClickElement = ({ id }) => {
  const { closeSnackbar } = useSnackbar()

  const onClick = useCallback(() => closeSnackbar(id), [closeSnackbar, id])

  return <ClosingElement onClick={onClick} styleType="link" />
}

const CloseOnClickContainer = key => <CloseOnClickElement id={key} />

const SnackbarProvider = ({ width, children }) => {
  const isMobile = useMemo(() => !isWidthUp('sm', width), [width])

  return (
    <NotistackSnackbarProvider
      action={isMobile && CloseOnClickContainer}
      anchorOrigin={anchorOrigins[isMobile ? 'mobile' : 'desktop']}
      autoHideDuration={(isMobile && 2600) || undefined}
      dense={isMobile}
      maxSnack={isMobile ? 1 : 3}
      preventDuplicate={isMobile}
    >
      {children}
    </NotistackSnackbarProvider>
  )
}

export default withWidth()(SnackbarProvider)
