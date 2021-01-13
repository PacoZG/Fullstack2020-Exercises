import React from 'react'

const Notification = ({ message }) => {
  return (
      <div style={{ color: 'red' }}>
          {message}
      </div>
  )
}

export default Notification