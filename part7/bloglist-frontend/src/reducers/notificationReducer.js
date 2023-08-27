import { createSlice } from '@reduxjs/toolkit'

/**
 * 7.10 - Refactor the application to use Redux to manage the notification data.
 */

const initialState = { message: '', error: false, timeoutId: undefined }

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
        message: action.payload.message,
        error: action.payload.error,
        timeoutId: action.payload.timeoutId,
      }
    },
    clearNotification(_state, _action) {
      return initialState
    },
  },
})

export const { clearNotification, createNotification } =
  notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (notification, error = false, delay = 2.5) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      delay * 1000
    )
    dispatch(
      createNotification({
        message: notification,
        error: error,
        timeoutId: timeoutId,
      })
    )
  }
}
