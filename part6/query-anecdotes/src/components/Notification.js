import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()

  if (!notification.content) return null

  return (
    <div className={`notification ${notification.error ? 'error' : ''}`}>
      {notification.content}
    </div>
  )
}

export default Notification
