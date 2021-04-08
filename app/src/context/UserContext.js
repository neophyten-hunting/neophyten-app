import createDataContext from './createDataContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'update_auth':
      return { ...state, auth: action.payload };
    default:
      return state;
  }
};

const login = dispatch => {
  return (authResponse) => {
    dispatch({ type: 'update_auth', payload: authResponse });
  };
};

const logout = dispatch => {
  return () => {
    dispatch({ type: 'update_auth', payload: null })
  }
}

export const { Context, Provider } = createDataContext(
  reducer,
  { login, logout },
  { auth: null }
);