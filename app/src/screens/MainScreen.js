import React, { useRef, useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { Context as NeophytesContext } from '../context/NeophytesContext';
import { Context as LocationContext } from '../context/LocationContext';
import useNeophytes from '../hooks/useNeophytes';
import useLocation from '../hooks/useLocation';
import Map from '../components/Map';
import LocationError from '../components/LocationError';
import SimpleMenu from '../components/SimpleMenu';
import CsvExport from '../components/CsvExport';

const MainScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { state: { items, loading }, getItems } = useContext(NeophytesContext);
  const { state: userLocation, updateLocation, enableLocationTracking, setLocationTracker } = useContext(LocationContext);
  useNeophytes(items, getItems, userLocation);
  const [locationErr, resetErr] = useLocation(userLocation, updateLocation, enableLocationTracking, setLocationTracker);
  const mapRef = useRef(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [visible, setVisible] = useState(false);

  const animateToRegion = ({ latitude, longitude }) => {
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01
    });
  };

  useEffect(() => {
    const latlng = navigation.getParam('latlng');
    if (latlng) {
      animateToRegion(latlng);
    }
  }, [navigation]);

  useEffect(() => {
    if (locationErr) {
      LocationError({ title: "Standort Zugriff verweigert", message: "Um die Standortfunktion zu nutzen, aktiviere den Zugriff in den Einstellungen." });
      resetErr();
    }
  }, [locationErr]);

  let bottomBar = { ...styles.bottomBar };
  bottomBar.paddingBottom = insets.bottom * 0.5;
  return (
    <View style={styles.containerStyle} >
      <Map
        mapRef={mapRef}
        initCoords={{
          latitude: 47.52,
          longitude: 8.54,
          latitudeDelta: 1.5,
          longitudeDelta: 1.5,
        }}
        items={items.filter(e => e.latestWorkStep.state !== 'Done')}
        itemsLoading={loading}
        isCreateMode={isCreateMode}
        setIsCreateMode={setIsCreateMode}
      />
      <View style={bottomBar}>
        <TouchableOpacity onPress={() => navigation.navigate('User')}>
          <Feather name='user' style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsCreateMode(true)}>
          <Feather name='plus-circle' style={styles.iconStyle} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Feather name='menu' style={styles.iconStyle} />
        </TouchableOpacity>
      </View>
      <SimpleMenu isVisible={visible} setIsVisible={setVisible} >
        <Button title="Über" onPress={() => { setVisible(false); navigation.navigate('About'); }} />
        <CsvExport callback={() => setVisible(false)} />
        <Button title="Schliessen" color="red" onPress={() => setVisible(false)} />
      </SimpleMenu>
    </View >
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomBar: {
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    bottom: 0,
    height: 55,
    backgroundColor: 'green'
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: 32,
    color: 'white'
  }
});

export default MainScreen;