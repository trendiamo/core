import React from 'react'
import { CalloutCard } from '@shopify/polaris'

const CallUs = ({ shopName }) => {
  return (
    <CalloutCard
      illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
      primaryAction={{
        content: 'Schedule a Call Now',
        url: 'https://meetings.hubspot.com/kai33',
        external: true,
      }}
      title={`List ${shopName} on the UPTOUS affiliate platform`}
    >
      <p>
        {
          'In case you haven’t been onboarded yet, schedule a call with us and we will guide you through the last step of the process, explain to you how to make the most out of UPTOUS and answer all your remaining question!'
        }
      </p>
    </CalloutCard>
  )
}

export default CallUs
