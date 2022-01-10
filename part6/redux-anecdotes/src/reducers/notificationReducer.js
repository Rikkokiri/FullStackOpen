const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: { notification },
  }
}

export default notificationReducer
