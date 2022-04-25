const initialState = { message: '', error: false, timeoutId: undefined };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      return {
        ...state,
        message: action.data.message,
        error: action.data.error,
        timeoutId: action.data.timeoutId,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        message: '',
        error: false,
        timeoutId: undefined,
      };
    default:
      return state;
  }
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export const setNotification = (notification, error = false, delay = 2.5) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(
      () => dispatch(clearNotification()),
      delay * 1000
    );
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message: notification, error: error, timeoutId: timeoutId },
    });
  };
};

export default notificationReducer;
