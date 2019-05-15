import auth from 'auth'
import Button from 'shared/button'
import Dialog from 'shared/dialog'
import Link from 'shared/link'
import ListItemText from '@material-ui/core/ListItemText'
import MUIListItem from '@material-ui/core/ListItem'
import React, { useCallback, useState } from 'react'
import routes from 'app/routes'
import styled from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { apiAccountDestroy, apiRequest } from 'utils'
import { useSnackbar } from 'notistack'

const ListItemContainer = styled.div`
  width: 100%;
  margin-right: 10px;
`

const AccountContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledListItem = styled(MUIListItem)`
  cursor: pointer;
`

const DeleteButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const DialogActions = ({ handleDialogConfirmation }) => (
  <Button color="primary" onClick={handleDialogConfirmation} variant="text">
    {'Yes Absolutely'}
  </Button>
)

const StyledTypography = styled(Typography)`
  padding-top: 30px;
`

const DeleteConfirmation = () => <StyledTypography>{'Are you sure you want to delete this account?'}</StyledTypography>

const ListItem = ({ enterAccount, account, hostnames }) => (
  <ListItemContainer>
    <Tooltip placement="top" title="enter account">
      <Link to={routes.root()}>
        <StyledListItem button onClick={enterAccount}>
          <ListItemText primary={account.name} secondary={hostnames} />
        </StyledListItem>
      </Link>
    </Tooltip>
  </ListItemContainer>
)

const Account = ({ accounts, account, setAccounts }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const enterAccount = () => auth.setAdminSessionAccount(account)
  const hostnames = account.websitesAttributes[0].hostnames.join(', ')

  const handleDeleteButtonClick = useCallback(() => {
    setDialogOpen(true)
  }, [])

  const handleDialogConfirmation = useCallback(
    () => {
      ;(async () => {
        setDialogOpen(false)
        const { errors, requestError } = await apiRequest(apiAccountDestroy, [account.id])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        const filteredAccounts = accounts.filter(accountElement => accountElement.id !== account.id)
        setAccounts(filteredAccounts)
      })()
    },
    [account.id, accounts, enqueueSnackbar, setAccounts]
  )

  const handleDialogButtonClose = useCallback(() => {
    setDialogOpen(false)
  }, [])

  return (
    <AccountContainer>
      <ListItemContainer>
        <ListItem account={account} enterAccount={enterAccount} hostnames={hostnames} />
      </ListItemContainer>
      <DeleteButtonContainer>
        <Button color="actions" onClick={handleDeleteButtonClick} variant="contained">
          {'delete'}
        </Button>
      </DeleteButtonContainer>
      <Dialog
        content={<DeleteConfirmation />}
        dialogActions={<DialogActions handleDialogConfirmation={handleDialogConfirmation} />}
        handleClose={handleDialogButtonClose}
        hideBackdrop
        open={dialogOpen}
        title=""
      />
    </AccountContainer>
  )
}

const AccountsList = ({ accounts, setAccounts }) =>
  accounts &&
  accounts.map(account => <Account account={account} accounts={accounts} key={account.id} setAccounts={setAccounts} />)

export default AccountsList
