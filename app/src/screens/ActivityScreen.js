import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import moment from 'moment/min/moment-with-locales';

const ActivityScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const item = navigation.getParam('item');

  const activities = item.workSteps.map((w, index) => {
    return (
      <View style={styles.activityStyle} key={index}>
        <Text style={styles.titleStyle}>{w.state}</Text>
        <Text style={styles.subtitleStyle}>Aktivitätsdatum</Text>
        <Text>{moment(w.createdDateTime).format('LLL')}</Text>
        <Text style={styles.subtitleStyle}>Bearbeiter</Text>
        <Text>{w.reporter ?? 'n/a'}</Text>
        <Text style={styles.subtitleStyle}>Beschreibung</Text>
        <Text>{w.description ?? 'n/a'}</Text>
      </View>
    );
  });

  let containerStyle = { ...styles.containerStyle };
  containerStyle.paddingBottom = insets.bottom * 0.5;
  return (
    <View style={styles.containerStyle}>
      <ScrollView >
        {activities}
      </ScrollView>
    </View >
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    flex: 1
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitleStyle: {
    fontWeight: '500',
    marginTop: 4,
    color: 'grey',
  },
  activityStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    padding: 10,
  },
});

export default ActivityScreen;