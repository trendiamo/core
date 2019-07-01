import React from 'react'

const LegalNoticeModalContent = ({ content }) => (
  <div className="legal-notice-modal-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const PrivacyCookiesModalContent = ({ content }) => (
  <div className="privacy-cookies-modal-content" dangerouslySetInnerHTML={{ __html: content }} />
)

const RequestDemoModalContent = ({ content }) => (
  <div className="request-demo-modal-content">
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <div className="request-demo-form" />
  </div>
)

const ModalContents = ({ layout }) => (
  <div hidden>
    <LegalNoticeModalContent content={layout.legalNotice.childContentfulRichText.html} />
    <PrivacyCookiesModalContent content={layout.privacyPolicy.childContentfulRichText.html} />
    <RequestDemoModalContent content={layout.requestDemo.childContentfulRichText.html} />
  </div>
)

export default ModalContents
