import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';
import moment from 'moment/min/moment-with-locales';

const Item = ({ item, navigation }) => {
  const locationText = item.distance ? `${item.distance}m / ${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}` : `${item.latitude.toFixed(4)}, ${item.longitude.toFixed(4)}`;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
      <View style={styles.outsideContainerStyle}>
        <View style={styles.containerStyle}>
          <View style={styles.inlineStyle}>
            <MaterialCommunityIcons style={styles.inlineIconStyle} name='flower' />
            <Text numberOfLines={1} style={styles.inlineTextStyle}>{item.plantName ?? 'n/a'}</Text>
          </View>
          <View style={styles.inlineStyle}>
            <MaterialIcons style={styles.inlineIconStyle} name='map' />
            <Text numberOfLines={1} style={styles.inlineTextStyle}>{item.location}</Text>
          </View>
          <View style={styles.inlineStyle}>
            <MaterialIcons style={styles.inlineIconStyle} name='my-location' />
            <Text numberOfLines={1} style={styles.inlineTextStyle}>{locationText}</Text>

            <Feather style={styles.inlineIconStyle} name='activity' />
            <Text numberOfLines={1} style={styles.inlineTextStyle}>{moment(item.latestWorkStep.createdDateTime).format('LLL')}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  inlineIconStyle: {
    fontSize: 20,
    margin: 5,
  },
  inlineStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineTextStyle: {
    fontSize: 16,
    flexShrink: 1,
  },
  containerStyle: {
    padding: 5,
    width: '95%',
  },
  outsideContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default withNavigation(Item);