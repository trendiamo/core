import React from 'react'

const LegalNoticeModalContent = ({ content }) => (
  <div className="legal-notice-modal-content contentful-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const PrivacyPolicyModalContent = ({ content }) => (
  <div className="privacy-policy-modal-content contentful-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const BrandModalContent = () => (
  <div className="brand-modal-content">
    <div className="brand-modal-form" />
  </div>
)

const InfluencerModalContent = () => (
  <div className="influencer-modal-content">
    <div className="influencer-modal-form" />
  </div>
)

const GetInTouchModalContent = () => (
  <div className="get-in-touch-modal-content">
    <div className="get-in-touch-modal-form" />
  </div>
)

const ModalContents = ({ data }) => (
  <div hidden>
    <LegalNoticeModalContent content={data.legalNotice.childContentfulRichText.html} />
    <PrivacyPolicyModalContent content={data.privacyPolicy.childContentfulRichText.html} />
    <BrandModalContent />
    <InfluencerModalContent />
    <GetInTouchModalContent />
  </div>
)

export default ModalContents
