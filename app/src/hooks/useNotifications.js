import { useState, useEffect } from 'react';
import moment from 'moment/min/moment-with-locales';

export default (items, notification, loadLatestNotificationDate) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    console.log('load latestDate')
    loadLatestNotificationDate();
  }, [])

  useEffect(() => {
    const latestModifications = items.filter(i => {
      return moment(i.latestWorkStep.createdDateTime).isAfter(notification.latestNotificationDate);
    }); // order by latestDateTime

    setNotifications(latestModifications);
  }, [items, notification.latestNotificationDate]);

  return [notifications];
};
