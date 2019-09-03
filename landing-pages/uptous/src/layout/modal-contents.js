import React from 'react'

const LegalNoticeModalContent = ({ content }) => (
  <div className="legal-notice-modal-content contentful-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const PrivacyPolicyModalContent = ({ content }) => (
  <div className="privacy-policy-modal-content contentful-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const GetStartedModalContent = () => (
  <div className="get-started-modal-content">
    <div className="get-started-modal-form" />
  </div>
)

const ModalContents = ({ data }) => (
  <div hidden>
    <LegalNoticeModalContent content={data.legalNotice.childContentfulRichText.html} />
    <PrivacyPolicyModalContent content={data.privacyPolicy.childContentfulRichText.html} />
    <GetStartedModalContent />
  </div>
)

export default ModalContents
