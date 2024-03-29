import React from 'react'
import { useSelector } from 'react-redux'

/**
 * 6.12 - The application has a ready-made body for the Notification
 * component. Extend the component so that it renders the message
 * stored in the Redux store.
 */

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  return notification.content ? (
    <div className={`notification ${notification.error ? 'error' : ''}`}>
      {notification.content}
    </div>
  ) : null
}

export default Notification
