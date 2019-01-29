import React from 'react'

const hsforms = `
<!--[if lte IE 8]>
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
<![endif]-->
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
`

export const onRenderBody = ({ setPostBodyComponents }) => {
  if (process.env.NODE_ENV !== 'production') return
  setPostBodyComponents([
    <div key="hsforms" dangerouslySetInnerHTML={{ __html: hsforms }} />
  ])
}
