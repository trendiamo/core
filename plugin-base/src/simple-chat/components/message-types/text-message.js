import React from 'react'
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'

const TextMessageContainer = styled.div`
  background-color: #fff;
  overflow: hidden;
  border-radius: 0 12px 12px 12px;
  padding: 1rem;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  max-width: 100%;
  display: inline-block;
  overflow-wrap: break-word;

  &&:after {
    content: ' ';
    position: absolute;
    top: 0;
    left: -20px;
    width: 10px;
    height: 15px;
    border-bottom: 15px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid #fff;
  }

  img {
    max-width: 100%;
  }

  table {
    width: 100%;
    text-align: left;
    font-size: 1em;
  }
`

const TextMessage = ({ onClick, ...props }) => <TextMessageContainer onClick={onClick} {...props} />

export default compose(
  withHandlers({
    onClick: ({ onClick, clickActionsExist }) => event => {
      if (!clickActionsExist) return event.preventDefault()
      const element = event.target
      if (element.tagName !== 'A') return
      const newTab = element.target === '_blank'
      if (!newTab) {
        event.preventDefault()
      }
      onClick({ type: 'clickLink', item: { url: element.href, newTab } })
    },
  })
)(TextMessage)
