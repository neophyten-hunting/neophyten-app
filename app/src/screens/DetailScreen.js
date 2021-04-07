import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { Context as NeophytesContext } from '../context/NeophytesContext';
import AttributeListing from '../components/AttributeListing';
import OsmContributerOverlay from '../components/OsmContributerOverlay';
import NavigationButton from '../components/NavigationButton';
import AddActivity from '../components/AddActivity';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DetailScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { state: itemState, getItems, updateWorkState, resetError } = useContext(NeophytesContext);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const item = navigation.getParam('item');

  const initCoords = {
    latitude: item.latitude,
    longitude: item.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001
  };

  const onSubmit = async (form) => {
    await updateWorkState(item.id, form);
    setAddFormVisible(false);
    await getItems();
  }

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
      <ScrollView >
        <AttributeListing title="Standort" iconName="map-pin" value={item.location} >
        </AttributeListing>
        <AttributeListing title="Beschreibung" iconName="list" value={item.description} />
        <AttributeListing title="Art" iconName="flower" value={item.plantName} >
          <MaterialCommunityIcons style={styles.iconStyle} name='flower' />
        </AttributeListing>
        <TouchableOpacity onPress={() => navigation.navigate('Activity', { item })}>
          <AttributeListing title="Aktivität" isLink={true} iconName="activity" value={`${item.latestWorkStep.state} am ${new Date(item.latestWorkStep.createdDateTime).toLocaleDateString()}`} />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        onPress={() => setAddFormVisible(true)}
        style={styles.buttonContainerStyle}
      >
        <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Aktivität hinzufügen</Text>
        </View>
      </TouchableOpacity>
      <AddActivity isVisible={addFormVisible} setIsVisible={setAddFormVisible} onSubmit={onSubmit} />
    </View >
  );
};

DetailScreen.navigationOptions = ({ navigation }) => ({
  headerRight: () => {
    return <NavigationButton item={navigation.getParam('item')} />
  }
});

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
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  navigationIconStyle: {
    fontSize: 18,
    marginRight: 10,
    color: 'white',
  }
});

export default DetailScreen;