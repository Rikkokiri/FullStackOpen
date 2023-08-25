import { createSlice } from '@reduxjs/toolkit'

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

const initialState = { content: '', timeoutId: undefined, error: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    createNotification(state, action) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        ...state,
        content: action.payload.content,
        timeoutId: action.payload.timeoutId,
        error: action.payload.error,
      }
    },
    clearNotification(state, action) {
      return initialState
    },
  },
})

export const { clearNotification, createNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

/**
 * 6.19 - The creation of notifications is still a bit tedious since
 * one has to do two actions and use the setTimeout function.
 * Make an action creator, which enables one to provide the notification as follows:
 *    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
 *
 * The first parameter is the text to be rendered and the second parameter is
 * the time to display the notification given in seconds.
 */
export const setNotification = (notification, time = 5, error = false) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      time * 1000
    )
    dispatch(
      createNotification({
        content: notification,
        timeoutId: timeoutId,
        error: error,
      })
    )
  }
}
