const initialState = { content: '', timeoutId: undefined }

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        ...state,
        content: action.data.content,
        timeoutId: action.data.timeoutId,
      }
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
    const timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      time * 1000
    )
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { content: notification, timeoutId: timeoutId },
    })
  }
}

export default notificationReducer
