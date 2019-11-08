import Compensation from './compensation'
import ImpactRewards from './impact-rewards'
import NotifyMe from './notify-me'
import React from 'react'
import RequestSample from './request-sample'
import ShippingZones from './shipping-zones'
import YourAffiliateLinks from './your-affiliate-links'

const SideCards = ({
  affiliation,
  brand,
  fetchAffiliations,
  fetchInterests,
  interest,
  scrollToTermsAndConditions,
  setIsCustomLinkModalOpen,
  setIsRequestSampleModalOpen,
}) => {
  const { availableLocations, hasFreeSample, impactRewards, isPreview } = brand

  if (isPreview) return <NotifyMe brand={brand} fetchInterests={fetchInterests} interest={interest} />

  return (
    <>
      <Compensation brand={brand} />
      {impactRewards && impactRewards.length !== 0 && <ImpactRewards impactRewards={impactRewards} />}
      {availableLocations && <ShippingZones availableLocations={availableLocations} />}
      {affiliation && hasFreeSample && (
        <RequestSample brand={brand} setIsRequestSampleModalOpen={setIsRequestSampleModalOpen} />
      )}
      <YourAffiliateLinks
        affiliation={affiliation}
        brand={brand}
        fetchAffiliations={fetchAffiliations}
        scrollToTermsAndConditions={scrollToTermsAndConditions}
        setIsCustomLinkModalOpen={setIsCustomLinkModalOpen}
      />
    </>
  )
}

export default SideCards
