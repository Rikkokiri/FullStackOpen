import { createSlice } from '@reduxjs/toolkit'

/**
 * 6.9 - Implement filtering for the anecdotes that are displayed to
 * the user. Store the state of the filter in the redux store. It is
 * recommended to create a new reducer, action creators, and
 * a combined reducer for the store using the combineReducers function.
 */

/**
 * 6.10 - Change the definition of the filter reducer and action creators
 * to use the Redux Toolkit's createSlice function.
 */

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      const filter = action.payload ?? state
      return filter
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
