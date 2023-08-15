const initialState = { content: '', timeoutId: undefined }

/**
 * 6.12 - You will have to make changes to the application's existing reducer.
 * Create a separate reducer for the new functionality by using the Redux Toolkit's
 * createSlice function.
 * The application does not have to use the Notification component intelligently
 * at this point in the exercises. It is enough for the application to display
 * the initial value set for the message in the notificationReducer.
 */

/**
 * 6.13 - Extend the application so that it uses the Notification component to
 * display a message for five seconds when the user votes for an anecdote or
 * creates a new anecdote.
 * It's recommended to create separate action creators for setting and removing notifications.
 */

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
