import omit from 'lodash.omit'
import React, { memo } from 'react'
import styled from 'styled-components'
import { showUpToUsBranding } from 'utils'

const dividerColors = {
  dark: showUpToUsBranding() ? '#c3c3c3' : '#999',
  light: showUpToUsBranding() ? '#e7ecef' : '#ddd',
}

const Divider = styled(({ text, ...props }) => <div {...omit(props, ['folded', 'color'])}>{text}</div>)`
  ${({ folded }) => folded && 'opacity: 0; visibility: hidden;'}
  transition: all 0.3s;

  ${({ text, color }) =>
    text
      ? `
      display: flex;
      line-height: 1rem;
      color: ${dividerColors[color || 'light']};
      &:after {
        content: '';
        display: inline-block;
        flex-grow: 1;
        margin-top: 0.5em;
        background: ${dividerColors[color || 'light']};
        height: 1px;
        margin-left: 10px;
      }
      &:before {
        content: '';
        display: inline-block;
        flex-grow: 1;
        margin-top: 0.5em;
        background: ${dividerColors[color || 'light']};
        height: 1px;
        margin-right: 10px;
      }
    `
      : `border-bottom: 1px solid ${dividerColors[color || 'light']};`}
`

export default memo(Divider)
