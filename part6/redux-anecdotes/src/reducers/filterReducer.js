/**
 * 6.9 - Implement filtering for the anecdotes that are displayed to
 * the user. Store the state of the filter in the redux store. It is
 * recommended to create a new reducer, action creators, and
 * a combined reducer for the store using the combineReducers function.
 */

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const filterChange = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default filterReducer
