import React, { useCallback } from 'react'
import styled from 'styled-components'

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

  *:first-child {
    margin-top: 0;
  }

  *:last-child {
    margin-bottom: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 300;
  }

  ul,
  ol {
    padding-left: 20px;
    margin: 10px 0;
  }

  img {
    max-width: 100%;
  }

  table {
    width: 100%;
    text-align: left;
    font-size: 1em;
  }

  pre {
    white-space: normal;
  }
`

const TextMessage = ({ clickActionsExist, dangerouslySetInnerHTML, onClick }) => {
  const newOnClick = useCallback(
    event => {
      if (!clickActionsExist) return event.preventDefault()
      const element = event.target
      if (element.tagName !== 'A') return
      const newTab = element.target === '_blank'
      if (!newTab) {
        event.preventDefault()
      }
      onClick({ type: 'clickLink', item: { url: element.href, newTab } })
    },
    [clickActionsExist, onClick]
  )

  return <TextMessageContainer dangerouslySetInnerHTML={dangerouslySetInnerHTML} onClick={newOnClick} />
}

export default TextMessage
