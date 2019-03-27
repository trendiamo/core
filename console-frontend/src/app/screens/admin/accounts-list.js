import auth from 'auth'
import Link from 'shared/link'
import ListItemText from '@material-ui/core/ListItemText'
import MUIListItem from '@material-ui/core/ListItem'
import omit from 'lodash.omit'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import { compose, withHandlers } from 'recompose'

const StyledListItem = styled(MUIListItem)`
  &:hover {
    cursor: pointer;
  }
`

const ListItem = compose(
  withHandlers({
    enterAccount: ({ onClick, value }) => () => {
      onClick(value)
    },
  })
)(({ enterAccount, ...props }) => (
  <StyledListItem {...omit(props, ['value'])} button onClick={enterAccount} props={props} />
))

const AccountsList = ({ accounts, enterAccount }) => (
  <>
    {accounts &&
      accounts.map(account => (
        <Tooltip key={account.id} placement="top" title="enter account">
          <Link to={routes.root()}>
            <ListItem onClick={enterAccount} value={account}>
              <ListItemText primary={account.name} secondary={account.websitesAttributes[0].hostnames.join(', ')} />
            </ListItem>
          </Link>
        </Tooltip>
      ))}
  </>
)

export default compose(
  withHandlers({
    enterAccount: () => account => {
      auth.setAdminSessionAccount(account)
    },
  })
)(AccountsList)
