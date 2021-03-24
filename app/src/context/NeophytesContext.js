import createDataContext from './createDataContext';
import backend from '../api/backend';

const reducer = (state, action) => {
  switch (action.type) {
    case 'update_all':
      return { ...state, items: action.payload };
    case 'update_error':
      return { ...state, error: action.payload };
    case 'update_loading':
      return { ...state, loading: action.payload };
    case 'update_creating':
      return { ...state, creating: action.payload };
    default:
      return state;
  }
};

const getItems = dispatch => {
  return async () => {
    try {
      dispatch({ type: 'update_loading', payload: true });
      const response = await backend.get('/v1/neophytes');
      dispatch({ type: 'update_all', payload: response.data });
    } catch (error) {
      dispatch({ type: 'update_error', payload: 'Items konnten nicht geladen werden.' });
    } finally {
      dispatch({ type: 'update_loading', payload: false });
    }
  };
};

const addItem = dispatch => {
  return async (item, callback) => {
    try {
      dispatch({ type: 'update_creating', payload: true });
      await backend.post('/v1/neophytes', item);

      // ToDo: Update all
      if (callback) {
        callback();
      }
    } catch (error) {
      console.log(error.message)
      dispatch({ type: 'update_error', payload: 'Item konnte nicht hinzugefügt werden.' });
    } finally {
      dispatch({ type: 'update_creating', payload: false });
    }
  };
};

const updateWorkState = dispatch => {
  return async (id, workState) => {
    try {
      dispatch({ type: 'update_creating', payload: true });
      await backend.post(`/v1/neophytes/${id}/steps`, workState)
    } catch (error) {
      dispatch({ type: 'update_error', payload: 'Status konnte nicht hinzugefügt werden.' });
    } finally {
      dispatch({ type: 'update_creating', payload: false });
    }
  }
}

const resetError = dispatch => {
  return () => {
    dispatch({ type: 'update_error', payload: '' })
  }
}

export const { Context, Provider } = createDataContext(
  reducer,
  { getItems, addItem, updateWorkState, resetError },
  { items: [], loading: false, creating: false, error: '' }
);