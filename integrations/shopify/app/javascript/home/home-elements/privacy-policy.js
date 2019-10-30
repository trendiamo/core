import React, { useCallback, useEffect } from 'react'
import { Button, Card, Collapsible, DisplayText, Layout, Stack } from '@shopify/polaris'
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons'

const loadContent = (w, d) => {
  var s = d.createElement('script'),
    tag = d.getElementsByTagName('script')[0]
  s.src = 'https://cdn.iubenda.com/iubenda.js'
  tag.parentNode.insertBefore(s, tag)
}

const PrivacyPolicy = ({ active, setActive }) => {
  const handleToggle = useCallback(() => setActive(active => !active), [setActive])

  useEffect(() => {
    active && loadContent(window, document)
  }, [active])

  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Stack distribution="equalSpacing">
            <DisplayText size="small">{'Privacy Policy'}</DisplayText>
            <Button
              ariaControls="basic-collapsible"
              ariaExpanded={active}
              icon={active ? ChevronUpMinor : ChevronDownMinor}
              onClick={handleToggle}
            />
          </Stack>
          <Collapsible id="basic-collapsible" open={active}>
            <div>
              <a
                className="iubenda-white no-brand iubenda-embed iub-body-embed"
                href="https://www.iubenda.com/privacy-policy/26236047"
                id="privacy-policy"
                title="Privacy Policy"
              >
                {'Privacy Policy'}
              </a>
            </div>
          </Collapsible>
        </Card>
      </Layout.Section>
    </Layout>
  )
}

export default PrivacyPolicy
