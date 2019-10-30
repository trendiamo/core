import React, { useCallback, useEffect } from 'react'
import { Button, Card, Collapsible, DisplayText, Layout, Stack } from '@shopify/polaris'
import { ChevronDownMinor, ChevronUpMinor } from '@shopify/polaris-icons'

const loadContent = (w, d) => {
  var s = d.createElement('script'),
    tag = d.getElementsByTagName('script')[0]
  s.src = 'https://cdn.iubenda.com/iubenda.js'
  tag.parentNode.insertBefore(s, tag)
}

const TermsAndConditions = ({ active, setActive }) => {
  const handleToggle = useCallback(() => setActive(active => !active), [setActive])

  useEffect(() => {
    active && loadContent(window, document)
  }, [active])

  return (
    <Layout>
      <Layout.Section>
        <Card sectioned>
          <Stack distribution="equalSpacing">
            <DisplayText size="small">{'Terms and Conditions'}</DisplayText>
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
                href="https://www.iubenda.com/terms-and-conditions/26236047"
                title="Terms and Conditions"
              >
                {'Terms and Conditions'}
              </a>
            </div>
          </Collapsible>
        </Card>
      </Layout.Section>
    </Layout>
  )
}

export default TermsAndConditions
