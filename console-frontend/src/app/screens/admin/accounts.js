import auth from 'auth'
import Link from 'shared/link'
import ListItemText from '@material-ui/core/ListItemText'
import MUIList from '@material-ui/core/List'
import MUIListItem from '@material-ui/core/ListItem'
import omit from 'lodash.omit'
import React from 'react'
import routes from 'app/routes'
import Section from 'shared/section'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import { compose, withHandlers } from 'recompose'

const SectionContainer = styled.div`
  margin-top: -54px;
`

const List = styled(MUIList)`
  max-width: 1200px;
`

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
              <ListItemText primary={account.name} secondary={account.websites[0].hostnames.join(', ')} />
            </ListItem>
          </Link>
        </Tooltip>
      ))}
  </>
)

const Accounts = ({ accounts, enterAccount }) => (
  <SectionContainer>
    <Section title="Accounts">
      <List component="nav">
        <AccountsList accounts={accounts} enterAccount={enterAccount} />
      </List>
    </Section>
  </SectionContainer>
)

export default compose(
  withHandlers({
    enterAccount: () => account => {
      auth.setAdminSessionAccount(account)
    },
  })
)(Accounts)
