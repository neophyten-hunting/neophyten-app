import React from 'react';
import { ScrollView, View, Image, Text, Linking, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AboutScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.containerStyle}>
      <Image style={styles.imageStyle} source={require('../../assets/splash.png')} />
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>Das Projekt</Text>
        <Text style={styles.textStyle}>Die App ist noch in Entwicklung.</Text>
      </View>
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>OpenStreetMap </Text>
        <Text style={styles.textStyle}>OpenStreetMap Mitwirkende (
          <Text
            style={styles.linkStyle}
            onPress={() => Linking.openURL('https://www.openstreetmap.org/copyright')}>
            https://www.openstreetmap.org/copyright
              </Text>
          )
          </Text>
      </View>
      <View style={styles.wrapperStyle}>
        <Text style={styles.titleStyle}>Mitmachen & Fehler melden auf Github</Text>
        <Text
          style={styles.linkStyle}
          onPress={() => Linking.openURL('https://github.com/neophyten-hunting/neophyten-app')}
        >
          https://github.com/neophyten-hunting/neophyten-app
          </Text>
      </View>
      <View style={{ marginBottom: insets.bottom + 10 }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
  },
  titleStyle: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '500',
  },
  wrapperStyle: {
    marginHorizontal: 10,
    marginBottom: 18,
  },
  textStyle: {
    fontSize: 16,
    alignSelf: 'center',
  },
  linkStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'blue',
    textDecorationLine: 'underline',
  },
  imageStyle: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 10,
  }
});

export default AboutScreen;