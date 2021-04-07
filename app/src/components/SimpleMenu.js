import React from 'react';
import { Modal, View, TouchableOpacity, Button, Text, StyleSheet, Platform } from 'react-native';
import CsvExport from './CsvExport';

const SimpleMenu = ({ isVisible, setIsVisible, children }) => {

  let renderReadyChild = children;
  if (Platform.OS === 'android') {
    renderReadyChild = children.map((c, i) => { return <View style={styles.androidButtonStyle}>{React.cloneElement(c, { key: i })}</View> });
  }

  console.log(renderReadyChild)
  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}
      >
        <TouchableOpacity
          onPress={() => setIsVisible(!isVisible)}
          style={styles.fullViewStyle}>
          <View style={styles.containerStyle}>
            {renderReadyChild}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  fullViewStyle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(40, 40, 40, 0.5)',
  },
  containerStyle: {
    marginBottom: 80,
    marginHorizontal: 15,
    width: '90%',
    maxHeight: '75%',
    backgroundColor: Platform.OS === 'android' ? 'transparent' : 'white',
    borderRadius: 10,
  },
  androidButtonStyle: {
    padding: 3,
  }
});

export default SimpleMenu;