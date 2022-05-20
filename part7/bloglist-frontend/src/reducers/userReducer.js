import * as loginService from '../services/login';
import * as blogService from '../services/blogs';

const loadUserFromLocalStorage = () => {
  const userJSON = window.localStorage.getItem('bloglistUser');
  if (userJSON) {
    const parsedUser = JSON.parse(userJSON);
    blogService.setToken(parsedUser.token);
    return parsedUser;
  } else {
    return null;
  }
};

const initialState = { currentUser: loadUserFromLocalStorage() };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      console.log('LOGIN action data', action.data);
      const user = action.data;
      blogService.setToken(user.token);
      window.localStorage.setItem('bloglistUser', JSON.stringify(user));
      return { ...state, currentUser: user };
    }
    case 'LOGOUT': {
      window.localStorage.removeItem('bloglistUser');
      return { ...state, currentUser: null };
    }
    default:
      return state;
  }
};

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  };
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export default userReducer;
