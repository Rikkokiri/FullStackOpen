import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification.message)
  const error = useSelector((state) => state.notification.error)
  const baseStyle = 'border-4 border-solid rounded-md p-4 my-4 max-w-5xl'

  if (!message) {
    return null
  } else if (error) {
    return (
      <div
        className={`${baseStyle} border-danger-50 bg-danger-700 text-danger-50`}
      >
        {message}
      </div>
    )
  } else {
    return (
      <div
        className={`${baseStyle} border-success-50 bg-success-700 text-success-50`}
      >
        {message}
      </div>
    )
  }
}

export default Notification
