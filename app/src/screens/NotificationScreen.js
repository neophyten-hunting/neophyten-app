import React, { useContext } from 'react';
import { View, FlatList, Button, Image, Text, Linking, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment/min/moment-with-locales';
import { Context as NeophytesContext } from '../context/NeophytesContext';
import { Context as NotificationContext } from '../context/NotificationContext';
import useNotifications from '../hooks/useNotifications';
import Item from '../components/Item';

const NotificationScreen = ({ navigation }) => {
  const { state: { items } } = useContext(NeophytesContext);
  const { state: notification, saveLatestNotificationDate, loadLatestNotificationDate } = useContext(NotificationContext);
  const [notifications] = useNotifications(items, notification, loadLatestNotificationDate);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Änderungen ab: {moment(notification.latestNotificationDate).format('LLL')}</Text>
      <FlatList
        data={notifications}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemBorderStyle} >
              <Item item={item} />
            </View>
          );
        }}
      />
      <Button title="Als gelesen markieren" onPress={() => saveLatestNotificationDate(moment())} />
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  textStyle: {
    fontSize: 16,
    alignSelf: 'center',
    paddingVertical: 4,
  },
  itemBorderStyle: {
    borderColor: 'grey',
    borderBottomWidth: 0.5,
  },
});

export default NotificationScreen;