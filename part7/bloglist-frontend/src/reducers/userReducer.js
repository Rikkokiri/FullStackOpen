import { createSlice, createSelector } from '@reduxjs/toolkit'
import * as userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(_state, action) {
      return action.payload
    },
  },
})

export const { setUsers } = userSlice.actions
export default userSlice.reducer

const selectUsers = (state) => state.users

export const selectSortedUsers = createSelector(selectUsers, (users) => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name))
})

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}
