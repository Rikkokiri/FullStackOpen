import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

/**
 * 6.10 - Install Redux Toolkit for the project. Move the Redux store creation into
 * the file store.js and use Redux Toolkit's configureStore to create the store.
 * ...
 * Also, start using Redux DevTools to debug the application's state easier.
 */

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  },
})

export default store
