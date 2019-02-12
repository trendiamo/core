import styled from 'styled-components'

const TextMessage = styled.div`
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
  animation: _frekkls_message_appear 0.6s ease-out;

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

export default TextMessage
