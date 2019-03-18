import React from 'react'

const hsforms = `
<!--[if lte IE 8]>
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
<![endif]-->
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
`

const autopilot =
  '(function(o){var b="https://instantfox.co/anywhere/",t="3a53831439624b0eb8e497ea9c3be616ccd9dfe4a6d94fc0b590db5075879248",a=window.AutopilotAnywhere={_runQueue:[],run:function(){this._runQueue.push(arguments);}},c=encodeURIComponent,s="SCRIPT",d=document,l=d.getElementsByTagName(s)[0],p="t="+c(d.title||"")+"&u="+c(d.location.href||"")+"&r="+c(d.referrer||""),j="text/javascript",z,y;if(!window.Autopilot) window.Autopilot=a;if(o.app) p="devmode=true&"+p;z=function(src,asy){var e=d.createElement(s);e.src=src;e.type=j;e.async=asy;l.parentNode.insertBefore(e,l);};y=function(){z(b+t+\'?\'+p,true);};if(window.attachEvent){window.attachEvent("onload",y);}else{window.addEventListener("load",y,false);}})({});'

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  if (process.env.NODE_ENV !== 'production') return
  setHeadComponents([<script dangerouslySetInnerHTML={{ __html: autopilot }} key="autopilot-script" />])
  setPostBodyComponents([<div dangerouslySetInnerHTML={{ __html: hsforms }} key="hsforms" />])
}
