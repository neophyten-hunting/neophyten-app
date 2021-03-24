import React from 'react';
import { View, StyleSheet } from 'react-native';
import Item from './Item';

const DetailMapOverlay = ({ defibrillator }) => {
  return (
    <View style={styles.containerStyle}>
      <Item
        defibrillator={defibrillator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    zIndex: 100,
    position: 'absolute',
    bottom: 25,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'lightgrey',
    borderWidth: 0.3,
  }
});

export default DetailMapOverlay;