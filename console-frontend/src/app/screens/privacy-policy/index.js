import NotFound from 'app/screens/not-found'
import React, { useEffect } from 'react'
import { Container } from 'shared/blank-state/components'
import { showUpToUsBranding } from 'utils'

const loadContent = (w, d) => {
  var s = d.createElement('script'),
    tag = d.getElementsByTagName('script')[0]
  s.src = 'https://cdn.iubenda.com/iubenda.js'
  tag.parentNode.insertBefore(s, tag)
}

const PrivacyPolicyPage = () => {
  useEffect(() => {
    if (showUpToUsBranding()) {
      loadContent(window, document)
    }
  }, [])

  if (showUpToUsBranding()) {
    return (
      <Container>
        <div style={{ maxWidth: '700px' }}>
          <a
            className="iubenda-white no-brand iubenda-embed iub-body-embed"
            href="https://www.iubenda.com/privacy-policy/89514409"
            title="Privacy Policy"
          >
            {'Privacy Policy'}
          </a>
        </div>
      </Container>
    )
  } else {
    return <NotFound />
  }
}
export default PrivacyPolicyPage
