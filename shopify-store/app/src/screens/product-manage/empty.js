import { compose } from 'recompose'
import React from 'react'

const Empty = () => (
  <React.Fragment>
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
        width: '20%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
        width: '35%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: '#F4F4F4',
        borderRadius: '6px',
        margin: '1%',
        width: '80%',
      }}
    >
      <br />
    </div>
    <div
      style={{
        backgroundColor: 'white',
        border: '2px solid rgb(200, 200, 200)',
        borderRadius: '6px',
        bottom: '-10%',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.18) 0px 4px 16px',
        color: 'rgb(200, 200, 200)',
        fontWeight: 'regular',
        letterSpacing: '1px',
        padding: '1%',
        position: 'absolute',
        right: '-3%',
        transform: 'rotate(-20deg)',
      }}
    >
      {'Empty'}
    </div>
  </React.Fragment>
)

export default compose()(Empty)
