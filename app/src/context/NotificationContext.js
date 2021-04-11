import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducer = (state, action) => {
  switch (action.type) {
    case 'update_notification_date':
      return { ...state, latestNotificationDate: action.payload };
    default:
      return state;
  }
};

const saveLatestNotificationDate = dispatch => {
  return async (notificationDate) => {
    try {
      const jsonDate = JSON.stringify(notificationDate)
      dispatch({ type: 'update_notification_date', payload: notificationDate });
      await AsyncStorage.setItem('@latestNotificationDate', jsonDate)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }
}

const loadLatestNotificationDate = dispatch => {
  return async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@latestNotificationDate')
      if (jsonValue !== null) {
        dispatch({ type: 'update_notification_date', payload: JSON.parse(jsonValue) });
      }
    } catch (e) {
      console.log(e)
      // error reading value
    }
  }
}

export const { Context, Provider } = createDataContext(
  reducer,
  { saveLatestNotificationDate, loadLatestNotificationDate },
  { latestNotificationDate: '1900-01-01T00:00:00.0000000+00:00' }
);