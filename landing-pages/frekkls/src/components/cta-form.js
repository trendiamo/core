import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import Button from './button'

const formUrl = 'https://api.hsforms.com/submissions/v3/integration/submit/5559593/fd8c845d-f044-4386-a93c-ca4c2710a1c5'

const CtaForm = styled(({ className }) => {
  const [email, setEmail] = useState('')

  const setEmailFormField = useCallback(event => setEmail(event.target.value), [])

  const onSubmit = useCallback(
    event => {
      event.preventDefault()

      fetch(formUrl, {
        body: JSON.stringify({ fields: [{ name: 'email', value: email }] }),
        headers: new Headers({ 'Content-Type': 'application/json' }),
        method: 'post',
      }).then(res => {
        if (res.ok) {
          setEmail('')
        }
      })
    },
    [email]
  )

  return (
    <form className={className} onSubmit={onSubmit}>
      <input
        name="email-signup"
        onChange={setEmailFormField}
        placeholder="Email address"
        required
        type="email"
        value={email}
      />
      <Button color="#000" type="submit">
        {'Sign up'}
      </Button>
    </form>
  )
})`
  display: flex;
  justify-content: flex-end;

  input {
    font-size: 5vw;
    padding: 10px;
    border: 2px solid #000;
    margin-right: 1rem;
  }
  @media (min-width: 900px) {
    input {
      font-size: 1.25vw;
      padding: 0.8vw 1vw;
      min-width: 25vw;
    }
  }
`

export default CtaForm
