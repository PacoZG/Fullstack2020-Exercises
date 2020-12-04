import React from 'react'

const Notification = ({ message, colorClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={colorClass}>
      {message}
    </div>
  )
}

export default Notification