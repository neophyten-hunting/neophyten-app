import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import openMap from 'react-native-open-maps';

const Item = ({ item, navigation }) => {
  const locationText = item.distance ? `${item.distance}m / ${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}` : `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
      <View style={styles.outsideContainerStyle}>
        <View style={styles.containerStyle}>
          <Text style={styles.titleStyle}>{item.location}</Text>
          <View style={styles.inlineStyle}>
            <MaterialIcons style={styles.inlineIconStyle} name='my-location' />
            <Text style={styles.inlineTextStyle}>{locationText}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => openMap({ latitude: item.latitude, longitude: item.longitude, end: `${item.latitude}, ${item.longitude}`, query: item.location })}>
          <Feather style={styles.navigationIconStyle} name='navigation' />
        </TouchableOpacity>
      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    marginLeft: 5,
  },
  inlineIconStyle: {
    fontSize: 20,
    margin: 5,
  },
  inlineStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  inlineTextStyle: {
    fontSize: 16,
  },
  noWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openingHoursTextStyle: {
    flexWrap: 'wrap',
    fontSize: 16,
    flexShrink: 1,
  },
  containerStyle: {
    padding: 5,
    width: 300,
  },
  outsideContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navigationIconStyle: {
    fontSize: 36,
    marginRight: 10,
    color: '#007AFF',
  }
});

export default withNavigation(Item);