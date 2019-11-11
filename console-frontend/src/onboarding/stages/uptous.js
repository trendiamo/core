import Link from 'shared/link'
import React from 'react'
import routes from 'app/routes'
import { Body } from 'onboarding/elements/typography'
import { Tooltip, Video } from 'onboarding/elements'

const order = () => ['affiliatePartners', 'referrals', 'impactPointShop', 'revenues']

const steps = () => ({
  affiliatePartners: {
    target: '.onboard-affiliatePartners',
    content: (
      <Tooltip
        body={
          <>
            <Video url="https://www.youtube.com/embed/0abgbXUCq7M" />
            <Body variant="body2">
              {
                'This is the Affiliate Partner page. Here you can browse through all brands that are available for affiliations. Click on the brand name or „Promote Now“ to see more information regarding compensation, shipping availability and more.'
              }
            </Body>
            <Body variant="body2">{'Watch the video to be sure to not miss out on any important details! '}</Body>
          </>
        }
        nextRoute={routes.yourReferrals()}
      />
    ),
    placement: 'right-start',
    disableBeacon: true,
    title: 'Welcome to UPTOUS!',
  },
  referrals: {
    target: '.onboard-yourReferrals',
    content: (
      <Tooltip
        body="Here you can check and share your Referral Code to earn some extra Impact Points you can spend to receive free sample products!"
        nextRoute={routes.impactPointShop()}
      />
    ),
    placement: 'right-start',
    disableBeacon: true,
    title: 'Refer a friend and earn twice!',
  },
  impactPointShop: {
    target: '.onboard-impactPointShop',
    content: (
      <Tooltip
        body={
          <>
            <Video url="https://www.youtube.com/embed/iwF1-RI5o5Y" />
            <Body variant="body2">
              {
                'Here you can spend your Impact Points on sample products for your next campaign! Watch the video to gain more insight on how to earn and use Impact Points!'
              }
            </Body>
          </>
        }
        nextRoute={routes.revenues()}
      />
    ),
    placement: 'right-start',
    disableBeacon: true,
    title: 'Receive free samples for Impact Points',
  },
  revenues: {
    target: '.onboard-revenues',
    content: (
      <Tooltip
        body={
          <Body variant="body2">
            {
              'Here you can gain insights about your combined Affiliates Sales, manage your payment information and see when your next payout is.'
            }
            <br />
            <br />
            {"Before you can receive your first payout you'll need to setup a Stripe Connect account."}
            <br />
            <br />
            {'You can learn more about that here: '}
            <Link href="https://help.uptous.co/set-up-stripe-connect-account" rel="noopener noreferrer" target="_blank">
              {'https://help.uptous.co/set-up-stripe-connect-account'}
            </Link>
            <br />
            <br />
            {
              'You can already get started with creating revenues right away though and only add your Stripe Connect account later. Until then this article helps you to get an overview over this page: '
            }
            <Link href="https://help.uptous.co/how-revenues-and-payouts-work" rel="noopener noreferrer" target="_blank">
              {'https://help.uptous.co/how-revenues-and-payouts-work'}
            </Link>
          </Body>
        }
        isFinalStep
      />
    ),
    placement: 'right-start',
    disableBeacon: true,
    title: 'Monitor your performance and payouts.',
  },
})

export default { steps, order }
