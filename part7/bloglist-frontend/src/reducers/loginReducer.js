import { createSlice } from '@reduxjs/toolkit'
import * as loginService from '../services/login'
import * as blogService from '../services/blogs'
import * as userService from '../services/users'

/**
 * 7.13 Redux - Store the information about the signed-in user in the Redux store.
 */

const LOCAL_STORAGE_USER = 'bloglistUser'

const loadUserFromLocalStorage = () => {
  const userJSON = window.localStorage.getItem(LOCAL_STORAGE_USER)
  if (userJSON) {
    const parsedUser = JSON.parse(userJSON)
    blogService.setToken(parsedUser.token)
    userService.setToken(parsedUser.token)
    return parsedUser
  } else {
    return null
  }
}

const loginSlice = createSlice({
  name: 'login',
  initialState: { currentUser: loadUserFromLocalStorage() },
  reducers: {
    setUserLoggedIn(state, action) {
      const user = action.payload
      blogService.setToken(user.token)
      window.localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user))
      return { ...state, currentUser: user }
    },
    logout(state, _action) {
      window.localStorage.removeItem(LOCAL_STORAGE_USER)
      return { ...state, currentUser: null }
    },
  },
})

export const { setUserLoggedIn, logout } = loginSlice.actions
export default loginSlice.reducer

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })
    dispatch(setUserLoggedIn(user))
  }
}
