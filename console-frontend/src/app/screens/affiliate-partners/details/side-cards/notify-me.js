import Button from 'shared/button'
import mixpanel from 'ext/mixpanel'
import React, { useCallback, useState } from 'react'
import Section from 'shared/section'
import styled from 'styled-components'
import { apiInterestCreate, apiInterestDestroy, apiRequest } from 'utils'
import { Text } from './shared'
import { useSnackbar } from 'notistack'

const NotificationText = styled(Text)`
  margin-top: 10px;
`

const NotifyMe = ({ brand, fetchInterests, interest }) => {
  const [isNotificationButtonClicked, setIsNotificationButtonClicked] = useState(false)

  const { enqueueSnackbar } = useSnackbar()

  const createInterest = useCallback(
    brand => {
      return (async () => {
        const { json, errors, requestError } = await apiRequest(apiInterestCreate, [{ brandId: brand.id }])
        if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
        if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
        if (!errors && !requestError) {
          enqueueSnackbar(`You'll get notified for updates on ${brand.name}`, { variant: 'success' })
        }
        await fetchInterests()
        return { json, errors, requestError }
      })()
    },
    [enqueueSnackbar, fetchInterests]
  )

  const removeInterest = useCallback(
    async () => {
      if (!brand || !interest) return
      const { json, errors, requestError } = await apiRequest(apiInterestDestroy, [interest.id])
      if (requestError) enqueueSnackbar(requestError, { variant: 'error' })
      if (errors) enqueueSnackbar(errors.message, { variant: 'error' })
      if (!errors && !requestError) {
        mixpanel.track('Removed Interest', {
          hostname: window.location.hostname,
          brandId: brand.id,
          brand: brand.name,
        })
        enqueueSnackbar(`Removed notifications for ${brand.name}`, { variant: 'success' })
      }
      await fetchInterests()
      return json
    },
    [brand, enqueueSnackbar, fetchInterests, interest]
  )

  const onNotifyMeClick = useCallback(
    async () => {
      setIsNotificationButtonClicked(true)
      const { errors, requestError } = await createInterest(brand)
      if (!errors && !requestError) {
        mixpanel.track('Clicked Notify Me', {
          hostname: window.location.hostname,
          brandId: brand.id,
          brand: brand.name,
        })
      }
      setIsNotificationButtonClicked(false)
    },
    [brand, createInterest]
  )

  const onRemoveNotificationClick = useCallback(
    async () => {
      if (!brand) return
      setIsNotificationButtonClicked(true)
      mixpanel.track('Clicked Remove Notification', {
        hostname: window.location.hostname,
        brand: brand.name,
        brandId: brand.id,
      })
      await removeInterest()
      setIsNotificationButtonClicked()
    },
    [brand, removeInterest]
  )

  return (
    <Section>
      <Button
        centered
        color={interest ? 'white' : 'primaryGradient'}
        disabled={isNotificationButtonClicked}
        flex
        fullWidthOnMobile
        isFormSubmitting={isNotificationButtonClicked}
        onClick={interest ? onRemoveNotificationClick : onNotifyMeClick}
        size="large"
        variant="contained"
        width="100%"
        wrapText
      >
        {interest ? 'Remove notification' : 'Notify me'}
      </Button>
      <NotificationText>
        {interest
          ? "Great, we'll send you an email when they're ready!"
          : "We'll send you an email once the brand is available for affiliations."}
      </NotificationText>
    </Section>
  )
}

export default NotifyMe
