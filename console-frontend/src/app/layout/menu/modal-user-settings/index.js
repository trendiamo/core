import auth from 'auth'
import Dialog from 'shared/dialog'
import PaymentsForm from './payments-form'
import ProfileForm from './profile-form'
import React, { useCallback, useState } from 'react'
import SecurityForm from './security-form'
import ShippingForm from './shipping-form'
import styled from 'styled-components'
import { Tab as MuiTab, Tabs } from '@material-ui/core'

const tabs = auth.isAffiliate() ? ['Profile', 'Shipping', 'Payments', 'Security'] : ['Profile', 'Security']

const Tab = styled(MuiTab)`
  min-width: 100px;
`

const ContentContainer = styled.div`
  padding: 22px;
  @media (min-width: 960px) {
    min-height: 700px;
    padding: 24px;
  }
`

const TabsContainer = ({ tabs, selectedTab, setSelectedTab }) => {
  const onChange = useCallback(
    (event, newValue) => {
      setSelectedTab(newValue)
    },
    [setSelectedTab]
  )

  return (
    <Tabs aria-label="User settings" indicatorColor="primary" onChange={onChange} value={selectedTab}>
      {tabs.map(tab => (
        <Tab key={tab} label={tab} />
      ))}
    </Tabs>
  )
}

const DialogContent = ({ handleClose, selectedTab }) => {
  return (
    <ContentContainer>
      {auth.isAffiliate() ? (
        selectedTab === 0 ? (
          <ProfileForm />
        ) : selectedTab === 1 ? (
          <ShippingForm handleClose={handleClose} />
        ) : selectedTab === 2 ? (
          <PaymentsForm handleClose={handleClose} />
        ) : selectedTab === 3 ? (
          <SecurityForm handleClose={handleClose} />
        ) : null
      ) : selectedTab === 0 ? (
        <ProfileForm />
      ) : selectedTab === 1 ? (
        <SecurityForm handleClose={handleClose} />
      ) : null}
    </ContentContainer>
  )
}

const UserSettings = ({ open, setOpen }) => {
  const handleClose = useCallback(() => setOpen(false), [setOpen])

  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <Dialog
      content={<DialogContent handleClose={handleClose} selectedTab={selectedTab} />}
      fullWidth
      handleClose={handleClose}
      hasManualPadding
      maxWidth="sm"
      open={open}
      title={<TabsContainer selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabs={tabs} />}
    />
  )
}

export default UserSettings
