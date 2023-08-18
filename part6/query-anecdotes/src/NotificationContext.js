import { createContext, useContext, useReducer } from 'react'

const initialState = {
  content: '',
  timeoutId: undefined,
  error: false,
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        ...state,
        content: action.payload.content,
        timeoutId: action.payload.timeoutId,
        error: action.payload.error ?? false,
      }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const useNotificationDispatch = () => {
  const [_, dispatch] = useContext(NotificationContext)
  return dispatch
}

export const useNotificationValue = () => {
  const [notification, _] = useContext(NotificationContext)
  return notification
}

export const showNotification = (
  dispatch,
  message,
  delay = 5,
  error = false
) => {
  const timeoutId = setTimeout(() => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
    })
  }, delay * 1000)
  dispatch({
    type: 'SET_NOTIFICATION',
    payload: { content: message, error: error, timeoutId: timeoutId },
  })
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
