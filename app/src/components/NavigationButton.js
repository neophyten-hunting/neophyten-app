import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import openMap from 'react-native-open-maps';

const NavigationButton = ({ item }) => {
  return (
    <View >
      <TouchableOpacity
        onPress={() => openMap({ latitude: item.latitude, longitude: item.longitude, end: `${item.latitude}, ${item.longitude}`, query: item.location })}>
        <Feather style={styles.navigationIconStyle} name='navigation' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationIconStyle: {
    fontSize: 24,
    marginRight: 10,
    color: '#007AFF',
  },
});

export default NavigationButton;