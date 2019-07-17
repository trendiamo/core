import auth from 'auth'
import Button from 'shared/button'
import Dialog from 'shared/dialog'
import Link from 'shared/link'
import ListItemText from '@material-ui/core/ListItemText'
import MUIListItem from '@material-ui/core/ListItem'
import Pagination from 'shared/pagination'
import React, { useCallback, useMemo, useState } from 'react'
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
  ${ListItemText} span {
    color: #222;
    font-size: 16px;
  }
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

const ListItem = ({ enterAccount, account, hostnames }) => {
  return (
    <ListItemContainer>
      <Tooltip placement="top" title="enter account">
        <Link to={auth.isRole('editor') ? routes.simpleChatsList(account.slug) : routes.triggersList(account.slug)}>
          <StyledListItem button onClick={enterAccount}>
            <ListItemText
              primary={account.name}
              secondary={auth.isAdmin() ? hostnames : auth.getUser().roles[account.slug]}
            />
          </StyledListItem>
        </Link>
      </Tooltip>
    </ListItemContainer>
  )
}

const Account = ({ account, fetchAccounts }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const enterAccount = useCallback(
    () => {
      auth.setSessionAccount(account)
      auth.setSessionRole(auth.getUser().roles ? auth.getUser().roles[account.slug] : '')
    },
    [account]
  )

  const hostnames = useMemo(() => account.websitesAttributes && account.websitesAttributes[0].hostnames.join(', '), [
    account,
  ])

  const handleDeleteButtonClick = useCallback(() => {
    setDialogOpen(true)
  }, [])

  const handleDialogConfirmation = useCallback(
    () => {
      ;(async () => {
        setDialogOpen(false)
        const { errors, requestError, json } = await apiRequest(apiAccountDestroy, [account.slug])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (json) enqueueSnackbar(json.message, { variant: 'success' })
        fetchAccounts()
      })()
    },
    [account.slug, enqueueSnackbar, fetchAccounts]
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
        {auth.isAdmin() && (
          <Button color="actions" onClick={handleDeleteButtonClick} variant="contained">
            {'delete'}
          </Button>
        )}
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

const AccountsList = ({ page, setPage, totalAccountsCount, fetchAccounts, accounts }) => {
  return (
    <>
      {accounts &&
        accounts.map(account => <Account account={account} fetchAccounts={fetchAccounts} key={account.slug} />)}
      <Pagination page={page} setPage={setPage} totalRecordsCount={totalAccountsCount} />
    </>
  )
}

export default AccountsList
