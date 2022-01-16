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

export const setNotification = (notification, time = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification },
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationReducer
