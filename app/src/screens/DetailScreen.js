import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import AttributeListing from '../components/AttributeListing';
import OsmContributerOverlay from '../components/OsmContributerOverlay';

const DetailScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const item = navigation.getParam('item');

  const initCoords = {
    latitude: item.latitude,
    longitude: item.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  };

  let containerStyle = { ...styles.containerStyle };
  containerStyle.paddingBottom = insets.bottom * 0.5;
  return (
    <View style={containerStyle} >
      <View style={{ height: '30%' }}>
        <MapView
          style={styles.mapStyle}
          initialRegion={initCoords}
          scrollEnabled={false}
          rotateEnabled={false}
          zoomEnabled={false}
          onPress={() => { navigation.navigate('Main', { latlng: { latitude: item.latitude, longitude: item.longitude } }) }}
        >
          <UrlTile
            urlTemplate='http://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            maximumZ={19}
            flipY={false}
          />
          <Marker
            pinColor="red"
            key={item.id.toString()}
            coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          />
        </MapView>
        <OsmContributerOverlay show={true} />
      </View>
      <View style={styles.innerContainerStyle}>
        <Text style={styles.titleStyle}>{item.location}</Text>
        <View style={styles.buttonContainerStyle}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => openMap({ latitude: item.latitude, longitude: item.longitude, end: `${item.latitude}, ${item.longitude}`, query: item.location, travelType: 'walk' })}
          >
            <Feather style={styles.navigationIconStyle} name='navigation' />
            <Text style={styles.buttonTextStyle}>Navigieren</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView >
        <AttributeListing title="Standort" iconName="map-pin" value={item.location} />
        <AttributeListing title="Beschreibung" iconName="list" value={item.description} />
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
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
  innerContainerStyle: {
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 50,
  },
  buttonStyle: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 15,
    margin: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
  },
  navigationIconStyle: {
    fontSize: 18,
    marginRight: 10,
    color: 'white',
  }
});

export default DetailScreen;