import { FaCheckCircle } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import React from 'react'

const SuccessIcon = () => (
  <IconContext.Provider
    value={{
      className: 'global-class-name',
      color: '#6A8AD4',
      size: '100',
      style: { marginTop: '50px' },
    }}
  >
    <div>
      <FaCheckCircle />
    </div>
  </IconContext.Provider>
)

export default SuccessIcon
