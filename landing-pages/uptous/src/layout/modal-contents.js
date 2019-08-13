import React from 'react'

const LegalNoticeModalContent = ({ content }) => (
  <div className="legal-notice-modal-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const PrivacyPolicyModalContent = ({ content }) => (
  <div className="privacy-policy-modal-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const ModalContents = ({ data }) => (
  <div hidden>
    <LegalNoticeModalContent content={data.legalNotice.childContentfulRichText.html} />
    <PrivacyPolicyModalContent content={data.privacyPolicy.childContentfulRichText.html} />
  </div>
)

export default ModalContents
