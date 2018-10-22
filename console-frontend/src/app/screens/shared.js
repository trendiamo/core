import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const StyledAvatar = styled(Avatar)`
  background-color: #f50057;
  margin: 8px;
`

const StyledForm = styled.form`
  margin-top: 8px;
  width: 100%;
`

const Main = styled.main`
  display: block;
  margin-left: 24px;
  margin-right: 24px;

  @media (min-width: 448px) {
    margin-left: auto;
    margin-right: auto;
    width: 400px;
  }
`

const Notification = ({ data }) => {
  const commonStyle = {
    fontWeight: 700,
  }
  const styles = {
    error: {
      color: '#f44',
    },
    success: {
      color: '#4f7',
    },
  }
  const status = data ? data.status : null
  const message = data ? data.message : null
  const currentStyle = { ...commonStyle, ...styles[status] }
  return (
    <Typography align="center" style={currentStyle} variant="body2">
      {message}
    </Typography>
  )
}

const StyledPaper = styled(Paper)`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 64px;
  padding: 16px 24px 24px;
`

const StyledButton = styled(Button)`
  margin-top: 24px;
`

export { StyledAvatar, StyledForm, Main, Notification, StyledPaper, StyledButton }
