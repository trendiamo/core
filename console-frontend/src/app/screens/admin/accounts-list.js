import auth from 'auth'
import Link from 'shared/link'
import ListItemText from '@material-ui/core/ListItemText'
import MUIListItem from '@material-ui/core/ListItem'
import React from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'

const StyledListItem = styled(MUIListItem)`
  cursor: pointer;
`

const Account = ({ account }) => {
  const enterAccount = () => auth.setAdminSessionAccount(account)
  const hostnames = account.websitesAttributes[0].hostnames.join(', ')

  return (
    <Tooltip placement="top" title="enter account">
      <Link to={routes.root()}>
        <StyledListItem button onClick={enterAccount}>
          <ListItemText primary={account.name} secondary={hostnames} />
        </StyledListItem>
      </Link>
    </Tooltip>
  )
}

const AccountsList = ({ accounts }) =>
  accounts && accounts.map(account => <Account account={account} key={account.id} />)

export default AccountsList
