import { useState, useEffect } from 'react';
import moment from 'moment/min/moment-with-locales';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default (items) => {
  const [notifications, setNotifications] = useState([]);
  const [latestNotificationDate, setLatestNotificationDate] = useState(moment('1900-01-01T00:00:00.0000000+00:00'));

  const saveLatestNotificationDate = async () => {
    try {
      const jsonDate = JSON.stringify(latestNotificationDate)
      await AsyncStorage.setItem('@latestNotificationDate', jsonDate)
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  const getLatestNotificationDate = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@latestNotificationDate')
      if (jsonValue !== null) {
        setLatestNotificationDate(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log(e)
      // error reading value
    }
  }

  useEffect(() => {
    getLatestNotificationDate();
  }, [])

  useEffect(() => {
    saveLatestNotificationDate();
  }, [latestNotificationDate])

  useEffect(() => {
    const latestModifications = items.filter(i => {
      return moment(i.latestWorkStep.createdDateTime).isAfter(latestNotificationDate);
    }); // order by latestDateTime

    setNotifications(latestModifications);
  }, [items, latestNotificationDate]);

  return [notifications, latestNotificationDate, setLatestNotificationDate];
};
