import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const SimpleMenu = ({ isVisible, setIsVisible, children }) => {

  let renderReadyChild = null;
  if (Platform.OS === 'android') {
    renderReadyChild = children.map((c, i) => { return <View key={i} style={styles.androidButtonStyle}>{React.cloneElement(c, { key: i })}</View> });
  }
  else if (Platform.OS === 'ios') {
    renderReadyChild = children.map((c, i) => { return <View key={i} style={styles.iosSeperatorStyle}>{React.cloneElement(c, { key: i })}</View> });
  }

  return (
    <View >
      <Modal
        animationType="fade"
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
  },
  iosSeperatorStyle: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
  }
});

export default SimpleMenu;